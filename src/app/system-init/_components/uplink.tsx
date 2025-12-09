"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { WIZARD_COMMUNICATION_TOOLS, WIZARD_GIT_PROVIDERS } from "../constants";
import Image from "next/image";
import { useWizardStore } from "@/app/stores/wizard-store";
import {
  ArrowRight,
  ExternalLink,
  GitBranch,
  Info,
  MessageSquare,
  Settings,
  Star,
  Webhook,
  X,
} from "lucide-react";
import { SectionHeader } from "./shared";

export function UplinkStep() {
  const {
    data: { uplink: data },
    updateData,
  } = useWizardStore();

  const addWebhook = () => {
    updateData("uplink", {
      webhooks: [...data.webhooks, ""],
    });
  };

  const updateWebhook = (index: number, value: string) => {
    const newWebhooks = [...data.webhooks];
    newWebhooks[index] = value;
    updateData("uplink", { webhooks: newWebhooks });
  };

  const removeWebhook = (index: number) => {
    const newWebhooks = data.webhooks.filter((_, i) => i !== index);
    updateData("uplink", { webhooks: newWebhooks });
  };

  const handleGitProviderSelect = (providerId: string) => {
    updateData("uplink", {
      gitProvider: data.gitProvider === providerId ? null : providerId,
    });
  };

  const handleCommunicationToggle = (toolId: string) => {
    updateData("uplink", {
      [toolId]: toolId === "slack" ? !data.slack : !data.discord,
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-foreground text-3xl font-bold">Integration</h2>
        <p className="text-muted-foreground mt-2">
          Connect your external nodes to enhance your system
        </p>
        <Badge variant="secondary" className="bg-foreground text-muted mt-3">
          Optional but recommended
        </Badge>
      </div>

      <div className="space-y-3">
        <SectionHeader
          icon={GitBranch}
          title="Git Provider"
          description="Choose your preferred Git provider"
        />

        {/**  TODO: redesign this ui or maybe create a new ui for mobile
         *currently not fully responsive nor clean
         * Consider using a more compact layout for smaller screens
         * Explore using a modal or drawer for mobile views
         * Connecting integrations ui to be added
         **
         */}
        <div className="flex flex-col gap-3">
          {WIZARD_GIT_PROVIDERS.map((provider) => {
            const isSelected = data.gitProvider === provider.id;

            return (
              <button
                key={provider.id}
                onClick={() => handleGitProviderSelect(provider.id)}
                className={cn(
                  "flex h-15 items-center gap-4 rounded-xl p-4 text-left transition-all",
                  isSelected
                    ? "bg-primary shadow-sm"
                    : "bg-foreground hover:shadow-sm",
                )}
              >
                <Image
                  src={provider.icon}
                  alt={`${provider.name} icon`}
                  className="size-8 rounded-lg"
                  width={20}
                  height={20}
                  unoptimized
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-muted font-medium">{provider.name}</p>
                    {provider.recommended && (
                      <Badge className="gap-1 bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                        <Star className="size-3" />
                        Recommended
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {provider.description}
                  </p>
                </div>
                {isSelected ? (
                  <div className="bg-primary text-secondary flex size-8 items-center justify-center rounded-full shadow-md">
                    ✓
                  </div>
                ) : (
                  <div className="text-primary flex items-center gap-2 text-sm">
                    Connect
                    <ExternalLink className="size-3" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <SectionHeader
          icon={MessageSquare}
          title="Communication Tools"
          description="Enable notifications via your favorite platforms"
        />
        <div className="grid gap-3 md:grid-cols-2">
          {WIZARD_COMMUNICATION_TOOLS.map((tool) => {
            const isConnected = tool.id === "slack" ? data.slack : data.discord;

            return (
              <button
                key={tool.id}
                onClick={() => handleCommunicationToggle(tool.id)}
                className={cn(
                  "flex h-20 items-center gap-4 rounded-xl p-4 text-left transition-all",
                  isConnected
                    ? "bg-primary shadow-sm"
                    : "bg-foreground hover:shadow-sm",
                )}
              >
                <Image
                  src={tool.icon}
                  alt={`${tool.name} icon`}
                  className="size-8 rounded-lg"
                  width={32}
                  height={32}
                  unoptimized
                />
                <div className="flex-1">
                  <p className="text-muted font-medium">{tool.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {tool.description}
                  </p>
                </div>
                {isConnected && (
                  <div className="text-secondary flex size-6 items-center justify-center rounded-full bg-emerald-500 text-xs shadow-md">
                    ✓
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* TODO: redesign the webhook section */}
      <div className="space-y-3">
        <SectionHeader
          icon={Webhook}
          title="Webhooks"
          description="Set up webhooks to receive build and deployment notifications"
        />
        <div className="space-y-3">
          {data.webhooks.map((webhook, index) => (
            <div key={index} className="flex gap-2">
              <Input
                placeholder="https://your-webhook-url.com/endpoint"
                value={webhook}
                onChange={(e) => updateWebhook(index, e.target.value)}
                className="flex-1 border-gray-300 bg-white font-mono text-sm shadow-sm"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeWebhook(index)}
                className="size-10 text-gray-400 hover:bg-red-50 hover:text-red-600"
                aria-label="Remove webhook"
              >
                <X className="size-4" />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            onClick={addWebhook}
            className="w-full gap-2 border-dashed border-gray-300 bg-transparent"
          >
            <Webhook className="size-4" />
            Add Webhook
          </Button>
        </div>
        <p className="text-xs text-gray-500">
          Webhooks receive POST requests for build events and deployments.
        </p>
      </div>

      {/* TODO: redesign the skip notice */}
      <div className="bg-muted relative overflow-hidden rounded-xl p-6">
        <div className="absolute -top-4 -right-4 size-24 rounded-full bg-blue-100/50"></div>
        <div className="absolute -bottom-2 -left-2 size-16 rounded-full bg-indigo-100/30"></div>

        <div className="relative flex items-start gap-3">
          <div className="flex size-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <Info className="size-4" />
          </div>
          <div className="flex-1">
            <h4 className="text-foreground mb-1 font-medium">
              Skip for now? No problem!
            </h4>
            <p className="text-muted-foreground mb-3 text-sm">
              You can set up these integrations anytime from your dashboard
              settings. They&apos;ll help streamline your workflow once
              you&apos;re ready.
            </p>
            <div className="flex items-center gap-2 text-xs text-blue-600">
              <Settings className="size-3" />
              <span className="flex items-center">
                Available in Settings
                <ArrowRight className="mx-0.5 size-3" />
                Integrations
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
