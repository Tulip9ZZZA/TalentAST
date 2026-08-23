"use client";

import React from "react";

interface StickmanProps {
  state?: "idle" | "running" | "inspecting" | "celebrating";
  className?: string;
  speechBubbleText?: string;
}

export const StickmanAgent: React.FC<StickmanProps> = ({
  state = "idle",
  className = "",
  speechBubbleText
}) => {
  return (
    <div className={`relative inline-block select-none ${className}`}>
      {/* Dynamic Speech Bubble in Brutalist Noir Style */}
      {speechBubbleText && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-noir-white border-2 border-noir-black px-3 py-1 text-[11px] font-mono font-bold tracking-tight shadow-brutal z-20 animate-pulse-subtle">
          <span className="text-noir-black">{speechBubbleText}</span>
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-noir-white border-b-2 border-r-2 border-noir-black rotate-45" />
        </div>
      )}

      {/* SVG Stickman Asset */}
      <svg
        viewBox="0 0 460 560"
        className={`w-full h-full transition-transform duration-300 ${
          state === "running" ? "animate-glitch-horizontal scale-105" : ""
        } ${state === "inspecting" ? "animate-bounce" : ""} ${
          state === "celebrating" ? "scale-110" : ""
        }`}
      >
        <defs>
          <pattern id="char-scanlines" width="100" height="4" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="100" y2="0" stroke="#000000" strokeWidth="1.2" opacity="0.25" />
          </pattern>
          <pattern id="char-dither-dots" width="4" height="4" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="1" height="1" fill="#000000" />
            <rect x="2" y="2" width="1" height="1" fill="#000000" />
          </pattern>
          <pattern id="char-dense-dither" width="2" height="2" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="1" height="1" fill="#000000" />
          </pattern>
        </defs>

        <g id="stick-figure-isolated" transform="translate(30, 20)">
          {/* Ground Contact Shadow */}
          <ellipse cx="200" cy="495" rx="100" ry="12" fill="url(#char-dither-dots)" />
          <ellipse cx="200" cy="495" rx="60" ry="6" fill="url(#char-dense-dither)" />

          {/* HEAD */}
          <g id="head">
            <circle cx="196" cy="62" r="46" fill="none" stroke="#000000" strokeWidth="1.5" strokeDasharray="2,3" opacity="0.6" />
            <rect x="140" y="42" width="25" height="3" fill="#000000" />
            <rect x="240" y="58" width="22" height="3.5" fill="#000000" />
            <rect x="125" y="74" width="18" height="2" fill="#000000" />
            <circle cx="200" cy="60" r="42" fill="#FFFFFF" stroke="#000000" strokeWidth="6.5" />
            <circle cx="200" cy="60" r="36" fill="none" stroke="#000000" strokeWidth="1" strokeDasharray="1,4" />
            {/* Mascot eyes/visor */}
            <rect x="182" y="52" width="36" height="2.5" fill="#000000" />
            <rect x="178" y="66" width="44" height="2" fill="#000000" />
            {/* Monocle / Scanner lens */}
            <circle cx="214" cy="58" r="9" fill="none" stroke="#000000" strokeWidth="2.5" />
            <circle cx="214" cy="58" r="4" fill="#000000" />
          </g>

          {/* TORSO */}
          <g id="torso">
            <line x1="200" y1="106" x2="200" y2="190" stroke="#000000" strokeWidth="6.5" strokeLinecap="square" />
            <rect x="192" y="190" width="24" height="7" fill="#000000" />
            <line x1="208" y1="197" x2="208" y2="235" stroke="#000000" strokeWidth="6.5" strokeLinecap="square" />
            <line x1="200" y1="235" x2="200" y2="330" stroke="#000000" strokeWidth="6.5" strokeLinecap="square" />
            <rect x="194" y="120" width="12" height="190" fill="url(#char-dither-dots)" />
            <line x1="192" y1="145" x2="208" y2="145" stroke="#000000" strokeWidth="2" />
            <line x1="190" y1="270" x2="210" y2="270" stroke="#000000" strokeWidth="2" />
            <line x1="188" y1="300" x2="212" y2="300" stroke="#000000" strokeWidth="2" />
          </g>

          {/* LEFT ARM & FLOATING CARD */}
          <g id="arm-left">
            <line x1="200" y1="140" x2="125" y2="195" stroke="#000000" strokeWidth="6" strokeLinecap="square" />
            <line x1="118" y1="202" x2="65" y2="168" stroke="#000000" strokeWidth="6" strokeLinecap="square" />
            <circle cx="56" cy="162" r="9" fill="#FFFFFF" stroke="#000000" strokeWidth="4" />
            <line x1="130" y1="192" x2="78" y2="158" stroke="#000000" strokeWidth="1.5" strokeDasharray="3,3" />

            {/* Floating Card Monolith */}
            <g id="floating-prop-card" transform="translate(18, 68)">
              <rect x="6" y="6" width="38" height="58" fill="url(#char-dense-dither)" />
              <rect x="0" y="0" width="38" height="58" fill="#FFFFFF" stroke="#000000" strokeWidth="3" />
              <circle cx="19" cy="29" r="10" fill="#000000" />
              <circle cx="19" cy="29" r="4" fill="#FFFFFF" />
              <path d="M8,29 Q19,18 30,29 Q19,40 8,29 Z" fill="none" stroke="#FFFFFF" strokeWidth="1.2" />
              <rect x="-4" y="42" width="46" height="1.8" fill="#000000" />
            </g>
          </g>

          {/* RIGHT ARM */}
          <g id="arm-right">
            <line x1="200" y1="140" x2="278" y2="182" stroke="#000000" strokeWidth="6" strokeLinecap="square" />
            <rect x="278" y="178" width="16" height="5" fill="#000000" />
            <line x1="300" y1="190" x2="362" y2="232" stroke="#000000" strokeWidth="6" strokeLinecap="square" />
            <circle cx="372" cy="240" r="10" fill="#000000" />
            <circle cx="372" cy="240" r="4.5" fill="#FFFFFF" />
            {/* Shards */}
            <polygon points="370,165 380,177 370,189 360,177" fill="#000000" />
            <polygon points="370,169 376,177 370,185 364,177" fill="#FFFFFF" />
            <rect x="388" y="202" width="6" height="6" fill="#000000" />
            <rect x="398" y="206" width="4" height="4" fill="#000000" />
          </g>

          {/* LEGS */}
          <g id="leg-left">
            <line x1="200" y1="330" x2="150" y2="425" stroke="#000000" strokeWidth="6.5" strokeLinecap="square" />
            <rect x="142" y="422" width="14" height="4.5" fill="#000000" />
            <line x1="146" y1="430" x2="112" y2="492" stroke="#000000" strokeWidth="6.5" strokeLinecap="square" />
            <line x1="100" y1="492" x2="130" y2="492" stroke="#000000" strokeWidth="6.5" strokeLinecap="square" />
            <rect x="92" y="495" width="45" height="3" fill="url(#char-dense-dither)" />
          </g>

          <g id="leg-right">
            <line x1="200" y1="330" x2="252" y2="425" stroke="#000000" strokeWidth="6.5" strokeLinecap="square" />
            <line x1="252" y1="430" x2="288" y2="492" stroke="#000000" strokeWidth="6.5" strokeLinecap="square" />
            <line x1="280" y1="492" x2="312" y2="492" stroke="#000000" strokeWidth="6.5" strokeLinecap="square" />
            <rect x="276" y="495" width="45" height="3" fill="url(#char-dense-dither)" />
          </g>
        </g>
      </svg>
    </div>
  );
};
