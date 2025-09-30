"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Key, Download, RefreshCw, AlertTriangle } from "lucide-react";
import type { RecoveryCode } from "./security-types";

interface RecoveryCodesSectionProps {
  codes: RecoveryCode[];
  onRegenerate: () => Promise<void>;
  onExport: () => void;
  isLoading?: boolean;
}

/**
 * Recovery codes section component.
 *
 * Displays 2FA recovery codes and provides options to
 * regenerate or export them.
 */
export function RecoveryCodesSection({
  codes,
  onRegenerate,
  onExport,
  isLoading,
}: RecoveryCodesSectionProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Key className="text-muted-foreground size-5" />
              <CardTitle>Recovery Codes</CardTitle>
            </div>
            <CardDescription className="mt-2">
              Use these codes to access your account if you lose your 2FA device
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={onExport}>
              <Download className="mr-2 size-4" />
              Export
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={onRegenerate}
              disabled={isLoading}
            >
              <RefreshCw className="mr-2 size-4" />
              Regenerate
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="border-border bg-muted/30 rounded-lg border p-4">
          <div className="text-muted-foreground mb-3 flex items-center gap-2 text-sm">
            <AlertTriangle className="size-4" />
            <span>
              Store these codes in a safe place. Each code can only be used
              once.
            </span>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {codes.map((rc, index) => (
              <div
                key={index}
                className="bg-background flex items-center justify-between rounded px-3 py-2"
              >
                <code
                  className={`font-mono text-sm ${rc.used ? "text-muted-foreground line-through" : "text-foreground"}`}
                >
                  {rc.code}
                </code>
                {rc.used && (
                  <Badge variant="secondary" className="text-xs">
                    Used
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
