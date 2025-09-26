"use client";

import { useSettings } from "@/hooks/use-settings";
import { NotificationState } from "./notification-types";
import { DEFAULT_STATE, SETTING_GROUPS } from "./constants";
import { SettingActions, SettingCard, SettingHeader } from "../shared";
import { createSettingRenderer } from "@/lib/create-settings-renderer";

/**
 * Create a renderer for notification settings.
 * Since notifications don't need custom components, we use the default renderer.
 */
const NotificationRenderer = createSettingRenderer<NotificationState>();

/**
 * Main notification settings component.
 *
 * Provides a comprehensive interface for users to manage their notification
 * preferences across different channels, activities, and frequencies.
 *
 * @component
 * @example
 * ```tsx
 * <NotificationsSettings />
 * ```
 */
export function NotificationsSettings() {
  const { settings, hasChanges, updateSetting, handleSave, handleReset } =
    useSettings<NotificationState>(DEFAULT_STATE, {
      successMessage: "Notification settings saved successfully",
      resetMessage: "Notification settings reset to default",
      onSave: async (settings) => {
        console.log("Saving notification settings:", settings);
      },
    });

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6 duration-500">
      <SettingHeader
        title="Notifications"
        description="Manage how and when you receive notifications"
      />

      {SETTING_GROUPS.map((group) => (
        <SettingCard
          key={group.id}
          title={group.title}
          description={group.description}
          tooltip={group.tooltip}
          icon={<group.icon className="size-5" />}
        >
          <div className="space-y-4">
            {group.settings.map((setting) => (
              <NotificationRenderer
                key={setting.key as string}
                config={setting}
                value={settings[setting.key]}
                onChange={updateSetting}
                withHoverEffect={true}
              />
            ))}
          </div>
        </SettingCard>
      ))}

      <SettingActions
        hasChanges={hasChanges}
        onSave={handleSave}
        onReset={handleReset}
        saveText="Save Changes"
        resetText="Reset to Default"
      />
    </div>
  );
}
