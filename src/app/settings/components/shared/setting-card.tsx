import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

/**
 *
 * @interface SettingCardProps
 * @property {string} title - Card title
 * @property {string} [description] - Optional description below title
 * @property {string} tooltip - Help text shown in tooltip
 * @property {React.ReactNode} children - Card content
 * @property {React.ReactNode} [icon] - Optional icon displayed with title
 */
interface SettingCardProps {
  title: string;
  description?: string;
  tooltip: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

/**
 * Card component wrapping a group of related settings.
 * Provides consistent styling and help tooltip for setting groups.
 */
export function SettingCard({
  title,
  description,
  tooltip,
  children,
  icon,
}: SettingCardProps) {
  return (
    <Card className="bg-card border-border p-6 transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/5">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          {icon && <div className="mt-1 text-purple-500">{icon}</div>}
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            {description && (
              <p className="text-muted-foreground mt-1 text-sm">
                {description}
              </p>
            )}
          </div>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="size-6">
                <HelpCircle className="text-muted-foreground size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {children}
    </Card>
  );
}
