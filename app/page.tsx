"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { InputSection } from "@/components/InputSection";
import { MatchRadar } from "@/components/MatchRadar";
import { VisualDiff } from "@/components/VisualDiff";
import { TailoredResume } from "@/components/TailoredResume";
import { ProofOfWorkRoadmap } from "@/components/ProofOfWorkRoadmap";
import { ASTInspector } from "@/components/ASTInspector";
import { DEMO_PRESETS, MOCK_BACKEND_RESULT } from "@/lib/sampleData";
import { TalentASTResponse } from "@/lib/schemas";
import confetti from "canvas-confetti";
import { 
  GitCommit, 
  FileText, 
  FolderGit2, 
  Code2, 
  RotateCcw, 
  Sparkles, 
  Layers,
  Terminal,
  ShieldCheck
} from "lucide-react";

export default function TalentASTDashboard() {
  const [selectedPreset, setSelectedPreset] = useState<string>("backend");
  const [jd, setJd] = useState<string>(DEMO_PRESETS.backend.jd);
  const [resume, setResume] = useState<string>(DEMO_PRESETS.backend.resume);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<TalentASTResponse | null>(null);
  const [activeTab, setActiveTab] = useState<"diff" | "resume" | "roadmap" | "ast">("diff");
  const [agentSpeech, setAgentSpeech] = useState<string>("SYSTEM READY. SELECT PRESET, UPLOAD RESUME, OR PASTE INPUT.");
  
  // AI Key & Provider state
  const [apiKey, setApiKey] = useState<string>("");
  const [provider, setProvider] = useState<string>("gemini");
  const [useMock, setUseMock] = useState<boolean>(true);

  // Switch preset handler
  const handleSelectPreset = (presetId: string) => {
    const preset = DEMO_PRESETS[presetId];
    if (preset) {
      setSelectedPreset(presetId);
      setJd(preset.jd);
      setResume(preset.resume);
      setAgentSpeech(`[${preset.badge}] LOADED. READY TO COMPILE.`);
    }
  };

  // Compile AST & Diff handler
  const handleCompile = async (presetOverrideId?: string) => {
    const activePresetId = presetOverrideId || selectedPreset;
    setLoading(true);
    setAgentSpeech("PARSING COMPETENCY NODES & COMPUTING AST DELTA...");

    try {
      if (useMock) {
        // Fast local mock simulation
        await new Promise((resolve) => setTimeout(resolve, 800));
        const mockData = DEMO_PRESETS[activePresetId]?.mockResult || MOCK_BACKEND_RESULT;
        setResult(mockData);
        setAgentSpeech(`AST COMPILED. ${mockData.overall_match_score}% PARITY DETECTED.`);
        
        if (mockData.overall_match_score >= 70) {
          confetti({
            particleCount: 40,
            spread: 60,
            origin: { y: 0.7 },
            colors: ["#000000", "#555555", "#aaaaaa", "#ffffff"]
          });
        }
      } else {
        // Real API call to /api/analyze
        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jd,
            resume,
            apiKey,
            provider,
            useMock: false,
            presetId: activePresetId,
          }),
        });

        if (!response.ok) {
          throw new Error(`Compiler API error: ${response.statusText}`);
        }

        const data: TalentASTResponse = await response.json();
        setResult(data);
        setAgentSpeech(`LIVE AST COMPILED. ${data.overall_match_score}% PARITY DETECTED.`);
        
        if (data.overall_match_score >= 70) {
          confetti({
            particleCount: 40,
            spread: 60,
            origin: { y: 0.7 },
            colors: ["#000000", "#555555", "#aaaaaa", "#ffffff"]
          });
        }
      }
    } catch (err: any) {
      console.error("Compilation error:", err);
      // Graceful fallback to mock data on error
      const fallback = DEMO_PRESETS[activePresetId]?.mockResult || MOCK_BACKEND_RESULT;
      setResult(fallback);
      setAgentSpeech("NOTICE: PARSER RETURNED DETERMINISTIC FALLBACK.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setAgentSpeech("QUERY RESET. SYSTEM READY.");
  };

  return (
    <main className="min-h-screen p-4 sm:p-6 md:p-10 max-w-7xl mx-auto flex flex-col justify-between">
      <div>
        {/* APP HEADER & MASCOT */}
        <Header
          agentState={loading ? "running" : result ? "celebrating" : "idle"}
          speechText={agentSpeech}
          apiKey={apiKey}
          setApiKey={setApiKey}
          provider={provider}
          setProvider={setProvider}
          useMock={useMock}
          setUseMock={setUseMock}
        />

        {/* DUAL INPUT SECTION (Active before compilation) */}
        {!result && (
          <InputSection
            jd={jd}
            setJd={setJd}
            resume={resume}
            setResume={setResume}
            loading={loading}
            onCompile={handleCompile}
            selectedPreset={selectedPreset}
            onSelectPreset={handleSelectPreset}
          />
        )}

        {/* RESULTS DASHBOARD (Active after compilation) */}
        {result && (
          <section className="space-y-6">
            {/* Top Score Banner & Quick Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-neutral-100 p-3 border-2 border-noir-black shadow-brutal-sm">
              <div className="flex items-center gap-2 text-xs font-mono font-bold">
                <span className="bg-noir-black text-noir-white px-2 py-0.5 uppercase">EVALUATED ROLE</span>
                <span>{result.role_title}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="border-2 border-noir-black px-3 py-1 text-xs font-mono font-bold uppercase bg-noir-white hover:bg-noir-black hover:text-noir-white transition-colors flex items-center gap-1.5 shadow-brutal-sm"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>New Analysis / Reset</span>
                </button>
              </div>
            </div>

            {/* Score & Category Radar */}
            <MatchRadar result={result} />

            {/* TABBED NAVIGATION */}
            <div className="flex flex-wrap border-b-4 border-noir-black gap-2">
              {[
                { 
                  id: "diff", 
                  label: "01. Visual AST Diff", 
                  icon: GitCommit, 
                  badge: `${result.competencies.length} Nodes` 
                },
                { 
                  id: "resume", 
                  label: "02. Tailored Resume Studio", 
                  icon: FileText, 
                  badge: `${result.tailored_bullet_patches.length} Patches` 
                },
                { 
                  id: "roadmap", 
                  label: "03. 7-Day Proof-of-Work", 
                  icon: FolderGit2, 
                  badge: `${result.proof_of_work_plans.length} Sprints` 
                },
                { 
                  id: "ast", 
                  label: "04. Raw AST Inspector", 
                  icon: Code2, 
                  badge: "Valid" 
                },
              ].map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-4 sm:px-5 py-3 font-serif font-black text-xs sm:text-sm uppercase tracking-wider border-t-2 border-x-2 border-noir-black transition-all flex items-center gap-2 ${
                      isActive
                        ? "bg-noir-black text-noir-white translate-y-1 shadow-brutal"
                        : "bg-noir-white hover:bg-neutral-100"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{tab.label}</span>
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 border ${
                      isActive 
                        ? "border-noir-white bg-neutral-800 text-white" 
                        : "border-noir-black bg-neutral-100 text-neutral-800"
                    }`}>
                      {tab.badge}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* TAB CONTENTS */}
            <div className="pt-2">
              {activeTab === "diff" && (
                <VisualDiff competencies={result.competencies} />
              )}

              {activeTab === "resume" && (
                <TailoredResume
                  bulletPatches={result.tailored_bullet_patches}
                  resumeMarkdown={result.tailored_resume_markdown}
                />
              )}

              {activeTab === "roadmap" && (
                <ProofOfWorkRoadmap plans={result.proof_of_work_plans} />
              )}

              {activeTab === "ast" && (
                <ASTInspector result={result} />
              )}
            </div>
          </section>
        )}
      </div>

      {/* CLEAN FOOTER */}
      <footer className="border-t-4 border-noir-black mt-16 pt-6 pb-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-neutral-600">
        <div className="flex items-center gap-2">
          <span className="font-bold uppercase text-noir-black">TalentAST</span>
          <span>•</span>
          <span>Abstract Syntax Tree & Semantic Diff Engine for Technical Hiring</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] text-neutral-500">Built for Engineering Leadership & Candidates</span>
        </div>
      </footer>
    </main>
  );
}
