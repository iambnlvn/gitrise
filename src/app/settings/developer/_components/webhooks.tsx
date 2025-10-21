"use client";

import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, CheckCircle2, XCircle, Clock } from "lucide-react";
import type { Webhook } from "./developer-types";

interface WebhooksSectionProps {
  webhooks: Webhook[];
  onDelete: (webhookId: string) => void;
  onTest: (webhookId: string) => void;
  onCreateNew: () => void;
  isLoading?: boolean;
}

const WebhookItem = memo(
  ({
    webhook,
    onDelete,
    onTest,
  }: {
    webhook: Webhook;
    onDelete: (id: string) => void;
    onTest: (id: string) => void;
  }) => (
    <div className="hover:bg-muted/30 p-4 transition-colors">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <code className="bg-muted rounded px-2 py-1 font-mono text-sm break-all">
                {webhook.url}
              </code>
              <Badge
                variant={
                  webhook.status === "active" ? "default" : "destructive"
                }
                className="text-xs"
              >
                {webhook.status === "active" ? (
                  <CheckCircle2 className="mr-1 size-3" />
                ) : (
                  <XCircle className="mr-1 size-3" />
                )}
                {webhook.status}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-1">
              {webhook.events.map((event) => (
                <Badge key={event} variant="outline" className="text-xs">
                  {event}
                </Badge>
              ))}
            </div>
            <div className="text-muted-foreground grid grid-cols-2 gap-2 text-xs sm:flex sm:flex-wrap sm:gap-4">
              <span className="flex items-center gap-1">
                <Clock className="size-3" />
                {webhook.lastDelivery}
              </span>
              <span
                className={
                  webhook.responseCode === 200
                    ? "text-green-600 dark:text-green-500"
                    : "text-red-600 dark:text-red-500"
                }
              >
                {webhook.responseCode}
              </span>
              <span>{webhook.latency}</span>
            </div>
          </div>
          <div className="flex w-full gap-2 sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 bg-transparent sm:flex-none"
              onClick={() => onTest(webhook.id)}
            >
              Test
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 bg-transparent sm:flex-none"
            >
              Logs
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 bg-transparent sm:flex-none"
            >
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-destructive hover:text-destructive flex-1 bg-transparent sm:flex-none"
              onClick={() => onDelete(webhook.id)}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  ),
);

WebhookItem.displayName = "WebhookItem";

/**
 * Webhooks management section.
 */
export function WebhooksSection({
  webhooks,
  onDelete,
  onTest,
  onCreateNew,
  isLoading,
}: WebhooksSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Webhooks</h2>
          <p className="text-muted-foreground text-sm">
            Real-time event delivery
          </p>
        </div>
        <Button size="sm" onClick={onCreateNew} disabled={isLoading}>
          <Plus className="mr-2 size-4" />
          Add Webhook
        </Button>
      </div>

      <div className="border-border bg-card overflow-hidden rounded-lg border shadow-sm">
        <div className="divide-border divide-y">
          {webhooks.map((webhook) => (
            <WebhookItem
              key={webhook.id}
              webhook={webhook}
              onDelete={onDelete}
              onTest={onTest}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
