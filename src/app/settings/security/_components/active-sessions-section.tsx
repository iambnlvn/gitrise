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
import { Monitor, Trash2, MapPin } from "lucide-react";
import type { Session } from "../security-types";

interface ActiveSessionsSectionProps {
  sessions: Session[];
  onRevoke: (sessionId: string) => Promise<void>;
  onRevokeAll: () => Promise<void>;
  isLoading?: boolean;
}

/**
 * Active sessions management section.
 *
 * Displays all active login sessions and allows users
 * to revoke individual sessions or all at once.
 */
export function ActiveSessionsSection({
  sessions,
  onRevoke,
  onRevokeAll,
  isLoading,
}: ActiveSessionsSectionProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Monitor className="text-muted-foreground size-5" />
              <CardTitle>Active Sessions</CardTitle>
            </div>
            <CardDescription className="mt-2">
              Manage devices where you&apos;re currently logged in
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onRevokeAll}
            disabled={isLoading}
          >
            Revoke All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="border-border flex items-start justify-between rounded-lg border p-4"
            >
              <div className="flex gap-3">
                <div className="mt-1">
                  <Monitor className="text-muted-foreground size-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-foreground font-medium">
                      {session.device}
                    </p>
                    {session.current && (
                      <Badge variant="secondary" className="text-xs">
                        Current
                      </Badge>
                    )}
                  </div>
                  <div className="text-muted-foreground flex items-center gap-1 text-sm">
                    <MapPin className="size-3" />
                    <span>
                      {session.location} • {session.ip}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    Last active: {session.lastActive}
                  </p>
                </div>
              </div>
              {!session.current && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRevoke(session.id)}
                  disabled={isLoading}
                >
                  <Trash2 className="text-destructive size-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
