"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Key, Plus, MoreVertical, Trash2 } from "lucide-react";
import type { NewSecurityKeyConfig, SecurityKey } from "../security-types";

interface SecurityKeysSectionProps {
  keys: SecurityKey[];
  onAdd: (config: NewSecurityKeyConfig) => Promise<void>;
  onRemove: (keyId: string) => Promise<void>;
  isLoading?: boolean;
}

/**
 * Hardware security keys section component.
 *
 * Manages hardware security keys (like YubiKey) for
 * enhanced account security.
 */
export function SecurityKeysSection({
  keys,
  onAdd,
  onRemove,
  isLoading,
}: SecurityKeysSectionProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [keyName, setKeyName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onAdd({ name: keyName });
    setDialogOpen(false);
    setKeyName("");
  };

  return (
    <>
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Key className="text-muted-foreground size-5" />
                <CardTitle>Hardware Security Keys</CardTitle>
              </div>
              <CardDescription className="mt-2">
                Use physical security keys for enhanced protection
              </CardDescription>
            </div>
            <Button size="sm" onClick={() => setDialogOpen(true)}>
              <Plus className="mr-2 size-4" />
              Add Key
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {keys.length > 0 ? (
            <div className="space-y-4">
              {keys.map((key) => (
                <div
                  key={key.id}
                  className="border-border flex items-start justify-between rounded-lg border p-4"
                >
                  <div className="flex gap-3">
                    <div className="mt-1">
                      <Key className="text-muted-foreground size-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-foreground font-medium">{key.name}</p>
                      <p className="text-muted-foreground text-sm">
                        Added on {key.addedOn}
                      </p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" disabled={isLoading}>
                        <MoreVertical className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => onRemove(key.id)}
                      >
                        <Trash2 className="mr-2 size-4" />
                        Remove Key
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          ) : (
            <div className="border-border bg-muted/30 rounded-lg border p-8 text-center">
              <Key className="text-muted-foreground mx-auto mb-3 size-12" />
              <p className="text-foreground mb-1 font-medium">
                No security keys added
              </p>
              <p className="text-muted-foreground mb-4 text-sm">
                Add a hardware security key for stronger account protection
              </p>
              <Button size="sm" onClick={() => setDialogOpen(true)}>
                <Plus className="mr-2 size-4" />
                Add Your First Key
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Security Key</DialogTitle>
            <DialogDescription>
              Give your security key a name to help you identify it later
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="key-name">Key Name</Label>
                <Input
                  id="key-name"
                  placeholder="e.g., YubiKey 5C"
                  value={keyName}
                  onChange={(e) => setKeyName(e.target.value)}
                  required
                />
              </div>
              <div className="border-border bg-muted/30 rounded-lg border p-4">
                <p className="text-muted-foreground text-sm">
                  After clicking &quot;Add Key&quot;, you&apos;ll be prompted to
                  insert and activate your security key. Make sure your key is
                  nearby and ready to use.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                Add Key
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
