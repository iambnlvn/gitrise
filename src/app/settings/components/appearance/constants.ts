import { Eye, Layout, Monitor, Moon, Sun, Type } from "lucide-react";
import { AppearanceState, Theme } from "./appearance-types";
import { SettingGroupConfig } from "../shared/types";

/**
 * Default state for all appearance settings.
 * These values are used when resetting settings or on initial load.
 *
 * @constant
 * @type {AppearanceState}
 */
export const DEFAULT_STATE: AppearanceState = {
  theme: "system",
  density: "comfortable",
  sidebarPosition: "left",
  animations: true,
  transparentSidebar: false,
  tableView: "default",
  fontSize: "16",
  lineHeight: "1.5",
  borderRadius: "0.625",
  compactMode: false,
  showAvatars: true,
};

/**
 * Configuration array defining all setting groups and their individual settings.
 * This is the single source of truth for the settings UI structure.
 *
 * To add a new setting:
 * 1. Add the property to AppearanceState interface
 * 2. Add the default value to DEFAULT_STATE
 * 3. Add the setting configuration to the appropriate group (or create a new group)
 * 4. Ensure the setting type matches one of the available types
 *
 * @constant
 * @type {SettingGroupConfig[]}
 *
 * @example
 * ```tsx
 * // Adding a new toggle setting to an existing group
 * {
 *   id: "layout",
 *   // ...other properties
 *   settings: [
 *     // ...existing settings
 *     {
 *       type: "toggle",
 *       key: "newSetting",
 *       label: "New Setting",
 *       description: "Description of new setting"
 *     }
 *   ]
 * }
 * ```
 */
export const SETTING_GROUPS: SettingGroupConfig[] = [
  {
    id: "theme",
    title: "Interface Theme",
    description: "Choose your preferred color theme",
    tooltip: "System will match your device settings",
    icon: Sun,
    settings: [
      {
        type: "theme",
        key: "theme",
        label: "Theme",
        options: [
          { value: "light", icon: Sun, label: "Light" },
          { value: "dark", icon: Moon, label: "Dark" },
          { value: "system", icon: Monitor, label: "System" },
        ],
      },
    ],
  },
  {
    id: "layout",
    title: "Layout & Spacing",
    description: "Customize the layout and spacing of the interface",
    tooltip: "Adjust how content is displayed and spaced",
    icon: Layout,
    settings: [
      {
        type: "select",
        key: "density",
        label: "Interface Density",
        description: "Choose spacing between elements",
        options: [
          { value: "compact", label: "Compact" },
          { value: "comfortable", label: "Comfortable" },
          { value: "spacious", label: "Spacious" },
        ],
      },
      {
        type: "select",
        key: "sidebarPosition",
        label: "Sidebar Position",
        description: "Choose sidebar placement",
        options: [
          { value: "left", label: "Left" },
          { value: "right", label: "Right" },
        ],
      },
      {
        type: "toggle",
        key: "transparentSidebar",
        label: "Transparent Sidebar",
        description: "Make the desktop sidebar transparent",
      },
      {
        type: "toggle",
        key: "animations",
        label: "Animations",
        description: "Enable smooth interface animations",
      },
    ],
  },
  {
    id: "tables",
    title: "Tables View",
    description: "How are tables displayed in the app",
    tooltip: "Choose how data tables are rendered",
    icon: Eye,
    settings: [
      {
        type: "table-view",
        key: "tableView",
        label: "Table View",
        options: [
          {
            value: "default",
            label: "Default",
            description: "Spacious table layout with full details",
          },
          {
            value: "compact",
            label: "Compact",
            description: "Condensed table layout for more rows",
          },
        ],
      },
    ],
  },
  {
    id: "typography",
    title: "Typography",
    description: "Customize text appearance",
    tooltip: "Adjust font sizes and line heights",
    icon: Type,
    settings: [
      {
        type: "select",
        key: "fontSize",
        label: "Base Font Size",
        description: "Base size for all text",
        options: [
          { value: "12", label: "12px (Small)" },
          { value: "16", label: "16px (Default)" },
          { value: "18", label: "18px (Extra Large)" },
        ],
        onChange: (value) => {
          document.documentElement.style.setProperty(
            "--base-font-size",
            `${value}px`,
          );
        },
      },
      {
        type: "select",
        key: "lineHeight",
        label: "Line Height",
        description: "Space between lines",
        options: [
          { value: "1.4", label: "1.4 (Compact)" },
          { value: "1.5", label: "1.5 (Default)" },
          { value: "1.6", label: "1.6 (Relaxed)" },
          { value: "1.8", label: "1.8 (Spacious)" },
        ],
      },
      {
        type: "select",
        key: "borderRadius",
        label: "Border Radius",
        description: "Roundness of corners",
        options: [
          { value: "0.25", label: "Sharp" },
          { value: "0.5", label: "Rounded" },
          { value: "0.625", label: "Default" },
          { value: "1", label: "Extra Rounded" },
        ],
      },
    ],
  },
  {
    id: "additional",
    title: "Additional UI Settings",
    description: "Fine-tune your interface experience",
    tooltip: "Additional customization options",
    icon: Eye,
    settings: [
      {
        type: "toggle",
        key: "showAvatars",
        label: "Show Avatars",
        description: "Display user avatars in lists and tables",
      },
      {
        type: "toggle",
        key: "compactMode",
        label: "Compact Mode",
        description: "Reduce padding and margins globally",
      },
    ],
  },
];

/**
 * Mapping of theme values to their corresponding gradient background classes.
 * Used by the ThemePicker component to show theme previews.
 *
 * @constant
 * @type {Record<Theme, string>}
 */
export const THEME_GRADIENT_MAP: Record<Theme, string> = {
  light: "bg-gradient-to-br from-white to-gray-100",
  dark: "bg-gradient-to-br from-gray-900 to-black",
  system: "bg-gradient-to-br from-blue-50 to-purple-50",
};
