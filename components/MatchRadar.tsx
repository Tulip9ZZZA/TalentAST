"use client";

import React from "react";
import { TalentASTResponse } from "@/lib/schemas";
import { BarChart3, CheckCircle2, AlertCircle, AlertTriangle, Layers, Award } from "lucide-react";

interface MatchRadarProps {
  result: TalentASTResponse;
}

export const MatchRadar: React.FC<MatchRadarProps> = ({ result }) => {
  const matchedCount = result.competencies.filter((c) => c.status === "MATCHED").length;
  const adjacentCount = result.competencies.filter((c) => c.status === "ADJACENT").length;
  const gapCount = result.competencies.filter((c) => c.status === "CRITICAL_GAP").length;
  const totalCount = result.competencies.length || 1;

  const matchedPercent = Math.round((matchedCount / totalCount) * 100);
  const adjacentPercent = Math.round((adjacentCount / totalCount) * 100);
  const gapPercent = Math.round((gapCount / totalCount) * 100);

  return (
    <div className="border-4 border-noir-black p-6 bg-noir-white shadow-brutal mb-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-b-2 border-noir-black pb-6 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-600 mb-1">
            <Award className="w-4 h-4" />
            <span>AST PARITY & COMPETENCY BREAKDOWN</span>
          </div>
          <h2 className="font-serif font-black text-2xl sm:text-3xl uppercase tracking-tight">
            {result.role_title}
          </h2>
        </div>

        {/* Big Brutalist Score Widget */}
        <div className="flex items-center gap-6 bg-neutral-100 border-2 border-noir-black p-4 shadow-brutal-sm w-full lg:w-auto justify-between lg:justify-start">
          <div>
            <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-600">
              OVERALL PARITY INDEX
            </div>
            <div className="font-serif font-black text-4xl sm:text-5xl leading-none mt-1">
              {result.overall_match_score}
              <span className="text-xl font-mono">%</span>
            </div>
          </div>

          <div className="border-l-2 border-noir-black pl-4 font-mono text-xs space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <span className="w-2.5 h-2.5 bg-emerald-500 border border-noir-black inline-block" />
              <span>+{matchedCount} MATCHED</span>
            </div>
            <div className="flex items-center gap-1.5 font-bold">
              <span className="w-2.5 h-2.5 bg-amber-400 border border-noir-black inline-block" />
              <span>~{adjacentCount} ADJACENT</span>
            </div>
            <div className="flex items-center gap-1.5 font-bold">
              <span className="w-2.5 h-2.5 bg-red-500 border border-noir-black inline-block" />
              <span>-{gapCount} CRITICAL GAPS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Distribution Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs font-mono font-bold mb-1.5">
          <span>AST NODE DISTRIBUTION</span>
          <span>{totalCount} TOTAL COMPETENCIES EVALUATED</span>
        </div>
        <div className="w-full h-6 border-2 border-noir-black flex overflow-hidden bg-neutral-200">
          <div 
            style={{ width: `${matchedPercent}%` }} 
            className="bg-noir-black text-noir-white flex items-center justify-center text-[10px] font-mono font-bold tracking-wider"
            title={`Matched: ${matchedCount} (${matchedPercent}%)`}
          >
            {matchedPercent > 10 ? `${matchedPercent}% MATCH` : ""}
          </div>
          <div 
            style={{ width: `${adjacentPercent}%` }} 
            className="bg-dither-dense border-l-2 border-r-2 border-noir-black bg-white flex items-center justify-center text-[10px] font-mono font-bold"
            title={`Adjacent: ${adjacentCount} (${adjacentPercent}%)`}
          >
            {adjacentPercent > 10 ? `${adjacentPercent}% ADJACENT` : ""}
          </div>
          <div 
            style={{ width: `${gapPercent}%` }} 
            className="bg-neutral-300 flex items-center justify-center text-[10px] font-mono font-bold"
            title={`Critical Gaps: ${gapCount} (${gapPercent}%)`}
          >
            {gapPercent > 10 ? `${gapPercent}% GAPS` : ""}
          </div>
        </div>
      </div>

      {/* Category Score Breakdown */}
      {result.category_scores && Object.keys(result.category_scores).length > 0 && (
        <div>
          <div className="text-xs font-mono font-bold uppercase mb-3 flex items-center gap-1.5">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Category Proficiency Index</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(result.category_scores).map(([category, score]) => (
              <div 
                key={category}
                className="border-2 border-noir-black p-3 bg-neutral-50 shadow-brutal-sm"
              >
                <div className="flex justify-between items-center text-xs font-mono font-bold mb-1.5">
                  <span className="truncate pr-2">{category}</span>
                  <span className="text-sm font-black">{score}%</span>
                </div>
                <div className="w-full h-2.5 border border-noir-black bg-white">
                  <div 
                    className="h-full bg-noir-black transition-all duration-500" 
                    style={{ width: `${score}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
