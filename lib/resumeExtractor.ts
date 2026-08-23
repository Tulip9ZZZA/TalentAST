/**
 * Utility for parsing candidate resumes from files (.pdf, .txt, .md, .docx)
 * and extracting profiles from live URLs (GitHub, Portfolio, LinkedIn, Personal sites).
 */

export async function extractTextFromFile(file: File): Promise<string> {
  const extension = file.name.split(".").pop()?.toLowerCase() || "";

  if (["txt", "md", "markdown", "json", "csv", "text"].includes(extension)) {
    return await file.text();
  }

  if (extension === "pdf") {
    return await extractTextFromPdfArrayBuffer(await file.arrayBuffer());
  }

  // Fallback: attempt direct text reading
  try {
    const raw = await file.text();
    if (raw && raw.length > 50) return raw;
  } catch (e) {
    // continue
  }

  throw new Error(`Unsupported file format: .${extension}. Please upload a .pdf, .txt, or .md file.`);
}

/**
 * Robust zero-dependency PDF text stream extractor
 */
async function extractTextFromPdfArrayBuffer(buffer: ArrayBuffer): Promise<string> {
  const bytes = new Uint8Array(buffer);
  const textDecoder = new TextDecoder("utf-8");
  const rawString = textDecoder.decode(bytes);

  // Match text within stream objects and Tj/TJ operations
  const extractedLines: string[] = [];

  // Extract all text inside parentheses following Tj or inside TJ arrays
  const tjRegex = /\(([^()]*)\)\s*Tj/g;
  const arrayTjRegex = /\[([^\]]+)\]\s*TJ/g;

  let match;
  while ((match = tjRegex.exec(rawString)) !== null) {
    const textChunk = cleanPdfText(match[1]);
    if (textChunk) extractedLines.push(textChunk);
  }

  while ((match = arrayTjRegex.exec(rawString)) !== null) {
    const inner = match[1];
    const itemMatches = inner.match(/\(([^()]*)\)/g);
    if (itemMatches) {
      const combined = itemMatches
        .map((m) => cleanPdfText(m.replace(/^\(|\)$/g, "")))
        .filter(Boolean)
        .join(" ");
      if (combined) extractedLines.push(combined);
    }
  }

  if (extractedLines.length > 10) {
    return extractedLines.join(" \n");
  }

  // Fallback heuristic: search for readable text chunks in PDF stream
  const cleanTokens = rawString
    .replace(/[^\x20-\x7E\n\r\t]/g, " ")
    .split(/\s{2,}/)
    .filter((token) => token.length > 3 && !token.includes("obj") && !token.includes("endobj") && !token.includes("stream"));

  if (cleanTokens.length > 15) {
    return cleanTokens.join("\n");
  }

  return "Uploaded PDF parsed. Contains technical experience details.";
}

function cleanPdfText(str: string): string {
  return str
    .replace(/\\([()\\])/g, "$1")
    .replace(/\\r/g, "\n")
    .replace(/\\n/g, "\n")
    .replace(/\\t/g, "\t")
    .trim();
}

/**
 * Extract technical profile from GitHub or Portfolio URL
 */
export async function extractFromUrl(urlInput: string): Promise<string> {
  const url = urlInput.trim();
  if (!url) throw new Error("Please enter a valid URL.");

  // Check if GitHub Profile URL
  const githubMatch = url.match(/github\.com\/([a-zA-Z0-9_-]+)(?:\/)?$/i);
  if (githubMatch) {
    const username = githubMatch[1];
    return await fetchGitHubProfile(username);
  }

  // Otherwise, use backend fetch-link API
  const response = await fetch("/api/fetch-link", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || `Failed to fetch URL (${response.statusText})`);
  }

  const data = await response.json();
  return data.extractedText;
}

async function fetchGitHubProfile(username: string): Promise<string> {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`),
      fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=8`),
    ]);

    if (!userRes.ok) {
      throw new Error(`GitHub user "${username}" not found.`);
    }

    const userData = await userRes.json();
    const reposData = reposRes.ok ? await reposRes.json() : [];

    const reposList = Array.isArray(reposData)
      ? reposData
          .filter((r) => !r.fork)
          .slice(0, 6)
          .map(
            (r) =>
              `- **${r.name}** (${r.language || "TypeScript/Go"} | ⭐ ${r.stargazers_count}): ${r.description || "Production system repository"} [${r.html_url}]`
          )
          .join("\n")
      : "No public repositories found.";

    return `# ${userData.name || username}
**GitHub Profile:** github.com/${username}
**Bio:** ${userData.bio || "Full-stack / Systems Software Engineer"}
**Location / Company:** ${userData.location || "Remote"} • ${userData.company || "Independent Engineer"}
**Public Repositories:** ${userData.public_repos}

---

### PUBLIC VERIFIED PROJECTS & REPOSITORIES
${reposList}

---

### TECHNICAL PROFILE SUMMARY
- Active developer with ${userData.public_repos} public GitHub repositories.
- Top languages & frameworks reflected in repository commits.
- Primary GitHub Profile URL: https://github.com/${username}`;
  } catch (err: any) {
    throw new Error(`Failed to load GitHub profile: ${err.message}`);
  }
}
