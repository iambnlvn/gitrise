import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

/**
 * Action buttons for settings pages.
 *
 * Displays a save button with loading state and disabled state
 * when there are no unsaved changes. Uses violet bloom color theme.
 *
 * @interface SettingActionsProps
 * @property {boolean} hasChanges - Whether there are unsaved changes
 * @property {() => void} onSave - Callback when save is clicked
 * @property {string} [saveText] - Optional save button text
 * @property {boolean} [isLoading] - Optional loading state
 */
interface SettingActionsProps {
  hasChanges: boolean;
  onSave: () => void;
  saveText?: string;
  isLoading?: boolean;
}

/**
 * @component
 * @example
 * ```tsx
 * <SettingActions
 *   hasChanges={settings.isDirty}
 *   onSave={handleSave}
 *   saveText="Save Changes"
 *   isLoading={isSaving}
 * />
 * ```
 */
export function SettingActions({
  hasChanges,
  onSave,
  saveText = "Save changes",
  isLoading,
}: SettingActionsProps) {
  return (
    <div className="border-border flex items-center gap-3 border-t pt-6">
      <Button
        onClick={onSave}
        disabled={!hasChanges || isLoading}
        className="bg-primary hover:bg-primary/90 text-primary-foreground hover:shadow-primary/30 transition-all duration-300 hover:shadow-lg"
      >
        {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
        {isLoading ? "Saving..." : saveText}
      </Button>
    </div>
  );
}
