"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

// TODO: extend with more extensions later, this is just a prototype

interface VisualEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function VisualEditor({ value, onChange }: VisualEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.state.doc.toJSON());
    },
  });

  return <EditorContent editor={editor} />;
}
