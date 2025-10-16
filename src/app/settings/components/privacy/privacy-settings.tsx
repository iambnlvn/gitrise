"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { SettingActions, SettingCard, SettingHeader } from "../shared";

export function PrivacySettings() {
  const [hasChanges, setHasChanges] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleDataExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      toast.success(
        "Data export requested! You'll receive an email when it's ready.",
        {
          duration: 8000,
        },
      );
    }, 2000);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6 duration-500">
      <SettingHeader
        title="Privacy & Data Settings"
        description="Manage your account privacy preferences and data controls."
      />
      <SettingCard
        title="Profile visibility"
        tooltip="Control who can see your profile and activity on GitRise."
        description="Manage your profile visibility settings to control who can see your information and activity on GitRise."
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="profileVisibility">Who can see your profile</Label>
            <Select
              onValueChange={() => setHasChanges(true)}
              defaultValue="public"
            >
              <SelectTrigger
                id="profileVisibility"
                className="transition-all duration-200 focus:ring-2 focus:ring-[#947bd3]/20"
              >
                <SelectValue placeholder="Public" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Private</SelectItem>
                <SelectItem value="team">Team only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Show email address</Label>
              <p className="text-muted-foreground text-sm">
                Display your email on your public profile
              </p>
            </div>
            <Switch onCheckedChange={() => setHasChanges(true)} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Show activity status</Label>
              <p className="text-muted-foreground text-sm">
                Let others see when you&apos;re active
              </p>
            </div>
            <Switch
              defaultChecked
              onCheckedChange={() => setHasChanges(true)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Show contribution graph</Label>
              <p className="text-muted-foreground text-sm">
                Display your contribution activity
              </p>
            </div>
            <Switch
              defaultChecked
              onCheckedChange={() => setHasChanges(true)}
            />
          </div>
        </div>
      </SettingCard>
      {/* Repository Privacy */}
      <SettingCard
        title="Repository Privacy"
        description="Manage your repository privacy settings."
        tooltip="Control default visibility and contribution settings for your repositories."
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="defaultVisibility">
              Default repository visibility
            </Label>
            <Select
              onValueChange={() => setHasChanges(true)}
              defaultValue="private"
            >
              <SelectTrigger
                id="defaultVisibility"
                className="transition-all duration-200 focus:ring-2 focus:ring-[#947bd3]/20"
              >
                <SelectValue placeholder="Private" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Private</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Include private contributions</Label>
              <p className="text-muted-foreground text-sm">
                Show private repository activity on your profile
              </p>
            </div>
            <Switch onCheckedChange={() => setHasChanges(true)} />
          </div>
        </div>
      </SettingCard>

      {/* Activity Logs: these seem to be useless as they are technically a security settings handled in session management */}
      {/* <SettingCard
        title="Activity Logs"
        description="Review your recent account activity for security and privacy."
        tooltip="View logs of your recent account activity including sign-ins and changes."
      >
        {activityLogs.map((log) => (
          <div
            key={log.id}
            className="border-border bg-accent/50 hover:bg-accent rounded-lg border p-3 transition-all duration-200"
          >
            <div className="mb-2 flex items-start justify-between">
              <p className="font-medium">{log.action}</p>
              <Badge variant="secondary" className="text-xs">
                {log.timestamp}
              </Badge>
            </div>
            <div className="text-muted-foreground grid grid-cols-1 gap-2 text-sm md:grid-cols-3">
              <div className="flex items-center gap-2">
                <MapPin className="size-3" />
                <span>{log.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Monitor className="size-3" />
                <span>{log.device}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs">{log.ipAddress}</span>
              </div>
            </div>
          </div>
        ))}
      </SettingCard> */}

      {/* Data Collection */}
      <SettingCard
        title="Data Collection"
        description="Manage your data collection preferences."
        tooltip="Control what types of data GitRise collects about your usage."
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Analytics</Label>
              <p className="text-muted-foreground text-sm">
                Help improve GitRise with usage data
              </p>
            </div>
            <Switch
              defaultChecked
              onCheckedChange={() => setHasChanges(true)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Personalized recommendations</Label>
              <p className="text-muted-foreground text-sm">
                Get repository and user suggestions
              </p>
            </div>
            <Switch
              defaultChecked
              onCheckedChange={() => setHasChanges(true)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Marketing communications</Label>
              <p className="text-muted-foreground text-sm">
                Receive product updates and offers
              </p>
            </div>
            <Switch onCheckedChange={() => setHasChanges(true)} />
          </div>
        </div>
      </SettingCard>

      {/* Data Export */}
      <SettingCard
        title="Data Export"
        description="Request a copy of your GitRise data."
        tooltip="Download your personal data in compliance with GDPR regulations."
      >
        <p className="text-muted-foreground mb-4 text-sm">
          Download a copy of your GitRise data including repositories, issues,
          and account information.
        </p>
        <Button
          variant="outline"
          className="gap-2 bg-transparent transition-all duration-200 hover:bg-[#947bd3] hover:text-white"
          onClick={handleDataExport}
          disabled={isExporting}
        >
          {isExporting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Requesting Export...
            </>
          ) : (
            <>
              <Download className="size-4" />
              Request Data Export
            </>
          )}
        </Button>
        <p className="text-muted-foreground mt-2 text-xs">
          You&apos;ll receive an email when your export is ready (usually within
          24 hours)
        </p>
      </SettingCard>

      {/* Action Buttondivs */}
      <SettingActions
        hasChanges={hasChanges}
        onReset={() => setHasChanges(false)}
        onSave={() => {
          setHasChanges(false);
          toast.success("Privacy settings updated successfully!");
        }}
      />
    </div>
  );
}
