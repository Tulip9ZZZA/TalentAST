"use client";

import React, { useEffect, useState, useRef } from "react";
import { DEMO_PRESETS } from "@/lib/sampleData";
import { extractTextFromFile, extractFromUrl } from "@/lib/resumeExtractor";
import { 
  ArrowRight, 
  Sparkles, 
  FileText, 
  Code2, 
  Trash2, 
  Zap, 
  CornerDownLeft, 
  UploadCloud, 
  Link as LinkIcon, 
  Check, 
  AlertCircle,
  FileCode,
  Github
} from "lucide-react";

interface InputSectionProps {
  jd: string;
  setJd: (val: string) => void;
  resume: string;
  setResume: (val: string) => void;
  loading: boolean;
  onCompile: (selectedPresetId?: string) => void;
  selectedPreset: string;
  onSelectPreset: (presetId: string) => void;
}

export const InputSection: React.FC<InputSectionProps> = ({
  jd,
  setJd,
  resume,
  setResume,
  loading,
  onCompile,
  selectedPreset,
  onSelectPreset,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileUrl, setProfileUrl] = useState("");
  const [importingUrl, setImportingUrl] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Shortcut for Ctrl+Enter or Cmd+Enter to compile
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        if (!loading && jd.trim() && resume.trim()) {
          onCompile();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [loading, jd, resume, onCompile]);

  const handleClear = () => {
    setJd("");
    setResume("");
    setImportSuccess(null);
    setImportError(null);
  };

  const handleFileUpload = async (file: File) => {
    setImportError(null);
    setImportSuccess(null);
    try {
      const text = await extractTextFromFile(file);
      if (!text || text.trim().length === 0) {
        throw new Error("Extracted text is empty. Please verify file content.");
      }
      setResume(text);
      setImportSuccess(`Imported "${file.name}" (${(file.size / 1024).toFixed(1)} KB)`);
      setTimeout(() => setImportSuccess(null), 4000);
    } catch (err: any) {
      setImportError(err.message || "Failed to parse file.");
      setTimeout(() => setImportError(null), 5000);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleUrlImport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileUrl.trim()) return;

    setImportingUrl(true);
    setImportError(null);
    setImportSuccess(null);

    try {
      const extracted = await extractFromUrl(profileUrl);
      setResume(extracted);
      setImportSuccess(`Successfully imported profile from ${profileUrl}`);
      setProfileUrl("");
      setTimeout(() => setImportSuccess(null), 4000);
    } catch (err: any) {
      setImportError(err.message || "Failed to fetch profile URL.");
      setTimeout(() => setImportError(null), 5000);
    } finally {
      setImportingUrl(false);
    }
  };

  const jdWordCount = jd.trim() ? jd.trim().split(/\s+/).length : 0;
  const resumeWordCount = resume.trim() ? resume.trim().split(/\s+/).length : 0;

  return (
    <section className="mb-10 space-y-4">
      {/* 1-Click Demo Presets Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-neutral-100 border-2 border-noir-black shadow-brutal">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider bg-noir-black text-noir-white px-2.5 py-1 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Sample Presets:</span>
          </span>
          {Object.values(DEMO_PRESETS).map((preset) => (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset.id)}
              className={`border-2 border-noir-black px-3 py-1 text-xs font-mono font-bold uppercase transition-all shadow-brutal-sm hover:translate-x-[1px] hover:translate-y-[1px] ${
                selectedPreset === preset.id
                  ? "bg-noir-black text-noir-white"
                  : "bg-noir-white hover:bg-neutral-200"
              }`}
            >
              [{preset.name}]
            </button>
          ))}
        </div>

        {(jd || resume) && (
          <button
            onClick={handleClear}
            className="text-xs font-mono font-bold uppercase text-neutral-600 hover:text-noir-black flex items-center gap-1 self-end sm:self-auto"
            title="Clear all fields"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Fields</span>
          </button>
        )}
      </div>

      {/* Dual Split Input Boxes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Job Description */}
        <div className="border-4 border-noir-black p-5 sm:p-6 bg-noir-white shadow-brutal relative flex flex-col">
          <div className="flex justify-between items-center border-b-2 border-noir-black pb-3 mb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <h2 className="font-serif font-bold text-base sm:text-lg uppercase tracking-wide">
                01. Target Job Description
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-neutral-500">{jdWordCount} words</span>
              <span className="text-[10px] font-mono font-bold bg-noir-black text-noir-white px-2 py-0.5">SOURCE_JD</span>
            </div>
          </div>

          <textarea
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            placeholder="Paste Job Description requirements, qualifications, and architecture expectations here..."
            rows={10}
            className="w-full font-mono text-xs p-3.5 border-2 border-noir-black bg-neutral-50 focus:bg-white focus:outline-none focus:ring-0 resize-none leading-relaxed flex-1"
          />

          <div className="mt-3 flex justify-between items-center text-[10px] font-mono text-neutral-500">
            <span>Extracts: Languages, Frameworks, Architecture, Infra</span>
            <span>UTF-8 Plaintext</span>
          </div>
        </div>

        {/* Right: Candidate Resume & Importers */}
        <div 
          className={`border-4 border-noir-black p-5 sm:p-6 bg-noir-white shadow-brutal relative flex flex-col transition-colors ${
            isDragging ? "bg-neutral-100 border-dashed" : ""
          }`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <div className="flex flex-wrap justify-between items-center border-b-2 border-noir-black pb-3 mb-4 gap-2">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              <h2 className="font-serif font-bold text-base sm:text-lg uppercase tracking-wide">
                02. Candidate Experience / Resume
              </h2>
            </div>

            {/* Quick Upload & Import Action Buttons */}
            <div className="flex items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.txt,.md,.markdown,.json"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-noir-black px-2.5 py-1 text-[11px] font-mono font-bold uppercase bg-neutral-100 hover:bg-noir-black hover:text-noir-white transition-colors flex items-center gap-1 shadow-brutal-sm"
                title="Upload PDF, TXT, or MD resume file"
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>Upload PDF/TXT</span>
              </button>
            </div>
          </div>

          {/* URL / Portfolio Import Bar */}
          <form onSubmit={handleUrlImport} className="mb-3 flex items-center gap-2">
            <div className="relative flex-1">
              <LinkIcon className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="text"
                value={profileUrl}
                onChange={(e) => setProfileUrl(e.target.value)}
                placeholder="Or import: github.com/username or portfolio URL..."
                className="w-full text-[11px] font-mono pl-8 pr-2 py-1.5 border-2 border-noir-black bg-white focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={importingUrl || !profileUrl.trim()}
              className="border-2 border-noir-black px-3 py-1.5 text-[11px] font-mono font-bold uppercase bg-noir-black text-noir-white hover:bg-neutral-800 disabled:opacity-50 transition-colors shadow-brutal-sm whitespace-nowrap"
            >
              {importingUrl ? "Importing..." : "Import"}
            </button>
          </form>

          {/* Success / Error Feedback */}
          {importSuccess && (
            <div className="mb-2 p-2 text-[11px] font-mono bg-emerald-100 border border-emerald-500 text-emerald-900 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{importSuccess}</span>
            </div>
          )}
          {importError && (
            <div className="mb-2 p-2 text-[11px] font-mono bg-red-100 border border-red-500 text-red-900 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{importError}</span>
            </div>
          )}

          <textarea
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            placeholder="Paste candidate resume, drag & drop a PDF/TXT file, or import from GitHub/portfolio URL above..."
            rows={8}
            className="w-full font-mono text-xs p-3.5 border-2 border-noir-black bg-neutral-50 focus:bg-white focus:outline-none focus:ring-0 resize-none leading-relaxed flex-1"
          />

          <div className="mt-3 flex justify-between items-center text-[10px] font-mono text-neutral-500">
            <span>Supports .PDF, .TXT, .MD and GitHub / Web URL import</span>
            <span>{resumeWordCount} words</span>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div>
        <button
          onClick={() => onCompile()}
          disabled={loading || !jd.trim() || !resume.trim()}
          className="w-full py-4 px-6 bg-noir-black text-noir-white font-serif font-black text-lg sm:text-xl uppercase tracking-widest hover:bg-neutral-900 transition-all shadow-brutal-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
        >
          {loading ? (
            <div className="flex items-center gap-3">
              <span className="inline-block w-4 h-4 border-2 border-noir-white border-t-transparent rounded-full animate-spin" />
              <span>COMPILING AST DELTA & GENERATING DIFF...</span>
            </div>
          ) : (
            <>
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>COMPILE & RUN SEMANTIC DIFF</span>
              <span className="hidden sm:inline-flex items-center gap-1 text-xs font-mono font-normal opacity-70 bg-neutral-800 px-2 py-0.5 ml-2 border border-neutral-700">
                <CornerDownLeft className="w-3 h-3" /> ⌘+Enter
              </span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </>
          )}
        </button>
      </div>
    </section>
  );
};
