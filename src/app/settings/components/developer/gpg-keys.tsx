"use client";

import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, CheckCircle2 } from "lucide-react";
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
  }) => (
    <div className="hover:bg-muted/30 p-4 transition-colors">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium">{gpgKey.name}</span>
              {gpgKey.verified && (
                <Badge variant="default" className="gap-1 text-xs">
                  <CheckCircle2 className="size-3" />
                  Verified
                </Badge>
              )}
              {gpgKey.primary && (
                <Badge variant="secondary" className="text-xs">
                  Primary
                </Badge>
              )}
            </div>
            <div className="text-muted-foreground space-y-1 text-sm">
              <div className="font-mono text-xs">{gpgKey.keyId}</div>
              <div>{gpgKey.email}</div>
              <div>Added: {gpgKey.added}</div>
            </div>
          </div>
          <div className="flex w-full gap-2 sm:w-auto">
            {!gpgKey.primary && (
              <Button
                variant="outline"
                size="sm"
                className="flex-1 bg-transparent sm:flex-none"
                onClick={() => onSetPrimary(gpgKey.id)}
              >
                Set Primary
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              className="text-destructive hover:text-destructive flex-1 bg-transparent sm:flex-none"
              onClick={() => onRemove(gpgKey.id)}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  ),
);

GPGKeyItem.displayName = "GPGKeyItem";

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
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">GPG Keys</h2>
          <p className="text-muted-foreground text-sm">Sign commits with GPG</p>
        </div>
        <Button size="sm" onClick={onAddNew} disabled={isLoading}>
          <Plus className="mr-2 size-4" />
          Add Key
        </Button>
      </div>

      <div className="border-border bg-card overflow-hidden rounded-lg border shadow-sm">
        <div className="divide-border divide-y">
          {keys.map((key) => (
            <GPGKeyItem
              key={key.id}
              gpgKey={key}
              onRemove={onRemove}
              onSetPrimary={onSetPrimary}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
