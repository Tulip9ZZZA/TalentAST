import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TalentAST // Abstract Syntax Tree & Semantic Diff Engine",
  description: "Deterministic AST parser, semantic diff compiler, ATS bullet patcher, and 7-day proof-of-work project blueprint engine for technical hiring.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300..800;1,300..800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="crt-overlay" />
        {children}
      </body>
    </html>
  );
}
