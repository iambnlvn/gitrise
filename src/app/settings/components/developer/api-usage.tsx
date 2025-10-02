"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, Zap, TrendingUp, Clock } from "lucide-react";
import type { APIUsage } from "./developer-types";

interface APIUsageSectionProps {
  usage: APIUsage;
}

/**
 * API usage statistics section.
 */
export function APIUsageSection({ usage }: APIUsageSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">API Usage</h2>
          <p className="text-muted-foreground text-sm">
            Monitor consumption and rate limits
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full bg-transparent sm:w-auto"
        >
          <Download className="mr-2 size-4" />
          Export Logs
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="border-border bg-card rounded-lg border p-4 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-muted-foreground text-sm">
                Requests Today
              </div>
              <div className="mt-2 text-3xl font-bold">
                {usage.requestsToday.toLocaleString()}
              </div>
              <div className="text-muted-foreground mt-1 text-xs">
                of {usage.dailyLimit.toLocaleString()} limit
              </div>
            </div>
            <Zap className="text-primary/50 size-5" />
          </div>
        </div>

        <div className="border-border bg-card rounded-lg border p-4 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-muted-foreground text-sm">Rate Limit</div>
              <div className="mt-2 text-3xl font-bold">
                {usage.rateLimitRemaining.toLocaleString()}
              </div>
              <div className="text-muted-foreground mt-1 text-xs">
                remaining requests
              </div>
            </div>
            <TrendingUp className="size-5 text-green-600/50" />
          </div>
        </div>

        <div className="border-border bg-card rounded-lg border p-4 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-muted-foreground text-sm">Reset Time</div>
              <div className="mt-2 text-3xl font-bold">
                {usage.rateLimitReset}
              </div>
              <div className="text-muted-foreground mt-1 text-xs">
                until reset
              </div>
            </div>
            <Clock className="size-5 text-amber-600/50" />
          </div>
        </div>
      </div>

      <div className="border-border bg-card rounded-lg border p-6 shadow-sm">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="font-medium">Request History</h3>
          <Select defaultValue="7d">
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="border-border bg-muted/30 h-48 rounded-md border p-4">
          <div className="flex h-full items-end justify-around gap-2">
            {[65, 80, 45, 90, 70, 85, 60].map((height, i) => (
              <div
                key={i}
                className="bg-primary hover:bg-primary/80 w-full rounded-t transition-colors"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-muted-foreground">Success Rate</div>
            <div className="mt-1 text-xl font-semibold text-green-600 dark:text-green-500">
              {usage.successRate}%
            </div>
          </div>
          <div>
            <div className="text-muted-foreground">Failed Requests</div>
            <div className="mt-1 text-xl font-semibold text-red-600 dark:text-red-500">
              {usage.failedRequests}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
