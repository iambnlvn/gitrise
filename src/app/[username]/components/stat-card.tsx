import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface Stat {
  label: string;
  value: number;
  color: string;
}

interface StatsCardProps {
  stats: Stat[];
}

export function StatsCard({ stats }: StatsCardProps) {
  return (
    <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <p className={`text-2xl font-bold ${stat.color}`}>
                {formatValue(stat.value)}
              </p>
              <p className="text-muted-foreground text-xs">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function formatValue(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }

  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }

  return value.toString();
}
