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
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Loader2 } from "lucide-react";
import type { NewSSHKeyConfig } from "./developer-types";
import { useIsMobile } from "@/hooks/use-mobile";

interface AddSSHKeyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (config: NewSSHKeyConfig) => Promise<void>;
  isLoading?: boolean;
}

/**
 * Dialog/Drawer for adding new SSH keys.
 * Shows as a dialog on desktop and a drawer on mobile.
 */
export function AddSSHKeyDialog({
  open,
  onOpenChange,
  onAdd,
  isLoading,
}: AddSSHKeyDialogProps) {
  const isMobile = useIsMobile();
  const [keyName, setKeyName] = useState("");
  const [keyContent, setKeyContent] = useState("");

  const handleClose = useCallback(() => {
    setKeyName("");
    setKeyContent("");
    onOpenChange(false);
  }, [onOpenChange]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (keyName.trim() && keyContent.trim()) {
        await onAdd({ name: keyName, content: keyContent });
        handleClose();
      }
    },
    [keyName, keyContent, onAdd, handleClose],
  );

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="ssh-name">Key Name</Label>
        <Input
          id="ssh-name"
          placeholder="e.g., MacBook Pro"
          value={keyName}
          onChange={(e) => setKeyName(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="ssh-key">Public Key</Label>
        <Textarea
          id="ssh-key"
          placeholder="Paste your SSH public key (ssh-rsa AAAA...)"
          rows={5}
          value={keyContent}
          onChange={(e) => setKeyContent(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>
    </form>
  );
  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Add SSH Key</DrawerTitle>
            <DrawerDescription>
              Add a new SSH key for secure Git operations
            </DrawerDescription>
          </DrawerHeader>

          <div className="px-4 pb-4">{formContent}</div>

          <DrawerFooter className="pt-2">
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading || !keyName.trim() || !keyContent.trim()}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add SSH Key
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
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add SSH Key</DialogTitle>
          <DialogDescription>
            Add a new SSH key for secure Git operations
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">{formContent}</div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={isLoading || !keyName.trim() || !keyContent.trim()}
          >
            {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
            Add SSH Key
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
