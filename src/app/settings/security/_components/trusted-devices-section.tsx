"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Smartphone, Monitor, Globe, MoreVertical, Trash2 } from "lucide-react";
import type { TrustedDevice, DeviceType } from "../security-types";

interface TrustedDevicesSectionProps {
  devices: TrustedDevice[];
  onRemove: (deviceId: string) => Promise<void>;
  isLoading?: boolean;
}

const getDeviceIcon = (type: DeviceType) => {
  switch (type) {
    case "mobile":
      return <Smartphone className="size-4" />;
    case "desktop":
      return <Monitor className="size-4" />;
    default:
      return <Globe className="size-4" />;
  }
};

/**
 * Trusted devices section component.
 *
 * Displays devices that don't require 2FA when logging in.
 */
export function TrustedDevicesSection({
  devices,
  onRemove,
  isLoading,
}: TrustedDevicesSectionProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Smartphone className="text-muted-foreground size-5" />
          <CardTitle>Trusted Devices</CardTitle>
        </div>
        <CardDescription>
          Devices that don&apos;t require 2FA when logging in
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {devices.map((device) => (
            <div
              key={device.id}
              className="border-border flex items-start justify-between rounded-lg border p-4"
            >
              <div className="flex gap-3">
                <div className="mt-1">{getDeviceIcon(device.type)}</div>
                <div className="space-y-1">
                  <p className="text-foreground font-medium">{device.name}</p>
                  <p className="text-muted-foreground text-sm">
                    Added on {device.addedOn}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Last used: {device.lastUsed}
                  </p>
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
                    onClick={() => onRemove(device.id)}
                  >
                    <Trash2 className="mr-2 size-4" />
                    Remove Device
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
