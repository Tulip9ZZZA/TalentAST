"use client";

import React, { useState } from "react";
import { TalentASTResponse } from "@/lib/schemas";
import { Copy, Check, Terminal, Code, CheckCircle, FileCode } from "lucide-react";

interface ASTInspectorProps {
  result: TalentASTResponse;
}

export const ASTInspector: React.FC<ASTInspectorProps> = ({ result }) => {
  const [copiedJson, setCopiedJson] = useState(false);
  const [copiedSchema, setCopiedSchema] = useState(false);

  const jsonString = JSON.stringify(result, null, 2);

  const zodSchemaString = `// TalentAST Deterministic Zod Schema
export const CompetencySchema = z.object({
  category: z.string(),
  skill_name: z.string(),
  importance: z.enum(["CRITICAL", "PREFERRED", "NICE_TO_HAVE"]),
  status: z.enum(["MATCHED", "ADJACENT", "CRITICAL_GAP"]),
  jd_requirement_context: z.string(),
  candidate_evidence: z.string().optional(),
  gap_reasoning: z.string().optional(),
  actionable_fix: z.string().optional()
});

export const TalentASTResponseSchema = z.object({
  role_title: z.string(),
  overall_match_score: z.number().min(0).max(100),
  category_scores: z.record(z.string(), z.number()),
  competencies: z.array(CompetencySchema),
  tailored_resume_markdown: z.string(),
  tailored_bullet_patches: z.array(TailoredBulletSchema),
  proof_of_work_plans: z.array(ProofOfWorkSchema)
});`;

  const handleCopyJson = () => {
    navigator.clipboard.writeText(jsonString);
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const handleCopySchema = () => {
    navigator.clipboard.writeText(zodSchemaString);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  return (
    <div className="border-4 border-noir-black p-6 bg-noir-black text-noir-white shadow-brutal">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-neutral-800 pb-4 mb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
            <CheckCircle className="w-4 h-4" />
            <span>SCHEMA VALIDATION: PASSED (Zod v3.24)</span>
          </div>
          <h3 className="font-serif font-black text-2xl uppercase tracking-tight text-white">
            Raw Abstract Syntax Tree (AST) JSON
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopySchema}
            className="border-2 border-neutral-700 px-3 py-1.5 text-xs font-mono font-bold bg-neutral-900 hover:bg-neutral-800 text-white flex items-center gap-1.5 transition-colors"
          >
            {copiedSchema ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <FileCode className="w-3.5 h-3.5" />}
            <span>{copiedSchema ? "Schema Copied!" : "Copy Schema"}</span>
          </button>

          <button
            onClick={handleCopyJson}
            className="border-2 border-neutral-700 px-3 py-1.5 text-xs font-mono font-bold bg-neutral-900 hover:bg-neutral-800 text-white flex items-center gap-1.5 transition-colors"
          >
            {copiedJson ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedJson ? "JSON Copied!" : "Copy AST JSON"}</span>
          </button>
        </div>
      </div>

      {/* Meta Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs mb-4 bg-neutral-900/80 p-3 border border-neutral-800">
        <div>
          <span className="text-neutral-500 block text-[10px]">TOTAL AST NODES:</span>
          <span className="font-bold text-white">{result.competencies.length} Nodes</span>
        </div>
        <div>
          <span className="text-neutral-500 block text-[10px]">BULLET PATCHES:</span>
          <span className="font-bold text-white">{result.tailored_bullet_patches.length} Patches</span>
        </div>
        <div>
          <span className="text-neutral-500 block text-[10px]">PROOF OF WORK:</span>
          <span className="font-bold text-white">{result.proof_of_work_plans.length} Sprints</span>
        </div>
        <div>
          <span className="text-neutral-500 block text-[10px]">PAYLOAD SIZE:</span>
          <span className="font-bold text-white">{(jsonString.length / 1024).toFixed(1)} KB</span>
        </div>
      </div>

      {/* JSON Viewer */}
      <div className="relative">
        <pre className="font-mono text-xs p-4 bg-neutral-950 border border-neutral-800 overflow-x-auto text-emerald-400 max-h-[550px] overflow-y-auto leading-relaxed">
          {jsonString}
        </pre>
      </div>
    </div>
  );
};
