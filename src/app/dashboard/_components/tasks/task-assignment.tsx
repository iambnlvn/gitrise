import { Task } from "@/app/dashboard/constants";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowRight } from "lucide-react";
/**
 * @param assignedBy - User who assigned the task
 * @param assignedTo - User to whom the task is assigned
 */
export const TaskAssignment = ({
  assignedBy,
  assignedTo,
}: {
  assignedBy: Task["assignedBy"];
  assignedTo: Task["assignedTo"];
}) => (
  <div className="flex items-center space-x-1">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Avatar className="ring-background size-6 ring-2 transition-all duration-200 hover:scale-110 hover:ring-4">
            <AvatarImage src={assignedBy.avatar} />
            <AvatarFallback className="hover:bg-muted text-xs transition-colors duration-200">
              {assignedBy.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        <TooltipContent className="animate-in fade-in-0 zoom-in-95 duration-150">
          <p>Assigned by: {assignedBy.name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

    <ArrowRight className="text-muted-foreground size-3 font-extrabold transition-all duration-200" />

    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Avatar className="ring-background size-6 ring-2 transition-all duration-200 hover:scale-110 hover:ring-4">
            <AvatarImage src={assignedTo.avatar} />
            <AvatarFallback className="hover:bg-muted text-xs transition-colors duration-200">
              {assignedTo.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        <TooltipContent className="animate-in fade-in-0 zoom-in-95 duration-150">
          <p>Assigned to: {assignedTo.name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
);
