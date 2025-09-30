"use client";

import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Bell } from "lucide-react";
import type { SecurityAlerts } from "./security-types";

interface SecurityAlertsSectionProps {
  alerts: SecurityAlerts;
  onUpdate: (alerts: Partial<SecurityAlerts>) => Promise<void>;
  isLoading?: boolean;
}

/**
 * Security alert preferences section.
 *
 * Allows users to configure which security events
 * trigger email notifications.
 */
export function SecurityAlertsSection({
  alerts,
  onUpdate,
  isLoading,
}: SecurityAlertsSectionProps) {
  const handleToggle = async (key: keyof SecurityAlerts, value: boolean) => {
    await onUpdate({ [key]: value });
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Bell className="text-muted-foreground size-5" />
          <CardTitle>Security Alert Preferences</CardTitle>
        </div>
        <CardDescription>
          Choose which security events trigger email notifications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="failed-login-alerts" className="text-base">
              Failed Login Attempts
            </Label>
            <p className="text-muted-foreground text-sm">
              Get notified when someone fails to log in to your account
            </p>
          </div>
          <Switch
            id="failed-login-alerts"
            checked={alerts.failedLoginAlerts}
            onCheckedChange={(value) =>
              handleToggle("failedLoginAlerts", value)
            }
            disabled={isLoading}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="new-device-alerts" className="text-base">
              New Device Login
            </Label>
            <p className="text-muted-foreground text-sm">
              Get notified when your account is accessed from a new device
            </p>
          </div>
          <Switch
            id="new-device-alerts"
            checked={alerts.newDeviceAlerts}
            onCheckedChange={(value) => handleToggle("newDeviceAlerts", value)}
            disabled={isLoading}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="suspicious-activity-alerts" className="text-base">
              Suspicious Activity
            </Label>
            <p className="text-muted-foreground text-sm">
              Get notified about unusual account activity or security events
            </p>
          </div>
          <Switch
            id="suspicious-activity-alerts"
            checked={alerts.suspiciousActivityAlerts}
            onCheckedChange={(value) =>
              handleToggle("suspiciousActivityAlerts", value)
            }
            disabled={isLoading}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="email-alerts" className="text-base">
              Email Notifications
            </Label>
            <p className="text-muted-foreground text-sm">
              Master toggle for all security email notifications
            </p>
          </div>
          <Switch
            id="email-alerts"
            checked={alerts.emailEnabled}
            onCheckedChange={(value) => handleToggle("emailEnabled", value)}
            disabled={isLoading}
          />
        </div>
      </CardContent>
    </Card>
  );
}
