/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Settings System Type Definitions
 *
 * This module provides comprehensive type safety for the entire settings system.
 *
 * @module Settings/Types
 */

/**
 * Base interface for all setting configurations.
 * Serves as the foundation for discriminated unions.
 */
export interface BaseSettingConfig {
  type: string;
  key: PropertyKey;
}

/**
 * Generic option configuration used across settings.
 *
 * @template T - Type of the option value (defaults to string)
 *
 * @example
 * ```tsx
 * const options: OptionConfig<"light" | "dark">[] = [
 *   { value: "light", label: "Light", icon: Sun },
 *   { value: "dark", label: "Dark", icon: Moon }
 * ];
 * ```
 */
export interface OptionConfig<T = string> {
  /** The actual value stored when this option is selected */
  value: T;
  /** Human-readable text displayed to the user */
  label: string;
  /** Optional detailed description or help text */
  description?: string;
  /** Optional icon component to display with the option */
  icon?: React.ComponentType<{ className?: string }>;
}

/**
 * Configuration for a logical group of related settings.
 *
 * @template TState - Type of the settings state object
 *
 * @example
 * ```tsx
 * const layoutGroup: SettingGroupConfig<AppearanceState> = {
 *   id: "layout",
 *   title: "Layout & Spacing",
 *   description: "Customize how content is displayed",
 *   tooltip: "These settings affect the overall layout",
 *   icon: Layout,
 *   settings: [...]
 * };
 * ```
 */
export interface SettingGroupConfig<TState = any> {
  /** Unique identifier for the group (used as React key) */
  id: string;
  /** Display title shown at the top of the group card */
  title: string;
  /** Optional subtitle text shown below the title */
  description?: string;
  /** Detailed help text shown when hovering the help icon */
  tooltip: string;
  /** Icon component displayed next to the title */
  icon: React.ComponentType<{ className?: string }>;
  /** Array of individual settings in this group */
  settings: SettingConfig<TState>[];
}

/**
 * Configuration for dropdown select settings.
 *
 * Select settings render as a labeled dropdown menu with predefined options.
 *
 * @template TState - Type of the settings state object
 */
export interface SelectSettingConfig<TState = any> extends BaseSettingConfig {
  type: "select";
  key: keyof TState;
  label: string;
  description?: string;
  options: OptionConfig[];
  onChange?: (value: string) => void;
}

/**
 * Configuration for toggle/switch settings.
 *
 * @template TState - Type of the settings state object
 */
export interface ToggleSettingConfig<TState = any> extends BaseSettingConfig {
  type: "toggle";
  key: keyof TState;
  label: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
}

/**
 * Configuration for table view settings.
 */
export interface TableViewSettingConfig<TState = any>
  extends BaseSettingConfig {
  type: "table-view";
  key: keyof TState;
  label: string;
  description?: string;
  options: OptionConfig[];
}

/**
 * Configuration for theme picker settings.
 */
export interface ThemePickerConfig<TState = any> extends BaseSettingConfig {
  type: "theme";
  key: keyof TState;
  label: string;
  description?: string;
  options: OptionConfig[];
}

/**
 * Configuration for custom setting components.
 *
 * Custom settings allow specialized UI components that don't fit standard patterns.
 *
 * @template TState - Type of the settings state object
 */
export interface CustomSettingConfig<TState = any> extends BaseSettingConfig {
  type: "custom";
  key: keyof TState;
  component: React.ComponentType<{
    value: TState[keyof TState];
    onChange: (value: TState[keyof TState]) => void;
    [key: string]: any;
  }>;
}

/**
 * Union type of all possible setting configurations.
 * Enables type-safe discriminated unions for all setting types.
 *
 * @template TState - Type of the settings state object
 */
export type SettingConfig<TState = any> =
  | SelectSettingConfig<TState>
  | ToggleSettingConfig<TState>
  | TableViewSettingConfig<TState>
  | ThemePickerConfig<TState>
  | CustomSettingConfig<TState>;

/**
 * Props interface for setting renderer components.
 *
 * @template TState - Type of the settings state object
 */
export interface SettingRendererProps<TState = any> {
  /** Complete setting configuration */
  config: SettingConfig<TState>;
  /** Current value from application state */
  value: TState[keyof TState];
  /** Callback to update the setting value */
  onChange: (key: keyof TState, value: TState[keyof TState]) => void;
}

/**
 * Return type for the useSettings hook.
 * Provides complete state management for settings.
 *
 * @template TState - Type of the settings state object
 */
export interface UseSettingsReturn<TState> {
  /** Current settings state */
  settings: TState;
  /** True when local state differs from saved state */
  hasChanges: boolean;
  /** True while save operation is in progress */
  isSaving: boolean;
  /** Updates a single setting by key */
  updateSetting: <K extends keyof TState>(key: K, value: TState[K]) => void;
  /** Updates multiple settings at once */
  updateSettings: (updates: Partial<TState>) => void;
  /** Persists current settings and clears change flag */
  handleSave: () => Promise<void>;
  /** Reverts settings to default values */
  handleReset: () => void;
}

/**
 * Options for configuring the useSettings hook.
 *
 * @template TState - Type of the settings state object
 */
export interface UseSettingsOptions<TState> {
  /** Async callback executed when saving settings */
  onSave?: (settings: TState) => Promise<void> | void;
  /** Callback executed when resetting to defaults */
  onReset?: () => void;
  /** Validation function run before saving */
  validate?: (settings: TState) => boolean | string;
  /** Custom toast message on successful save */
  successMessage?: string;
  /** Custom toast message when resetting */
  resetMessage?: string;
  /** Whether to persist to localStorage */
  persistLocally?: boolean;
  /** Key for localStorage (required if persistLocally is true) */
  storageKey?: string;
}

/**
 * Settings card component props.
 * Used to wrap groups of related settings with consistent styling.
 */
export interface SettingCardProps {
  /** Card title */
  title: string;
  /** Optional description below title */
  description?: string;
  /** Help text shown in tooltip */
  tooltip: string;
  /** Card content */
  children: React.ReactNode;
  /** Optional icon displayed with title */
  icon?: React.ReactNode;
}

/**
 * Settings header component props.
 * Used at the top of each settings page.
 */
export interface SettingHeaderProps {
  /** Page title */
  title: string;
  /** Optional page description */
  description?: string;
  /** Optional badge text */
  badge?: string;
}

/**
 * Settings page metadata.
 * Used for page titles and descriptions across all settings.
 */
export interface SettingsPageMetadata {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

/**
 * Settings navigation configuration.
 *
 * Defines all available settings sections with their routes, labels, and icons.
 * Each section maps to a separate URL under /settings.
 *
 **/
export interface SettingsSection {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
}
