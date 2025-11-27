"use client";

import { useState } from "react";
import { ModeSwitch } from "./mode-switch";
import VisualEditor from "./editors/visual-editor";
import MarkdownEditor from "./editors/markdown-editor";
import MarkdownPreview from "./markdown-preview";

interface TaskEditorShellProps {
  taskId: string;
  initialMarkdown: string;
  canEdit: boolean;
}
export default function TaskEditorShell({
  initialMarkdown,
  canEdit,
}: TaskEditorShellProps) {
  const [mode, setMode] = useState(canEdit ? "visual" : "preview");
  const [markdown, setMarkdown] = useState(initialMarkdown);

  return (
    <div className="space-y-4">
      {canEdit && <ModeSwitch mode={mode} onChange={setMode} />}
      {mode === "visual" && (
        <VisualEditor value={markdown} onChange={setMarkdown} />
      )}
      {mode === "markdown" && (
        <MarkdownEditor value={markdown} onChange={setMarkdown} />
      )}

      {mode === "preview" && <MarkdownPreview markdown={markdown} />}
    </div>
  );
}
