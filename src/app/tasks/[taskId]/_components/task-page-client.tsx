"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Edit2,
  Flag,
  Link2,
  MoreHorizontal,
  Plus,
  Tag,
  Trash2,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Task } from "../../types";
import { priorityConfig, statusConfig } from "../constants";
import { EditableText } from "./editable-text";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import TaskEditorShell from "./task-editor-shell";
export default function TaskPageClient({
  task,
  capabilities,
}: {
  task: Task;
  capabilities: {
    canEdit: boolean;
  };
}) {
  const router = useRouter();
  const [mode, setMode] = useState<"view" | "edit">("view");
  const [data, setData] = useState(task);

  const editable = mode === "edit" && capabilities.canEdit;

  const handleStatusChange = (newStatus: Task["status"]) => {
    setData((prev) => ({ ...prev, status: newStatus }));
  };
  const StatusIcon = statusConfig[task.status].icon;
  const handlePriorityChange = (newPriority: Task["priority"]) => {
    setData((prev) => ({ ...prev, priority: newPriority }));
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/tasks")}
            className="text-muted-foreground hover:text-foreground gap-2"
          >
            <ArrowLeft className="size-4" />
            Back to tasks
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 lg:col-span-2"
          >
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge
                        className={cn(
                          "gap-1",
                          statusConfig[task.status].bg,
                          statusConfig[task.status].color,
                        )}
                      >
                        <StatusIcon className="size-3" />
                        {statusConfig[task.status].label}
                      </Badge>
                      <Badge
                        className={cn(
                          priorityConfig[task.priority].bg,
                          priorityConfig[task.priority].color,
                        )}
                      >
                        <Flag className="mr-1 size-3" />
                        {priorityConfig[task.priority].label}
                      </Badge>
                    </div>

                    <EditableText
                      onSave={async (value) => {
                        setData((prev) => ({ ...prev, title: value }));
                      }}
                      value={data.title}
                      editable={editable}
                      variant="title"
                      placeholder="Untitled Task"
                      renderMobileEditingUI={(state) => {
                        return (
                          <Drawer
                            open={state.isEditing}
                            onOpenChange={(open) => {
                              if (!open) state?.handleCancel();
                            }}
                          >
                            <DrawerContent className="mx-auto w-full max-w-lg">
                              <DrawerHeader className="border-b pb-4">
                                <div className="flex items-center gap-3">
                                  <div className="bg-primary/10 flex size-10 items-center justify-center rounded-full">
                                    <Edit2 className="text-primary size-5" />
                                  </div>
                                  <div>
                                    <DrawerTitle className="text-left">
                                      Edit Task Title
                                    </DrawerTitle>
                                    <DrawerDescription className="text-left">
                                      Give your task a clear, descriptive name
                                    </DrawerDescription>
                                  </div>
                                </div>
                              </DrawerHeader>

                              <div className="space-y-4 p-6">
                                <div className="space-y-2">
                                  <label
                                    htmlFor="task-title"
                                    className="text-muted-foreground text-sm font-medium"
                                  >
                                    Title
                                  </label>
                                  <Input
                                    id="task-title"
                                    value={state?.editedValue ?? ""}
                                    onChange={(e) =>
                                      state?.setEditedValue(e.target.value)
                                    }
                                    onKeyDown={(e) => {
                                      if (
                                        e.key === "Enter" &&
                                        !state?.isSaving
                                      ) {
                                        e.preventDefault();
                                        state?.handleSave();
                                      }
                                    }}
                                    placeholder="Enter task title..."
                                    className="h-12 text-base"
                                    autoFocus
                                    disabled={state?.isSaving}
                                  />
                                  {state?.editedValue?.trim() === "" && (
                                    <p className="text-destructive text-xs">
                                      Title cannot be empty
                                    </p>
                                  )}
                                </div>

                                <div className="text-muted-foreground flex items-center gap-2 text-xs">
                                  <kbd className="bg-muted rounded px-1.5 py-0.5 font-mono text-[10px]">
                                    Enter
                                  </kbd>
                                  <span>to save</span>
                                </div>
                              </div>

                              <div className="border-t p-6">
                                <div className="flex items-center gap-3">
                                  <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => state?.handleCancel()}
                                    disabled={state?.isSaving}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    className="flex-1"
                                    onClick={() => state?.handleSave()}
                                    disabled={
                                      state?.isSaving ||
                                      state?.editedValue?.trim() === ""
                                    }
                                  >
                                    {state?.isSaving ? (
                                      <>
                                        <span className="mr-2 size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                        Saving...
                                      </>
                                    ) : (
                                      "Save Changes"
                                    )}
                                  </Button>
                                </div>
                              </div>
                            </DrawerContent>
                          </Drawer>
                        );
                      }}
                    />

                    <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm">
                      <span>
                        in{" "}
                        <span className="text-foreground font-medium">
                          {task.project}
                        </span>
                      </span>
                      <span>•</span>
                      <span>
                        Created {new Date(task.createdAt).toLocaleDateString()}
                      </span>
                      {task.updatedAt && (
                        <>
                          <span>•</span>
                          <span>
                            Last updated{" "}
                            {new Date(task.updatedAt).toLocaleDateString()}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Link2 className="mr-2 size-4" />
                        Copy link
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          setMode(mode === "edit" ? "view" : "edit")
                        }
                      >
                        <Edit2 className="mr-2 size-4" />
                        {mode === "edit" ? "Done editing" : "Edit task"}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 size-4" />
                        Delete task
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <TaskEditorShell
                  taskId={task.id}
                  initialMarkdown={task.description}
                  canEdit={mode === "edit"}
                />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Details</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-muted-foreground text-sm font-medium">
                    Status
                  </label>
                  <Select
                    value={task.status}
                    onValueChange={(v) =>
                      handleStatusChange(v as Task["status"])
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(statusConfig).map(([key, config]) => (
                        <SelectItem key={key} value={key}>
                          <div className="flex items-center gap-2">
                            <config.icon
                              className={cn("size-4", config.color)}
                            />
                            {config.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-muted-foreground text-sm font-medium">
                    Priority
                  </label>
                  <Select
                    value={task.priority}
                    onValueChange={(v) =>
                      handlePriorityChange(v as Task["priority"])
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(priorityConfig).map(([key, config]) => (
                        <SelectItem key={key} value={key}>
                          <div className="flex items-center gap-2">
                            <Flag className={cn("size-4", config.color)} />
                            {config.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Assignees */}
                <div className="space-y-2">
                  <label className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
                    <Users className="size-4" />
                    Assignees
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {task.assignees.map((assignee) => (
                      <div
                        key={assignee.id}
                        className="bg-muted flex items-center gap-2 rounded-full px-3 py-1"
                      >
                        <Avatar className="size-5">
                          <AvatarImage src={assignee.avatar} />
                          <AvatarFallback className="text-xs">
                            {assignee.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{assignee.name}</span>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                    >
                      <Plus className="size-3" />
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Due Date */}
                <div className="space-y-2">
                  <label className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
                    <Calendar className="size-4" />
                    Due Date
                  </label>
                  <Button variant="outline" className="w-full justify-start">
                    {new Date(task.dueDate).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </Button>
                </div>

                <Separator />

                {/* Time Tracking */}
                <div className="space-y-2">
                  <label className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
                    <Clock className="size-4" />
                    Time Tracking
                  </label>
                  <div className="flex items-center justify-between text-sm">
                    <span>Estimated:</span>
                    <span className="font-medium">{task.estimatedTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Spent:</span>
                    <span className="font-medium">{task.timeSpent}</span>
                  </div>
                  <div className="bg-muted h-2 overflow-hidden rounded-full">
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: "53%" }}
                    />
                  </div>
                </div>

                <Separator />

                {/* Labels */}
                <div className="space-y-2">
                  <label className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
                    <Tag className="size-4" />
                    Labels
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {task.labels.map((label) => (
                      <Badge
                        key={label.id}
                        className={cn("text-white", label.color)}
                      >
                        {label.name}
                      </Badge>
                    ))}
                    <Button variant="outline" size="sm" className="h-6 px-2">
                      <Plus className="size-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
