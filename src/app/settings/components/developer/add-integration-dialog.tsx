"use client";

import { useState, useMemo, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  ExternalLink,
  Info,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import {
  IntegrationType,
  NewIntegrationConfig,
  PermissionPreset,
} from "./developer-types";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { PREDEFINED_INTEGRATIONS } from "./constants";
import { useDeveloper } from "@/hooks/use-developer";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PERMISSION_PRESETS } from "@/utils/permission-manager";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AddIntegrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (integration: NewIntegrationConfig) => Promise<void>;
  isLoading?: boolean;
}

export function AddIntegrationDialog({
  open,
  onOpenChange,
  onAdd,
  isLoading = false,
}: AddIntegrationDialogProps) {
  const isMobile = useIsMobile();
  const { state } = useDeveloper();
  const [selectedIntegrationId, setSelectedIntegrationId] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [showPermissionLevel, setShowPermissionLevel] = useState(false);
  const [permissionPreset, setPermissionPreset] = useState<PermissionPreset>(
    state.preferences.defaultPermissionPreset || "standard",
  );

  const availableIntegrations = PREDEFINED_INTEGRATIONS.filter(
    (integration) =>
      !state.connectedIntegrations.some(
        (connected) => connected.id === integration.id,
      ),
  );

  const selectedIntegration = availableIntegrations.find(
    (i) => i.id === selectedIntegrationId,
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!selectedIntegration) {
        return;
      }

      if (selectedIntegration.requiresApiKey && !apiKey.trim()) {
        return;
      }

      if (selectedIntegration.requiresWebhook && !webhookUrl.trim()) {
        return;
      }

      try {
        await onAdd({
          integrationId: selectedIntegration.id,
          apiKey: apiKey,
          webhookUrl: webhookUrl,
          permissionPreset: permissionPreset,
        });

        setSelectedIntegrationId("");
        setApiKey("");
        setWebhookUrl("");
        setPermissionPreset(
          state.preferences.defaultPermissionPreset || "standard",
        );
        onOpenChange(false);
      } catch (error) {
        console.error("Failed to add integration:", error);
      }
    },
    [
      selectedIntegration,
      apiKey,
      webhookUrl,
      permissionPreset,
      onAdd,
      onOpenChange,
      state.preferences.defaultPermissionPreset,
    ],
  );

  const handleCancel = useCallback(() => {
    setSelectedIntegrationId("");
    setApiKey("");
    setWebhookUrl("");
    setPermissionPreset(
      state.preferences.defaultPermissionPreset || "standard",
    );
    onOpenChange(false);
  }, [onOpenChange, state.preferences.defaultPermissionPreset]);

  const getTypeColor = useCallback((type: IntegrationType) => {
    const colors: Record<IntegrationType, string> = {
      oauth: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      api: "bg-green-500/10 text-green-500 border-green-500/20",
      webhook: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      ci_cd: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    };
    return colors[type] || "bg-gray-500/10 text-gray-500 border-gray-500/20";
  }, []);

  const getPresetColor = useCallback((preset: PermissionPreset) => {
    const colors: Record<PermissionPreset, string> = {
      "read-only": "text-blue-600 dark:text-blue-400",
      standard: "text-green-600 dark:text-green-400",
      "full-access": "text-orange-600 dark:text-orange-400",
      custom: "text-purple-600 dark:text-purple-400",
    };
    return colors[preset];
  }, []);

  const isFormValid = useMemo(
    () =>
      selectedIntegration &&
      (!selectedIntegration.requiresApiKey || apiKey.trim()) &&
      (!selectedIntegration.requiresWebhook || webhookUrl.trim()),
    [selectedIntegration, apiKey, webhookUrl],
  );

  const presetOptions = (
    Object.keys(PERMISSION_PRESETS) as PermissionPreset[]
  ).filter((key) => key !== "custom");

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="integration">Select Integration</Label>
        <Select
          value={selectedIntegrationId}
          onValueChange={(value) => {
            setPermissionPreset(
              state.preferences.defaultPermissionPreset || "standard",
            );
            setSelectedIntegrationId(value);
          }}
          disabled={isLoading}
        >
          <SelectTrigger
            id="integration"
            className="h-auto min-h-[40px] w-full"
          >
            <SelectValue placeholder="Choose an integration">
              {selectedIntegration && (
                <div className="flex items-center gap-3 py-1">
                  <div className="bg-muted flex size-8 items-center justify-center rounded-md">
                    <Image
                      src={selectedIntegration.icon}
                      unoptimized
                      alt={selectedIntegration.name}
                      className="size-5"
                      width={20}
                      height={20}
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-medium">
                      {selectedIntegration.name}
                    </span>
                  </div>
                </div>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {availableIntegrations.map((integration) => (
              <SelectItem
                key={integration.id}
                value={integration.id}
                className="cursor-pointer py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-muted flex size-8 items-center justify-center rounded-md">
                    <Image
                      src={integration.icon}
                      unoptimized
                      alt={integration.name}
                      className="size-5"
                      width={20}
                      height={20}
                    />
                  </div>
                  <div className="flex flex-col items-start gap-0.5">
                    <span className="font-medium">{integration.name}</span>
                    <span className="text-muted-foreground line-clamp-1 text-xs">
                      {integration.description}
                    </span>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedIntegration && (
        <div className="bg-muted/50 space-y-4 rounded-lg border p-4">
          <div className="flex items-center gap-3">
            <div className="bg-background flex size-10 items-center justify-center rounded-lg">
              <Image
                src={selectedIntegration.icon}
                unoptimized
                alt={selectedIntegration.name}
                className="size-6"
                width={24}
                height={24}
              />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{selectedIntegration.name}</h3>
                <Badge
                  variant="outline"
                  className={cn(
                    "text-xs",
                    getTypeColor(selectedIntegration.type),
                  )}
                >
                  {selectedIntegration.type.toUpperCase().replace("_", "/")}
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm">
                {selectedIntegration.description}
              </p>
            </div>
            <Link
              href={selectedIntegration.documentationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:bg-muted inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:underline"
            >
              Docs
              <ExternalLink className="size-3.5" />
            </Link>
          </div>
        </div>
      )}

      {selectedIntegration?.requiresApiKey && (
        <div className="space-y-2">
          <Label htmlFor="api-key">API Key</Label>
          <Input
            id="api-key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your API key"
            disabled={isLoading}
          />
        </div>
      )}

      {selectedIntegration?.requiresWebhook && (
        <div className="space-y-2">
          <Label htmlFor="webhook-url">Webhook URL</Label>
          <Input
            id="webhook-url"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            placeholder="Enter your webhook URL"
            disabled={isLoading}
          />
        </div>
      )}
      {selectedIntegration && (
        <button
          type="button"
          onClick={() => setShowPermissionLevel((prev) => !prev)}
          className="hover:bg-muted/50 flex w-full items-center justify-between rounded-lg border p-3 transition-all"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-primary size-4" />
            <span className="text-sm font-medium">Permission Level</span>
            <Badge variant="outline" className="text-xs">
              {PERMISSION_PRESETS[permissionPreset].label}
            </Badge>
          </div>
          <ChevronDown
            className={cn(
              "text-muted-foreground size-4 transition-transform duration-200",
              showPermissionLevel && "rotate-180",
            )}
          />
        </button>
      )}

      {/* Permission Preset Selection */}
      {showPermissionLevel && (
        <div className="animate-in fade-in-0 slide-in-from-top-2 space-y-3 duration-200">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">
              Choose Permission Preset
            </Label>
            {/* <Link
              href="#"
              className="text-primary inline-flex items-center gap-1 text-xs hover:underline"
            >
              Learn more
              <ExternalLink className="size-3" />
            </Link> */}
          </div>

          <RadioGroup
            value={permissionPreset}
            onValueChange={(value) =>
              setPermissionPreset(value as PermissionPreset)
            }
            disabled={isLoading}
            className="space-y-2.5"
          >
            {presetOptions.map((preset) => {
              const config = PERMISSION_PRESETS[preset];
              const isSelected = permissionPreset === preset;

              return (
                <label
                  key={preset}
                  htmlFor={preset}
                  className={cn(
                    "group relative block cursor-pointer rounded-lg border-2 transition-all",
                    isSelected
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "hover:border-muted-foreground/30 bg-muted/30 hover:bg-muted/50 border-transparent",
                    isLoading && "pointer-events-none opacity-50",
                  )}
                >
                  <div className="flex gap-3 p-4">
                    <RadioGroupItem
                      value={preset}
                      id={preset}
                      className={cn(
                        "mt-1 transition-all",
                        isSelected && "border-primary",
                      )}
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={cn(
                            "text-base font-semibold transition-colors",
                            getPresetColor(preset),
                          )}
                        >
                          {config.label}
                        </div>
                        {isSelected && (
                          <Badge
                            variant="default"
                            className="animate-in fade-in-0 zoom-in-95 bg-primary text-xs duration-200"
                          >
                            Selected
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {config.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {config.permissions.repository !== "none" && (
                          <Badge
                            variant="secondary"
                            className={cn(
                              "text-xs",
                              isSelected &&
                                "bg-primary/10 text-primary border-primary/20",
                            )}
                          >
                            {config.permissions.repository} repos
                          </Badge>
                        )}
                        {config.permissions.canTriggerBuilds && (
                          <Badge
                            variant="secondary"
                            className={cn(
                              "text-xs",
                              isSelected &&
                                "bg-primary/10 text-primary border-primary/20",
                            )}
                          >
                            trigger builds
                          </Badge>
                        )}
                        {config.permissions.canManageTeams && (
                          <Badge
                            variant="secondary"
                            className={cn(
                              "text-xs",
                              isSelected &&
                                "bg-primary/10 text-primary border-primary/20",
                            )}
                          >
                            manage teams
                          </Badge>
                        )}
                        {config.permissions.organization === "admin" && (
                          <Badge
                            variant="secondary"
                            className={cn(
                              "text-xs",
                              isSelected &&
                                "bg-primary/10 text-primary border-primary/20",
                            )}
                          >
                            admin access
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="bg-primary absolute inset-x-0 bottom-0 h-0.5" />
                  )}
                </label>
              );
            })}
          </RadioGroup>

          <Alert className="border-primary/20 bg-primary/5">
            <Info className="text-primary size-4" />
            <AlertDescription className="text-muted-foreground text-xs leading-relaxed">
              You can customize individual permissions after adding the
              integration from the integration settings page.
            </AlertDescription>
          </Alert>
        </div>
      )}
    </form>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Add New Integration</DrawerTitle>
            <DrawerDescription>
              Connect a new third-party service to your account.
            </DrawerDescription>
          </DrawerHeader>

          <div className="max-h-[60vh] overflow-y-auto px-4 pb-4">
            {formContent}
          </div>

          <DrawerFooter className="pt-2">
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading || !isFormValid}
            >
              {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
              Add Integration
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Integration</DialogTitle>
          <DialogDescription>
            Connect a new third-party service to your account.
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[70vh] overflow-y-auto py-4">{formContent}</div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={isLoading || !isFormValid}
          >
            {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
            Add Integration
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
