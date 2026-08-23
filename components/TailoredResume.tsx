"use client";

import React, { useState } from "react";
import { TailoredBullet } from "@/lib/schemas";
import { Copy, Check, Download, Printer, Sparkles, ArrowRight, FileCheck, Edit3 } from "lucide-react";

interface TailoredResumeProps {
  bulletPatches: TailoredBullet[];
  resumeMarkdown: string;
}

export const TailoredResume: React.FC<TailoredResumeProps> = ({
  bulletPatches,
  resumeMarkdown,
}) => {
  const [copiedMd, setCopiedMd] = useState(false);
  const [copiedTxt, setCopiedTxt] = useState(false);
  const [currentMd, setCurrentMd] = useState(resumeMarkdown);
  const [isEditing, setIsEditing] = useState(false);

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(currentMd);
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2000);
  };

  const handleCopyTxt = () => {
    // Strip markdown headers/bold syntax for plain text
    const plainText = currentMd
      .replace(/^#+\s+/gm, "")
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/---/g, "----------------------------------------");
    navigator.clipboard.writeText(plainText);
    setCopiedTxt(true);
    setTimeout(() => setCopiedTxt(false), 2000);
  };

  const handleDownloadMd = () => {
    const blob = new Blob([currentMd], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "TalentAST_Tailored_Resume.md";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* SECTION 1: Bullet-by-Bullet Semantic Enhancements */}
      <div className="border-4 border-noir-black p-6 bg-noir-white shadow-brutal">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-noir-black pb-4 mb-6">
          <div>
            <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-600">
              TRUTHFUL RE-FRAMING ENGINE
            </div>
            <h3 className="font-serif font-black text-2xl uppercase tracking-tight">
              Tailored Experience Bullet Patches ({bulletPatches.length})
            </h3>
          </div>
          <span className="text-xs font-mono bg-neutral-100 border-2 border-noir-black px-3 py-1 font-bold">
            ZERO HALLUCINATION GUARANTEE
          </span>
        </div>

        <div className="space-y-6">
          {bulletPatches.map((patch, idx) => (
            <div key={idx} className="border-2 border-noir-black p-4 bg-neutral-50 shadow-brutal-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3 border-b border-neutral-300 pb-2">
                <span className="text-xs font-mono font-bold uppercase bg-noir-black text-noir-white px-2 py-0.5">
                  TARGET SKILL: {patch.targeted_skill}
                </span>
                <span className={`text-[10px] font-mono font-black uppercase px-2 py-0.5 border border-noir-black ${
                  patch.enhancement_type === "QUANTIFICATION"
                    ? "bg-blue-100 text-blue-900"
                    : patch.enhancement_type === "KEYWORD_ALIGNMENT"
                    ? "bg-purple-100 text-purple-900"
                    : "bg-emerald-100 text-emerald-900"
                }`}>
                  PATCH TYPE: {patch.enhancement_type.replace("_", " ")}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs font-mono">
                {/* Original Bullet */}
                <div className="bg-red-50/60 border border-red-200 p-3">
                  <div className="text-[10px] font-bold uppercase text-red-700 mb-1 flex items-center gap-1">
                    <span>- Original Resume Bullet:</span>
                  </div>
                  <p className="text-neutral-800 leading-relaxed line-through opacity-75">
                    {patch.original_bullet}
                  </p>
                </div>

                {/* Tailored Bullet */}
                <div className="bg-emerald-50 border border-emerald-300 p-3">
                  <div className="text-[10px] font-bold uppercase text-emerald-800 mb-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>+ Tailored AST Bullet (Truthfully Quantified):</span>
                  </div>
                  <p className="text-neutral-950 font-bold leading-relaxed">
                    {patch.tailored_bullet}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: Complete ATS-Optimized Markdown Resume */}
      <div className="border-4 border-noir-black p-6 bg-noir-white shadow-brutal">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-noir-black pb-4 mb-4">
          <div>
            <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-600">
              COMPILED ATS RESUME
            </div>
            <h3 className="font-serif font-black text-2xl uppercase tracking-tight">
              Full ATS-Optimized Markdown
            </h3>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="border-2 border-noir-black px-3 py-1.5 text-xs font-mono font-bold flex items-center gap-1.5 bg-neutral-100 hover:bg-neutral-200 shadow-brutal-sm"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? "Done Editing" : "Edit Markdown"}</span>
            </button>

            <button
              onClick={handleCopyMarkdown}
              className="border-2 border-noir-black px-3 py-1.5 text-xs font-mono font-bold flex items-center gap-1.5 bg-noir-white hover:bg-noir-black hover:text-noir-white transition-colors shadow-brutal-sm"
            >
              {copiedMd ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedMd ? "Copied MD!" : "Copy Markdown"}</span>
            </button>

            <button
              onClick={handleCopyTxt}
              className="border-2 border-noir-black px-3 py-1.5 text-xs font-mono font-bold flex items-center gap-1.5 bg-noir-white hover:bg-noir-black hover:text-noir-white transition-colors shadow-brutal-sm"
            >
              {copiedTxt ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <FileCheck className="w-3.5 h-3.5" />}
              <span>{copiedTxt ? "Copied TXT!" : "Copy TXT"}</span>
            </button>

            <button
              onClick={handleDownloadMd}
              className="border-2 border-noir-black px-3 py-1.5 text-xs font-mono font-bold flex items-center gap-1.5 bg-noir-white hover:bg-noir-black hover:text-noir-white transition-colors shadow-brutal-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>.MD</span>
            </button>

            <button
              onClick={handlePrint}
              className="border-2 border-noir-black px-3 py-1.5 text-xs font-mono font-bold flex items-center gap-1.5 bg-noir-black text-noir-white hover:bg-neutral-800 transition-colors shadow-brutal-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
          </div>
        </div>

        {/* Editor or Viewer */}
        {isEditing ? (
          <textarea
            value={currentMd}
            onChange={(e) => setCurrentMd(e.target.value)}
            rows={22}
            className="w-full font-mono text-xs p-4 bg-white border-2 border-noir-black focus:outline-none resize-y leading-relaxed"
          />
        ) : (
          <div className="relative">
            <pre className="font-mono text-xs p-5 bg-neutral-50 border-2 border-noir-black overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-[600px] overflow-y-auto">
              {currentMd}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
