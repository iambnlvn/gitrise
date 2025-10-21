"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { WEBHOOK_EVENTS } from "../constants";
import type { NewWebhookConfig } from "../developer-types";

interface CreateWebhookDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (config: NewWebhookConfig) => Promise<void>;
  isLoading?: boolean;
}

/**
 * Dialog for creating new webhooks.
 */
export function CreateWebhookDialog({
  open,
  onOpenChange,
  onCreate,
  isLoading,
}: CreateWebhookDialogProps) {
  const [webhookUrl, setWebhookUrl] = useState("");
  const [webhookEvents, setWebhookEvents] = useState<string[]>([]);

  const handleClose = useCallback(() => {
    setWebhookUrl("");
    setWebhookEvents([]);
    onOpenChange(false);
  }, [onOpenChange]);

  const toggleEvent = useCallback((eventId: string) => {
    setWebhookEvents((prev) =>
      prev.includes(eventId)
        ? prev.filter((e) => e !== eventId)
        : [...prev, eventId],
    );
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (webhookUrl.trim() && webhookEvents.length > 0) {
        await onCreate({ url: webhookUrl, events: webhookEvents });
        handleClose();
      }
    },
    [webhookUrl, webhookEvents, onCreate, handleClose],
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Webhook</DialogTitle>
          <DialogDescription>
            Configure a new webhook endpoint
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="webhook-url">Payload URL</Label>
              <Input
                id="webhook-url"
                type="url"
                placeholder="https://gitrise.com/webhooks/push"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Events</Label>
              <p className="text-muted-foreground text-sm">
                Select which events should trigger this webhook
              </p>
              <div className="border-border bg-muted/30 max-h-60 space-y-3 overflow-y-auto rounded-lg border p-4">
                {WEBHOOK_EVENTS.map((event) => (
                  <div key={event.id} className="flex items-start space-x-3">
                    <Checkbox
                      id={`event-${event.id}`}
                      checked={webhookEvents.includes(event.id)}
                      onCheckedChange={() => toggleEvent(event.id)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor={`event-${event.id}`}
                        className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {event.label}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                isLoading || !webhookUrl.trim() || webhookEvents.length === 0
              }
            >
              Create Webhook
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
