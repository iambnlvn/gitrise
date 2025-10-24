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
