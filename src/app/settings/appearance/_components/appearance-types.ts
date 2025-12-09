/**
 * Available theme options for the application.
 * @type {("light" | "dark" | "system")}
 */
export type Theme = "light" | "dark" | "system";

/**
 * Interface density options controlling spacing throughout the UI.
 * @type {("compact" | "comfortable" | "spacious")}
 */
type Density = "compact" | "comfortable" | "spacious";

/**
 * Position of the sidebar in the application layout.
 * @type {("left" | "right")}
 */
type SidebarPosition = "left" | "right";

/**
 * Display mode for data tables in the application.
 * @type {("default" | "compact")}
 */
export type TableView = "default" | "compact";

/**
 * This interface defines all configurable appearance options.
 *
 * @interface AppearanceState
 * @property {Theme} theme - The active color theme
 * @property {Density} density - Overall UI spacing density
 * @property {SidebarPosition} sidebarPosition - Sidebar placement
 * @property {boolean} animations - Whether animations are enabled
 * @property {boolean} transparentSidebar - Sidebar transparency setting
 * @property {TableView} tableView - Table display mode
 * @property {string} fontSize - Base font size in pixels
 * @property {string} lineHeight - Line height multiplier
 * @property {string} borderRadius - Border radius in rem units
 * @property {boolean} compactMode - Global compact mode toggle
 * @property {boolean} showAvatars - Whether to show user avatars
 */
export interface AppearanceState {
  theme: Theme;
  density: Density;
  sidebarPosition: SidebarPosition;
  animations: boolean;
  transparentSidebar: boolean;
  tableView: TableView;
  fontSize: string;
  lineHeight: string;
  borderRadius: string;
  compactMode: boolean;
  showAvatars: boolean;
}
