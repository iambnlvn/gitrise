"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import {
  Code,
  Plus,
  MoreVertical,
  Trash2,
  Copy,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import type { AccessToken, NewTokenConfig } from "../security-types";
import { TOKEN_SCOPES } from "../constants";

interface AccessTokensSectionProps {
  tokens: AccessToken[];
  onGenerate: (config: NewTokenConfig) => Promise<string>;
  onRevoke: (tokenId: string) => Promise<void>;
  isLoading?: boolean;
}

/**
 * Personal access tokens section component.
 *
 * Manages API tokens for programmatic access to the account.
 */
export function AccessTokensSection({
  tokens,
  onGenerate,
  onRevoke,
  isLoading,
}: AccessTokensSectionProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tokenDialogOpen, setTokenDialogOpen] = useState(false);
  const [generatedToken, setGeneratedToken] = useState("");
  const [formData, setFormData] = useState<NewTokenConfig>({
    name: "",
    scopes: [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = await onGenerate(formData);
    setGeneratedToken(token);
    setDialogOpen(false);
    setTokenDialogOpen(true);
    setFormData({ name: "", scopes: [] });
  };

  const handleCopyToken = () => {
    navigator.clipboard.writeText(generatedToken);
    toast.success("Token copied to clipboard");
  };

  const toggleScope = (scopeId: string) => {
    setFormData((prev) => ({
      ...prev,
      scopes: prev.scopes.includes(scopeId)
        ? prev.scopes.filter((s) => s !== scopeId)
        : [...prev.scopes, scopeId],
    }));
  };

  return (
    <>
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Code className="text-muted-foreground size-5" />
                <CardTitle>Personal Access Tokens</CardTitle>
              </div>
              <CardDescription className="mt-2">
                Generate tokens for API access and automation
              </CardDescription>
            </div>
            <Button size="sm" onClick={() => setDialogOpen(true)}>
              <Plus className="mr-2 size-4" />
              Generate Token
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {tokens.length > 0 ? (
            <div className="space-y-4">
              {tokens.map((token) => (
                <div
                  key={token.id}
                  className="border-border flex items-start justify-between rounded-lg border p-4"
                >
                  <div className="flex gap-3">
                    <div className="mt-1">
                      <Code className="text-muted-foreground size-5" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-foreground font-medium">
                        {token.name}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {token.scopes.map((scope) => (
                          <Badge
                            key={scope}
                            variant="secondary"
                            className="text-xs"
                          >
                            {scope}
                          </Badge>
                        ))}
                      </div>
                      <div className="text-muted-foreground space-y-0.5 text-sm">
                        <p>Last used: {token.lastUsed}</p>
                        <p>Created: {token.createdOn}</p>
                      </div>
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
                        onClick={() => onRevoke(token.id)}
                      >
                        <Trash2 className="mr-2 size-4" />
                        Revoke Token
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          ) : (
            <div className="border-border bg-muted/30 rounded-lg border p-8 text-center">
              <Code className="text-muted-foreground mx-auto mb-3 size-12" />
              <p className="text-foreground mb-1 font-medium">
                No tokens generated
              </p>
              <p className="text-muted-foreground mb-4 text-sm">
                Create tokens to access the API and automate workflows
              </p>
              <Button size="sm" onClick={() => setDialogOpen(true)}>
                <Plus className="mr-2 size-4" />
                Generate Your First Token
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Generate Personal Access Token</DialogTitle>
            <DialogDescription>
              Create a token with specific permissions for API access
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="token-name">Token Name</Label>
                <Input
                  id="token-name"
                  placeholder="e.g., Gitrise Actions CI/CD"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
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
                        checked={formData.scopes.includes(scope.id)}
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
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading || formData.scopes.length === 0}
              >
                Generate Token
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Show Generated Token Dialog */}
      <Dialog open={tokenDialogOpen} onOpenChange={setTokenDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Your Personal Access Token</DialogTitle>
            <DialogDescription>
              Make sure to copy your token now. You won&apos;t be able to see it
              again!
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="border-border bg-muted/30 rounded-lg border p-4">
              <div className="text-muted-foreground mb-2 flex items-center gap-2 text-sm">
                <AlertCircle className="size-4" />
                <span>Copy this token and store it safely</span>
              </div>
              <div className="flex items-center gap-2">
                <code className="bg-background flex-1 rounded border px-3 py-2 font-mono text-sm">
                  {generatedToken}
                </code>
                <Button size="sm" variant="outline" onClick={handleCopyToken}>
                  <Copy className="size-4" />
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setTokenDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
