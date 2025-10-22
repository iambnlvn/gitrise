"use client";

import { useSettings } from "@/hooks/use-settings";
import type { NotificationState } from "../notification-types";
import { DEFAULT_STATE, SETTING_GROUPS } from "../constants";
import {
  SettingCard,
  SettingHeader,
  SettingActions,
} from "../../components/shared";
import { createSettingRenderer } from "@/lib/create-settings-renderer";

/**
 * Notification settings renderer.
 * Creates type-safe setting components for notification state.
 */
const NotificationRenderer = createSettingRenderer<NotificationState>();

/**
 * Notification Settings Component
 *
 * Manages notification preferences across different channels (email, push),
 *
 * @component
 */
export function NotificationsSettings() {
  const { settings, hasChanges, isSaving, updateSetting, handleSave } =
    useSettings<NotificationState>(DEFAULT_STATE, {
      successMessage: "Notification settings saved successfully",
    });

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6 duration-500">
      <SettingHeader
        title="Notifications"
        description="Manage how and when you receive notifications across all channels"
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
              />
            ))}
          </div>
        </SettingCard>
      ))}

      <SettingActions
        hasChanges={hasChanges}
        onSave={handleSave}
        isLoading={isSaving}
      />
    </div>
  );
}
