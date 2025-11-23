"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

// ============================================================================
// Types & Interfaces
// ============================================================================

/**
 * Represents the current state of an editable text field.
 * Exposed to custom render functions for full control over the UI.
 */
export interface EditableTextState {
  /** Whether the field is currently in edit mode */
  isEditing: boolean;
  /** The current value being edited (may differ from saved value) */
  editedValue: string;
  /** Whether a save operation is in progress */
  isSaving: boolean;
  /** Update the edited value */
  setEditedValue: (value: string) => void;
  /** Save the current edited value */
  handleSave: () => Promise<void>;
  /** Cancel editing and revert to original value */
  handleCancel: () => void;
  /** Enter edit mode */
  handleStartEdit: () => void;
}

/**
 * Extended state including display-specific properties.
 * Used by `renderDisplayUI` for rendering non-editing state.
 */
export interface EditableTextDisplayState extends EditableTextState {
  /** The value to display (falls back to placeholder if empty) */
  displayValue: string;
  /** Whether the current value is empty */
  isEmpty: boolean;
}

/** Visual variant of the editable text component */
export type EditableTextVariant = "title" | "text" | "textarea";

/**
 * Props for the EditableText component.
 *
 * @example Basic usage
 * ```tsx
 * <EditableText
 *   value={title}
 *   onSave={handleTitleUpdate}
 *   variant="title"
 * />
 * ```
 *
 * @example With custom editing UI
 * ```tsx
 * <EditableText
 *   value={description}
 *   onSave={handleSave}
 *   renderEditingUI={({ editedValue, setEditedValue, handleSave }) => (
 *     <CustomEditor value={editedValue} onChange={setEditedValue} onSubmit={handleSave} />
 *   )}
 * />
 * ```
 *
 * @example With external editor (mobile sheet)
 * ```tsx
 * <EditableText
 *   value={content}
 *   onSave={handleSave}
 *   useExternalEditor
 *   onEditStart={() => setSheetOpen(true)}
 *   onEditEnd={() => setSheetOpen(false)}
 * />
 * ```
 */
export interface EditableTextProps {
  /** Current value of the text field */
  value: string;
  /** Callback fired when value is saved. Can be async. */
  onSave: (value: string) => void | Promise<void>;
  /** Whether the field can be edited. @default true */
  editable?: boolean;
  /**
   * Visual variant of the component.
   * - `title`: Large, bold text suitable for headings
   * - `text`: Inline text for single-line content
   * - `textarea`: Multi-line text with auto-expanding height
   * @default "text"
   */
  variant?: EditableTextVariant;
  /** Placeholder shown when value is empty.
   * @default "Click to edit..."
   */
  placeholder?: string;
  /** Additional CSS classes */
  className?: string;
  /**
   * Custom render function for mobile editing UI.
   * Takes precedence over `renderEditingUI` on mobile devices.
   * @see renderEditingUI for desktop customization
   */
  renderMobileEditingUI?: (state: EditableTextState) => ReactNode;
  /**
   * Custom render function for desktop editing UI.
   * @see renderMobileEditingUI for mobile customization
   */
  renderEditingUI?: (state: EditableTextState) => ReactNode;
  /**
   * Custom render function for display (non-editing) UI.
   * Receives extended state including display helpers.
   */
  renderDisplayUI?: (state: EditableTextDisplayState) => ReactNode;
  /**
   * Callback fired when entering edit mode.
   * Useful for opening external editors like mobile sheets.
   */
  onEditStart?: () => void;
  /**
   * Callback fired when exiting edit mode (save or cancel).
   */
  onEditEnd?: () => void;
  /**
   * When true, the component only manages state without rendering an inline editor.
   * Use with `onEditStart` to control an external editing interface.
   * @default false
   */
  useExternalEditor?: boolean;
  /**
   * Accessible label for the input element.
   * Falls back to placeholder if not provided.
   */
  ariaLabel?: string;
  /**
   * Test ID for automated testing.
   */
  testId?: string;
}

const EditableTextContext = createContext<EditableTextState | null>(null);

/**
 * Hook to access EditableText state from nested components.
 * Must be used within an EditableText component tree.
 *
 * @example
 * ```tsx
 * function SaveButton() {
 *   const { handleSave, isSaving } = useEditableTextContext();
 *   return <button onClick={handleSave} disabled={isSaving}>Save</button>;
 * }
 * ```
 */
export function useEditableTextContext(): EditableTextState {
  const context = useContext(EditableTextContext);
  if (!context) {
    throw new Error(
      "useEditableTextContext must be used within an EditableText component",
    );
  }
  return context;
}

interface InputProps {
  className?: string;
  placeholder?: string;
  ariaLabel?: string;
}

/**
 * Default input component for single-line editing.
 * Can be used standalone with useEditableTextContext.
 */
function EditableTextInput({ className, placeholder, ariaLabel }: InputProps) {
  const { editedValue, setEditedValue, handleSave, handleCancel, isSaving } =
    useEditableTextContext();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(
        editedValue.length,
        editedValue.length,
      );
    }
  }, [editedValue.length]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") {
      e.preventDefault();
      handleCancel();
    }
  };

  return (
    <input
      ref={inputRef}
      type="text"
      value={editedValue}
      onChange={(e) => setEditedValue(e.target.value)}
      onKeyDown={handleKeyDown}
      onBlur={handleSave}
      disabled={isSaving}
      placeholder={placeholder}
      aria-label={ariaLabel ?? placeholder}
      className={cn(
        "w-full bg-transparent",
        "border-none ring-0 outline-none focus:ring-0 focus:outline-none",
        "placeholder:text-muted-foreground/50",
        "caret-primary",
        isSaving && "cursor-wait opacity-50",
        className,
      )}
    />
  );
}

interface TextareaProps {
  className?: string;
  placeholder?: string;
  ariaLabel?: string;
  minRows?: number;
}

/**
 * Default textarea component for multi-line editing.
 * Can be used standalone with useEditableTextContext.
 */
function EditableTextTextarea({
  className,
  placeholder,
  ariaLabel,
  minRows = 3,
}: TextareaProps) {
  const { editedValue, setEditedValue, handleSave, handleCancel, isSaving } =
    useEditableTextContext();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(
        editedValue.length,
        editedValue.length,
      );
    }
  }, [editedValue.length]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") {
      e.preventDefault();
      handleCancel();
    }
  };

  const rowCount = Math.max(minRows, editedValue.split("\n").length + 1);

  return (
    <textarea
      ref={textareaRef}
      value={editedValue}
      onChange={(e) => setEditedValue(e.target.value)}
      onKeyDown={handleKeyDown}
      onBlur={handleSave}
      disabled={isSaving}
      placeholder={placeholder}
      aria-label={ariaLabel ?? placeholder}
      rows={rowCount}
      className={cn(
        "w-full resize-none bg-transparent",
        "border-none ring-0 outline-none focus:ring-0 focus:outline-none",
        "text-sm leading-relaxed",
        "placeholder:text-muted-foreground/50",
        "caret-primary",
        isSaving && "cursor-wait opacity-50",
        className,
      )}
    />
  );
}

/**
 * Keyboard shortcuts hint for textarea editing.
 */
function KeyboardHint() {
  return (
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
  );
}

// ============================================================================
// Main Component
// ============================================================================

/**
 * A flexible inline-editable text component with multiple variants and
 * extensive customization options.
 *
 * ## Features
 * - Three variants: title, text, textarea
 * - Mobile-responsive with custom mobile UI support
 * - External editor support for modal/sheet patterns
 * - Full render props API for custom UIs
 * - Accessible with proper ARIA attributes
 * - Optimized for React 19+ compiler
 *
 * ## Keyboard Shortcuts
 * - `Enter` - Save (single-line variants)
 * - `Cmd/Ctrl + Enter` - Save (textarea)
 * - `Escape` - Cancel editing
 *
 * @example
 * ```tsx
 * // Simple title editing
 * <EditableText value={title} onSave={updateTitle} variant="title" />
 *
 * // Multi-line with external mobile editor
 * <EditableText
 *   value={description}
 *   onSave={updateDescription}
 *   variant="textarea"
 *   renderMobileEditingUI={({ editedValue, setEditedValue, handleSave }) => (
 *     <MobileSheet>
 *       <textarea value={editedValue} onChange={e => setEditedValue(e.target.value)} />
 *       <button onClick={handleSave}>Save</button>
 *     </MobileSheet>
 *   )}
 * />
 * ```
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
  ariaLabel,
  testId,
}: EditableTextProps) {
  const isMobile = useIsMobile();

  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isEditing) {
      setEditedValue(value);
    }
  }, [value, isEditing]);

  const handleStartEdit = useCallback(() => {
    if (!editable) return;
    setIsEditing(true);
    setEditedValue(value);
    onEditStart?.();
  }, [editable, value, onEditStart]);

  const handleSave = useCallback(async () => {
    const trimmedValue = editedValue.trim();

    // Revert to original if empty
    if (trimmedValue === "") {
      setEditedValue(value);
      setIsEditing(false);
      onEditEnd?.();
      return;
    }

    // Only save if value changed
    if (trimmedValue !== value) {
      setIsSaving(true);
      try {
        await onSave(trimmedValue);
      } catch (error) {
        // Revert on error
        setEditedValue(value);
        throw error;
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

  const isEmpty = !value;
  const displayValue = value || placeholder;

  const editableState: EditableTextState = {
    isEditing,
    editedValue,
    isSaving,
    setEditedValue,
    handleSave,
    handleCancel,
    handleStartEdit,
  };

  const displayState: EditableTextDisplayState = {
    ...editableState,
    displayValue,
    isEmpty,
  };

  // Custom display UI (non-editing)
  if (renderDisplayUI && !isEditing) {
    return (
      <EditableTextContext.Provider value={editableState}>
        {renderDisplayUI(displayState)}
      </EditableTextContext.Provider>
    );
  }

  if (renderMobileEditingUI && isEditing && isMobile) {
    return (
      <EditableTextContext.Provider value={editableState}>
        {renderMobileEditingUI(editableState)}
      </EditableTextContext.Provider>
    );
  }

  if (renderEditingUI && isEditing && !isMobile) {
    return (
      <EditableTextContext.Provider value={editableState}>
        {renderEditingUI(editableState)}
      </EditableTextContext.Provider>
    );
  }

  // External editor mode - render display but editing is handled externally
  if (useExternalEditor && isEditing) {
    return (
      <EditableTextContext.Provider value={editableState}>
        {renderVariantDisplay(
          variant,
          displayValue,
          isEmpty,
          className,
          testId,
        )}
      </EditableTextContext.Provider>
    );
  }

  return (
    <EditableTextContext.Provider value={editableState}>
      {variant === "title" && (
        <TitleVariant
          isEditing={isEditing && !useExternalEditor}
          displayValue={displayValue}
          isEmpty={isEmpty}
          editable={editable}
          placeholder={placeholder}
          className={className}
          ariaLabel={ariaLabel}
          testId={testId}
          onStartEdit={handleStartEdit}
        />
      )}
      {variant === "textarea" && (
        <TextareaVariant
          isEditing={isEditing && !useExternalEditor}
          displayValue={displayValue}
          isEmpty={isEmpty}
          editable={editable}
          placeholder={placeholder}
          className={className}
          ariaLabel={ariaLabel}
          testId={testId}
          onStartEdit={handleStartEdit}
        />
      )}
      {variant === "text" && (
        <TextVariant
          isEditing={isEditing && !useExternalEditor}
          displayValue={displayValue}
          isEmpty={isEmpty}
          editable={editable}
          placeholder={placeholder}
          className={className}
          ariaLabel={ariaLabel}
          testId={testId}
          onStartEdit={handleStartEdit}
        />
      )}
    </EditableTextContext.Provider>
  );
}

interface VariantProps {
  isEditing: boolean;
  displayValue: string;
  isEmpty: boolean;
  editable: boolean;
  placeholder: string;
  className?: string;
  ariaLabel?: string;
  testId?: string;
  onStartEdit: () => void;
}

function TitleVariant({
  isEditing,
  displayValue,
  isEmpty,
  editable,
  placeholder,
  className,
  ariaLabel,
  testId,
  onStartEdit,
}: VariantProps) {
  if (isEditing) {
    return (
      <div className={cn("relative", className)} data-testid={testId}>
        <EditableTextInput
          placeholder={placeholder}
          ariaLabel={ariaLabel}
          className="text-2xl font-bold"
        />
        <div className="bg-primary/30 absolute right-0 -bottom-0.5 left-0 h-0.5 rounded-full" />
      </div>
    );
  }

  return (
    <h1
      onClick={onStartEdit}
      onKeyDown={(e) => e.key === "Enter" && onStartEdit()}
      role={editable ? "button" : undefined}
      tabIndex={editable ? 0 : undefined}
      aria-label={ariaLabel ?? (editable ? `Edit: ${displayValue}` : undefined)}
      data-testid={testId}
      className={cn(
        "text-2xl font-bold",
        editable &&
          "hover:bg-muted/30 focus-visible:bg-muted/30 focus-visible:ring-primary/50 -mx-1 cursor-text rounded-sm px-1 transition-colors focus-visible:ring-2 focus-visible:outline-none",
        isEmpty && "text-muted-foreground/50 italic",
        className,
      )}
    >
      {displayValue}
    </h1>
  );
}

function TextareaVariant({
  isEditing,
  displayValue,
  isEmpty,
  editable,
  placeholder,
  className,
  ariaLabel,
  testId,
  onStartEdit,
}: VariantProps) {
  if (isEditing) {
    return (
      <div className={cn("relative", className)} data-testid={testId}>
        <EditableTextTextarea placeholder={placeholder} ariaLabel={ariaLabel} />
        <KeyboardHint />
      </div>
    );
  }

  return (
    <div
      onClick={onStartEdit}
      onKeyDown={(e) => e.key === "Enter" && onStartEdit()}
      role={editable ? "button" : undefined}
      tabIndex={editable ? 0 : undefined}
      aria-label={ariaLabel ?? (editable ? "Click to edit" : undefined)}
      data-testid={testId}
      className={cn(
        "text-sm leading-relaxed whitespace-pre-wrap",
        editable &&
          "hover:bg-muted/30 focus-visible:bg-muted/30 focus-visible:ring-primary/50 -mx-1 cursor-text rounded-sm px-1 py-1 transition-colors focus-visible:ring-2 focus-visible:outline-none",
        isEmpty && "text-muted-foreground/50 italic",
        className,
      )}
    >
      {displayValue}
    </div>
  );
}

function TextVariant({
  isEditing,
  displayValue,
  isEmpty,
  editable,
  placeholder,
  className,
  ariaLabel,
  testId,
  onStartEdit,
}: VariantProps) {
  if (isEditing) {
    return (
      <span
        className={cn("relative inline-block", className)}
        data-testid={testId}
      >
        <EditableTextInput
          placeholder={placeholder}
          ariaLabel={ariaLabel}
          className="min-w-[100px] text-sm"
        />
        <div className="bg-primary/30 absolute right-0 -bottom-0.5 left-0 h-px rounded-full" />
      </span>
    );
  }

  return (
    <span
      onClick={onStartEdit}
      onKeyDown={(e) => e.key === "Enter" && onStartEdit()}
      role={editable ? "button" : undefined}
      tabIndex={editable ? 0 : undefined}
      aria-label={ariaLabel ?? (editable ? `Edit: ${displayValue}` : undefined)}
      data-testid={testId}
      className={cn(
        "text-sm",
        editable &&
          "hover:bg-muted/30 focus-visible:bg-muted/30 focus-visible:ring-primary/50 -mx-0.5 cursor-text rounded-sm px-0.5 transition-colors focus-visible:ring-2 focus-visible:outline-none",
        isEmpty && "text-muted-foreground/50 italic",
        className,
      )}
    >
      {displayValue}
    </span>
  );
}

/**
 * Helper to render display-only variant (used in external editor mode)
 */
function renderVariantDisplay(
  variant: EditableTextVariant,
  displayValue: string,
  isEmpty: boolean,
  className?: string,
  testId?: string,
): ReactNode {
  const baseStyles = isEmpty ? "text-muted-foreground/50 italic" : "";

  switch (variant) {
    case "title":
      return (
        <h1
          data-testid={testId}
          className={cn("text-2xl font-bold", baseStyles, className)}
        >
          {displayValue}
        </h1>
      );
    case "textarea":
      return (
        <div
          data-testid={testId}
          className={cn(
            "text-sm leading-relaxed whitespace-pre-wrap",
            baseStyles,
            className,
          )}
        >
          {displayValue}
        </div>
      );
    default:
      return (
        <span
          data-testid={testId}
          className={cn("text-sm", baseStyles, className)}
        >
          {displayValue}
        </span>
      );
  }
}

/**
 * Standalone hook for managing editable text state.
 * Use this when you need full control over the UI while leveraging
 * the editing state management.
 *
 * @param value - Current value
 * @param onSave - Save callback
 * @returns Editable state and handlers
 *
 * @example
 * ```tsx
 * function CustomEditor({ value, onSave }) {
 *   const {
 *     isEditing,
 *     editedValue,
 *     setEditedValue,
 *     handleSave,
 *     handleCancel,
 *     handleStartEdit,
 *   } = useEditableText(value, onSave);
 *
 *   if (!isEditing) {
 *     return <div onClick={handleStartEdit}>{value}</div>;
 *   }
 *
 *   return (
 *     <input
 *       value={editedValue}
 *       onChange={e => setEditedValue(e.target.value)}
 *       onBlur={handleSave}
 *     />
 *   );
 * }
 * ```
 */
export function useEditableText(
  value: string,
  onSave: (value: string) => void | Promise<void>,
): EditableTextState {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);
  const [isSaving, setIsSaving] = useState(false);

  // Sync with external value changes when not editing
  useEffect(() => {
    if (!isEditing) {
      setEditedValue(value);
    }
  }, [value, isEditing]);

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
      } catch (error) {
        setEditedValue(value);
        throw error;
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
    handleSave,
    handleCancel,
    handleStartEdit,
  };
}

EditableText.Input = EditableTextInput;
EditableText.Textarea = EditableTextTextarea;
EditableText.KeyboardHint = KeyboardHint;
