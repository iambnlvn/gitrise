"use client";

import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { Integration, IntegrationType } from "./developer-types";
import { useIsMobile } from "@/hooks/use-mobile";
import { INTEGRATION_TYPES } from "./constants";

interface AddIntegrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (integration: Integration) => Promise<void>;
  isLoading?: boolean;
}

export function AddIntegrationDialog({
  open,
  onOpenChange,
  onAdd,
  isLoading = false,
}: AddIntegrationDialogProps) {
  const isMobile = useIsMobile();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !type) {
      return;
    }

    try {
      await onAdd({
        id: Date.now().toString(),
        name: name.trim(),
        type: type as IntegrationType,
        description: description.trim(),
        configuration: {
          apiKey,
          webhookUrl,
          permissions: [],
        },
        status: "active",
        lastSync: "Never",
      });

      // Reset form
      resetForm();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to add integration:", error);
    }
  };

  const resetForm = () => {
    setName("");
    setType("");
    setDescription("");
    setApiKey("");
    setWebhookUrl("");
  };

  const handleCancel = () => {
    resetForm();
    onOpenChange(false);
  };

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Integration Name</Label>
        <Input
          id="name"
          placeholder="e.g., Jenkins CI, Slack"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Type</Label>
        <Select
          value={type}
          onValueChange={setType}
          disabled={isLoading}
          required
        >
          <SelectTrigger id="type">
            <SelectValue placeholder="Select integration type" />
          </SelectTrigger>
          <SelectContent>
            {INTEGRATION_TYPES.map((integrationType) => (
              <SelectItem
                key={integrationType.value}
                value={integrationType.value}
              >
                {integrationType.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description (Optional)</Label>
        <Textarea
          id="description"
          placeholder="What will this integration be used for?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isLoading}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="apiKey">API Key (Optional)</Label>
        <Input
          id="apiKey"
          type="password"
          placeholder="Enter API key if required"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="webhookUrl">Webhook URL (Optional)</Label>
        <Input
          id="webhookUrl"
          type="url"
          placeholder="https://example.com/webhook"
          value={webhookUrl}
          onChange={(e) => setWebhookUrl(e.target.value)}
          disabled={isLoading}
        />
      </div>
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

          <div className="px-4 pb-4">{formContent}</div>

          <DrawerFooter className="pt-2">
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading || !name.trim() || !type}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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

        <div className="py-4">{formContent}</div>

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
            disabled={isLoading || !name.trim() || !type}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Add Integration
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
