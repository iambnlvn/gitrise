/**
 * Common programming language colors based on GitHub's color scheme
 */
export const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  rust: "#dea584",
  Go: "#00ADD8",
  Rust: "#dea584",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Swift: "#ffac45",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  Scala: "#c22d40",
  Elixir: "#6e4a7e",
  Haskell: "#5e5086",
  Lua: "#000080",
  Shell: "#89e051",
  PowerShell: "#012456",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Sass: "#cc6699",
  Less: "#1d365d",
  JSON: "#292929",
  YAML: "#cb171e",
  XML: "#0060ac",
  Markdown: "#083fa1",
  Makefile: "#427819",
  Dockerfile: "#384d54",
  Terraform: "#623ce4",
  HCL: "#844fba",
  SQL: "#e38c00",
  Bash: "#89e051",
  Zsh: "#89e051",
  Racket: "#3c5caa",
  Scheme: "#1e4aec",
  Forth: "#341708",
  Tcl: "#e4cc98",
  Ada: "#02f88c",
  Assembly: "#6E4C13",
  COBOL: "#005ca5",
  Crystal: "#000100",
  D: "#ba595e",
  Erlang: "#B83998",
  "F#": "#b845fc",
  Groovy: "#e69f56",
  Julia: "#a270ba",
  Lisp: "#3fb68b",
  MATLAB: "#e16737",
  Nim: "#37775b",
  OCaml: "#3be133",
  Pascal: "#E3F171",
  Perl: "#0298c3",
  Prolog: "#74283c",
  R: "#198CE7",
  Solidity: "#AA6746",
  VHDL: "#adb2cb",
  Verilog: "#b2b7f8",
  Zig: "#ec915c",
};

/**
 * Generate a consistent color based on string hash
 * Used as a fallback when a language isn't in our predefined list
 */
export function generateColorFromString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = Math.abs(hash % 360);
  // Use a consistent saturation and lightnes
  return `hsl(${hue}, 65%, 50%)`;
}

/**
 * Get color for a programming language with fallback to generated color
 */
export function getLanguageColor(language: string): string {
  if (!language) return "#cccccc"; // Default gray for undefined

  const normalizedLang = language.trim();
  return (
    languageColors[normalizedLang] || generateColorFromString(normalizedLang)
  );
}
