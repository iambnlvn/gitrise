"use client";

import { memo, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Copy,
  Trash2,
  CheckCircle2,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";
import type { OAuthApp } from "./developer-types";

interface OAuthAppsSectionProps {
  apps: OAuthApp[];
  onDelete: (appId: string) => void;
  onCreateNew: () => void;
  isLoading?: boolean;
}

const OAuthAppItem = memo(
  ({ app, onDelete }: { app: OAuthApp; onDelete: (id: string) => void }) => {
    const [showSecret, setShowSecret] = useState(false);
    const [copiedClientId, setCopiedClientId] = useState(false);
    const [copiedSecret, setCopiedSecret] = useState(false);

    const handleCopyClientId = useCallback(() => {
      navigator.clipboard.writeText(app.clientId);
      setCopiedClientId(true);
      setTimeout(() => setCopiedClientId(false), 2000);
    }, [app.clientId]);

    const handleCopySecret = useCallback(() => {
      navigator.clipboard.writeText(app.clientSecret);
      setCopiedSecret(true);
      setTimeout(() => setCopiedSecret(false), 2000);
    }, [app.clientSecret]);

    return (
      <div className="hover:bg-muted/30 p-4 transition-colors">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-medium">{app.name}</span>
                <Badge variant="default" className="gap-1 text-xs">
                  <CheckCircle2 className="size-3" />
                  Verified
                </Badge>
              </div>
              <div className="text-muted-foreground space-y-1 text-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium">Client ID:</span>
                  <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-xs">
                    {app.clientId}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={handleCopyClientId}
                  >
                    {copiedClientId ? (
                      <CheckCircle2 className="size-3 text-green-600" />
                    ) : (
                      <Copy className="size-3" />
                    )}
                  </Button>
                </div>
                <div>
                  <span className="font-medium">Callback:</span> {app.callback}
                </div>
                <div>Created: {app.created}</div>
                <div className="flex flex-wrap gap-1">
                  {app.permissions.map((perm) => (
                    <Badge key={perm} variant="outline" className="text-xs">
                      {perm}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex w-full gap-2 sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 bg-transparent sm:flex-none"
                onClick={() => setShowSecret(!showSecret)}
              >
                {showSecret ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
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
                onClick={() => onDelete(app.id)}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>
          {showSecret && (
            <div className="rounded-md border border-amber-500/50 bg-amber-500/10 p-3">
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <AlertCircle className="size-4 flex-shrink-0 text-amber-600 dark:text-amber-500" />
                <span className="font-medium">Client Secret:</span>
                <code className="flex-1 font-mono text-xs">
                  {app.clientSecret}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  className="size-6 p-0"
                  onClick={handleCopySecret}
                >
                  {copiedSecret ? (
                    <CheckCircle2 className="size-3 text-green-600" />
                  ) : (
                    <Copy className="size-3" />
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },
);

OAuthAppItem.displayName = "OAuthAppItem";

/**
 * OAuth applications management section.
 */
export function OAuthAppsSection({
  apps,
  onDelete,
  onCreateNew,
  isLoading,
}: OAuthAppsSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">OAuth Applications</h2>
          <p className="text-muted-foreground text-sm">
            Third-party OAuth apps
          </p>
        </div>
        <Button size="sm" onClick={onCreateNew} disabled={isLoading}>
          <Plus className="mr-2 size-4" />
          New App
        </Button>
      </div>

      <div className="border-border bg-card overflow-hidden rounded-lg border shadow-sm">
        <div className="divide-border divide-y">
          {apps.map((app) => (
            <OAuthAppItem key={app.id} app={app} onDelete={onDelete} />
          ))}
        </div>
      </div>
    </div>
  );
}
