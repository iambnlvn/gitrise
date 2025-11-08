"use client";

import React, { useState, useMemo, JSX } from "react";
import {
  Calendar,
  MoreVertical,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Task } from "../constants";
import { dateUtils } from "@/utils/date";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

/**
 * Returns CSS classes for styling priority badges based on task priority level
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

/**
 * Returns appropriate icon component based on task status
 * @param status - Current status of the task (completed, in_progress, pending, overdue)
 * @returns JSX icon element with appropriate styling and color
 */
const getStatusIcon = (status: Task["status"]) => {
  const statusIcons: Record<Task["status"], JSX.Element> = {
    completed: <CheckCircle2 className="size-5 text-green-500" />,
    in_progress: <Circle className="size-5 text-blue-500" />,
    pending: <Circle className="text-muted-foreground size-5" />,
    overdue: <AlertCircle className="size-5 text-red-500" />,
  };

  return (
    statusIcons[status] || <Circle className="text-muted-foreground size-5" />
  );
};

/**
 * Props for individual task item component
 */
interface TaskItemProps {
  /** The task object containing all task details */
  task: Task;
  /** Callback function triggered when task item is clicked */
  onClick: (id: string) => void;
}

/**
 * Renders task metadata including priority badge, tags, and due date
 * @param task - The task object to render metadata for
 * @param isOverdue - Whether the task is overdue
 * @param isCompleted - Whether the task is completed
 */
const TaskMetadata = ({
  task,
  isOverdue,
  isCompleted,
}: {
  task: Task;
  isOverdue: boolean;
  isCompleted: boolean;
}) => (
  <div className="mt-3 flex flex-wrap items-center gap-3">
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

    <div
      className={cn(
        "ml-auto flex items-center gap-1.5 text-xs font-medium transition-colors duration-200",
        isOverdue && !isCompleted ? "text-red-600" : "text-muted-foreground",
      )}
    >
      <Calendar className="size-3.5 transition-transform duration-200 group-hover:scale-110" />
      {dateUtils.formatDueDate(task.dueDate)}
    </div>
  </div>
);

/**
 * Renders task actions dropdown menu
 * @param onComplete - Callback for completing a task
 * @param onEdit - Callback for editing a task
 * @param onDelete - Callback for deleting a task
 */
const TaskActions = ({
  onComplete,
  onEdit,
  onDelete,
}: {
  onComplete: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "size-8 opacity-0 group-hover:opacity-100",
          "hover:bg-muted transition-all duration-300 hover:scale-110",
        )}
      >
        <MoreVertical className="size-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      align="end"
      className="animate-in fade-in-0 zoom-in-95 duration-200"
    >
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem
        className="hover:bg-muted transition-colors duration-150"
        onClick={onComplete}
      >
        Mark as Complete
      </DropdownMenuItem>
      <DropdownMenuItem
        className="hover:bg-muted transition-colors duration-150"
        onClick={onEdit}
      >
        Edit Task
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        className="text-red-600 transition-colors duration-150 hover:bg-red-50"
        onClick={onDelete}
      >
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

/**
 * Renders assignment indicators showing who assigned the task and to whom
 * @param assignedBy - User who assigned the task
 * @param assignedTo - User to whom the task is assigned
 */
const TaskAssignment = ({
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

    <ArrowRight className="text-muted-foreground size-3 font-extrabold transition-all duration-200 group-hover:translate-x-1" />

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

/**
 * Individual task item component that displays task information in a card format
 */
const TaskItem = ({ task, onClick }: TaskItemProps) => {
  const isOverdue = dateUtils.isOverdue(task.dueDate);
  const isCompleted = task.status === "completed";

  const handleComplete = () => {
    console.log(`Completing task: ${task.id}`);
  };

  const handleEdit = () => {
    console.log(`Editing task: ${task.id}`);
  };

  const handleDelete = () => {
    console.log(`Deleting task: ${task.id}`);
  };

  return (
    <div
      onClick={() => onClick(task.id)}
      className={cn(
        "group hover:bg-muted/50 flex cursor-pointer items-start gap-4 rounded-lg border p-4",
        "transform transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-md",
        "animate-in fade-in-0 slide-in-from-bottom-4 duration-500",
        isOverdue &&
          !isCompleted &&
          "border-red-200 bg-red-50/30 hover:bg-red-50/50",
      )}
    >
      <div className="mt-1 transition-transform duration-200 group-hover:scale-110">
        {getStatusIcon(task.status)}
      </div>

      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <h4
            className={cn(
              "leading-none font-semibold transition-colors duration-200",
              isCompleted && "text-muted-foreground line-through",
              "group-hover:text-foreground",
            )}
          >
            {task.title}
            {isOverdue && !isCompleted && (
              <AlertCircle className="ml-2 inline size-4 animate-pulse text-red-500" />
            )}
          </h4>

          <span className="text-muted-foreground hidden text-xs transition-opacity duration-200 group-hover:opacity-70 sm:inline-block">
            {dateUtils.formatTimeAgo(task.createdAt)}
          </span>
        </div>

        <p className="text-muted-foreground group-hover:text-muted-foreground/80 line-clamp-1 text-sm transition-colors duration-200">
          {task.description}
        </p>

        <TaskMetadata
          task={task}
          isOverdue={isOverdue}
          isCompleted={isCompleted}
        />
      </div>

      <div className="flex flex-col items-end justify-between gap-4">
        <TaskActions
          onComplete={handleComplete}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <TaskAssignment
          assignedBy={task.assignedBy}
          assignedTo={task.assignedTo}
        />
      </div>
    </div>
  );
};

/**
 * Props for the main Tasks component
 */
interface TasksProps {
  /** Array of task objects to display */
  tasks: Task[];
  /** Optional callback function when a task is clicked */
  onTaskClick?: (taskId: string) => void;
}

/**
 * Task filter types for filtering displayed tasks
 */
type TaskFilter = "all" | "urgent" | "assigned";

/**
 * Filters tasks based on the selected filter criteria
 * @param tasks - Array of all tasks
 * @param filter - Current filter setting
 * @returns Filtered array of tasks
 */
const useFilteredTasks = (tasks: Task[], filter: TaskFilter) => {
  return useMemo(() => {
    return tasks.filter((task) => {
      switch (filter) {
        case "urgent":
          return task.priority === "urgent" || task.priority === "high";
        case "assigned":
          return task.assignedTo.id === "iambnlvn"; // TODO: Replace with dynamic user ID
        default:
          return true;
      }
    });
  }, [tasks, filter]);
};

/**
 * Renders the task filter tabs
 * @param filter - Current filter state
 * @param onFilterChange - Callback when filter changes
 */
const TaskFilters = ({
  filter,
  onFilterChange,
}: {
  filter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
}) => (
  <div className="mt-4">
    <Tabs
      value={filter}
      onValueChange={(value) => onFilterChange(value as TaskFilter)}
      className="w-full"
    >
      <div className="flex items-center justify-between">
        <TabsList className="bg-muted/50 hover:bg-muted/70 transition-all duration-200">
          <TabsTrigger
            value="all"
            className="transition-all duration-200 data-[state=active]:scale-105"
          >
            All Tasks
          </TabsTrigger>
          <TabsTrigger
            value="assigned"
            className="transition-all duration-200 data-[state=active]:scale-105"
          >
            Assigned to Me
          </TabsTrigger>
          <TabsTrigger
            value="urgent"
            className={cn(
              "text-red-600 data-[state=active]:text-red-700",
              "transition-all duration-200 data-[state=active]:scale-105",
            )}
          >
            <AlertCircle className="mr-2 size-3.5 transition-transform duration-200 group-hover:scale-110" />
            Urgent
          </TabsTrigger>
        </TabsList>
      </div>
    </Tabs>
  </div>
);

/**
 * Renders empty state when no tasks match the filter
 * @param filter - Current filter to show appropriate message
 */
const EmptyState = ({ filter }: { filter: TaskFilter }) => (
  <div className="text-muted-foreground animate-in fade-in-0 zoom-in-95 py-10 text-center duration-500">
    <p>
      {filter === "all"
        ? "No tasks found."
        : `No tasks found for "${filter}" filter.`}
    </p>
  </div>
);

/**
 * Main Tasks component that displays a list of tasks with filtering capabilities
 * @param tasks - Array of task objects to display
 * @param onTaskClick - Optional callback when task is clicked, defaults to empty function
 */
export default function Tasks({ tasks, onTaskClick = () => {} }: TasksProps) {
  const [filter, setFilter] = useState<TaskFilter>("all");

  const filteredTasks = useFilteredTasks(tasks, filter);

  return (
    <Card className="animate-in fade-in-0 slide-in-from-bottom-8 flex h-full flex-col shadow-sm duration-700">
      <CardHeader className="px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-primary inline-block size-5 transition-transform duration-200 hover:scale-110" />
                Tasks
              </div>
            </CardTitle>
            <CardDescription className="transition-colors duration-200">
              Manage your project deliverables
            </CardDescription>
          </div>
          <Button
            size="sm"
            className={cn(
              "hidden transition-all duration-200 sm:flex",
              "hover:scale-105 hover:shadow-md active:scale-95",
            )}
          >
            + New Task
          </Button>
        </div>

        <TaskFilters filter={filter} onFilterChange={setFilter} />
      </CardHeader>

      <CardContent className="p-0">
        <div className="px-6 pb-6">
          <div className="space-y-4">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task, index) => (
                <div
                  key={task.id}
                  className="animate-in fade-in-0 slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <TaskItem task={task} onClick={onTaskClick} />
                </div>
              ))
            ) : (
              <EmptyState filter={filter} />
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-center">
        <Link
          className={cn(
            buttonVariants({ variant: "link" }),
            "transition-all duration-200 hover:scale-105",
          )}
          href="/tasks"
        >
          View All Tasks
        </Link>
      </CardFooter>
    </Card>
  );
}
