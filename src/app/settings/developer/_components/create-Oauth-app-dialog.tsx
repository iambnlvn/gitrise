"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { NewOAuthAppConfig } from "./developer-types";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
} from "@/components/ui/drawer";
import { Loader2 } from "lucide-react";

interface CreateOAuthAppDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (config: NewOAuthAppConfig) => Promise<void>;
  isLoading?: boolean;
}

/**
 * Dialog for creating new OAuth applications.
 */
export function CreateOAuthAppDialog({
  open,
  onOpenChange,
  onCreate,
  isLoading,
}: CreateOAuthAppDialogProps) {
  const isMobile = useIsMobile();
  const [appName, setAppName] = useState("");
  const [callbackUrl, setCallbackUrl] = useState("");
  const [description, setDescription] = useState("");

  const handleClose = useCallback(() => {
    setAppName("");
    setCallbackUrl("");
    setDescription("");
    onOpenChange(false);
  }, [onOpenChange]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (appName.trim() && callbackUrl.trim()) {
        await onCreate({
          name: appName,
          callback: callbackUrl,
          description,
        });
        handleClose();
      }
    },
    [appName, callbackUrl, description, onCreate, handleClose],
  );

  const formContent = (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="app-name">Application Name</Label>
          <Input
            id="app-name"
            placeholder="My CI/CD Platform"
            value={appName}
            onChange={(e) => setAppName(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="callback-url">Authorization Callback URL</Label>
          <Input
            id="callback-url"
            type="url"
            placeholder="https://gitrise.com/callback"
            value={callbackUrl}
            onChange={(e) => setCallbackUrl(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="app-description">Application Description</Label>
          <Textarea
            id="app-description"
            placeholder="Describe your application"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <DialogFooter className="mt-6">
        <Button type="button" variant="outline" onClick={handleClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          Register Application
        </Button>
      </DialogFooter>
    </form>
  );

  if (isMobile) {
    return (
      <Drawer
        open={open}
        onOpenChange={onOpenChange}
        onClose={() => handleClose()}
      >
        <DrawerContent>
          <DrawerHeader>
            <DialogTitle>Register OAuth Application</DialogTitle>
            <DrawerDescription>
              Create a new OAuth app for third-party integrations
            </DrawerDescription>
          </DrawerHeader>

          <div className="max-h-[60vh] overflow-y-auto px-4 pb-4">
            {formContent}
          </div>
        </DrawerContent>
        <DrawerFooter className="pt-2">
          <Button type="submit" onClick={handleSubmit} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
            Add Application
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </DrawerFooter>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Register OAuth Application</DialogTitle>
          <DialogDescription>
            Create a new OAuth app for third-party integrations
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="app-name">Application Name</Label>
              <Input
                id="app-name"
                placeholder="My CI/CD Platform"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="callback-url">Authorization Callback URL</Label>
              <Input
                id="callback-url"
                type="url"
                placeholder="https://gitrise.com/callback"
                value={callbackUrl}
                onChange={(e) => setCallbackUrl(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="app-description">Application Description</Label>
              <Textarea
                id="app-description"
                placeholder="Describe your application"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              Register Application
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
