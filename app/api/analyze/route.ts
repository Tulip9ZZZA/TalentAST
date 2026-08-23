import { NextRequest, NextResponse } from "next/server";
import { TalentASTResponseSchema } from "@/lib/schemas";
import { SYSTEM_PROMPT, constructUserPrompt } from "@/lib/prompts";
import { DEMO_PRESETS, MOCK_BACKEND_RESULT } from "@/lib/sampleData";
import { compileASTDynamically } from "@/lib/astCompiler";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { jd, resume, useMock, apiKey, provider, presetId } = body;

    if (!jd || !resume) {
      return NextResponse.json(
        { error: "Both Job Description and Candidate Resume text are required." },
        { status: 400 }
      );
    }

    // Check if input matches an unmodified preset exactly
    const matchingPreset = presetId && DEMO_PRESETS[presetId];
    const isUnmodifiedPreset = matchingPreset && 
      matchingPreset.jd.trim() === jd.trim() && 
      matchingPreset.resume.trim() === resume.trim();

    if (useMock && isUnmodifiedPreset) {
      return NextResponse.json(matchingPreset.mockResult);
    }

    const effectiveApiKey = apiKey || process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY || process.env.AI_API_KEY;

    // If an API key is available, attempt real LLM compilation
    if (effectiveApiKey && !useMock) {
      try {
        const userPrompt = constructUserPrompt(jd, resume);
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
          // OpenAI / Groq / OpenRouter
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
            throw new Error(`LLM endpoint returned HTTP ${response.status}: ${errText}`);
          }

          const data = await response.json();
          rawJsonText = data.choices?.[0]?.message?.content || "";
        }

        const cleanedText = rawJsonText
          .replace(/^```json\s*/, "")
          .replace(/^```\s*/, "")
          .replace(/```$/, "")
          .trim();

        const parsedData = JSON.parse(cleanedText);
        const validatedData = TalentASTResponseSchema.parse(parsedData);
        return NextResponse.json(validatedData);
      } catch (llmError: any) {
        console.warn("LLM API call failed, falling back to dynamic AST engine:", llmError.message);
        // Fall through to dynamic AST compiler below
      }
    }

    // Dynamic deterministic AST compiler for ANY custom input
    const dynamicResult = compileASTDynamically(jd, resume);
    return NextResponse.json(dynamicResult);
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: `Compilation failed: ${error.message}` },
      { status: 500 }
    );
  }
}
