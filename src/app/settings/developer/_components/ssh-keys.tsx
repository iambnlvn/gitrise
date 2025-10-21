"use client";

import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Shield } from "lucide-react";
import type { SSHKey } from "./developer-types";

interface SSHKeysSectionProps {
  keys: SSHKey[];
  onRemove: (keyId: string) => void;
  onAddNew: () => void;
  isLoading?: boolean;
}

const SSHKeyItem = memo(
  ({
    sshKey,
    onRemove,
  }: {
    sshKey: SSHKey;
    onRemove: (id: string) => void;
  }) => (
    <div className="hover:bg-muted/30 p-4 transition-colors">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1 space-y-2">
            <div className="font-medium">{sshKey.name}</div>
            <div className="text-muted-foreground font-mono text-xs break-all">
              {sshKey.fingerprint}
            </div>
            <div className="text-muted-foreground flex flex-wrap gap-2 text-xs">
              <span>Added: {sshKey.added}</span>
              <span>Last used: {sshKey.lastUsed}</span>
            </div>
          </div>
          <div className="flex w-full gap-2 sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 bg-transparent sm:flex-none"
            >
              View
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-destructive hover:text-destructive flex-1 bg-transparent sm:flex-none"
              onClick={() => onRemove(sshKey.id)}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  ),
);

SSHKeyItem.displayName = "SSHKeyItem";

/**
 * SSH keys management section.
 */
export function SSHKeysSection({
  keys,
  onRemove,
  onAddNew,
  isLoading,
}: SSHKeysSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">SSH Keys</h2>
          <p className="text-muted-foreground text-sm">
            Secure Git authentication
          </p>
        </div>
        <Button size="sm" onClick={onAddNew} disabled={isLoading}>
          <Plus className="mr-2 size-4" />
          Add Key
        </Button>
      </div>

      <div className="border-border bg-card overflow-hidden rounded-lg border shadow-sm">
        <div className="border-border bg-muted/50 border-b px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-500">
            <Shield className="size-4 flex-shrink-0" />
            <span className="font-medium">
              Remove unused keys to maintain security.
            </span>
          </div>
        </div>
        <div className="divide-border divide-y">
          {keys.map((key) => (
            <SSHKeyItem key={key.id} sshKey={key} onRemove={onRemove} />
          ))}
        </div>
      </div>
    </div>
  );
}
