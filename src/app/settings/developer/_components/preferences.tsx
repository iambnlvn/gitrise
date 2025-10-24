"use client";

import { memo, useCallback } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  DeveloperPreferences,
  APIVersion,
  JSONIndentation,
} from "../developer-types";
import { API_VERSION_OPTIONS, JSON_INDENTATION_OPTIONS } from "../constants";

interface PreferencesSectionProps {
  preferences: DeveloperPreferences;
  onUpdate: (preferences: Partial<DeveloperPreferences>) => void;
  isLoading?: boolean;
}

const PreferenceItem = memo(({ children }: { children: React.ReactNode }) => (
  <div className="hover:bg-muted/30 flex flex-col gap-3 p-4 transition-colors sm:flex-row sm:items-center sm:justify-between">
    {children}
  </div>
));

PreferenceItem.displayName = "PreferenceItem";

/**
 * Developer preferences section.
 */
export function PreferencesSection({
  preferences,
  onUpdate,
  isLoading,
}: PreferencesSectionProps) {
  const handleAPIVersionChange = useCallback(
    (value: string) => {
      onUpdate({ defaultAPIVersion: value as APIVersion });
    },
    [onUpdate],
  );

  const handleWebhookAutoRetryChange = useCallback(
    (checked: boolean) => {
      onUpdate({ webhookAutoRetry: checked });
    },
    [onUpdate],
  );

  const handleJSONIndentationChange = useCallback(
    (value: string) => {
      onUpdate({ jsonIndentation: value as JSONIndentation });
    },
    [onUpdate],
  );

  const handleAPIDarkModeChange = useCallback(
    (checked: boolean) => {
      onUpdate({ apiDocsDarkMode: checked });
    },
    [onUpdate],
  );

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Developer Preferences</h2>
        <p className="text-muted-foreground text-sm">
          Customize your developer experience
        </p>
      </div>

      <div className="border-border bg-card overflow-hidden rounded-lg border shadow-sm">
        <div className="divide-border divide-y">
          <PreferenceItem>
            <div className="space-y-0.5">
              <Label className="text-base">Default API Version</Label>
              <div className="text-muted-foreground text-sm">
                Choose the API version for new requests
              </div>
            </div>
            <Select
              value={preferences.defaultAPIVersion}
              onValueChange={handleAPIVersionChange}
              disabled={isLoading}
            >
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {API_VERSION_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </PreferenceItem>

          <PreferenceItem>
            <div className="space-y-0.5">
              <Label className="text-base">Webhook Auto-Retry</Label>
              <div className="text-muted-foreground text-sm">
                Automatically retry failed deliveries
              </div>
            </div>
            <Switch
              checked={preferences.webhookAutoRetry}
              onCheckedChange={handleWebhookAutoRetryChange}
              disabled={isLoading}
            />
          </PreferenceItem>

          <PreferenceItem>
            <div className="space-y-0.5">
              <Label className="text-base">JSON Indentation</Label>
              <div className="text-muted-foreground text-sm">
                Format for API responses
              </div>
            </div>
            <Select
              value={preferences.jsonIndentation.toString()}
              onValueChange={handleJSONIndentationChange}
              disabled={isLoading}
            >
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {JSON_INDENTATION_OPTIONS.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value.toString()}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </PreferenceItem>

          <PreferenceItem>
            <div className="space-y-0.5">
              <Label className="text-base">API Docs Dark Mode</Label>
              <div className="text-muted-foreground text-sm">
                Use dark theme for documentation
              </div>
            </div>
            <Switch
              checked={preferences.apiDocsDarkMode}
              onCheckedChange={handleAPIDarkModeChange}
              disabled={isLoading}
            />
          </PreferenceItem>
        </div>
      </div>
    </div>
  );
}
