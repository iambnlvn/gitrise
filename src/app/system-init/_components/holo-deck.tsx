"use client";

import {
  Sun,
  LayoutGrid,
  Keyboard,
  Bell,
  BellOff,
  Monitor,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  WIZARD_DENSITIES,
  WIZARD_EDITING_MODES,
  WIZARD_THEMES,
} from "../constants";
import { useWizardStore } from "@/app/stores/wizard-store";

interface SectionHeaderProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
}

function SectionHeader({ icon: Icon, title, description }: SectionHeaderProps) {
  return (
    <div className="space-y-1">
      <Label className="text-foreground flex items-center gap-2 text-sm font-medium">
        <Icon className="text-primary size-4" />
        {title}
      </Label>
      {description && (
        <p className="text-muted-foreground text-xs">{description}</p>
      )}
    </div>
  );
}

interface SelectionCardProps {
  isSelected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

function SelectionCard({
  isSelected,
  onClick,
  children,
  className,
}: SelectionCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex flex-col items-center gap-3 rounded-lg border p-4 text-center transition-all duration-200",
        "hover:border-primary/50 focus:ring-primary/20 hover:shadow-md focus:ring-2 focus:outline-none",
        isSelected
          ? "border-primary bg-primary/5 shadow-sm"
          : "border-border bg-card hover:bg-accent/50",
        className,
      )}
    >
      {isSelected && (
        <Badge
          variant="default"
          className="absolute -top-2 -right-2 size-5 rounded-full p-0 text-xs"
        >
          ✓
        </Badge>
      )}
      {children}
    </button>
  );
}

interface PreviewWindowProps {
  density: string;
}

function PreviewWindow({ density }: PreviewWindowProps) {
  return (
    <div className="bg-card mx-auto max-w-md overflow-hidden rounded-lg shadow-sm">
      <div className="bg-background/30 flex items-center justify-between border-b px-3 py-1.5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="size-2 rounded-full bg-red-400" />
            <div className="size-2 rounded-full bg-yellow-400" />
            <div className="size-2 rounded-full bg-green-400" />
          </div>
          <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
            <Monitor className="size-3" />
            <span className="font-medium">Live Preview</span>
          </div>
        </div>
        <div className="text-muted-foreground text-xs">
          {density.charAt(0).toUpperCase() + density.slice(1)}
        </div>
      </div>

      <div
        className={cn(
          "bg-background transition-all duration-300",
          density === "compact" && "p-2",
          density === "comfortable" && "p-3",
          density === "spacious" && "p-4",
        )}
      >
        <div
          className={cn(
            "bg-card/50 mb-3 flex items-center justify-between rounded border transition-all duration-200",
            density === "compact" && "mb-2 px-2 py-1",
            density === "comfortable" && "px-3 py-1.5",
            density === "spacious" && "mb-4 px-3 py-2",
          )}
        >
          <div className="flex items-center gap-1">
            {Array.from({ length: 3 }, (_, i) => (
              <div
                key={i}
                className={cn(
                  "bg-primary/20 rounded transition-all duration-200",
                  density === "compact" && "size-1.5",
                  density === "comfortable" && "size-2",
                  density === "spacious" && "size-2.5",
                )}
              />
            ))}
          </div>
          <div
            className={cn(
              "bg-muted rounded transition-all duration-200",
              density === "compact" && "h-1 w-8",
              density === "comfortable" && "h-1.5 w-10",
              density === "spacious" && "h-2 w-12",
            )}
          />
        </div>

        <div
          className={cn(
            "space-y-2 transition-all duration-300",
            density === "compact" && "space-y-1",
            density === "spacious" && "space-y-3",
          )}
        >
          {Array.from({ length: 2 }, (_, i) => (
            <div
              key={i}
              className={cn(
                "bg-card flex items-center rounded border shadow-sm transition-all duration-200 hover:shadow-md",
                density === "compact" && "gap-1.5 p-1.5",
                density === "comfortable" && "gap-2 p-2",
                density === "spacious" && "gap-3 p-3",
              )}
              style={{
                animationDelay: `${i * 100}ms`,
              }}
            >
              <div
                className={cn(
                  "from-primary/20 to-primary/10 rounded bg-gradient-to-br transition-all duration-200",
                  density === "compact" && "size-4",
                  density === "comfortable" && "size-5",
                  density === "spacious" && "size-6",
                )}
              />

              <div className="flex-1 space-y-1">
                <div
                  className={cn(
                    "bg-muted rounded transition-all duration-200",
                    density === "compact" && "h-1 w-16",
                    density === "comfortable" && "h-1.5 w-20",
                    density === "spacious" && "h-2 w-24",
                  )}
                />
                <div
                  className={cn(
                    "bg-muted/60 rounded transition-all duration-200",
                    density === "compact" && "h-0.5 w-12",
                    density === "comfortable" && "h-1 w-14",
                    density === "spacious" && "h-1.5 w-16",
                  )}
                />
              </div>

              <div
                className={cn(
                  "bg-primary/10 rounded transition-all duration-200",
                  density === "compact" && "h-3 w-6",
                  density === "comfortable" && "h-4 w-8",
                  density === "spacious" && "h-5 w-10",
                )}
              />
            </div>
          ))}
        </div>

        <div
          className={cn(
            "bg-muted/20 mt-3 flex items-center justify-between rounded border-t transition-all duration-200",
            density === "compact" && "mt-2 pt-1.5",
            density === "comfortable" && "pt-2",
            density === "spacious" && "mt-4 pt-3",
          )}
        >
          <div className="flex gap-2">
            {Array.from({ length: 2 }, (_, i) => (
              <div
                key={i}
                className={cn(
                  "bg-muted rounded-full transition-all duration-200",
                  density === "compact" && "h-0.5 w-4",
                  density === "comfortable" && "h-1 w-6",
                  density === "spacious" && "h-1.5 w-8",
                )}
              />
            ))}
          </div>
          <div
            className={cn(
              "rounded bg-green-500/20 transition-all duration-200",
              density === "compact" && "size-1",
              density === "comfortable" && "size-1.5",
              density === "spacious" && "size-2",
            )}
          />
        </div>
      </div>
    </div>
  );
}

export function HoloDeckStep() {
  const {
    data: { holoDeck: data },
    updateData,
  } = useWizardStore();

  const handleThemeChange = (themeId: (typeof WIZARD_THEMES)[number]["id"]) => {
    updateData("holoDeck", { theme: themeId });
  };

  const handleDensityChange = (
    densityId: (typeof WIZARD_DENSITIES)[number]["id"],
  ) => {
    updateData("holoDeck", { density: densityId });
  };

  const handleEditingModeChange = (
    modeId: (typeof WIZARD_EDITING_MODES)[number]["id"],
  ) => {
    updateData("holoDeck", { editingMode: modeId });
  };

  const handleNotificationsChange = (checked: boolean) => {
    updateData("holoDeck", { notifications: checked });
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="text-center">
        <h2 className="text-foreground text-3xl font-bold">
          Deck Configuration
        </h2>
        <p className="text-muted-foreground mt-2">
          Customize your workspace for the perfect development experience
        </p>
      </div>

      <div className="space-y-4">
        <SectionHeader
          icon={Sun}
          title="Interface Theme"
          description="Choose a visual style that matches your preference"
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {WIZARD_THEMES.map((theme) => {
            const Icon = theme.icon;
            return (
              <SelectionCard
                key={theme.id}
                isSelected={data.theme === theme.id}
                onClick={() => handleThemeChange(theme.id)}
              >
                <div
                  className={cn(
                    "flex size-12 items-center justify-center rounded-lg transition-colors",
                    data.theme === theme.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary",
                  )}
                >
                  <Icon className="size-6" />
                </div>
                <div>
                  <p className="text-foreground font-medium">{theme.label}</p>
                  <p className="text-muted-foreground text-xs">
                    {theme.description}
                  </p>
                </div>
              </SelectionCard>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <SectionHeader
          icon={LayoutGrid}
          title="Display Density"
          description="Adjust spacing and sizing to fit your screen and workflow"
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {WIZARD_DENSITIES.map((density) => (
            <SelectionCard
              key={density.id}
              isSelected={data.density === density.id}
              onClick={() => handleDensityChange(density.id)}
            >
              <div className="flex items-center gap-1">
                {Array.from({ length: 3 }, (_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "bg-primary rounded transition-all",
                      density.id === "compact" && "size-2",
                      density.id === "comfortable" && "size-3",
                      density.id === "spacious" && "size-4",
                    )}
                  />
                ))}
              </div>
              <div>
                <p className="text-foreground font-medium">{density.label}</p>
                <p className="text-muted-foreground text-xs">
                  {density.description}
                </p>
              </div>
            </SelectionCard>
          ))}
        </div>
        <div className="space-y-4">
          <SectionHeader
            icon={Monitor}
            title="Live Preview"
            description="See how your settings affect the interface in real-time"
          />
          <PreviewWindow density={data.density} />
        </div>
      </div>

      <div className="space-y-4">
        <SectionHeader
          icon={Keyboard}
          title="Editing Mode"
          description="Select your preferred input method and shortcuts"
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {WIZARD_EDITING_MODES.map((mode) => (
            <SelectionCard
              key={mode.id}
              isSelected={data.editingMode === mode.id}
              onClick={() => handleEditingModeChange(mode.id)}
            >
              <div>
                <p className="text-foreground font-medium">{mode.label}</p>
                <p className="text-muted-foreground text-xs">
                  {mode.description}
                </p>
              </div>
            </SelectionCard>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <SectionHeader
          icon={Bell}
          title="Notifications"
          description="Control how you receive updates about your projects"
        />
        <div className="bg-card rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-muted flex size-10 items-center justify-center rounded-lg">
                {data.notifications ? (
                  <Bell className="text-primary size-5" />
                ) : (
                  <BellOff className="text-muted-foreground size-5" />
                )}
              </div>
              <div>
                <p className="text-foreground font-medium">
                  {data.notifications
                    ? "Notifications Enabled"
                    : "Notifications Disabled"}
                </p>
                <p className="text-muted-foreground text-sm">
                  Receive alerts for builds, deployments, and system updates
                </p>
              </div>
            </div>
            <Switch
              checked={data.notifications}
              onCheckedChange={handleNotificationsChange}
              aria-label="Toggle notifications"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
