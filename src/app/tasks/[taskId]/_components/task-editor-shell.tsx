"use client";

import { useState } from "react";
import { ModeSwitch } from "./mode-switch";

interface TaskEditorShellProps {
  taskId: string;
  initialMarkdown: string;
  canEdit: boolean;
}
export default function TaskEditorShell({ canEdit }: TaskEditorShellProps) {
  const [mode, setMode] = useState(canEdit ? "visual" : "preview");

  return (
    <div className="space-y-4">
      {canEdit && <ModeSwitch mode={mode} onChange={setMode} />}
    </div>
  );
}
