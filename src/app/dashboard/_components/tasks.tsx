import React from "react";
import { Calendar, Clock, ChevronRight, AlertCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Task } from "../constants";

interface TasksProps {
  tasks: Task[];
  onTaskClick: (taskId: string) => void;
}

const Tasks: React.FC<TasksProps> = ({ tasks, onTaskClick }) => {
  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "urgent":
        return "text-red-600 bg-red-50 border-red-200";
      case "high":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "low":
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "completed":
        return "text-green-600";
      case "in_progress":
        return "text-blue-600";
      case "overdue":
        return "text-red-600";
      case "pending":
        return "text-gray-600";
      default:
        return "text-gray-600";
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);

    if (diffInDays < 0) return "Overdue";
    if (diffInDays < 1) return "Due today";
    if (diffInDays < 7) return `Due in ${Math.ceil(diffInDays)} days`;
    return date.toLocaleDateString();
  };

  const isOverdue = (dueDate: string) => {
    return (
      new Date(dueDate) < new Date() &&
      new Date(dueDate).toDateString() !== new Date().toDateString()
    );
  };

  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="border-b border-gray-200 p-6">
        <h2 className="text-foreground text-xl font-semibold">Recent Tasks</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Your assigned tasks and deadlines
        </p>
      </div>

      <div className="divide-y divide-gray-100">
        {tasks.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <AlertCircle className="mx-auto mb-2 h-8 w-8" />
            <p>No tasks assigned</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => onTaskClick(task.id)}
              className="cursor-pointer p-4 transition-colors duration-150 hover:bg-gray-50"
            >
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <h3 className="text-foreground truncate font-medium">
                      {task.title}
                    </h3>
                    <span
                      className={`rounded-full border px-2 py-1 text-xs ${getPriorityColor(task.priority)}`}
                    >
                      {task.priority}
                    </span>
                    {isOverdue(task.dueDate) && (
                      <span className="rounded-full border border-red-200 bg-red-100 px-2 py-1 text-xs text-red-600">
                        Overdue
                      </span>
                    )}
                  </div>

                  {task.description && (
                    <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                      {task.description}
                    </p>
                  )}

                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <span>By {task.assignedBy.name}</span>
                      <Avatar
                        className="size-3"
                        title={`Assigned by ${task.assignedBy.name}`}
                      >
                        <AvatarImage
                          src={task.assignedBy.avatar}
                          alt={task.assignedBy.name}
                        />
                        <AvatarFallback>
                          {task.assignedBy.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    <div className="flex items-center gap-1">
                      <Calendar className="size-3" />
                      <span
                        className={
                          isOverdue(task.dueDate)
                            ? "font-medium text-red-600"
                            : ""
                        }
                      >
                        {formatDueDate(task.dueDate)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Clock className="size-3" />
                      <span>{formatTimeAgo(task.createdAt)}</span>
                    </div>
                  </div>

                  {task.tags && task.tags.length > 0 && (
                    <div className="mt-2 flex gap-1">
                      {task.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700"
                        >
                          {tag}
                        </span>
                      ))}
                      {task.tags.length > 3 && (
                        <span className="px-2 py-1 text-xs text-gray-500">
                          +{task.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="ml-4 flex flex-col items-end gap-2">
                  <span
                    className={`text-xs font-medium ${getStatusColor(task.status)}`}
                  >
                    {task.status.replace("_", " ").toUpperCase()}
                  </span>
                  <Avatar
                    className="size-8"
                    title={`Assigned to ${task.assignedTo.name}`}
                  >
                    <AvatarImage
                      src={task.assignedTo.avatar}
                      alt={task.assignedTo.name}
                    />
                    <AvatarFallback>
                      {task.assignedTo.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <ChevronRight className="text-muted-foreground size-4" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {tasks.length > 0 && (
        <div className="border-t border-gray-200 p-4">
          <button
            onClick={() => {}}
            className="w-full text-center text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            View all tasks
          </button>
        </div>
      )}
    </div>
  );
};

export default Tasks;
