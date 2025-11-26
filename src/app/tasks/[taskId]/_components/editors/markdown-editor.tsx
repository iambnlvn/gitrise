"use client";

// TODO: this is a simple textarea for now, replace with a proper markdown editor later

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}
export default function MarkdownEditor({
  value,
  onChange,
}: MarkdownEditorProps) {
  return (
    <textarea
      className="h-[400px] w-full p-4 font-mono"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
