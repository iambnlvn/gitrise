import { Button } from "@/components/ui/button";
import React from "react";

/**
 * @interface SettingActionsProps
 * @property {boolean} hasChanges - Whether there are unsaved changes
 * @property {function} onSave - Callback when save is clicked
 * @property {function} onReset - Callback when reset is clicked
 * @property {string} [accentColor] - Optional accent color (defaults to purple-500)
 * @property {string} [saveText] - Optional save button text (defaults to "Save changes")
 * @property {string} [resetText] - Optional reset button text (defaults to "Reset to default")
 */
interface SettingActionsProps {
  hasChanges: boolean;
  onSave: () => void;
  onReset: () => void;
  saveText?: string;
  resetText?: string;
}

/**
 * Reusable action buttons for settings pages.
 * Displays save and reset buttons with consistent styling.
 */
export function SettingActions({
  hasChanges,
  onSave,
  onReset,
  saveText = "Save changes",
  resetText = "Reset to default",
}: SettingActionsProps) {
  return (
    <div className="border-border flex items-center justify-end gap-3 border-t pt-4">
      <Button
        className="transition-all duration-200 hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-500/30"
        disabled={!hasChanges}
        onClick={onSave}
      >
        {saveText}
      </Button>
      <Button
        variant="outline"
        disabled={!hasChanges}
        onClick={onReset}
        className="bg-transparent transition-all duration-200"
      >
        {resetText}
      </Button>
    </div>
  );
}
