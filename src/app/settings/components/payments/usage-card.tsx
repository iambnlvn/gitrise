import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import { AlertCircle, HelpCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import {
  CartesianGrid,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Legend,
  Line,
  ReferenceLine,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

type UsageData = {
  date: string;
  storage: number;
  ciMinutes: number;
  bandwidth: number;
};

const usageData: UsageData[] = [
  { date: "Jan 1", storage: 180, ciMinutes: 1200, bandwidth: 45 },
  { date: "Jan 8", storage: 195, ciMinutes: 1450, bandwidth: 52 },
  { date: "Jan 15", storage: 210, ciMinutes: 1680, bandwidth: 58 },
  { date: "Jan 22", storage: 230, ciMinutes: 1847, bandwidth: 68 },
  { date: "Jan 29", storage: 245, ciMinutes: 2100, bandwidth: 78 },
  { date: "Feb 5", storage: 260, ciMinutes: 2300, bandwidth: 85 },
  { date: "Feb 12", storage: 275, ciMinutes: 2500, bandwidth: 90 },
  { date: "Feb 19", storage: 290, ciMinutes: 2700, bandwidth: 95 },
  { date: "Feb 26", storage: 310, ciMinutes: 2900, bandwidth: 100 },
];

const planLimits = {
  storage: 400,
  ciMinutes: 3000,
  bandwidth: 150,
};

export function UsageCard() {
  const [timeRange, setTimeRange] = useState("30days");
  const [isLoading, setIsLoading] = useState(false);
  const [visibleMetrics, setVisibleMetrics] = useState({
    storage: true,
    ciMinutes: true,
    bandwidth: true,
  });

  // Calculate current usage from the latest data point
  const latestData = usageData[usageData.length - 1];

  const toggleMetric = (metric: keyof typeof visibleMetrics) => {
    setVisibleMetrics((prev) => ({
      ...prev,
      [metric]: !prev[metric],
    }));
  };

  const formatTooltip = (value: number, name: string) => {
    if (name === "Storage (GB)") return `${value} GB`;
    if (name === "CI Minutes") return `${value} mins`;
    if (name === "Bandwidth (GB)") return `${value} GB`;
    return value;
  };

  const handleTimeRangeChange = (value: string) => {
    setIsLoading(true);
    setTimeRange(value);
    setTimeout(() => setIsLoading(false), 800);
  };

  return (
    <Card className="bg-card border-border p-6 transition-all duration-200 hover:shadow-lg hover:shadow-[#947bd3]/5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Usage Trends</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="size-6">
                <HelpCircle className="text-muted-foreground size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <div className="max-w-xs space-y-1">
                <p className="font-medium">Resource Consumption</p>
                <p className="text-muted-foreground text-sm">
                  Track your storage, CI minutes, and bandwidth over time. Click
                  on legend items to toggle visibility.
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <UsageSummaryCard
          title="Storage"
          current={latestData.storage}
          limit={planLimits.storage}
          unit="GB"
        />
        <UsageSummaryCard
          title="CI Minutes"
          current={latestData.ciMinutes}
          limit={planLimits.ciMinutes}
          unit="mins"
        />
        <UsageSummaryCard
          title="Bandwidth"
          current={latestData.bandwidth}
          limit={planLimits.bandwidth}
          unit="GB"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <MetricToggle
              label="Storage"
              isActive={visibleMetrics.storage}
              color="#7C3AED"
              onClick={() => toggleMetric("storage")}
            />
            <MetricToggle
              label="CI Minutes"
              isActive={visibleMetrics.ciMinutes}
              color="#10B981"
              onClick={() => toggleMetric("ciMinutes")}
            />
            <MetricToggle
              label="Bandwidth"
              isActive={visibleMetrics.bandwidth}
              color="#F59E0B"
              onClick={() => toggleMetric("bandwidth")}
            />
          </div>
          <Select value={timeRange} onValueChange={handleTimeRangeChange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="bg-muted/20 flex h-[300px] items-center justify-center rounded-md">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="text-primary size-8 animate-spin" />
              <p className="text-muted-foreground text-sm">
                Loading usage data...
              </p>
            </div>
          </div>
        ) : usageData.length === 0 ? (
          <div className="bg-muted/20 flex h-[300px] items-center justify-center rounded-md">
            <div className="flex max-w-xs flex-col items-center gap-2 text-center">
              <AlertCircle className="text-muted-foreground size-8" />
              <p className="font-medium">No usage data available</p>
              <p className="text-muted-foreground text-sm">
                We don&apos;t have any usage data for this time period yet.
              </p>
            </div>
          </div>
        ) : (
          <div className="relative">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={usageData}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fontSize: 12 }}
                  width={40}
                />
                <RechartsTooltip
                  formatter={formatTooltip}
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                    padding: "8px 12px",
                  }}
                  labelStyle={{ fontWeight: "bold", marginBottom: "4px" }}
                />
                <Legend
                  verticalAlign="top"
                  height={36}
                  wrapperStyle={{ paddingTop: "8px" }}
                  onClick={(e) => {
                    const metric =
                      e.dataKey === "storage"
                        ? "storage"
                        : e.dataKey === "ciMinutes"
                          ? "ciMinutes"
                          : "bandwidth";
                    toggleMetric(metric as keyof typeof visibleMetrics);
                  }}
                />

                {/* Reference lines for limits */}
                {visibleMetrics.storage && (
                  <ReferenceLine
                    y={planLimits.storage}
                    stroke="#7C3AED"
                    strokeDasharray="3 3"
                    strokeOpacity={0.7}
                  />
                )}
                {visibleMetrics.ciMinutes && (
                  <ReferenceLine
                    y={planLimits.ciMinutes}
                    stroke="#10B981"
                    strokeDasharray="3 3"
                    strokeOpacity={0.7}
                  />
                )}
                {visibleMetrics.bandwidth && (
                  <ReferenceLine
                    y={planLimits.bandwidth}
                    stroke="#F59E0B"
                    strokeDasharray="3 3"
                    strokeOpacity={0.7}
                  />
                )}

                {visibleMetrics.storage && (
                  <Line
                    type="monotone"
                    dataKey="storage"
                    stroke="#7C3AED"
                    strokeWidth={2}
                    name="Storage (GB)"
                    dot={{ r: 3 }}
                    activeDot={{ r: 5, strokeWidth: 1 }}
                    animationDuration={1500}
                  />
                )}
                {visibleMetrics.ciMinutes && (
                  <Line
                    type="monotone"
                    dataKey="ciMinutes"
                    stroke="#10B981"
                    strokeWidth={2}
                    name="CI Minutes"
                    dot={{ r: 3 }}
                    activeDot={{ r: 5, strokeWidth: 1 }}
                    animationDuration={1800}
                  />
                )}
                {visibleMetrics.bandwidth && (
                  <Line
                    type="monotone"
                    dataKey="bandwidth"
                    stroke="#F59E0B"
                    strokeWidth={2}
                    name="Bandwidth (GB)"
                    dot={{ r: 3 }}
                    activeDot={{ r: 5, strokeWidth: 1 }}
                    animationDuration={2100}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
            <div className="text-muted-foreground absolute top-6 left-12 text-xs">
              Dotted lines represent plan limits
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

const UsageSummaryCard = ({
  title,
  current,
  limit,
  unit,
}: {
  title: string;
  current: number;
  limit: number;
  unit: string;
}) => {
  const percentage = Math.round((current / limit) * 100);
  const isHigh = percentage > 80;

  return (
    <div className="rounded-md border p-3">
      <div className="mb-2 flex items-center justify-between">
        <h4 className="font-medium">{title}</h4>
        <Badge variant={isHigh ? "destructive" : "outline"}>
          {percentage}%
        </Badge>
      </div>
      <Progress value={percentage} className="mb-2 h-2" />
      <div className="text-muted-foreground flex justify-between text-sm">
        <span>
          {current} {unit}
        </span>
        <span>
          {limit} {unit}
        </span>
      </div>
    </div>
  );
};

const MetricToggle = ({
  label,
  isActive,
  color,
  onClick,
}: {
  label: string;
  isActive: boolean;
  color: string;
  onClick: () => void;
}) => {
  return (
    <Button
      variant="outline"
      size="sm"
      className={`gap-2 ${!isActive ? "opacity-50" : ""}`}
      onClick={onClick}
    >
      <span
        className="size-3 rounded-full"
        style={{
          backgroundColor: isActive ? color : "transparent",
          border: `1px solid ${color}`,
        }}
      />
      {label}
    </Button>
  );
};
