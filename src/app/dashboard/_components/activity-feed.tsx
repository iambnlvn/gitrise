import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";
import React from "react";
import { mockActivity } from "../constants";

function ActivityFeed({ activities }: { activities: typeof mockActivity }) {
  return (
    <Card className="h-fit">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <Clock className="text-primary size-5" />
          Activity Feed
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-6 pl-2">
          <div className="bg-border absolute top-2 bottom-2 left-2 w-px" />

          {activities.map((item) => (
            <div key={item.id} className="relative pl-6">
              <div className="bg-background border-border absolute top-1 left-0 flex size-4 items-center justify-center rounded-full border">
                <div className="bg-muted-foreground/50 size-1.5 rounded-full" />
              </div>

              <div className="flex flex-col gap-1">
                <div className="text-sm">
                  <span className="text-primary font-semibold">
                    {item.user}
                  </span>{" "}
                  <span className="text-muted-foreground">{item.action}</span>{" "}
                  <span className="text-primary cursor-pointer font-medium hover:underline">
                    {item.target}
                  </span>
                </div>
                {item.context && (
                  <div className="text-muted-foreground bg-muted/50 w-fit rounded p-1.5 text-xs">
                    on {item.context}
                  </div>
                )}
                <div className="mt-0.5 flex items-center gap-2">
                  <item.icon className={cn("size-3", item.iconColor)} />
                  <span className="text-muted-foreground text-xs">
                    {item.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button variant="ghost" className="mt-6 w-full text-xs" size="sm">
          View full history
        </Button>
      </CardContent>
    </Card>
  );
}

export default ActivityFeed;
