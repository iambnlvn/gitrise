import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface EditableTextProps {
  value: string;
  onSave: (value: string) => void | Promise<void>;
  editable?: boolean;
  variant?: "title" | "text" | "textarea";
  placeholder?: string;
  className?: string;
}
/**
 * Note: This component supports three variants:
 * - "title": For editing titles. Renders an input with larger text.
 * - "text": For inline text editing. Renders a span that turns into an input on click.
 * - "textarea": For multi-line text editing. Renders a textarea when editing.
 *
 * The component handles editing state, saving, and cancelling edits.
 *
 */
export function EditableText({
  value,
  onSave,
  editable = true,
  variant = "text",
  placeholder = "Click to edit...",
  className,
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);
  const [isSaving, setIsSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setEditedValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      const length = editedValue.length;
      inputRef.current.setSelectionRange(length, length);
    }
  }, [isEditing, editedValue.length]);

  const handleStartEdit = () => {
    if (!editable) return;
    setIsEditing(true);
    setEditedValue(value);
  };

  const handleSave = async () => {
    const trimmedValue = editedValue.trim();

    if (trimmedValue === "") {
      setEditedValue(value);
      setIsEditing(false);
      return;
    }

    if (trimmedValue !== value) {
      setIsSaving(true);
      try {
        await onSave(trimmedValue);
      } finally {
        setIsSaving(false);
      }
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    // Title and text: Enter saves
    if (e.key === "Enter" && !e.shiftKey && variant !== "textarea") {
      e.preventDefault();
      handleSave();
    }
    // Textarea: Cmd/Ctrl + Enter saves
    if (
      e.key === "Enter" &&
      (e.metaKey || e.ctrlKey) &&
      variant === "textarea"
    ) {
      e.preventDefault();
      handleSave();
    }
    // Escape cancels for all variants
    if (e.key === "Escape") {
      e.preventDefault();
      handleCancel();
    }
  };

  const handleBlur = () => {
    handleSave();
  };

  const isEmpty = !value;
  const displayValue = value || placeholder;

  if (variant === "title") {
    if (isEditing) {
      return (
        <div className={cn("relative", className)}>
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            disabled={isSaving}
            placeholder={placeholder}
            className={cn(
              "w-full bg-transparent text-2xl font-bold",
              "border-none ring-0 outline-none focus:ring-0 focus:outline-none",
              "placeholder:text-muted-foreground/50",
              "caret-primary",
              isSaving && "opacity-50",
            )}
          />
          {/* Subtle underline to indicate editing */}
          <div className="bg-primary/30 absolute right-0 -bottom-0.5 left-0 h-0.5 rounded-full" />
        </div>
      );
    }

    return (
      <h1
        onClick={handleStartEdit}
        className={cn(
          "text-2xl font-bold",
          editable &&
            "hover:bg-muted/30 -mx-1 cursor-text rounded-sm px-1 transition-colors",
          isEmpty && "text-muted-foreground/50 italic",
          className,
        )}
      >
        {displayValue}
      </h1>
    );
  }

  if (variant === "textarea") {
    if (isEditing) {
      return (
        <div className={cn("relative", className)}>
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            disabled={isSaving}
            placeholder={placeholder}
            rows={Math.max(3, editedValue.split("\n").length + 1)}
            className={cn(
              "w-full resize-none bg-transparent",
              "border-none ring-0 outline-none focus:ring-0 focus:outline-none",
              "text-sm leading-relaxed",
              "placeholder:text-muted-foreground/50",
              "caret-primary",
              isSaving && "opacity-50",
            )}
          />
          <div className="text-muted-foreground mt-1 text-xs opacity-60">
            <kbd className="bg-muted/50 rounded px-1 py-0.5 font-mono text-[10px]">
              ⌘ Enter
            </kbd>{" "}
            save ·{" "}
            <kbd className="bg-muted/50 rounded px-1 py-0.5 font-mono text-[10px]">
              Esc
            </kbd>{" "}
            cancel
          </div>
        </div>
      );
    }

    return (
      <div
        onClick={handleStartEdit}
        className={cn(
          "text-sm leading-relaxed whitespace-pre-wrap",
          editable &&
            "hover:bg-muted/30 -mx-1 cursor-text rounded-sm px-1 py-1 transition-colors",
          isEmpty && "text-muted-foreground/50 italic",
          className,
        )}
      >
        {displayValue}
      </div>
    );
  }

  if (isEditing) {
    return (
      <span className={cn("relative inline-block", className)}>
        <input
          ref={inputRef as React.RefObject<HTMLInputElement>}
          type="text"
          value={editedValue}
          onChange={(e) => setEditedValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          disabled={isSaving}
          placeholder={placeholder}
          className={cn(
            "w-full min-w-[100px] bg-transparent text-sm",
            "border-none ring-0 outline-none focus:ring-0 focus:outline-none",
            "placeholder:text-muted-foreground/50",
            "caret-primary",
            isSaving && "opacity-50",
          )}
        />
        <div className="bg-primary/30 absolute right-0 -bottom-0.5 left-0 h-px rounded-full" />
      </span>
    );
  }

  return (
    <span
      onClick={handleStartEdit}
      className={cn(
        "text-sm",
        editable &&
          "hover:bg-muted/30 -mx-0.5 cursor-text rounded-sm px-0.5 transition-colors",
        isEmpty && "text-muted-foreground/50 italic",
        className,
      )}
    >
      {displayValue}
    </span>
  );
}
