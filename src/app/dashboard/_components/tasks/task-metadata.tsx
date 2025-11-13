import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Task } from "@/app/dashboard/constants";

/**
 * @param task - The task object to render metadata for
 */
const TaskMetadata = ({ task }: { task: Task }) => (
  <div className="flex flex-wrap items-center gap-3">
    <Badge
      variant="outline"
      className={cn(
        "capitalize shadow-none transition-all duration-200 hover:scale-105",
        getPriorityColor(task.priority),
      )}
    >
      {task.priority}
    </Badge>

    {task.tags?.slice(0, 2).map((tag, index) => (
      <span
        key={tag}
        className={cn(
          "text-muted-foreground text-xs font-medium transition-all duration-200",
          "hover:text-foreground transform hover:scale-105",
          "animate-in fade-in-0 slide-in-from-left-2",
        )}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        #{tag}
      </span>
    ))}
  </div>
);

/**
 * @param priority - The priority level of the task (urgent, high, medium, low)
 * @returns CSS class string with appropriate background, text and border colors
 */
const getPriorityColor = (priority: Task["priority"]) => {
  const priorityStyles = {
    urgent: "bg-red-100 text-red-700 hover:bg-red-100/80 border-red-200",
    high: "bg-orange-100 text-orange-700 hover:bg-orange-100/80 border-orange-200",
    medium: "bg-blue-100 text-blue-700 hover:bg-blue-100/80 border-blue-200",
    low: "bg-slate-100 text-slate-700 hover:bg-slate-100/80 border-slate-200",
  };

  return priorityStyles[priority] || "bg-slate-100 text-slate-700";
};

export default TaskMetadata;
