"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
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
import {
  Download,
  Trash2,
  Eye,
  Shield,
  HelpCircle,
  Loader2,
  FileText,
  MapPin,
  Monitor,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ActivityLog = {
  id: string;
  action: string;
  timestamp: string;
  ipAddress: string;
  location: string;
  device: string;
};

export function PrivacySettings() {
  const [hasChanges, setHasChanges] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const router = useRouter();

  const [activityLogs] = useState<ActivityLog[]>([
    {
      id: "1",
      action: "Signed in",
      timestamp: "2 hours ago",
      ipAddress: "192.168.1.1",
      location: "San Francisco, CA",
      device: "Chrome on macOS",
    },
    {
      id: "2",
      action: "Updated profile",
      timestamp: "5 hours ago",
      ipAddress: "192.168.1.1",
      location: "San Francisco, CA",
      device: "Chrome on macOS",
    },
    {
      id: "3",
      action: "Created repository",
      timestamp: "1 day ago",
      ipAddress: "192.168.1.1",
      location: "San Francisco, CA",
      device: "Chrome on macOS",
    },
  ]);

  const handleDataExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      toast("Data export requested! You'll receive an email when it's ready.", {
        description:
          "Your data export is being prepared and will be sent to your email shortly.",
        duration: 8000,
      });
    }, 2000);
  };

  const handleDeleteAccount = () => {
    router.push("/settings/delete-account");
  };

  return (
    <TooltipProvider>
      <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6 duration-500">
        <div>
          <h2 className="text-foreground text-2xl font-bold">Privacy & Data</h2>
          <p className="text-muted-foreground mt-1">
            Control your data and privacy settings
          </p>
        </div>

        {/* Profile Visibility */}
        <Card className="bg-card border-border p-6 transition-all duration-200 hover:shadow-lg hover:shadow-[#947bd3]/5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Eye className="h-5 w-5 text-[#947bd3]" />
              <h3 className="text-lg font-semibold">Profile Visibility</h3>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <HelpCircle className="text-muted-foreground h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  Control who can see your profile and activity on GitRise.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="profileVisibility">
                Who can see your profile
              </Label>
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
        </Card>

        {/* Repository Privacy */}
        <Card className="bg-card border-border p-6 transition-all duration-200 hover:shadow-lg hover:shadow-[#947bd3]/5">
          <div className="mb-4 flex items-center gap-3">
            <Shield className="h-5 w-5 text-[#947bd3]" />
            <h3 className="text-lg font-semibold">Repository Privacy</h3>
          </div>
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
        </Card>

        {/* Activity Logs */}
        <Card className="bg-card border-border p-6 transition-all duration-200 hover:shadow-lg hover:shadow-[#947bd3]/5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-[#947bd3]" />
              <h3 className="text-lg font-semibold">Activity Logs</h3>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="bg-transparent transition-all duration-200"
            >
              View All
            </Button>
          </div>
          <div className="space-y-3">
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
                    <MapPin className="h-3 w-3" />
                    <span>{log.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Monitor className="h-3 w-3" />
                    <span>{log.device}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs">{log.ipAddress}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Data Collection */}
        <Card className="bg-card border-border p-6 transition-all duration-200 hover:shadow-lg hover:shadow-[#947bd3]/5">
          <h3 className="mb-4 text-lg font-semibold">Data Collection</h3>
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
        </Card>

        {/* Data Export */}
        <Card className="bg-card border-border p-6 transition-all duration-200 hover:shadow-lg hover:shadow-[#947bd3]/5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Download className="h-5 w-5 text-[#947bd3]" />
              <h3 className="text-lg font-semibold">Data Export</h3>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <HelpCircle className="text-muted-foreground h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  Download a complete copy of your GitRise data in compliance
                  with GDPR regulations.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
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
                <Loader2 className="h-4 w-4 animate-spin" />
                Requesting Export...
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Request Data Export
              </>
            )}
          </Button>
          <p className="text-muted-foreground mt-2 text-xs">
            You&apos;ll receive an email when your export is ready (usually
            within 24 hours)
          </p>
        </Card>

        {/* Delete Account */}
        <Card className="bg-card border-destructive/20 hover:shadow-destructive/10 p-6 transition-all duration-200 hover:shadow-lg">
          <div className="mb-4 flex items-center gap-3">
            <Trash2 className="text-destructive h-5 w-5" />
            <h3 className="text-destructive text-lg font-semibold">
              Delete Account
            </h3>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm">
              Permanently delete your GitRise account and all associated data.
              This action cannot be undone.
            </p>
            <div className="bg-destructive/5 border-destructive/20 rounded-lg border p-4">
              <p className="text-destructive mb-2 text-sm font-medium">
                This will delete:
              </p>
              <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
                <li>All repositories and code</li>
                <li>Issues and pull requests</li>
                <li>Comments and discussions</li>
                <li>Account settings and preferences</li>
              </ul>
            </div>
            <Button
              variant="destructive"
              className="hover:shadow-destructive/30 gap-2 transition-all duration-200 hover:shadow-lg"
              onClick={handleDeleteAccount}
            >
              <Trash2 className="h-4 w-4" />
              Delete Account
            </Button>
          </div>
        </Card>

        {/* Action Buttons */}
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
    </TooltipProvider>
  );
}
