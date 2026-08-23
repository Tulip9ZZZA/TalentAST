"use client";

import React, { useState } from "react";
import { StickmanAgent } from "./StickmanAgent";
import { Key, ShieldCheck, Cpu, X, Check, FileCheck2 } from "lucide-react";

interface HeaderProps {
  agentState: "idle" | "running" | "inspecting" | "celebrating";
  speechText: string;
  apiKey: string;
  setApiKey: (key: string) => void;
  provider: string;
  setProvider: (p: string) => void;
  useMock: boolean;
  setUseMock: (m: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  agentState,
  speechText,
  apiKey,
  setApiKey,
  provider,
  setProvider,
  useMock,
  setUseMock,
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [tempKey, setTempKey] = useState(apiKey);
  const [tempProvider, setTempProvider] = useState(provider);

  const handleSaveSettings = () => {
    setApiKey(tempKey);
    setProvider(tempProvider);
    setShowSettings(false);
  };

  return (
    <>
      <header className="border-b-4 border-noir-black pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative">
        <div className="flex-1">
          {/* Header Status & Engine Indicator */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <div className="inline-flex items-center gap-1.5 bg-noir-black text-noir-white px-2.5 py-0.5 text-xs font-mono font-bold uppercase tracking-wider">
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>TECHNICAL HIRING & ATS PARSER</span>
            </div>
            <div className="inline-flex items-center gap-1.5 border-2 border-noir-black px-2 py-0.5 text-[11px] font-mono font-bold uppercase bg-noir-white shadow-brutal-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{useMock ? "MODE: INSTANT PRESET" : `ENGINE: ${provider.toUpperCase()}`}</span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-black tracking-tight uppercase leading-none text-noir-black">
            Talent<span className="bg-noir-black text-noir-white px-2.5 ml-1.5 inline-block shadow-brutal">AST</span>
          </h1>
          <p className="text-xs sm:text-sm font-mono text-neutral-700 mt-2.5 max-w-2xl leading-relaxed">
            Deterministic Competency Abstract Syntax Tree & Semantic Diff Engine. Parse job requirements and candidate code experience, identify critical gaps, and generate 7-day proof-of-work project blueprints.
          </p>
        </div>

        {/* Mascot & Settings Button */}
        <div className="flex items-center gap-4 self-end md:self-auto">
          <button
            onClick={() => setShowSettings(true)}
            className="flex items-center gap-1.5 border-2 border-noir-black px-3 py-2 text-xs font-mono font-bold uppercase bg-noir-white hover:bg-noir-black hover:text-noir-white transition-all shadow-brutal"
            title="Configure AI API Key / Provider"
          >
            <Key className="w-3.5 h-3.5" />
            <span>{apiKey ? "API KEY ACTIVE" : "AI ENGINE SETTINGS"}</span>
          </button>

          <div className="relative">
            <StickmanAgent 
              state={agentState} 
              className="w-16 h-20 sm:w-20 sm:h-24"
              speechBubbleText={speechText}
            />
          </div>
        </div>
      </header>

      {/* AI Key / Engine Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="border-4 border-noir-black bg-noir-white p-6 md:p-8 max-w-lg w-full shadow-brutal-lg relative">
            <div className="flex justify-between items-center border-b-2 border-noir-black pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5" />
                <h3 className="font-serif font-black text-xl uppercase">AI Engine Settings</h3>
              </div>
              <button 
                onClick={() => setShowSettings(false)}
                className="border-2 border-noir-black p-1 hover:bg-noir-black hover:text-noir-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="font-mono text-xs text-neutral-700 mb-4">
              TalentAST works instantly with built-in benchmarks, or you can provide your own API key to analyze custom job descriptions and candidate resumes.
            </p>

            <div className="space-y-4 font-mono text-xs">
              <div>
                <label className="block font-bold uppercase mb-1">Execution Mode</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setUseMock(true)}
                    className={`p-2.5 border-2 border-noir-black font-bold uppercase text-left transition-all ${
                      useMock ? "bg-noir-black text-noir-white shadow-brutal" : "bg-neutral-100 hover:bg-neutral-200"
                    }`}
                  >
                    ⚡ Built-in Presets
                    <span className="block text-[10px] font-normal opacity-80 mt-0.5">Zero latency analysis</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setUseMock(false)}
                    className={`p-2.5 border-2 border-noir-black font-bold uppercase text-left transition-all ${
                      !useMock ? "bg-noir-black text-noir-white shadow-brutal" : "bg-neutral-100 hover:bg-neutral-200"
                    }`}
                  >
                    🧠 Live AI Engine
                    <span className="block text-[10px] font-normal opacity-80 mt-0.5">Parse custom JDs & Resumes</span>
                  </button>
                </div>
              </div>

              {!useMock && (
                <>
                  <div>
                    <label className="block font-bold uppercase mb-1">LLM Provider</label>
                    <select
                      value={tempProvider}
                      onChange={(e) => setTempProvider(e.target.value)}
                      className="w-full border-2 border-noir-black p-2 font-mono bg-white focus:outline-none"
                    >
                      <option value="gemini">Google Gemini (Gemini 1.5 Pro / Flash)</option>
                      <option value="openai">OpenAI (GPT-4o)</option>
                      <option value="groq">Groq (Llama 3.3 70B Fast)</option>
                      <option value="openrouter">OpenRouter (Multi-Model)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold uppercase mb-1">API Key (Stored locally in session)</label>
                    <input
                      type="password"
                      value={tempKey}
                      onChange={(e) => setTempKey(e.target.value)}
                      placeholder="sk-... or AIza..."
                      className="w-full border-2 border-noir-black p-2 font-mono bg-white focus:outline-none"
                    />
                    <span className="text-[10px] text-neutral-500 mt-1 block">
                      Keys are used strictly to communicate with the selected model endpoint.
                    </span>
                  </div>
                </>
              )}
            </div>

            <div className="mt-6 flex justify-end gap-3 border-t-2 border-noir-black pt-4">
              <button
                type="button"
                onClick={() => setShowSettings(false)}
                className="border-2 border-noir-black px-4 py-2 text-xs font-mono font-bold uppercase hover:bg-neutral-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveSettings}
                className="border-2 border-noir-black bg-noir-black text-noir-white px-5 py-2 text-xs font-mono font-bold uppercase shadow-brutal hover:bg-neutral-900 flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Settings</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
