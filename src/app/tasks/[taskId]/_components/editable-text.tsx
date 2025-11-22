import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

export interface EditableTextState {
  isEditing: boolean;
  editedValue: string;
  isSaving: boolean;
  setEditedValue: (value: string) => void;
  handleSave: () => Promise<void>;
  handleCancel: () => void;
  handleStartEdit: () => void;
}

interface EditableTextProps {
  value: string;
  onSave: (value: string) => void | Promise<void>;
  editable?: boolean;
  variant?: "title" | "text" | "textarea";
  placeholder?: string;
  className?: string;
  /**
   *  Custom render function for mobile modals/sheets
   * @see `renderEditingUI` for custom desktop render
   */
  renderMobileEditingUI?: (state: EditableTextState) => React.ReactNode;
  /**
   *  Custom render function for editing Desktop ui
   * @see `renderMobileEditingUI` for custom mobile render
   */
  renderEditingUI?: (state: EditableTextState) => React.ReactNode;
  /** Custom render function for display UI */
  renderDisplayUI?: (
    state: EditableTextState & { displayValue: string; isEmpty: boolean },
  ) => React.ReactNode;
  /** Called when editing starts - can be used to open mobile sheet */
  onEditStart?: () => void;
  /** Called when editing ends */
  onEditEnd?: () => void;
  /** If true, uses external editing UI (e.g., mobile sheet) instead of inline */
  useExternalEditor?: boolean;
}

/**
 * Note: This component supports three variants:
 * - "title": For editing titles. Renders an input with larger text.
 * - "text": For inline text editing. Renders a span that turns into an input on click.
 * - "textarea": For multi-line text editing. Renders a textarea when editing.
 *
 * The component handles editing state, saving, and cancelling edits.
 *
 * For mobile, use `renderEditingUI` or `useExternalEditor` with `onEditStart` to
 * open a custom editing interface (like a bottom sheet).
 */
export function EditableText({
  value,
  onSave,
  editable = true,
  variant = "text",
  placeholder = "Click to edit...",
  className,
  renderEditingUI,
  renderDisplayUI,
  renderMobileEditingUI,
  onEditStart,
  onEditEnd,
  useExternalEditor = false,
}: EditableTextProps) {
  const isMobile = useIsMobile();
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);
  const [isSaving, setIsSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setEditedValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current && !useExternalEditor) {
      inputRef.current.focus();
      const length = editedValue.length;
      inputRef.current.setSelectionRange(length, length);
    }
  }, [isEditing, editedValue.length, useExternalEditor]);

  const handleStartEdit = useCallback(() => {
    if (!editable) return;
    setIsEditing(true);
    setEditedValue(value);
    onEditStart?.();
  }, [editable, value, onEditStart]);

  const handleSave = useCallback(async () => {
    const trimmedValue = editedValue.trim();

    if (trimmedValue === "") {
      setEditedValue(value);
      setIsEditing(false);
      onEditEnd?.();
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
    onEditEnd?.();
  }, [editedValue, value, onSave, onEditEnd]);

  const handleCancel = useCallback(() => {
    setEditedValue(value);
    setIsEditing(false);
    onEditEnd?.();
  }, [value, onEditEnd]);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.key === "Enter" && !e.shiftKey && variant !== "textarea") {
      e.preventDefault();
      handleSave();
    }
    if (
      e.key === "Enter" &&
      (e.metaKey || e.ctrlKey) &&
      variant === "textarea"
    ) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === "Escape") {
      e.preventDefault();
      handleCancel();
    }
  };

  const handleBlur = () => {
    if (!useExternalEditor) {
      handleSave();
    }
  };

  const isEmpty = !value;
  const displayValue = value || placeholder;

  // Shared state object for render props
  const editableState: EditableTextState = {
    isEditing,
    editedValue,
    isSaving,
    setEditedValue,
    handleSave,
    handleCancel,
    handleStartEdit,
  };

  const displayState = {
    ...editableState,
    displayValue,
    isEmpty,
  };

  // Custom display UI
  if (renderDisplayUI && !isEditing) {
    return <>{renderDisplayUI(displayState)}</>;
  }

  if (renderEditingUI && isEditing) {
    return <>{renderEditingUI(editableState)}</>;
  }
  if (renderMobileEditingUI && isEditing && isMobile) {
    return <>{renderMobileEditingUI(editableState)}</>;
  }
  if (useExternalEditor && isEditing) {
    // External editor mode - only show display, editing handled externally
    // Return display UI but with editing state active
    // The actual editor is rendered externally via onEditStart callback
  }

  if (variant === "title") {
    if (isEditing && !useExternalEditor) {
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
    if (isEditing && !useExternalEditor) {
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

  if (isEditing && !useExternalEditor) {
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

// Export a hook for advanced use cases (custom components that need editing state)
export function useEditableText(
  value: string,
  onSave: (value: string) => void | Promise<void>,
) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setEditedValue(value);
  }, [value]);

  const handleStartEdit = useCallback(() => {
    setIsEditing(true);
    setEditedValue(value);
  }, [value]);

  const handleSave = useCallback(async () => {
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
  }, [editedValue, value, onSave]);

  const handleCancel = useCallback(() => {
    setEditedValue(value);
    setIsEditing(false);
  }, [value]);

  return {
    isEditing,
    editedValue,
    isSaving,
    setEditedValue,
    handleStartEdit,
    handleSave,
    handleCancel,
  };
}
