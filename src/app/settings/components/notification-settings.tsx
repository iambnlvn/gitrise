"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Mail, MessageSquare, Smartphone, HelpCircle } from "lucide-react";

export function NotificationsSettings() {
  const [hasChanges, setHasChanges] = useState(false);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6 duration-500">
      <div>
        <h2 className="text-foreground text-2xl font-bold">Notifications</h2>
        <p className="text-muted-foreground mt-1">
          Manage how and when you receive notifications
        </p>
      </div>

      <Card className="bg-card border-border p-6 transition-all duration-200 hover:shadow-lg hover:shadow-[#947bd3]/5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Notification Channels</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="size-6">
                  <HelpCircle className="text-muted-foreground size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  Choose how you want to receive notifications from GitRise.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="space-y-4">
          <div className="hover:bg-accent flex items-center justify-between rounded-lg p-3 transition-all duration-200">
            <div className="flex items-center gap-3">
              <Mail className="text-muted-foreground size-5" />
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-muted-foreground text-sm">
                  Receive notifications via email
                </p>
              </div>
            </div>
            <Switch
              defaultChecked
              onCheckedChange={() => setHasChanges(true)}
            />
          </div>

          <div className="hover:bg-accent flex items-center justify-between rounded-lg p-3 transition-all duration-200">
            <div className="flex items-center gap-3">
              <MessageSquare className="text-muted-foreground size-5" />
              <div className="space-y-0.5">
                <Label>In-App Notifications</Label>
                <p className="text-muted-foreground text-sm">
                  Show notifications in GitRise
                </p>
              </div>
            </div>
            <Switch
              defaultChecked
              onCheckedChange={() => setHasChanges(true)}
            />
          </div>

          <div className="hover:bg-accent flex items-center justify-between rounded-lg p-3 transition-all duration-200">
            <div className="flex items-center gap-3">
              <Smartphone className="text-muted-foreground size-5" />
              <div className="space-y-0.5">
                <Label>Push Notifications</Label>
                <p className="text-muted-foreground text-sm">
                  Receive push notifications on mobile
                </p>
              </div>
            </div>
            <Switch onCheckedChange={() => setHasChanges(true)} />
          </div>
        </div>
      </Card>

      <Card className="bg-card border-border p-6 transition-all duration-200 hover:shadow-lg hover:shadow-[#947bd3]/5">
        <h3 className="mb-4 text-lg font-semibold">Activity Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Pull Requests</Label>
              <p className="text-muted-foreground text-sm">
                Updates on your pull requests
              </p>
            </div>
            <Switch
              defaultChecked
              onCheckedChange={() => setHasChanges(true)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Issues</Label>
              <p className="text-muted-foreground text-sm">
                Updates on issues you&apos;re involved in
              </p>
            </div>
            <Switch
              defaultChecked
              onCheckedChange={() => setHasChanges(true)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Comments</Label>
              <p className="text-muted-foreground text-sm">
                New comments on your activity
              </p>
            </div>
            <Switch
              defaultChecked
              onCheckedChange={() => setHasChanges(true)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Mentions</Label>
              <p className="text-muted-foreground text-sm">
                When someone mentions you
              </p>
            </div>
            <Switch
              defaultChecked
              onCheckedChange={() => setHasChanges(true)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Repository Updates</Label>
              <p className="text-muted-foreground text-sm">
                Updates from repositories you watch
              </p>
            </div>
            <Switch onCheckedChange={() => setHasChanges(true)} />
          </div>
        </div>
      </Card>

      <Card className="bg-card border-border p-6 transition-all duration-200 hover:shadow-lg hover:shadow-[#947bd3]/5">
        <h3 className="mb-4 text-lg font-semibold">Notification Frequency</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="emailFrequency">Email Digest</Label>
            <Select
              onValueChange={() => setHasChanges(true)}
              defaultValue="daily"
            >
              <SelectTrigger
                id="emailFrequency"
                className="transition-all duration-200 focus:ring-2 focus:ring-[#947bd3]/20"
              >
                <SelectValue placeholder="Daily" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="realtime">Real-time</SelectItem>
                <SelectItem value="hourly">Hourly</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="never">Never</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Do Not Disturb</Label>
              <p className="text-muted-foreground text-sm">
                Pause all notifications
              </p>
            </div>
            <Switch onCheckedChange={() => setHasChanges(true)} />
          </div>
        </div>
      </Card>
      <Card className="bg-card border-border p-6 transition-all duration-200 hover:shadow-lg hover:shadow-[#947bd3]/5">
        <h3 className="mb-4 text-lg font-semibold">Notification Filters</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Only notify for participating</Label>
              <p className="text-muted-foreground text-sm">
                Only get notifications for threads you&apos;re involved in
              </p>
            </div>
            <Switch onCheckedChange={() => setHasChanges(true)} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Ignore bot activity</Label>
              <p className="text-muted-foreground text-sm">
                Don&apos;t notify for automated bot actions
              </p>
            </div>
            <Switch
              defaultChecked
              onCheckedChange={() => setHasChanges(true)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Group similar notifications</Label>
              <p className="text-muted-foreground text-sm">
                Combine related notifications
              </p>
            </div>
            <Switch
              defaultChecked
              onCheckedChange={() => setHasChanges(true)}
            />
          </div>
        </div>
      </Card>

      <div className="flex items-center gap-3 pt-4">
        <Button
          className="bg-[#947bd3] text-white transition-all duration-200 hover:bg-[#a58ddb] hover:shadow-lg hover:shadow-[#947bd3]/30"
          disabled={!hasChanges}
        >
          Save changes
        </Button>
        <Button
          variant="outline"
          disabled={!hasChanges}
          onClick={() => setHasChanges(false)}
          className="transition-all duration-200"
        >
          Reset to default
        </Button>
      </div>
    </div>
  );
}
