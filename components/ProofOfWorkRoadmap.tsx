"use client";

import React, { useState } from "react";
import { ProofOfWorkPlan } from "@/lib/schemas";
import { 
  FolderGit2, 
  ExternalLink, 
  CheckSquare, 
  Square, 
  Clock, 
  Cpu, 
  Calendar, 
  Copy, 
  Check, 
  BookOpen, 
  ShieldAlert 
} from "lucide-react";

interface ProofOfWorkRoadmapProps {
  plans: ProofOfWorkPlan[];
}

export const ProofOfWorkRoadmap: React.FC<ProofOfWorkRoadmapProps> = ({ plans }) => {
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const toggleItem = (planIdx: number, itemIdx: number) => {
    const key = `${planIdx}-${itemIdx}`;
    setCompletedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCopySpec = (plan: ProofOfWorkPlan, idx: number) => {
    const text = `# PROOF-OF-WORK SPEC: ${plan.project_title}
Target Skill: ${plan.target_gap_skill}
Sprint Duration: ${plan.timeline_days} Days

## Architecture Summary
${plan.architecture_summary}

## Key Deliverables
${plan.key_deliverables.map((d) => `- [ ] ${d}`).join("\n")}

## Verified Learning Resources
${plan.learning_resources.map((r) => `- [${r.title}](${r.url})`).join("\n")}
`;
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (!plans || plans.length === 0) {
    return (
      <div className="border-4 border-noir-black p-8 bg-emerald-50 text-center shadow-brutal">
        <div className="font-serif font-black text-2xl uppercase mb-2">
          Zero Critical Gaps Detected!
        </div>
        <p className="font-mono text-xs text-emerald-950">
          The candidate AST satisfies all critical job requirements. No 7-day proof-of-work project sprints are required.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-2 border-noir-black p-4 bg-neutral-100 shadow-brutal-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="font-serif font-bold text-lg uppercase tracking-tight">
            Proof-of-Work Sprint Blueprints
          </h3>
          <p className="font-mono text-xs text-neutral-700">
            Build these deterministic 7-day projects to replace resume claims with verifiable GitHub artifacts.
          </p>
        </div>
        <span className="text-xs font-mono font-bold bg-noir-black text-noir-white px-3 py-1 self-start sm:self-auto">
          {plans.length} SPRINT{plans.length > 1 ? "S" : ""} GENERATED
        </span>
      </div>

      <div className="space-y-6">
        {plans.map((pow, idx) => (
          <div key={idx} className="border-4 border-noir-black p-6 bg-noir-white shadow-brutal">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b-2 border-noir-black pb-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-mono font-bold bg-red-600 text-white px-2 py-0.5 border border-noir-black uppercase">
                    GAP: {pow.target_gap_skill}
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-noir-black text-noir-white px-2 py-0.5 uppercase">
                    SPRINT #{idx + 1}
                  </span>
                </div>
                <h3 className="font-serif font-black text-2xl sm:text-3xl uppercase tracking-tight">
                  {pow.project_title}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 border-2 border-noir-black px-3 py-1 font-mono text-xs font-bold bg-neutral-100 shadow-brutal-sm">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{pow.timeline_days} DAYS SPRINT</span>
                </div>

                <button
                  onClick={() => handleCopySpec(pow, idx)}
                  className="border-2 border-noir-black px-3 py-1 font-mono text-xs font-bold bg-noir-white hover:bg-noir-black hover:text-noir-white transition-colors flex items-center gap-1 shadow-brutal-sm"
                  title="Copy project specification as Markdown"
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Spec</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Architecture breakdown */}
            <div className="mb-6">
              <h4 className="font-serif font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5 text-neutral-800">
                <Cpu className="w-3.5 h-3.5" />
                <span>System Architecture & Technical Blueprint:</span>
              </h4>
              <p className="font-mono text-xs bg-neutral-50 border-2 border-noir-black p-4 leading-relaxed text-neutral-900">
                {pow.architecture_summary}
              </p>
            </div>

            {/* Deliverables Checklist */}
            <div className="mb-6">
              <h4 className="font-serif font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5 text-neutral-800">
                <FolderGit2 className="w-3.5 h-3.5" />
                <span>Verifiable Deliverables Checklist:</span>
              </h4>
              <div className="space-y-2">
                {pow.key_deliverables.map((item, dIdx) => {
                  const isChecked = Boolean(completedItems[`${idx}-${dIdx}`]);
                  return (
                    <div
                      key={dIdx}
                      onClick={() => toggleItem(idx, dIdx)}
                      className={`flex items-start gap-3 p-3 border-2 border-noir-black cursor-pointer transition-all ${
                        isChecked 
                          ? "bg-emerald-50 text-emerald-950 line-through opacity-80" 
                          : "bg-white hover:bg-neutral-50"
                      }`}
                    >
                      <button type="button" className="mt-0.5 flex-shrink-0">
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-emerald-700" />
                        ) : (
                          <Square className="w-4 h-4 text-noir-black" />
                        )}
                      </button>
                      <span className="font-mono text-xs font-medium leading-tight">
                        {item}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Verified Docs & Learning Links */}
            {pow.learning_resources && pow.learning_resources.length > 0 && (
              <div className="border-t-2 border-noir-black pt-4">
                <h4 className="font-serif font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5 text-neutral-800">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Verified Specifications & Official Documentation:</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {pow.learning_resources.map((res, rIdx) => (
                    <a
                      key={rIdx}
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-xs font-bold border-2 border-noir-black px-3 py-1 bg-neutral-100 hover:bg-noir-black hover:text-noir-white transition-colors shadow-brutal-sm"
                    >
                      <span>{res.title}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
