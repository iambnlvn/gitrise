"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Info, Key, CheckCircle2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { GPGKeyMetadata, NewGPGKeyConfig } from "./developer-types";
import { parseGPGKey } from "@/utils/gpg-parser";

interface AddGPGKeyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (gpgKey: NewGPGKeyConfig) => Promise<void>;
  isLoading?: boolean;
}

export function AddGPGKeyDialog({
  open,
  onOpenChange,
  onAdd,
  isLoading = false,
}: AddGPGKeyDialogProps) {
  const isMobile = useIsMobile();
  const [publicKey, setPublicKey] = useState("");
  const [metadata, setMetadata] = useState<GPGKeyMetadata | null>(null);
  const [parseError, setParseError] = useState<string>("");
  const [isParsing, setIsParsing] = useState(false);

  useEffect(() => {
    const parseKey = async () => {
      if (!publicKey.trim()) {
        setMetadata(null);
        setParseError("");
        return;
      }

      setIsParsing(true);
      setParseError("");

      try {
        const result = await parseGPGKey(publicKey);

        if ("error" in result) {
          setParseError(result.error);
          setMetadata(null);
        } else {
          setMetadata(result);
          setParseError("");
        }
      } catch {
        setParseError("Failed to parse GPG key");
        setMetadata(null);
      } finally {
        setIsParsing(false);
      }
    };

    // Debounce the parsing to avoid parsing on every keystroke
    const timeoutId = setTimeout(() => {
      parseKey();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [publicKey]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!publicKey.trim() || !metadata) {
        return;
      }

      try {
        await onAdd({
          content: publicKey.trim(),
        });

        setPublicKey("");
        setMetadata(null);
        setParseError("");
        onOpenChange(false);
      } catch (error) {
        console.error("Failed to add GPG key:", error);
      }
    },
    [publicKey, metadata, onAdd, onOpenChange],
  );

  const handleCancel = useCallback(() => {
    setPublicKey("");
    setMetadata(null);
    setParseError("");
    onOpenChange(false);
  }, [onOpenChange]);

  const isFormValid = useMemo(
    () => publicKey.trim() && metadata !== null,
    [publicKey, metadata],
  );

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Alert className="border-primary/20 bg-primary/5">
        <Key className="text-primary size-4" />
        <AlertDescription className="text-muted-foreground text-sm leading-relaxed">
          Paste your GPG public key below. We&apos;ll automatically extract and
          display the key information.
        </AlertDescription>
      </Alert>

      <div className="space-y-2">
        <Label htmlFor="public-key">GPG Public Key</Label>
        <Textarea
          id="public-key"
          value={publicKey}
          onChange={(e) => setPublicKey(e.target.value)}
          placeholder="-----BEGIN PGP PUBLIC KEY BLOCK-----&#10;&#10;-----END PGP PUBLIC KEY BLOCK-----"
          disabled={isLoading}
          required
          rows={3}
          className="h-20 font-mono text-sm md:h-36"
        />
        {isParsing && (
          <p className="text-muted-foreground flex items-center gap-2 text-xs">
            <Loader2 className="size-3 animate-spin" />
            Parsing key...
          </p>
        )}
        <p className="text-muted-foreground text-xs">
          Paste your GPG public key including the BEGIN and END lines
        </p>
      </div>

      {parseError && (
        <Alert variant="destructive">
          <AlertDescription className="text-sm">{parseError}</AlertDescription>
        </Alert>
      )}

      {metadata && (
        <Alert className="border-green-500/20 bg-green-500/5">
          <CheckCircle2 className="size-4 text-green-500" />
          <AlertDescription>
            <p className="mb-3 text-sm font-medium">
              Key Information Extracted
            </p>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="metadata-name" className="text-xs">
                  Name
                </Label>
                <Input
                  id="metadata-name"
                  value={metadata.name}
                  readOnly
                  className="bg-muted/50 text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="metadata-email" className="text-xs">
                  Email
                </Label>
                <Input
                  id="metadata-email"
                  value={metadata.email}
                  readOnly
                  className="bg-muted/50 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="metadata-comment" className="text-xs">
                  Comment
                </Label>
                <Input
                  id="metadata-comment"
                  value={metadata.comment}
                  readOnly
                  className="bg-muted/50 text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="metadata-keyid" className="text-xs">
                  Key ID
                </Label>
                <Input
                  id="metadata-keyid"
                  value={metadata.keyId}
                  readOnly
                  className="bg-muted/50 font-mono text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="metadata-fingerprint" className="text-xs">
                  Fingerprint
                </Label>
                <Input
                  id="metadata-fingerprint"
                  value={metadata.fingerprint}
                  readOnly
                  className="bg-muted/50 font-mono text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="metadata-algorithm" className="text-xs">
                    Algorithm
                  </Label>
                  <Input
                    id="metadata-algorithm"
                    value={metadata.algorithm}
                    readOnly
                    className="bg-muted/50 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="metadata-created" className="text-xs">
                  Created
                </Label>
                <Input
                  id="metadata-created"
                  value={metadata.createdAt}
                  readOnly
                  className="bg-muted/50 text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="metadata-expires" className="text-xs">
                  Expires
                </Label>
                <Input
                  id="metadata-expires"
                  value={metadata.expiresAt || "Never"}
                  readOnly
                  className="bg-muted/50 text-sm"
                />
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <Alert>
        <Info className="size-4" />
        <AlertDescription className="text-muted-foreground text-xs leading-relaxed">
          <strong>How to export your GPG key:</strong>
          <ol className="mt-2 ml-4 list-decimal space-y-1">
            <li>
              List keys:{" "}
              <code className="bg-muted px-1">
                gpg --list-secret-keys --keyid-format=long
              </code>
            </li>
            <li>
              Export:{" "}
              <code className="bg-muted px-1">
                gpg --armor --export YOUR_EMAIL
              </code>
            </li>
            <li>Copy the output and paste it above</li>
          </ol>
        </AlertDescription>
      </Alert>
    </form>
  );

  if (isMobile) {
    return (
      <Drawer
        open={open}
        onOpenChange={onOpenChange}
        onClose={() => handleCancel()}
      >
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Add GPG Key</DrawerTitle>
            <DrawerDescription>
              Add a new GPG key to sign your commits and tags.
            </DrawerDescription>
          </DrawerHeader>

          <div className="max-h-[60vh] overflow-y-auto px-4 pb-4">
            {formContent}
          </div>

          <DrawerFooter className="pt-2">
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading || !isFormValid}
            >
              {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
              Add GPG Key
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading || !isFormValid}
            >
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add GPG Key</DialogTitle>
          <DialogDescription>
            Add a new GPG key to sign your commits and tags.
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[70vh] overflow-y-auto py-4">{formContent}</div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={isLoading || !isFormValid}
          >
            {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
            Add GPG Key
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
