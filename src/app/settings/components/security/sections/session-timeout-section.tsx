"use client";

import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock } from "lucide-react";
import { SESSION_TIMEOUT_OPTIONS } from "../constants";

interface SessionTimeoutSectionProps {
  timeout: string;
  onUpdate: (timeout: string) => Promise<void>;
  isLoading?: boolean;
}

/**
 * Session timeout configuration section.
 *
 * Allows users to set automatic logout duration
 * after inactivity.
 */
export function SessionTimeoutSection({
  timeout,
  onUpdate,
}: SessionTimeoutSectionProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Clock className="text-muted-foreground size-5" />
          <CardTitle>Session Timeout</CardTitle>
        </div>
        <CardDescription>
          Automatically log out after a period of inactivity
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="timeout-duration">Auto-logout after</Label>
          <Select value={timeout} onValueChange={onUpdate}>
            <SelectTrigger id="timeout-duration">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SESSION_TIMEOUT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-muted-foreground text-xs">
            You&apos;ll be automatically logged out after{" "}
            {timeout === "never" ? "no timeout" : `${timeout} hours`} of
            inactivity
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
