"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Globe, Plus, Trash2, CheckCircle, Ban } from "lucide-react";
import { IPRule, IPRuleType, NewIPRuleConfig } from "../security-types";

interface IPAccessControlSectionProps {
  rules: IPRule[];
  onAdd: (config: NewIPRuleConfig) => Promise<void>;
  onRemove: (ruleId: string) => Promise<void>;
  isLoading?: boolean;
}

/**
 * IP access control section component.
 *
 * Manages IP whitelist and blacklist rules for account access.
 */
export function IPAccessControlSection({
  rules,
  onAdd,
  onRemove,
  isLoading,
}: IPAccessControlSectionProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState<NewIPRuleConfig>({
    ip: "",
    type: "whitelist",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onAdd(formData);
    setDialogOpen(false);
    setFormData({ ip: "", type: "whitelist", description: "" });
  };

  return (
    <>
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Globe className="text-muted-foreground h-5 w-5" />
                <CardTitle>IP Access Control</CardTitle>
              </div>
              <CardDescription className="mt-2">
                Manage IP addresses that can access your account
              </CardDescription>
            </div>
            <Button size="sm" onClick={() => setDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Rule
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rules.map((rule) => (
              <div
                key={rule.id}
                className="border-border flex items-start justify-between rounded-lg border p-4"
              >
                <div className="flex gap-3">
                  <div className="mt-1">
                    {rule.type === "whitelist" ? (
                      <CheckCircle className="size-5 text-green-500" />
                    ) : (
                      <Ban className="text-destructive size-5" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <code className="text-foreground font-mono text-sm font-medium">
                        {rule.ip}
                      </code>
                      <Badge
                        variant={
                          rule.type === "whitelist"
                            ? "secondary"
                            : "destructive"
                        }
                        className="text-xs"
                      >
                        {rule.type}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {rule.description}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Added on {rule.addedOn}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemove(rule.id)}
                  disabled={isLoading}
                >
                  <Trash2 className="text-destructive size-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add IP Access Rule</DialogTitle>
            <DialogDescription>
              Control which IP addresses can access your account
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="ip-address">IP Address or Range</Label>
                <Input
                  id="ip-address"
                  placeholder="e.g., 192.168.1.1 or 192.168.1.0/24"
                  value={formData.ip}
                  onChange={(e) =>
                    setFormData({ ...formData, ip: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rule-type">Rule Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: IPRuleType) =>
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger id="rule-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="whitelist">Whitelist (Allow)</SelectItem>
                    <SelectItem value="blacklist">Blacklist (Block)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ip-description">Description</Label>
                <Textarea
                  id="ip-description"
                  placeholder="e.g., Office Network"
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                Add Rule
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
