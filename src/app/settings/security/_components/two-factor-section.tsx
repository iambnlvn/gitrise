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
import { Switch } from "@/components/ui/switch";
import { Shield, Copy } from "lucide-react";
import { toast } from "sonner";

interface TwoFactorSectionProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => Promise<void>;
  isLoading?: boolean;
}

/**
 * Two-factor authentication section component.
 *
 * Allows users to enable/disable 2FA and shows QR code
 * for authenticator app setup.
 */
export function TwoFactorSection({
  enabled,
  onToggle,
  isLoading,
}: TwoFactorSectionProps) {
  const [verificationCode, setVerificationCode] = useState("");
  const secret = "WHATISMYLOVEDOING";

  const handleCopySecret = () => {
    navigator.clipboard.writeText(secret);
    toast.success("Secret copied to clipboard");
  };

  const handleVerify = async () => {
    if (verificationCode.length === 6) {
      await onToggle(true);
      setVerificationCode("");
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Shield className="text-muted-foreground size-5" />
              <CardTitle>Two-Factor Authentication</CardTitle>
            </div>
            <CardDescription className="mt-2">
              Add an extra layer of security to your account
            </CardDescription>
          </div>
          <Switch
            checked={enabled}
            onCheckedChange={onToggle}
            disabled={isLoading}
          />
        </div>
      </CardHeader>
      {enabled && (
        <CardContent className="space-y-4">
          <div className="border-border bg-muted/30 rounded-lg border p-4">
            <p className="text-muted-foreground text-sm">
              Scan this QR code with your authenticator app
            </p>
            <div className="mt-4 flex justify-center">
              <div className="bg-background h-48 w-48 rounded-lg p-4">
                <div className="text-muted-foreground flex h-full items-center justify-center text-xs">
                  QR Code Placeholder
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <code className="bg-background flex-1 rounded px-3 py-2 font-mono text-xs">
                {secret}
              </code>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCopySecret}
                type="button"
              >
                <Copy className="size-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="verification-code">Verification Code</Label>
            <Input
              id="verification-code"
              placeholder="Enter 6-digit code"
              maxLength={6}
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </div>
          <Button onClick={handleVerify} disabled={isLoading}>
            Verify and Enable
          </Button>
        </CardContent>
      )}
    </Card>
  );
}
