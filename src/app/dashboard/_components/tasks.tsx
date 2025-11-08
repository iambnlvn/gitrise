"use client";

import React, { useState } from "react";
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
  switch (priority) {
    case "urgent":
      return "bg-red-100 text-red-700 hover:bg-red-100/80 border-red-200";
    case "high":
      return "bg-orange-100 text-orange-700 hover:bg-orange-100/80 border-orange-200";
    case "medium":
      return "bg-blue-100 text-blue-700 hover:bg-blue-100/80 border-blue-200";
    case "low":
      return "bg-slate-100 text-slate-700 hover:bg-slate-100/80 border-slate-200";
    default:
      return "bg-slate-100 text-slate-700";
  }
};

/**
 * Returns appropriate icon component based on task status
 * @param status - Current status of the task (completed, in_progress, pending)
 */
const getStatusIcon = (status: Task["status"]) => {
  if (status === "completed")
    return <CheckCircle2 className="size-5 text-green-500" />;
  if (status === "in_progress")
    return <Circle className="size-5 text-blue-500" />;
  return <Circle className="text-muted-foreground size-5" />;
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
 * Individual task item component that displays task information in a card format
 */
const TaskItem = ({ task, onClick }: TaskItemProps) => {
  const isOverdue = dateUtils.isOverdue(task.dueDate);
  const isCompleted = task.status === "completed";

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
              isOverdue && !isCompleted
                ? "text-red-600"
                : "text-muted-foreground",
            )}
          >
            <Calendar className="size-3.5 transition-transform duration-200 group-hover:scale-110" />
            {dateUtils.formatDueDate(task.dueDate)}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between gap-4">
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
            <DropdownMenuItem className="hover:bg-muted transition-colors duration-150">
              Mark as Complete
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-muted transition-colors duration-150">
              Edit Task
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 transition-colors duration-150 hover:bg-red-50">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center space-x-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="ring-background size-6 ring-2 transition-all duration-200 hover:scale-110 hover:ring-4">
                  <AvatarImage src={task.assignedBy.avatar} />
                  <AvatarFallback className="hover:bg-muted text-xs transition-colors duration-200">
                    {task.assignedBy.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent className="animate-in fade-in-0 zoom-in-95 duration-150">
                <p>Assigned by: {task.assignedBy.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <ArrowRight className="text-muted-foreground size-3 font-extrabold transition-all duration-200 group-hover:translate-x-1" />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="ring-background size-6 ring-2 transition-all duration-200 hover:scale-110 hover:ring-4">
                  <AvatarImage src={task.assignedTo.avatar} />
                  <AvatarFallback className="hover:bg-muted text-xs transition-colors duration-200">
                    {task.assignedTo.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent className="animate-in fade-in-0 zoom-in-95 duration-150">
                <p>Assigned to: {task.assignedTo.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

interface TasksProps {
  /** Array of task objects to display */
  tasks: Task[];
  /** Optional callback function when a task is clicked */
  onTaskClick?: (taskId: string) => void;
}

export default function Tasks({ tasks, onTaskClick = () => {} }: TasksProps) {
  const [filter, setFilter] = useState("all");
  const filteredTasks = tasks.filter((task) => {
    if (filter === "urgent")
      return task.priority === "urgent" || task.priority === "high";
    if (filter === "assigned") return task.assignedTo.id === "iambnlvn"; // TODO: Replace with dynamic user ID
    return true;
  });

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

        <div className="mt-4">
          <Tabs defaultValue="all" onValueChange={setFilter} className="w-full">
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
              <div className="text-muted-foreground animate-in fade-in-0 zoom-in-95 py-10 text-center duration-500">
                <p>No tasks found for this filter.</p>
              </div>
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
