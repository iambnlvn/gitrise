/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from "react";
import { toast } from "sonner";

/**
 * Generic hook for managing settings state.
 *
 * @template TState - The type of the settings state
 * @param {TState} defaultState - Initial state
 * @param {Object} options - Hook options
 *
 * @example
 * ```tsx
 * const {
 *   settings,
 *   hasChanges,
 *   updateSetting,
 *   handleSave,
 *   handleReset
 * } = useSettings(DEFAULT_APPEARANCE_STATE, {
 *   onSave: async (settings) => {
 *     await saveToAPI(settings);
 *   },
 *   successMessage: "Settings saved!"
 * });
 * ```
 */
export function useSettings<TState extends Record<string, any>>(
  defaultState: TState,
  options?: {
    onSave?: (settings: TState) => Promise<void> | void;
    onReset?: () => void;
    successMessage?: string;
    resetMessage?: string;
  },
) {
  const [settings, setSettings] = useState<TState>(defaultState);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  /**
   * Updates a single setting value.
   */
  const updateSetting = useCallback(
    <K extends keyof TState>(key: K, value: TState[K]) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
      setHasChanges(true);
    },
    [],
  );

  /**
   * Updates multiple settings at once.
   */
  const updateSettings = useCallback((updates: Partial<TState>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
    setHasChanges(true);
  }, []);

  /**
   * Saves current settings.
   */
  const handleSave = useCallback(async () => {
    setIsSaving(true);
    try {
      if (options?.onSave) {
        await options.onSave(settings);
      }
      toast.success(options?.successMessage || "Settings saved successfully");
      setHasChanges(false);
    } catch (error) {
      toast.error("Failed to save settings");
      console.error("Settings save error:", error);
    } finally {
      setIsSaving(false);
    }
  }, [settings, options]);

  /**
   * Resets settings to default.
   */
  const handleReset = useCallback(() => {
    setSettings(defaultState);
    setHasChanges(false);
    if (options?.onReset) {
      options.onReset();
    }
    toast.info(options?.resetMessage || "Settings reset to default");
  }, [defaultState, options]);

  return {
    settings,
    hasChanges,
    isSaving,
    updateSetting,
    updateSettings,
    handleSave,
    handleReset,
  };
}
