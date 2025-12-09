"use client";

import {
  SettingCard,
  SettingHeader,
  SettingActions,
} from "../../components/shared";
import type { AppearanceState } from "./appearance-types";
import { DEFAULT_STATE, SETTING_GROUPS } from "../constants";
import { createSettingRenderer } from "@/lib/create-settings-renderer";
import { useSettings } from "@/hooks/use-settings";

/**
 * Appearance settings renderer.
 * Creates type-safe setting components for appearance state.
 */
const SettingRenderer = createSettingRenderer<AppearanceState>();

/**
 * Appearance & Preferences Settings Component
 *
 * Manages visual customization including theme, layout, spacing, typography, and UI preferences.
 * Provides a consistent, type-safe interface using the unified settings design pattern.
 *
 * @component
 */
export function AppearanceSettings() {
  const { settings, hasChanges, isSaving, updateSetting, handleSave } =
    useSettings<AppearanceState>(DEFAULT_STATE, {
      successMessage: "Appearance settings saved successfully",
    });

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6 duration-500">
      <SettingHeader
        title="Appearance & Preferences"
        description="Customize how your interface looks and feels with themes, layouts, and typography options"
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
              <SettingRenderer
                key={setting.key as string}
                config={setting}
                value={settings[setting.key as keyof AppearanceState]}
                onChange={(key: string, value: unknown) =>
                  updateSetting(key as keyof AppearanceState, value as string)
                }
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
