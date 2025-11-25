"use client";

import { useState } from "react";
import { ModeSwitch } from "./mode-switch";
import VisualEditor from "./editors/visual-editor";

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
    </div>
  );
}
