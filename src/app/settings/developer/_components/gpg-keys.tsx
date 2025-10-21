"use client";

import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, CheckCircle2, Key } from "lucide-react";
import type { GPGKey } from "./developer-types";

interface GPGKeysSectionProps {
  keys: GPGKey[];
  onRemove: (keyId: string) => void;
  onSetPrimary: (keyId: string) => void;
  onAddNew: () => void;
  isLoading?: boolean;
}

const GPGKeyItem = memo(
  ({
    gpgKey,
    onRemove,
    onSetPrimary,
  }: {
    gpgKey: GPGKey;
    onRemove: (id: string) => void;
    onSetPrimary: (id: string) => void;
  }) => {
    return (
      <div className="group border-border bg-card hover:border-border/80 relative flex flex-col gap-4 rounded-lg border p-4 transition-all hover:shadow-md">
        {/* Header with name and badges */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2">
                <Key className="text-muted-foreground size-4" />
                <span className="text-foreground font-semibold">
                  {gpgKey.metadata?.name || "Unnamed Key"}
                </span>
              </div>
              <div className="flex gap-1">
                {gpgKey.isPrimary && (
                  <Badge className="gap-1.5 bg-green-500/10 text-green-700 hover:bg-green-500/20">
                    <CheckCircle2 className="size-3.5" />
                    Primary
                  </Badge>
                )}
                {/* compare emails to show verified badge */}
                {/* {gpgKey.verified && (
                  <Badge
                    variant="outline"
                    className="gap-1.5 border-blue-500/20 bg-blue-500/5 text-blue-700"
                  >
                    <CheckCircle2 className="size-3.5" />
                    Verified
                  </Badge>
                )} */}
              </div>
            </div>

            <div className="space-y-1.5 text-sm">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
                <span className="text-muted-foreground">
                  <span className="font-medium">Email:</span>{" "}
                  {gpgKey.metadata?.email}
                </span>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
                <span className="text-muted-foreground font-mono text-xs">
                  <span className="font-medium">Key ID:</span>{" "}
                  {gpgKey.metadata?.keyId}
                </span>
              </div>
              <div className="text-muted-foreground text-xs">
                Added {gpgKey.metadata?.createdAt}
              </div>
            </div>
          </div>

          <div className="flex w-full gap-2 sm:w-auto">
            {!gpgKey.isPrimary && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSetPrimary(gpgKey.metadata?.keyId as string)}
                className="flex-1 sm:flex-none"
              >
                Set Primary
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemove(gpgKey.metadata?.keyId as string)}
              className="text-destructive hover:bg-destructive/10 hover:text-destructive flex-1 sm:flex-none"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  },
);
GPGKeyItem.displayName = "GPGKeyItem";

const EmptyState = ({ onAddNew }: { onAddNew: () => void }) => (
  <div className="border-border bg-muted/30 flex flex-col items-center justify-center rounded-lg border border-dashed px-6 py-12 text-center">
    <div className="bg-primary/10 mb-4 rounded-full p-3">
      <Key className="text-primary size-6" />
    </div>
    <h3 className="mb-1 text-lg font-semibold">No GPG keys yet</h3>
    <p className="text-muted-foreground mb-6 max-w-xs text-sm">
      Add your first GPG key to start signing your commits and tags.
    </p>
    <Button onClick={onAddNew} className="gap-2">
      <Plus className="size-4" />
      Add Your First Key
    </Button>
  </div>
);

/**
 * GPG keys management section.
 */
export function GPGKeysSection({
  keys,
  onRemove,
  onSetPrimary,
  onAddNew,
  isLoading,
}: GPGKeysSectionProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">GPG Keys</h2>
          <p className="text-muted-foreground text-sm">
            Cryptographically sign your commits and tags
          </p>
        </div>
        <Button
          onClick={onAddNew}
          disabled={isLoading}
          className="w-full gap-2 sm:w-auto"
        >
          <Plus className="size-4" />
          Add Key
        </Button>
      </div>

      {keys.length === 0 ? (
        <EmptyState onAddNew={onAddNew} />
      ) : (
        <div className="space-y-3">
          {keys.map((key) => (
            <GPGKeyItem
              key={key.metadata?.keyId}
              gpgKey={key}
              onRemove={onRemove}
              onSetPrimary={onSetPrimary}
            />
          ))}
        </div>
      )}
    </div>
  );
}
