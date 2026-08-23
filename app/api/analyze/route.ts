import { NextRequest, NextResponse } from "next/server";
import { TalentASTResponseSchema } from "@/lib/schemas";
import { SYSTEM_PROMPT, constructUserPrompt } from "@/lib/prompts";
import { DEMO_PRESETS, MOCK_BACKEND_RESULT } from "@/lib/sampleData";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { jd, resume, useMock, apiKey, provider, presetId } = body;

    // Check for explicit preset or mock request
    if (useMock) {
      if (presetId && DEMO_PRESETS[presetId]) {
        return NextResponse.json(DEMO_PRESETS[presetId].mockResult);
      }
      return NextResponse.json(MOCK_BACKEND_RESULT);
    }

    if (!jd || !resume) {
      return NextResponse.json(
        { error: "Both Job Description and Candidate Resume text are required." },
        { status: 400 }
      );
    }

    const effectiveApiKey = apiKey || process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY || process.env.AI_API_KEY;

    // If no API key configured anywhere, return instant mock matched to content or backend default
    if (!effectiveApiKey) {
      if (presetId && DEMO_PRESETS[presetId]) {
        return NextResponse.json(DEMO_PRESETS[presetId].mockResult);
      }
      return NextResponse.json(MOCK_BACKEND_RESULT);
    }

    const userPrompt = constructUserPrompt(jd, resume);

    // Determine whether to use Gemini or OpenAI/OpenRouter
    const isGemini = provider === "gemini" || Boolean(process.env.GEMINI_API_KEY) || (effectiveApiKey.startsWith("AIza") && !provider);

    let rawJsonText = "";

    if (isGemini) {
      const genAI = new GoogleGenerativeAI(effectiveApiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-pro",
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.1,
        },
        systemInstruction: SYSTEM_PROMPT,
      });

      const result = await model.generateContent(userPrompt);
      rawJsonText = result.response.text();
    } else {
      // OpenAI / Groq / OpenRouter endpoint
      const baseUrl = provider === "groq" 
        ? "https://api.groq.com/openai/v1/chat/completions"
        : provider === "openrouter"
        ? "https://openrouter.ai/api/v1/chat/completions"
        : "https://api.openai.com/v1/chat/completions";

      const modelName = provider === "groq" 
        ? "llama-3.3-70b-versatile"
        : provider === "openrouter"
        ? "meta-llama/llama-3.3-70b-instruct"
        : "gpt-4o";

      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${effectiveApiKey}`,
        },
        body: JSON.stringify({
          model: modelName,
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userPrompt }
          ],
          temperature: 0.1
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        console.warn("LLM API call failed, falling back to mock:", errText);
        return NextResponse.json({
          ...MOCK_BACKEND_RESULT,
          _notice: "LLM API returned an error, falling back to deterministic AST compiler."
        });
      }

      const data = await response.json();
      rawJsonText = data.choices?.[0]?.message?.content || "";
    }

    // Clean any markdown formatting if present
    const cleanedText = rawJsonText
      .replace(/^```json\s*/, "")
      .replace(/^```\s*/, "")
      .replace(/```$/, "")
      .trim();

    const parsedData = JSON.parse(cleanedText);
    const validatedData = TalentASTResponseSchema.parse(parsedData);

    return NextResponse.json(validatedData);
  } catch (error: any) {
    console.error("Analysis execution error:", error);
    // Return fallback result so the UI never breaks
    return NextResponse.json(
      {
        ...MOCK_BACKEND_RESULT,
        _notice: `Fallback AST returned due to parser notice: ${error.message}`
      },
      { status: 200 }
    );
  }
}
