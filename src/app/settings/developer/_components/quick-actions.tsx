"use client";

import { Key, Code, FileKey, ExternalLink, ChevronRight } from "lucide-react";

interface QuickActionsSectionProps {
  onCreateToken: () => void;
  onRegisterOAuth: () => void;
  onAddSSHKey: () => void;
}

/**
 * Quick actions section component.
 *
 * Provides quick access buttons for common developer tasks.
 */
export function QuickActionsSection({
  onCreateToken,
  onRegisterOAuth,
  onAddSSHKey,
}: QuickActionsSectionProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <button
        onClick={onCreateToken}
        className="group border-border bg-card hover:border-primary/50 relative flex flex-col items-start gap-3 rounded-lg border p-4 text-left shadow-sm transition-all duration-200 hover:shadow-md"
      >
        <div className="bg-primary/10 group-hover:bg-primary/20 flex h-10 w-10 items-center justify-center rounded-lg transition-colors">
          <Key className="text-primary size-5" />
        </div>
        <div>
          <div className="text-sm font-semibold">Create Token</div>
          <div className="text-muted-foreground text-xs">
            Generate API access
          </div>
        </div>
        <ChevronRight className="text-muted-foreground absolute top-4 right-4 size-4 opacity-0 transition-opacity group-hover:opacity-100" />
      </button>

      <button
        onClick={onRegisterOAuth}
        className="group border-border bg-card hover:border-primary/50 relative flex flex-col items-start gap-3 rounded-lg border p-4 text-left shadow-sm transition-all duration-200 hover:shadow-md"
      >
        <div className="bg-primary/10 group-hover:bg-primary/20 flex size-10 items-center justify-center rounded-lg transition-colors">
          <Code className="text-primary size-5" />
        </div>
        <div>
          <div className="text-sm font-semibold">Register OAuth App</div>
          <div className="text-muted-foreground text-xs">Create OAuth app</div>
        </div>
        <ChevronRight className="text-muted-foreground absolute top-4 right-4 size-4 opacity-0 transition-opacity group-hover:opacity-100" />
      </button>

      <button
        onClick={onAddSSHKey}
        className="group border-border bg-card hover:border-primary/50 relative flex flex-col items-start gap-3 rounded-lg border p-4 text-left shadow-sm transition-all duration-200 hover:shadow-md"
      >
        <div className="bg-primary/10 group-hover:bg-primary/20 flex h-10 w-10 items-center justify-center rounded-lg transition-colors">
          <FileKey className="text-primary size-5" />
        </div>
        <div>
          <div className="text-sm font-semibold">Add SSH Key</div>
          <div className="text-muted-foreground text-xs">Secure Git auth</div>
        </div>
        <ChevronRight className="text-muted-foreground absolute top-4 right-4 size-4 opacity-0 transition-opacity group-hover:opacity-100" />
      </button>

      <a
        href="#"
        className="group border-border bg-card hover:border-primary/50 relative flex flex-col items-start gap-3 rounded-lg border p-4 text-left shadow-sm transition-all duration-200 hover:shadow-md"
      >
        <div className="bg-primary/10 group-hover:bg-primary/20 flex size-10 items-center justify-center rounded-lg transition-colors">
          <ExternalLink className="text-primary size-5" />
        </div>
        <div>
          <div className="text-sm font-semibold">View API Docs</div>
          <div className="text-muted-foreground text-xs">Read docs</div>
        </div>
        <ChevronRight className="text-muted-foreground absolute top-4 right-4 size-4 opacity-0 transition-opacity group-hover:opacity-100" />
      </a>
    </div>
  );
}
