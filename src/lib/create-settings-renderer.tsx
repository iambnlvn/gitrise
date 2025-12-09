import {
  TableView,
  Theme,
} from "@/app/settings/appearance/_components/appearance-types";
import { TableViewPicker } from "@/app/settings/appearance/_components/table-view-picker";
import { ThemePicker } from "@/app/settings/appearance/_components/theme-picker";
import { SelectSetting, ToggleSetting } from "@/app/settings/components/shared";
import type {
  SettingConfig,
  OptionConfig,
} from "@/app/settings/components/shared/types";

// interface CustomRendererComponent<TState = unknown> {
//   config: SettingConfig<TState>;
//   value: unknown;
//   onChange: (value: unknown) => void;
//   [key: string]: unknown;
// }

// type CustomRendererMap<TState = unknown> = Record<
//   string,
//   React.ComponentType<CustomRendererComponent<TState>>
// >;

/**
 * Custom renderer component interface.
 * 
 * Custom renderers receive the setting configuration, current value,
 * and a change handler. They can also receive additional props.
 * Map of custom renderers keyed by setting key or type.
 * Factory function to create a type-safe setting renderer.
 * 
 * This factory creates a renderer component that handles both standard
 * setting types (select, toggle) and custom setting types. Custom renderers
 * can be provided for specific setting keys to override default behavior.
 * @template TState - Type of the settings state object
 * @property {SettingConfig<TState>} config - The setting configuration
 * @property {unknown} value - Current value from state
 * @property {function} onChange - Callback to update the value
 * @template TState - Type of the settings state object
 * @template TState - Type of the settings state object
 * @example ```tsx
// Create a renderer with custom components for specific settings
const AppearanceRenderer = createSettingRenderer<AppearanceState>({
  theme: ThemePicker,        // Custom theme picker
  tableView: TableViewPicker  // Custom table view picker
});

// Use in your settings component
function AppearanceSettings() {
  const { settings, updateSetting } = useSettings(DEFAULT_STATE);

  return (
    <div>
      {SETTING_GROUPS.map(group => (
        <SettingCard key={group.id} {...group}>
          {group.settings.map(setting => (
            <AppearanceRenderer
              key={setting.key as string}
              config={setting}
              value={settings[setting.key]}
              onChange={updateSetting}
              accentColor="purple-500"
            />
          ))}
        </SettingCard>
      ))}
    </div>
  );
}
```
 */
export function createSettingRenderer<TState>() {
  /**
   * The actual renderer component.
   *
   * This component acts as a router, directing each setting configuration
   * to the appropriate UI component based on its type.
   */
  return function SettingRenderer({
    config,
    value,
    onChange,
    ..._additionalProps
  }: {
    config: SettingConfig<TState>;
    value: TState[keyof TState];
    onChange: (key: keyof TState, value: TState[keyof TState]) => void;
    [key: string]: unknown;
  }) {
    /**
     * Wrapper for onChange to ensure consistent signature.
     * Custom components receive just the value, not the key.
     */
    // const handleStateChange = (newValue: TState[keyof TState]) => {
    //   // Execute config-level onChange if present (for side effects)
    //   if (config.type === "select" && "onChange" in config && config.onChange) {
    //     config.onChange(String(newValue));
    //   }

    //   // Update the state
    //   onChange(config.key, newValue);
    // };

    // Helpers for specific input types to satisfy stricter callback types
    const handleStringChange = (newValue: string) => {
      // Execute config-level onChange if present (for side effects)
      if (config.type === "select" && "onChange" in config && config.onChange) {
        config.onChange(newValue);
      }

      // Cast string to the state value type when calling generic updater
      onChange(config.key, newValue as unknown as TState[keyof TState]);
    };

    const handleBooleanChange = (checked: boolean) => {
      onChange(config.key, checked as unknown as TState[keyof TState]);
    };

    // Check if there's a custom renderer for this specific setting key
    // const customRendererKey = config.key as string;
    // if (customRenderers && customRenderers[customRendererKey]) {
    //   const CustomRenderer = customRenderers[customRendererKey];
    //   return (
    //     <CustomRenderer
    //       config={config}
    //       value={value}
    //       onChange={handleStateChange}
    //       {...additionalProps}
    //     />
    //   );
    // }

    // Handle "custom" type settings (from CustomSettingConfig)
    // if (config.type === "custom" && "component" in config) {
    //   const CustomComponent = config.component;
    //   return (
    //     <CustomComponent
    //       value={value}
    //       onChange={handleStateChange}
    //       {...additionalProps}
    //     />
    //   );
    // }

    switch (config.type) {
      case "select":
        return (
          <SelectSetting
            id={config.key as string}
            label={config.label}
            value={String(value)}
            onValueChange={handleStringChange}
            options={config.options}
            description={config.description}
          />
        );

      case "toggle":
        return (
          <ToggleSetting
            label={config.label}
            description={config.description}
            checked={Boolean(value)}
            onCheckedChange={handleBooleanChange}
          />
        );
      case "theme":
        return (
          <ThemePicker
            value={value as Theme}
            onChange={(v: Theme) => handleStringChange(String(v))}
            options={config.options as unknown as OptionConfig<Theme>[]}
          />
        );
      case "table-view": {
        // Cast value and options to the TableView-specific types expected by the picker,
        // and route onChange to the generic state updater with a proper cast.
        const tableValue = value as unknown as TableView;
        const tableOptions =
          config.options as unknown as OptionConfig<TableView>[];

        return (
          <TableViewPicker
            onChange={(v: TableView) =>
              onChange(config.key, v as unknown as TState[keyof TState])
            }
            value={tableValue}
            options={tableOptions}
          />
        );
      }

      default:
        return null;
    }
  };
}
