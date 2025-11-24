import { cn } from "@/lib/utils";
import { Code, Eye, PenLine } from "lucide-react";

export type EditorMode = "visual" | "markdown" | "preview";

interface ModeSwitchProps {
  /** Current active mode */
  mode: string;
  /** Callback when mode changes */
  onChange: (mode: EditorMode) => void;
  /** Additional CSS classes */
  className?: string;
  /** Disable mode switching */
  disabled?: boolean;
}

interface ModeOption {
  value: EditorMode;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const MODE_OPTIONS: ModeOption[] = [
  {
    value: "visual",
    label: "Visual",
    icon: PenLine,
    description: "Rich text editor",
  },
  {
    value: "markdown",
    label: "Markdown",
    icon: Code,
    description: "Raw markdown",
  },
  {
    value: "preview",
    label: "Preview",
    icon: Eye,
    description: "Rendered output",
  },
];

/**
 * A segmented control for switching between editor modes.
 *
 * @example
 * ```tsx
 * <ModeSwitch mode={mode} onChange={setMode} />
 * ```
 */
export function ModeSwitch({
  mode,
  onChange,
  className,
  disabled = false,
}: ModeSwitchProps) {
  return (
    <div
      role="tablist"
      aria-label="Editor mode"
      className={cn(
        "bg-muted/50 inline-flex items-center gap-1 rounded-lg p-1",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
    >
      {MODE_OPTIONS.map((option) => {
        const isActive = mode === option.value;
        const Icon = option.icon;

        return (
          <button
            key={option.value}
            role="tab"
            aria-selected={isActive}
            aria-controls={`${option.value}-panel`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(option.value)}
            disabled={disabled}
            title={option.description}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5",
              "text-sm font-medium transition-all duration-200",
              "focus-visible:ring-primary/50 focus-visible:ring-2 focus-visible:outline-none",
              isActive
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:bg-background/50 hover:text-foreground",
            )}
          >
            <Icon className="size-4" />
            <span className="hidden sm:inline">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}

interface CompactModeSwitchProps extends Omit<ModeSwitchProps, "onChange"> {
  onChange: (mode: EditorMode) => void;
}

/**
 * Compact version showing only icons with tooltips.
 * Useful for space-constrained layouts.
 */
export function CompactModeSwitch({
  mode,
  onChange,
  className,
  disabled = false,
}: CompactModeSwitchProps) {
  return (
    <div
      role="tablist"
      aria-label="Editor mode"
      className={cn(
        "bg-muted/50 inline-flex items-center gap-0.5 rounded-lg p-1",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
    >
      {MODE_OPTIONS.map((option) => {
        const isActive = mode === option.value;
        const Icon = option.icon;

        return (
          <button
            key={option.value}
            role="tab"
            aria-selected={isActive}
            aria-label={`${option.label}: ${option.description}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(option.value)}
            disabled={disabled}
            title={`${option.label} - ${option.description}`}
            className={cn(
              "inline-flex items-center justify-center rounded-md p-2",
              "transition-all duration-200",
              "focus-visible:ring-primary/50 focus-visible:ring-2 focus-visible:outline-none",
              isActive
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:bg-background/50 hover:text-foreground",
            )}
          >
            <Icon className="size-4" />
          </button>
        );
      })}
    </div>
  );
}
