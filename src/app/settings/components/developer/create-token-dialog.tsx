"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Copy, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { TOKEN_SCOPES } from "./constants";
import type { NewTokenConfig } from "./developer-types";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

interface CreateTokenDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGenerate: (config: NewTokenConfig) => Promise<string>;
  isLoading?: boolean;
}

/**
 * Dialog for creating new personal access tokens.
 */
export function CreateTokenDialog({
  open,
  onOpenChange,
  onGenerate,
  isLoading,
}: CreateTokenDialogProps) {
  const isMobile = useIsMobile();
  const [tokenName, setTokenName] = useState("");
  const [tokenScopes, setTokenScopes] = useState<string[]>([]);
  const [generatedToken, setGeneratedToken] = useState("");
  const [copied, setCopied] = useState(false);

  const handleClose = useCallback(() => {
    setTokenName("");
    setTokenScopes([]);
    setGeneratedToken("");
    setCopied(false);
    onOpenChange(false);
  }, [onOpenChange]);

  const toggleScope = useCallback((scopeId: string) => {
    setTokenScopes((prev) =>
      prev.includes(scopeId)
        ? prev.filter((s) => s !== scopeId)
        : [...prev, scopeId],
    );
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!tokenName.trim() || tokenScopes.length === 0) {
      toast.error("Please provide a name and select at least one scope");
      return;
    }

    try {
      const token = await onGenerate({ name: tokenName, scopes: tokenScopes });
      setGeneratedToken(token);
    } catch (error) {
      console.error("Failed to generate token:", error);
    }
  }, [tokenName, tokenScopes, onGenerate]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(generatedToken);
    setCopied(true);
    toast.success("Token copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  }, [generatedToken]);

  const formContent = !generatedToken ? (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="token-name">Token Name</Label>
        <Input
          id="token-name"
          placeholder="e.g., GitHub Actions CI/CD"
          value={tokenName}
          onChange={(e) => setTokenName(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Scopes</Label>
        <p className="text-muted-foreground text-sm">
          Select the permissions this token will have
        </p>
        <div className="border-border bg-muted/30 max-h-60 space-y-3 overflow-y-auto rounded-lg border p-4">
          {TOKEN_SCOPES.map((scope) => (
            <div key={scope.id} className="flex items-start space-x-3">
              <Checkbox
                id={scope.id}
                checked={tokenScopes.includes(scope.id)}
                onCheckedChange={() => toggleScope(scope.id)}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor={scope.id}
                  className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {scope.label}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="space-y-4 py-4">
      <div className="rounded-lg border border-green-500/50 bg-green-500/10 p-4">
        <div className="text-sm font-medium text-green-700">
          Token Generated Successfully
        </div>
        <p className="text-muted-foreground mb-4 text-sm">
          Make sure to copy your token now. You won&apos;t be able to see it
          again!
        </p>
        <div className="flex items-center gap-2">
          <code className="bg-background flex-1 rounded border px-3 py-2 font-mono text-xs break-all">
            {generatedToken}
          </code>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="flex-shrink-0"
          >
            {copied ? (
              <CheckCircle2 className="size-4 text-green-600" />
            ) : (
              <Copy className="size-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer
        open={open}
        onOpenChange={onOpenChange}
        onClose={() => handleClose()}
      >
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Create Personal Access Token</DrawerTitle>
            <DrawerDescription>
              Generate a new token for API authentication
            </DrawerDescription>
          </DrawerHeader>
          <div className="max-h-[60vh] overflow-y-auto px-4 pb-4">
            {formContent}
          </div>
          <DrawerFooter className="pt-2">
            {!generatedToken ? (
              <>
                <Button
                  onClick={handleGenerate}
                  disabled={
                    isLoading || !tokenName.trim() || tokenScopes.length === 0
                  }
                >
                  {isLoading && (
                    <Loader2 className="mr-2 size-4 animate-spin" />
                  )}
                  Generate Token
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={handleClose}>Done</Button>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Personal Access Token</DialogTitle>
          <DialogDescription>
            Generate a new token for API authentication
          </DialogDescription>
        </DialogHeader>
        {formContent}
        <DialogFooter>
          {!generatedToken ? (
            <>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                onClick={handleGenerate}
                disabled={
                  isLoading || !tokenName.trim() || tokenScopes.length === 0
                }
              >
                Generate Token
              </Button>
            </>
          ) : (
            <Button onClick={handleClose}>Done</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
