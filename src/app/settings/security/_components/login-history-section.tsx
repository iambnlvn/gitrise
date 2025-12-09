"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { History, MapPin, CheckCircle, XCircle } from "lucide-react";
import { LoginHistoryItem } from "../security-types";

interface LoginHistorySectionProps {
  history: LoginHistoryItem[];
}

/**
 * Login history section component.
 *
 * Displays a chronological list of login attempts
 * with location and device information.
 */
export function LoginHistorySection({ history }: LoginHistorySectionProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <History className="text-muted-foreground size-5" />
          <CardTitle>Login History</CardTitle>
        </div>
        <CardDescription>Recent login attempts to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {history.map((item) => (
            <div
              key={item.id}
              className="border-border flex items-start gap-3 rounded-lg border p-4"
            >
              <div className="mt-1">
                {item.status === "success" ? (
                  <CheckCircle className="size-5 text-green-500" />
                ) : (
                  <XCircle className="text-destructive size-5" />
                )}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-foreground font-medium">{item.device}</p>
                  <Badge
                    variant={
                      item.status === "success" ? "secondary" : "destructive"
                    }
                    className="text-xs"
                  >
                    {item.status}
                  </Badge>
                </div>
                <div className="text-muted-foreground flex items-center gap-1 text-sm">
                  <MapPin className="size-3" />
                  <span>
                    {item.location} • {item.ip}
                  </span>
                </div>
                <p className="text-muted-foreground text-xs">
                  {item.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
