"use client";

import { memo, useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Copy,
  RefreshCw,
  Trash2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import type { PersonalAccessToken } from "./developer-types";

interface PersonalAccessTokensSectionProps {
  tokens: PersonalAccessToken[];
  onRevoke: (tokenId: string) => void;
  onCreateNew: () => void;
  isLoading?: boolean;
}

const TokenItem = memo(
  ({
    token,
    onRevoke,
    onCopy,
  }: {
    token: PersonalAccessToken;
    onRevoke: (id: string) => void;
    onCopy: (id: string) => void;
  }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(() => {
      onCopy(token.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }, [token.id, onCopy]);

    return (
      <div className="hover:bg-muted/30 p-4 transition-colors">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <span className="font-medium">{token.name}</span>
              <Badge
                variant={token.status === "active" ? "default" : "secondary"}
                className="text-xs"
              >
                {token.status}
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="size-8 p-0"
                onClick={handleCopy}
              >
                {copied ? (
                  <CheckCircle2 className="size-4 text-green-600" />
                ) : (
                  <Copy className="size-4" />
                )}
              </Button>
              <Button variant="ghost" size="sm" className="size-8 p-0">
                <RefreshCw className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive size-8 p-0"
                onClick={() => onRevoke(token.id)}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap gap-1">
            {token.scopes.map((scope) => (
              <Badge key={scope} variant="outline" className="text-xs">
                {scope}
              </Badge>
            ))}
          </div>
          <div className="text-muted-foreground grid grid-cols-2 gap-2 text-xs sm:flex sm:flex-wrap sm:gap-4">
            <span>Last used: {token.lastUsed}</span>
            <span>Created: {token.created}</span>
            <span>Expires: {token.expires}</span>
          </div>
        </div>
      </div>
    );
  },
);

TokenItem.displayName = "TokenItem";

/**
 * Personal access tokens management section.
 */
export function PersonalAccessTokensSection({
  tokens,
  onRevoke,
  onCreateNew,
  isLoading,
}: PersonalAccessTokensSectionProps) {
  const handleCopy = useCallback((tokenId: string) => {
    console.log("Copying token:", tokenId);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Personal Access Tokens</h2>
          <p className="text-muted-foreground text-sm">
            Tokens for API access and automation
          </p>
        </div>
        <Button size="sm" onClick={onCreateNew} disabled={isLoading}>
          <Plus className="mr-2 size-4" />
          New Token
        </Button>
      </div>

      <div className="border-border bg-card overflow-hidden rounded-lg border shadow-sm">
        <div className="border-border bg-muted/50 border-b px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-500">
            <AlertCircle className="size-4 flex-shrink-0" />
            <span className="font-medium">
              Treat tokens like passwords. Never share them publicly.
            </span>
          </div>
        </div>
        <div className="divide-border divide-y">
          {tokens.map((token) => (
            <TokenItem
              key={token.id}
              token={token}
              onRevoke={onRevoke}
              onCopy={handleCopy}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
