import { useState } from "react";
import { Task } from "../../constants";
import TaskMetadata from "./task-metadata";

import { AlertCircle, CheckCircle2, Circle, Timer } from "lucide-react";
import { dateUtils } from "@/utils/date";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { TaskAssignment } from "./task-assignment";
import { TaskActions } from "./task-actions";

const getStatusIcon = (status: Task["status"]) => {
  const icons = {
    completed: <CheckCircle2 className="size-5 text-emerald-500" />,
    in_progress: <Timer className="size-5 fill-blue-500/20 text-blue-500" />,
    pending: <Circle className="text-muted-foreground size-5" />,
    overdue: <AlertCircle className="size-5 text-red-500" />,
  };
  return icons[status] || icons.pending;
};

interface TaskItemProps {
  task: Task;
  isSelected: boolean;
  onToggleSelect?: (id: string) => void;
  isCompact?: boolean;
}

interface TaskItemProps {
  /** The task object containing all task details */
  task: Task;

  /** Whether the task is currently selected */
  isSelected: boolean;
  /** Callback function to toggle task selection for a specific task
   * @param id - The ID of the task to toggle selection for
   * @todo implement toggle selection ui, the old one is euh on mobile
   */
  onToggleSelect?: (id: string) => void;
  /** Whether to render the task in compact mode */
  isCompact?: boolean;
}

export const TaskItem = ({
  task,
  isSelected,

  isCompact = false,
}: TaskItemProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isOverdue = dateUtils.isOverdue(task.dueDate);
  const isCompleted = task.status === "completed";

  const handleTaskCompletion = (taskId: string) => {
    console.log(`TASK ${taskId} is complete`);
  };

  const handleTaskDeletion = (taskId: string) => {
    console.log(`TASK ${taskId} is deleted`);
  };

  const handleTaskEdit = (taskId: string) => {
    console.log(`Task ${taskId} is edited`);
  };

  return (
    <div
      className={cn(
        "group hover:bg-muted/50 flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-all duration-200 hover:scale-105",
        isSelected && "bg-muted/60 border-primary/20",
        isOverdue && !isCompleted && "border-red-200 bg-red-50/10",
        isCompact ? "py-2" : "py-4",
      )}
    >
      <div className="mt-0.5">{getStatusIcon(task.status)}</div>

      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <h4
            className={cn(
              "truncate font-medium transition-colors",
              isCompleted && "text-muted-foreground line-through",
              isCompact ? "text-sm" : "text-base",
            )}
          >
            {task.title}
            {isOverdue && !isCompleted && (
              <Badge
                variant="destructive"
                className="ml-2 h-5 px-1.5 text-[10px]"
              >
                Overdue
              </Badge>
            )}
          </h4>
        </div>

        {!isCompact && (
          <p className="text-muted-foreground line-clamp-2 text-sm">
            {task.description}
          </p>
        )}

        <div
          className={cn(
            "flex flex-col justify-between gap-2 sm:flex-row sm:items-center",
            isCompact ? "mt-0.5" : "mt-2",
          )}
        >
          <TaskMetadata task={task} />

          <TaskAssignment
            assignedBy={task.assignedBy}
            assignedTo={task.assignedTo}
          />
        </div>
      </div>

      <TaskActions
        open={menuOpen}
        onOpenChange={setMenuOpen}
        onComplete={() => handleTaskCompletion(task.id)}
        onEdit={() => handleTaskEdit(task.id)}
        onDelete={() => handleTaskDeletion(task.id)}
      />
    </div>
  );
};
