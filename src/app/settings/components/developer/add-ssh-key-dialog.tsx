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
import type { NewSSHKeyConfig } from "./developer-types";

interface AddSSHKeyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (config: NewSSHKeyConfig) => Promise<void>;
  isLoading?: boolean;
}

/**
 * Dialog for adding new SSH keys.
 */
export function AddSSHKeyDialog({
  open,
  onOpenChange,
  onAdd,
  isLoading,
}: AddSSHKeyDialogProps) {
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add SSH Key</DialogTitle>
          <DialogDescription>
            Add a new SSH key for secure Git operations
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ssh-name">Key Name</Label>
              <Input
                id="ssh-name"
                placeholder="e.g., MacBook Pro"
                value={keyName}
                onChange={(e) => setKeyName(e.target.value)}
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
                required
              />
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              Add SSH Key
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
