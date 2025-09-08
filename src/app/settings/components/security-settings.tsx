"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Smartphone,
  Key,
  Terminal,
  Trash2,
  Plus,
  CheckCircle2,
} from "lucide-react";

export function SecuritySettings() {
  const [hasChanges, setHasChanges] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-foreground text-2xl font-bold">
          Security & Access
        </h2>
        <p className="text-muted-foreground mt-1">
          Manage your account security and access controls
        </p>
      </div>

      <Card className="bg-card border-border p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Shield className="size-5 text-[#947bd3]" />
            <div>
              <h3 className="text-lg font-semibold">
                Two-Factor Authentication
              </h3>
              <p className="text-muted-foreground mt-1 text-sm">
                Add an extra layer of security to your account
              </p>
            </div>
          </div>
          <Badge className="border-green-500/20 bg-green-500/10 text-green-500">
            <CheckCircle2 className="mr-1 size-3" />
            Enabled
          </Badge>
        </div>
        <div className="mt-4 space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start gap-2 bg-transparent"
          >
            <Smartphone className="size-4" />
            Authenticator App
            <Badge className="ml-auto" variant="secondary">
              Active
            </Badge>
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start gap-2 bg-transparent"
          >
            <Key className="size-4" />
            Security Keys
            <Badge className="ml-auto" variant="outline">
              Not configured
            </Badge>
          </Button>
        </div>
      </Card>

      <Card className="bg-card border-border p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">OAuth Applications</h3>
          <Button size="sm" className="gap-2">
            <Plus className="size-4" />
            New OAuth App
          </Button>
        </div>
        <div className="space-y-3">
          <div className="border-border flex items-center justify-between rounded-lg border p-3">
            <div>
              <p className="font-medium">GitRise CLI</p>
              <p className="text-muted-foreground text-sm">
                Last used 2 days ago
              </p>
            </div>
            <Button variant="ghost" size="sm">
              Manage
            </Button>
          </div>
          <div className="border-border flex items-center justify-between rounded-lg border p-3">
            <div>
              <p className="font-medium">GitRise Mobile</p>
              <p className="text-muted-foreground text-sm">
                Last used 1 week ago
              </p>
            </div>
            <Button variant="ghost" size="sm">
              Manage
            </Button>
          </div>
        </div>
      </Card>

      {/* Active Sessions */}
      <Card className="bg-card border-border p-6">
        <h3 className="text-lg font-semibold">Active Sessions</h3>
        <div className="space-y-3">
          <div className="border-border flex items-center justify-between rounded-lg border p-3">
            <div>
              <p className="font-medium">Chrome on macOS</p>
              <p className="text-muted-foreground text-sm">
                Night City, CA • Current session
              </p>
            </div>
            <Badge variant="secondary">Active</Badge>
          </div>
          <div className="border-border flex items-center justify-between rounded-lg border p-3">
            <div>
              <p className="font-medium">Safari on iPhone</p>
              <p className="text-muted-foreground text-sm">
                Gotham City, CA • 2 hours ago
              </p>
            </div>
            <Button variant="ghost" size="sm">
              Revoke
            </Button>
          </div>
        </div>
        <Button variant="outline" className="mt-4 w-full bg-transparent">
          Revoke all sessions
        </Button>
      </Card>

      <Card className="bg-card border-border p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Terminal className="text-muted-foreground size-5" />
            <h3 className="text-lg font-semibold">SSH Keys</h3>
          </div>
          <Button size="sm" className="gap-2">
            <Plus className="size-4" />
            Add SSH Key
          </Button>
        </div>
        <div className="space-y-3">
          <div className="border-border flex items-center justify-between rounded-lg border p-3">
            <div>
              <p className="font-mono text-sm font-medium">
                ssh-rsa AAAAB11...xYz
              </p>
              <p className="text-muted-foreground text-sm">
                Added on Feb 09, 2025
              </p>
            </div>
            <Button variant="ghost" size="icon">
              <Trash2 className="text-destructive size-4" />
            </Button>
          </div>
        </div>
      </Card>

      <Card className="bg-card border-border p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Key className="text-muted-foreground size-5" />
            <h3 className="text-lg font-semibold">Personal Access Tokens</h3>
          </div>
          <Button size="sm" className="gap-2">
            <Plus className="size-4" />
            Generate Token
          </Button>
        </div>
        <div className="space-y-3">
          <div className="border-border flex items-center justify-between rounded-lg border p-3">
            <div>
              <p className="font-medium">CI/CD Pipeline Token</p>
              <p className="text-muted-foreground text-sm">
                Expires in 30 days
              </p>
            </div>
            <Button variant="ghost" size="icon">
              <Trash2 className="text-destructive size-4" />
            </Button>
          </div>
        </div>
      </Card>

      <Card className="bg-card border-border p-6">
        <h3 className="text-lg font-semibold">Security Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Require 2FA for sensitive actions</Label>
              <p className="text-muted-foreground text-sm">
                Prompt for 2FA when performing critical operations
              </p>
            </div>
            <Switch
              defaultChecked
              onCheckedChange={() => setHasChanges(true)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email security alerts</Label>
              <p className="text-muted-foreground text-sm">
                Get notified of suspicious activity
              </p>
            </div>
            <Switch
              defaultChecked
              onCheckedChange={() => setHasChanges(true)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto-logout inactive sessions</Label>
              <p className="text-muted-foreground text-sm">
                Automatically end sessions after 30 days
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
          className="bg-[#947bd3] text-white hover:bg-[#a58ddb]"
          disabled={!hasChanges}
        >
          Save changes
        </Button>
        <Button
          variant="outline"
          disabled={!hasChanges}
          onClick={() => setHasChanges(false)}
        >
          Reset to default
        </Button>
      </div>
    </div>
  );
}
