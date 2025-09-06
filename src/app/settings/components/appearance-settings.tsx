"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Monitor, Moon, Sun, HelpCircle } from "lucide-react";
import { toast } from "sonner";

type Theme = "light" | "dark" | "system";
type Density = "compact" | "comfortable" | "spacious";
type SidebarPosition = "left" | "right";

interface AppearanceState {
  theme: Theme;
  density: Density;
  sidebarPosition: SidebarPosition;
  animations: boolean;
  editorTheme: string;
  fontSize: string;
  lineNumbers: boolean;
  wordWrap: boolean;
  language: string;
  timezone: string;
}

const THEME_OPTIONS = [
  { value: "light" as const, icon: Sun, label: "Light" },
  { value: "dark" as const, icon: Moon, label: "Dark" },
  { value: "system" as const, icon: Monitor, label: "System" },
];

const DENSITY_STYLES = {
  compact: "space-y-4",
  comfortable: "space-y-6",
  spacious: "space-y-8",
};

const DEFAULT_STATE: AppearanceState = {
  theme: "system",
  density: "comfortable",
  sidebarPosition: "left",
  animations: true,
  editorTheme: "one-dark",
  fontSize: "14",
  lineNumbers: true,
  wordWrap: false,
  language: "en-us",
  timezone: "pt",
};

interface SettingCardProps {
  title: string;
  tooltip: string;
  children: React.ReactNode;
}

function SettingCard({ title, tooltip, children }: SettingCardProps) {
  return (
    <Card className="bg-card border-border p-6 transition-all duration-200 hover:shadow-lg hover:shadow-[#947bd3]/5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="size-6">
                <HelpCircle className="text-muted-foreground size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {children}
    </Card>
  );
}

interface ToggleSettingProps {
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

function ToggleSetting({
  label,
  description,
  checked,
  onCheckedChange,
}: ToggleSettingProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label>{label}</Label>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}

interface SelectSettingProps {
  id: string;
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: { value: string; label: string }[];
  description?: string;
  comingSoon?: boolean;
}

function SelectSetting({
  id,
  label,
  value,
  onValueChange,
  options,
  description,
  comingSoon,
}: SelectSettingProps) {
  return (
    <div
      className={
        description ? "flex items-center justify-between" : "space-y-2"
      }
    >
      <div className="space-y-0.5">
        <Label htmlFor={id}>
          {label}
          {comingSoon && (
            <span className="text-muted-foreground ml-1">(Coming Soon)</span>
          )}
        </Label>
        {description && (
          <p className="text-muted-foreground text-sm">{description}</p>
        )}
      </div>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger
          id={id}
          className={`transition-all duration-200 focus:ring-2 focus:ring-[#947bd3]/20 ${
            description ? "w-32" : ""
          }`}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function AppearanceSettings() {
  const [hasChanges, setHasChanges] = useState(false);
  const [settings, setSettings] = useState<AppearanceState>(DEFAULT_STATE);

  const updateSetting = <K extends keyof AppearanceState>(
    key: K,
    value: AppearanceState[K],
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setHasChanges(true);

    if (key === "theme") {
      toast(
        `Theme set to ${String(value).charAt(0).toUpperCase() + String(value).slice(1)}`,
      );
    }
  };

  const handleSave = () => {
    // TODO: Implement save logic
    toast.success("Settings saved successfully");
    setHasChanges(false);
  };

  const handleReset = () => {
    setSettings(DEFAULT_STATE);
    setHasChanges(false);
    toast.info("Settings reset to default");
  };

  return (
    <div
      className={`animate-in fade-in slide-in-from-bottom-4 duration-500 ${
        DENSITY_STYLES[settings.density]
      } ${settings.animations ? "transition-all" : ""}`}
    >
      <div>
        <h2 className="text-foreground text-2xl font-bold">
          Appearance & Preferences
        </h2>
        <p className="text-muted-foreground mt-1">
          Customize how GitRise looks and feels
        </p>
      </div>

      {/* Theme */}
      <SettingCard
        title="Theme"
        tooltip="Choose your preferred color theme. System will match your device settings."
      >
        <div className="grid grid-cols-3 gap-4">
          {THEME_OPTIONS.map(({ value, icon: Icon, label }) => (
            <button
              key={value}
              className={`flex flex-col items-center gap-3 rounded-lg border-2 p-4 transition-all duration-200 ${
                settings.theme === value
                  ? "border-[#947bd3] bg-[#947bd3]/10 shadow-lg shadow-[#947bd3]/20"
                  : "border-border bg-accent hover:bg-accent/80 hover:border-[#947bd3]/50"
              }`}
              onClick={() => updateSetting("theme", value)}
            >
              <Icon className="size-6" />
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>
      </SettingCard>

      {/* Layout */}
      <SettingCard
        title="Layout"
        tooltip="Customize the layout and spacing of the GitRise interface."
      >
        <div className="space-y-4">
          <SelectSetting
            id="density"
            label="Interface Density"
            value={settings.density}
            onValueChange={(value) =>
              updateSetting("density", value as Density)
            }
            options={[
              { value: "compact", label: "Compact" },
              { value: "comfortable", label: "Comfortable" },
              { value: "spacious", label: "Spacious" },
            ]}
          />

          <SelectSetting
            id="sidebarPosition"
            label="Sidebar Position"
            description="Choose sidebar placement"
            value={settings.sidebarPosition}
            onValueChange={(value) =>
              updateSetting("sidebarPosition", value as SidebarPosition)
            }
            options={[
              { value: "left", label: "Left" },
              { value: "right", label: "Right" },
            ]}
          />

          <ToggleSetting
            label="Animations"
            description="Enable interface animations"
            checked={settings.animations}
            onCheckedChange={(checked) => updateSetting("animations", checked)}
          />
        </div>
      </SettingCard>

      {/* Editor */}
      <SettingCard
        title="Code Editor"
        tooltip="Customize your code editor preferences."
      >
        <div className="space-y-4">
          <SelectSetting
            id="editorTheme"
            label="Editor Theme"
            value={settings.editorTheme}
            onValueChange={(value) => updateSetting("editorTheme", value)}
            options={[
              { value: "one-dark", label: "One Dark" },
              { value: "catpuccin", label: "Catpuccin" },
              { value: "monokai", label: "Monokai" },
              { value: "dracula", label: "Dracula" },
              { value: "nord", label: "Nord" },
            ]}
          />

          <SelectSetting
            id="fontSize"
            label="Font Size"
            value={settings.fontSize}
            onValueChange={(value) => updateSetting("fontSize", value)}
            options={[
              { value: "12", label: "12px" },
              { value: "14", label: "14px" },
              { value: "16", label: "16px" },
              { value: "18", label: "18px" },
            ]}
          />

          <ToggleSetting
            label="Line Numbers"
            description="Show line numbers in editor"
            checked={settings.lineNumbers}
            onCheckedChange={(checked) => updateSetting("lineNumbers", checked)}
          />

          <ToggleSetting
            label="Word Wrap"
            description="Wrap long lines in editor"
            checked={settings.wordWrap}
            onCheckedChange={(checked) => updateSetting("wordWrap", checked)}
          />
        </div>
      </SettingCard>

      {/* Language */}
      <SettingCard
        title="Language & Region"
        tooltip="Set your preferred language and timezone."
      >
        <div className="space-y-4">
          <SelectSetting
            id="language"
            label="Language"
            value={settings.language}
            onValueChange={(value) => updateSetting("language", value)}
            comingSoon
            options={[
              { value: "en-us", label: "English (US)" },
              { value: "es", label: "Español" },
              { value: "fr", label: "Français" },
              { value: "de", label: "Deutsch" },
              { value: "ja", label: "日本語" },
            ]}
          />

          <SelectSetting
            id="timezone"
            label="Timezone"
            value={settings.timezone}
            onValueChange={(value) => updateSetting("timezone", value)}
            options={[
              { value: "pt", label: "Pacific Time (PT)" },
              { value: "mt", label: "Mountain Time (MT)" },
              { value: "ct", label: "Central Time (CT)" },
              { value: "et", label: "Eastern Time (ET)" },
              { value: "utc", label: "UTC" },
            ]}
          />
        </div>
      </SettingCard>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 pt-4">
        <Button
          className="bg-[#947bd3] text-white transition-all duration-200 hover:bg-[#a58ddb] hover:shadow-lg hover:shadow-[#947bd3]/30"
          disabled={!hasChanges}
          onClick={handleSave}
        >
          Save changes
        </Button>
        <Button
          variant="outline"
          disabled={!hasChanges}
          onClick={handleReset}
          className="transition-all duration-200"
        >
          Reset to default
        </Button>
      </div>
    </div>
  );
}
