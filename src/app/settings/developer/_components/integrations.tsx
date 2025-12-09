"use client";

import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Settings } from "lucide-react";
import type { ConnectedIntegration } from "./developer-types";
import Image from "next/image";

interface IntegrationsSectionProps {
  integrations: ConnectedIntegration[];
  onToggle: (integrationId: string) => void;
  onAddNew: () => void;
  isLoading?: boolean;
}

const IntegrationItem = memo(
  ({
    integration,
    onToggle,
  }: {
    integration: ConnectedIntegration;
    onToggle: (id: string) => void;
  }) => (
    <div className="border-border bg-card rounded-lg border p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 flex size-10 items-center justify-center rounded-lg">
              <Image
                src={integration.icon}
                alt={integration.name}
                unoptimized
                width={32}
                height={32}
              />
            </div>
            <div>
              <div className="font-medium">{integration.name}</div>
              <div className="text-muted-foreground text-xs">
                {integration.description}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-1">
            <Badge variant="outline" className="text-xs">
              {integration.category}
            </Badge>
          </div>
          <div className="text-muted-foreground text-xs">
            Connected At:{" "}
            {new Date(integration.connectedAt).toLocaleDateString()}
          </div>
        </div>
        <Badge
          variant={integration.status === "active" ? "default" : "secondary"}
          className="text-xs"
        >
          {integration.status}
        </Badge>
      </div>
      <div className="mt-4 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 bg-transparent"
          onClick={() => onToggle(integration.id)}
        >
          {integration.status === "active" ? "Revoke" : "Authorize"}
        </Button>
        <Button variant="outline" size="sm">
          <Settings className="size-4" />
        </Button>
      </div>
    </div>
  ),
);

IntegrationItem.displayName = "IntegrationItem";

/**
 * Third-party integrations section.
 */
export function IntegrationsSection({
  integrations,
  onToggle,
  onAddNew,
  isLoading,
}: IntegrationsSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Integrations</h2>
          <p className="text-muted-foreground text-sm">
            Connected third-party services
          </p>
        </div>
        <Button size="sm" onClick={onAddNew} disabled={isLoading}>
          <Plus className="mr-2 size-4" />
          Add Integration
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {integrations.map((integration) => (
          <IntegrationItem
            key={integration.id}
            integration={integration}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  );
}
