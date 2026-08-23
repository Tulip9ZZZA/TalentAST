"use client";

import React, { useState } from "react";
import { Competency } from "@/lib/schemas";
import { 
  GitBranch, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Search, 
  Lightbulb, 
  Tag, 
  ChevronRight,
  Filter,
  Check,
  AlertTriangle,
  MinusCircle
} from "lucide-react";

interface VisualDiffProps {
  competencies: Competency[];
}

export const VisualDiff: React.FC<VisualDiffProps> = ({ competencies }) => {
  const [filterStatus, setFilterStatus] = useState<"ALL" | "MATCHED" | "ADJACENT" | "CRITICAL_GAP">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [importanceFilter, setImportanceFilter] = useState<string>("ALL");

  const matchedCount = competencies.filter((c) => c.status === "MATCHED").length;
  const adjacentCount = competencies.filter((c) => c.status === "ADJACENT").length;
  const gapCount = competencies.filter((c) => c.status === "CRITICAL_GAP").length;

  const filtered = competencies.filter((comp) => {
    const matchesStatus = filterStatus === "ALL" || comp.status === filterStatus;
    const matchesImportance = importanceFilter === "ALL" || comp.importance === importanceFilter;
    const matchesSearch = 
      comp.skill_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.jd_requirement_context.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (comp.candidate_evidence && comp.candidate_evidence.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesStatus && matchesImportance && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Controls Bar: Filter Tabs & Search */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-neutral-100 p-4 border-2 border-noir-black shadow-brutal-sm">
        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilterStatus("ALL")}
            className={`px-3 py-1 text-xs font-mono font-bold uppercase border-2 border-noir-black transition-all ${
              filterStatus === "ALL"
                ? "bg-noir-black text-noir-white shadow-brutal-sm"
                : "bg-noir-white hover:bg-neutral-200"
            }`}
          >
            All Nodes ({competencies.length})
          </button>
          <button
            onClick={() => setFilterStatus("MATCHED")}
            className={`px-3 py-1 text-xs font-mono font-bold uppercase border-2 border-noir-black transition-all flex items-center gap-1.5 ${
              filterStatus === "MATCHED"
                ? "bg-noir-black text-noir-white shadow-brutal-sm"
                : "bg-noir-white hover:bg-neutral-200"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Matched ({matchedCount})</span>
          </button>
          <button
            onClick={() => setFilterStatus("ADJACENT")}
            className={`px-3 py-1 text-xs font-mono font-bold uppercase border-2 border-noir-black transition-all flex items-center gap-1.5 ${
              filterStatus === "ADJACENT"
                ? "bg-noir-black text-noir-white shadow-brutal-sm"
                : "bg-noir-white hover:bg-neutral-200"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Adjacent ({adjacentCount})</span>
          </button>
          <button
            onClick={() => setFilterStatus("CRITICAL_GAP")}
            className={`px-3 py-1 text-xs font-mono font-bold uppercase border-2 border-noir-black transition-all flex items-center gap-1.5 ${
              filterStatus === "CRITICAL_GAP"
                ? "bg-noir-black text-noir-white shadow-brutal-sm"
                : "bg-noir-white hover:bg-neutral-200"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span>Gaps ({gapCount})</span>
          </button>
        </div>

        {/* Search and Importance Dropdown */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search AST node..."
              className="w-full text-xs font-mono pl-8 pr-3 py-1.5 border-2 border-noir-black bg-white focus:outline-none"
            />
          </div>

          <select
            value={importanceFilter}
            onChange={(e) => setImportanceFilter(e.target.value)}
            className="text-xs font-mono font-bold border-2 border-noir-black py-1.5 px-2 bg-white focus:outline-none"
          >
            <option value="ALL">Priority: ALL</option>
            <option value="CRITICAL">CRITICAL Only</option>
            <option value="PREFERRED">PREFERRED Only</option>
            <option value="NICE_TO_HAVE">NICE TO HAVE</option>
          </select>
        </div>
      </div>

      {/* Competencies Diff List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="border-4 border-noir-black p-8 bg-neutral-100 text-center font-mono text-xs">
            NO AST NODES MATCH CURRENT FILTERS.
          </div>
        ) : (
          filtered.map((comp, idx) => {
            const isMatched = comp.status === "MATCHED";
            const isAdjacent = comp.status === "ADJACENT";
            const isCritical = comp.status === "CRITICAL_GAP";

            return (
              <div
                key={idx}
                className={`border-4 border-noir-black p-5 sm:p-6 shadow-brutal transition-all ${
                  isMatched 
                    ? "bg-noir-white" 
                    : isAdjacent 
                    ? "bg-[#fefce8] dark:bg-dither-light" 
                    : "bg-[#fff1f2] dark:bg-noir-black dark:text-noir-white"
                }`}
              >
                {/* Node Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4 pb-3 border-b-2 border-noir-black">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 border border-noir-black bg-noir-black text-noir-white">
                        {comp.category}
                      </span>
                      <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 border border-noir-black ${
                        comp.importance === "CRITICAL"
                          ? "bg-red-100 text-red-950 border-red-950 font-black"
                          : comp.importance === "PREFERRED"
                          ? "bg-amber-100 text-amber-950"
                          : "bg-neutral-200 text-neutral-800"
                      }`}>
                        PRIORITY: {comp.importance}
                      </span>
                    </div>

                    <h3 className="font-serif font-black text-xl sm:text-2xl tracking-tight">
                      {comp.skill_name}
                    </h3>
                  </div>

                  {/* Status Chip */}
                  <div className="self-start sm:self-auto">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 font-mono text-xs font-black uppercase tracking-wider border-2 border-noir-black shadow-brutal-sm ${
                      isMatched 
                        ? "bg-emerald-400 text-emerald-950" 
                        : isAdjacent 
                        ? "bg-amber-300 text-amber-950" 
                        : "bg-red-500 text-white"
                    }`}>
                      {isMatched && "+ [MATCHED]"}
                      {isAdjacent && "~ [ADJACENT / RE-FRAME]"}
                      {isCritical && "- [CRITICAL GAP]"}
                    </span>
                  </div>
                </div>

                {/* Side-by-Side Context Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono bg-white/70 border-2 border-noir-black p-4">
                  {/* Left: JD Context */}
                  <div>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-neutral-600 mb-1 border-b border-neutral-300 pb-1">
                      <span>Source JD Requirement Context:</span>
                    </div>
                    <p className="leading-relaxed text-neutral-900 font-medium">
                      {comp.jd_requirement_context}
                    </p>
                  </div>

                  {/* Right: Candidate Evidence */}
                  <div className="border-t md:border-t-0 md:border-l border-neutral-300 pt-3 md:pt-0 md:pl-4">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-neutral-600 mb-1 border-b border-neutral-300 pb-1">
                      <span>Candidate Verified Evidence:</span>
                    </div>
                    <p className={`leading-relaxed ${comp.candidate_evidence ? "text-neutral-900 font-medium" : "text-neutral-500 italic"}`}>
                      {comp.candidate_evidence || "No corresponding experience or direct evidence detected in candidate AST."}
                    </p>
                  </div>
                </div>

                {/* Gap Reasoning if any */}
                {comp.gap_reasoning && (
                  <div className="mt-3 p-3 text-xs font-mono bg-neutral-100 border-2 border-noir-black">
                    <span className="font-bold text-neutral-900 block mb-0.5">GAP DIAGNOSTIC:</span>
                    <p className="text-neutral-800">{comp.gap_reasoning}</p>
                  </div>
                )}

                {/* Actionable Fix */}
                {comp.actionable_fix && (
                  <div className={`mt-3 p-3 text-xs font-mono border-2 border-noir-black flex items-start gap-2 ${
                    isCritical 
                      ? "bg-red-50 border-red-900 text-red-950" 
                      : isAdjacent 
                      ? "bg-amber-50 border-amber-900 text-amber-950" 
                      : "bg-emerald-50 border-emerald-900 text-emerald-950"
                  }`}>
                    <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="uppercase">RECOMMENDED AST PATCH:</strong>{" "}
                      <span>{comp.actionable_fix}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
