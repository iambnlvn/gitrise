/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Base interface for all setting configurations.
 *
 * This serves as the foundation for all setting types and ensures
 * that every setting has a type discriminator and a state key.
 *
 * @interface BaseSettingConfig
 * @property {string} type - Discriminator used to determine which setting component to render
 * @property {PropertyKey} key - The property name in the state object that this setting controls
 *
 * @internal This interface should not be used directly. Use specific setting types instead.
 */
export interface BaseSettingConfig {
  type: string;
  key: PropertyKey;
}

/**
 * Generic option configuration used across settings.
 *
 * Options are used in select dropdowns, radio groups, and other
 * multi-choice settings. Each option represents a selectable value.
 *
 * @template T - Type of the option value (defaults to string)
 * @property {T} value - The actual value stored when this option is selected
 * @property {string} label - Human-readable text displayed to the user
 * @property {string} [description] - Optional detailed description or help text
 * @property {React.ComponentType} [icon] - Optional icon component to display with the option
 *
 * @example
 * ```tsx
 * // Simple string options
 * const sizeOptions: OptionConfig[] = [
 *   { value: "small", label: "Small" },
 *   { value: "medium", label: "Medium" },
 *   { value: "large", label: "Large" }
 * ];
 *
 * // Options with icons and descriptions
 * const themeOptions: OptionConfig<Theme>[] = [
 *   {
 *     value: "light",
 *     label: "Light",
 *     description: "Bright color scheme for daytime use",
 *     icon: Sun
 *   },
 *   {
 *     value: "dark",
 *     label: "Dark",
 *     description: "Dark color scheme for low-light environments",
 *     icon: Moon
 *   }
 * ];
 * ```
 */
export interface OptionConfig<T = string> {
  value: T;
  label: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

/**
 * Configuration for a logical group of related settings.
 *
 * Setting groups organize multiple related settings into a single card
 * in the UI. This provides visual hierarchy and helps users understand
 * which settings are related.
 *
 * @template TState - Type of the settings state object this group belongs to
 * @property {string} id - Unique identifier for the group (used as React key)
 * @property {string} title - Display title shown at the top of the group card
 * @property {string} [description] - Optional subtitle text shown below the title
 * @property {string} tooltip - Detailed help text shown when hovering the help icon
 * @property {React.ComponentType} icon - Icon component displayed next to the title
 * @property {SettingConfig<TState>[]} settings - Array of individual settings in this group
 *
 * @example
 * ```tsx
 * const layoutGroup: SettingGroupConfig<AppearanceState> = {
 *   id: "layout",
 *   title: "Layout & Spacing",
 *   description: "Customize how content is displayed",
 *   tooltip: "These settings affect the overall layout and density of the interface",
 *   icon: Layout,
 *   settings: [
 *     {
 *       type: "select",
 *       key: "density",
 *       label: "Interface Density",
 *       options: densityOptions
 *     },
 *     {
 *       type: "toggle",
 *       key: "compactMode",
 *       label: "Compact Mode",
 *       description: "Use tighter spacing throughout"
 *     }
 *   ]
 * };
 * ```
 */
export interface SettingGroupConfig<TState = any> {
  id: string;
  title: string;
  description?: string;
  tooltip: string;
  icon: React.ComponentType<{ className?: string }>;
  settings: SettingConfig<TState>[];
}

/**
 * Union type of all possible setting configurations.
 *
 * This discriminated union allows TypeScript to provide proper type
 * narrowing based on the 'type' property. Each setting type has its
 * own specific configuration interface.
 *
 * @template TState - Type of the settings state object
 *
 * @see {@link SelectSettingConfig} for dropdown/select settings
 * @see {@link ToggleSettingConfig} for boolean toggle settings
 * @see {@link CustomSettingConfig} for custom component settings
 *
 * @example
 * ```tsx
 * function renderSetting(config: SettingConfig<MyState>) {
 *   // TypeScript narrows the type based on config.type
 *   switch (config.type) {
 *     case "select":
 *       // config is SelectSettingConfig here
 *       return <SelectSetting {...config} />;
 *     case "toggle":
 *       // config is ToggleSettingConfig here
 *       return <ToggleSetting {...config} />;
 *     case "custom":
 *       // config is CustomSettingConfig here
 *       return <config.component />;
 *   }
 * }
 * ```
 */
export type SettingConfig<TState = any> =
  | SelectSettingConfig<TState>
  | ToggleSettingConfig<TState>
  | TableViewSettingConfig<TState>
  | ThemePickerConfig<TState>
  | CustomSettingConfig<TState>;

/**
 * Configuration for dropdown select settings.
 *
 * Select settings render as a labeled dropdown menu with predefined options.
 * They're ideal for settings with 3-10 distinct values. For 2 values, consider
 * using a toggle instead. For many values, consider a searchable select.
 *
 * @template TState - Type of the settings state object
 * @property {"select"} type - Fixed type discriminator for type narrowing
 * @property {keyof TState} key - The state property this setting controls
 * @property {string} label - Label text displayed above or beside the select
 * @property {string} [description] - Optional help text explaining the setting
 * @property {OptionConfig[]} options - Array of selectable options
 * @property {function} [onChange] - Optional callback for side effects (e.g., apply theme immediately)
 *
 * @example
 * ```tsx
 * // Simple select with no side effects
 * const languageSetting: SelectSettingConfig<ProfileState> = {
 *   type: "select",
 *   key: "language",
 *   label: "Display Language",
 *   description: "Choose your preferred language",
 *   options: [
 *     { value: "en", label: "English" },
 *     { value: "es", label: "Spanish" },
 *     { value: "fr", label: "French" }
 *   ]
 * };
 *
 * // Select with onChange callback
 * const themeSetting: SelectSettingConfig<AppearanceState> = {
 *   type: "select",
 *   key: "theme",
 *   label: "Color Theme",
 *   options: themeOptions,
 *   onChange: (value) => {
 *     // Apply theme immediately without waiting for save
 *     document.documentElement.setAttribute("data-theme", value);
 *   }
 * };
 * ```
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
 * Toggle settings render as a labeled switch component for boolean values.
 * They're the preferred choice for binary on/off settings. The switch
 * provides clear visual feedback of the current state.
 *
 * @template TState - Type of the settings state object
 * @property {"toggle"} type - Fixed type discriminator for type narrowing
 * @property {keyof TState} key - The state property this setting controls (should be boolean)
 * @property {string} label - Primary label text for the setting
 * @property {string} description - Explanatory text shown below the label
 * @property {React.ComponentType} [icon] - Optional icon displayed before the label
 *
 * @example
 * ```tsx
 * // Simple toggle
 * const notificationToggle: ToggleSettingConfig<NotificationState> = {
 *   type: "toggle",
 *   key: "emailEnabled",
 *   label: "Email Notifications",
 *   description: "Receive notifications via email"
 * };
 *
 * // Toggle with icon
 * const animationToggle: ToggleSettingConfig<AppearanceState> = {
 *   type: "toggle",
 *   key: "animations",
 *   label: "Enable Animations",
 *   description: "Show smooth transitions and animations",
 *   icon: Sparkles
 * };
 * ```
 */
export interface ToggleSettingConfig<TState = any> extends BaseSettingConfig {
  type: "toggle";
  key: keyof TState;
  label: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface TableViewSettingConfig<TState = any>
  extends BaseSettingConfig {
  type: "table-view";
  key: keyof TState;
  label: string;
  description?: string;
  options: OptionConfig[];
}

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
 * Custom settings allow you to use specialized UI components that don't
 * fit the standard toggle or select patterns. This is useful for complex
 * settings like color pickers, theme previews, or multi-part inputs.
 *
 * @template TState - Type of the settings state object
 * @property {"custom"} type - Fixed type discriminator for type narrowing
 * @property {keyof TState} key - The state property this setting controls
 * @property {React.ComponentType} component - Custom React component to render
 *
 * @remarks
 * The custom component receives `value` and `onChange` props automatically,
 * plus any additional props you pass through the renderer.
 *
 * @example
 * ```tsx
 * // Define a custom component
 * function ThemePicker({ value, onChange }: {
 *   value: Theme;
 *   onChange: (value: Theme) => void
 * }) {
 *   return (
 *     <div className="grid grid-cols-3 gap-4">
 *       {themes.map(theme => (
 *         <button
 *           key={theme}
 *           onClick={() => onChange(theme)}
 *           className={value === theme ? 'selected' : ''}
 *         >
 *           <ThemePreview theme={theme} />
 *         </button>
 *       ))}
 *     </div>
 *   );
 * }
 *
 * // Use in configuration
 * const themeSetting: CustomSettingConfig<AppearanceState> = {
 *   type: "custom",
 *   key: "theme",
 *   component: ThemePicker
 * };
 * ```
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
 * Props interface for setting renderer components.
 *
 * This interface defines the contract between the settings system and
 * individual setting renderers. Renderers receive configuration, current
 * value, and a callback to update the value.
 *
 * @template TState - Type of the settings state object
 * @property {SettingConfig<TState>} config - Complete setting configuration
 * @property {TState[keyof TState]} value - Current value from application state
 * @property {function} onChange - Callback to update the setting value
 * @property {string} [accentColor] - Optional accent color for themed components
 *
 * @example
 * ```tsx
 * function SettingRenderer<TState>({
 *   config,
 *   value,
 *   onChange,
 *   accentColor = "purple-500"
 * }: SettingRendererProps<TState>) {
 *   const handleChange = (newValue: TState[keyof TState]) => {
 *     onChange(config.key, newValue);
 *   };
 *
 *   switch (config.type) {
 *     case "select":
 *       return <SelectSetting {...config} value={value} onChange={handleChange} />;
 *     case "toggle":
 *       return <ToggleSetting {...config} checked={value} onChange={handleChange} />;
 *     default:
 *       return null;
 *   }
 * }
 * ```
 */
export interface SettingRendererProps<TState = any> {
  config: SettingConfig<TState>;
  value: TState[keyof TState];
  onChange: (key: keyof TState, value: TState[keyof TState]) => void;
  accentColor?: string;
}

/**
 * Return type for the useSettings hook.
 *
 * This hook provides a complete state management solution for settings,
 * including state, change tracking, save/reset actions, and loading states.
 *
 * @template TState - Type of the settings state object
 * @property {TState} settings - Current settings state
 * @property {boolean} hasChanges - True when local state differs from saved state
 * @property {boolean} isSaving - True while save operation is in progress
 * @property {function} updateSetting - Updates a single setting by key
 * @property {function} updateSettings - Updates multiple settings at once
 * @property {function} handleSave - Persists current settings and clears change flag
 * @property {function} handleReset - Reverts settings to default values
 *
 * @example
 * ```tsx
 * function AppearanceSettings() {
 *   const {
 *     settings,
 *     hasChanges,
 *     isSaving,
 *     updateSetting,
 *     handleSave,
 *     handleReset
 *   } = useSettings<AppearanceState>(DEFAULT_APPEARANCE_STATE, {
 *     onSave: async (settings) => {
 *       await api.saveSettings(settings);
 *     }
 *   });
 *
 *   return (
 *     <div>
 *       <ThemePicker
 *         value={settings.theme}
 *         onChange={(theme) => updateSetting("theme", theme)}
 *       />
 *       <button onClick={handleSave} disabled={!hasChanges || isSaving}>
 *         {isSaving ? "Saving..." : "Save Changes"}
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */
export interface UseSettingsReturn<TState> {
  settings: TState;
  hasChanges: boolean;
  isSaving: boolean;
  updateSetting: <K extends keyof TState>(key: K, value: TState[K]) => void;
  updateSettings: (updates: Partial<TState>) => void;
  handleSave: () => Promise<void>;
  handleReset: () => void;
}

/**
 * Options for configuring the useSettings hook.
 *
 * These options allow you to customize the behavior of the settings hook,
 * including persistence, validation, and user feedback.
 *
 * @template TState - Type of the settings state object
 * @property {function} [onSave] - Async callback executed when saving settings
 * @property {function} [onReset] - Callback executed when resetting to defaults
 * @property {function} [validate] - Validation function run before saving
 * @property {string} [successMessage] - Custom toast message on successful save
 * @property {string} [resetMessage] - Custom toast message when resetting
 * @property {boolean} [persistLocally] - Whether to persist to localStorage
 * @property {string} [storageKey] - Key for localStorage (required if persistLocally is true)
 *
 * @example
 * ```tsx
 * // Basic usage with API persistence
 * const options: UseSettingsOptions<AppearanceState> = {
 *   onSave: async (settings) => {
 *     await fetch("/api/settings", {
 *       method: "POST",
 *       body: JSON.stringify(settings)
 *     });
 *   },
 *   successMessage: "Your preferences have been saved!"
 * };
 *
 * // With validation
 * const optionsWithValidation: UseSettingsOptions<ProfileState> = {
 *   validate: (settings) => {
 *     if (!settings.email) {
 *       return "Email is required";
 *     }
 *     if (!settings.username || settings.username.length < 3) {
 *       return "Username must be at least 3 characters";
 *     }
 *     return true;
 *   },
 *   onSave: async (settings) => {
 *     await api.saveProfile(settings);
 *   }
 * };
 *
 * // With localStorage persistence
 * const localOptions: UseSettingsOptions<AppearanceState> = {
 *   persistLocally: true,
 *   storageKey: "app-appearance-settings",
 *   successMessage: "Settings saved locally"
 * };
 * ```
 */
export interface UseSettingsOptions<TState> {
  onSave?: (settings: TState) => Promise<void> | void;
  onReset?: () => void;
  validate?: (settings: TState) => boolean | string;
  successMessage?: string;
  resetMessage?: string;
  persistLocally?: boolean;
  storageKey?: string;
}
