"use client";
import { Calendar, Clock, ChevronRight, AlertCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Task } from "../constants";
import { cn } from "@/lib/utils";
import { dateUtils } from "@/utils/date";

//TODO!: Redesign certain parts of the ui to match the app vibe and stop drilling props so much

interface TasksProps {
  /** Array of task objects to display */
  tasks: Task[];
  /** Callback function triggered when a task is clicked, receives taskId as parameter */
  onTaskClick: (taskId: string) => void;
}

/**
 * Color configuration using consistent design tokens for task priorities
 * Maps priority levels to Tailwind CSS classes for visual differentiation
 */
const PRIORITY_STYLES = {
  urgent: "text-red-600 bg-red-50 border-red-200",
  high: "text-orange-600 bg-orange-50 border-orange-200",
  medium: "text-yellow-600 bg-yellow-50 border-yellow-200",
  low: "text-green-600 bg-green-50 border-green-200",
} as const;

/**
 * Color configuration for task status indicators
 * Maps status types to appropriate text colors
 */
const STATUS_STYLES = {
  completed: "text-green-600",
  in_progress: "text-blue-600",
  overdue: "text-red-600",
  pending: "text-muted-foreground",
} as const;

/**
 * Main Tasks component for displaying a list of tasks in a dashboard overview
 *
 * Features:
 * - Displays task title, description, priority, and status
 * - Shows assignee and assigner information with avatars
 * - Displays due dates with smart formatting (overdue, due today, etc.)
 * - Shows creation time and tags
 * - Clickable tasks that trigger navigation callbacks
 * - Responsive design with proper spacing and hover effects
 *
 * @param tasks - Array of task objects to display
 * @param onTaskClick - Callback function for task click events
 * @todo Redesign certain parts of the ui to match the app vibe
 */
const Tasks: React.FC<TasksProps> = ({ tasks, onTaskClick }) => {
  return (
    <div className="bg-background border-border rounded-lg border shadow-sm">
      <TasksHeader />
      <TasksList tasks={tasks} onTaskClick={onTaskClick} />
      <TasksFooter tasksCount={tasks.length} />
    </div>
  );
};

/**
 * Header component for the tasks section
 * Displays title and subtitle describing the content
 *
 */
const TasksHeader = () => (
  <div className="border-border border-b p-6">
    <h2 className="text-foreground text-xl font-semibold">Recent Tasks</h2>
    <p className="text-muted-foreground mt-1 text-sm">
      Your assigned tasks and deadlines
    </p>
  </div>
);

interface TasksListProps {
  tasks: Task[];
  onTaskClick: (taskId: string) => void;
}

/**
 * Container component for the list of tasks
 * Handles empty state and renders individual task items
 *
 * @param tasks - Array of tasks to display
 * @param onTaskClick - Click handler for individual tasks
 */
const TasksList = ({ tasks, onTaskClick }: TasksListProps) => (
  <div className="divide-border divide-y">
    {tasks.length === 0 ? (
      <EmptyState />
    ) : (
      tasks.map((task) => (
        <TaskItem key={task.id} task={task} onClick={onTaskClick} />
      ))
    )}
  </div>
);

/**
 * Empty state component displayed when no tasks are available
 * Shows an icon and message to indicate the empty state
 * @todo Improve the empty state design with illustrations or animations
 *
 */
const EmptyState = () => (
  <div className="text-muted-foreground p-6 text-center">
    <AlertCircle className="mx-auto mb-2 size-8" />
    <p>No tasks assigned</p>
  </div>
);

interface TasksFooterProps {
  tasksCount: number;
}

/**
 * Footer component for the tasks section
 * Conditionally displays a "View all tasks" button when tasks are present
 *
 * @param tasksCount - Number of tasks to determine if footer should be shown
 */
const TasksFooter = ({ tasksCount }: TasksFooterProps) =>
  tasksCount > 0 ? (
    <div className="border-border border-t p-4">
      <button
        onClick={() => {}}
        className="text-primary hover:text-primary/80 w-full text-center text-sm font-medium transition-colors"
      >
        View all tasks
      </button>
    </div>
  ) : null;

interface TaskItemProps {
  task: Task;
  onClick: (id: string) => void;
}

/**
 * Individual task item component
 * Renders a single task with all its information in a clickable container
 *
 * @param task - Task object containing all task information
 * @param onClick - Click handler function that receives the task ID
 */
const TaskItem = ({ task, onClick }: TaskItemProps) => {
  const isTaskOverdue = dateUtils.isOverdue(task.dueDate);

  return (
    <div
      onClick={() => onClick(task.id)}
      className="hover:bg-muted/50 cursor-pointer p-4 transition-colors duration-150"
    >
      <div className="flex items-start justify-between">
        <TaskContent task={task} isOverdue={isTaskOverdue} />
        <TaskMetadata task={task} />
      </div>
    </div>
  );
};

interface TaskContentProps {
  task: Task;
  isOverdue: boolean;
}

/**
 * Main content area for a task item
 * Contains task header, description, details, and tags
 *
 * @param task - Task object with content information
 * @param isOverdue - Boolean indicating if the task is overdue
 */
const TaskContent = ({ task, isOverdue }: TaskContentProps) => (
  <div className="min-w-0 flex-1">
    <TaskHeader task={task} isOverdue={isOverdue} />
    <TaskDescription description={task.description} />
    <TaskDetails task={task} isOverdue={isOverdue} />
    <TaskTags tags={task.tags} />
  </div>
);

interface TaskHeaderProps {
  task: Task;
  isOverdue: boolean;
}

/**
 * Header section of a task item
 * Displays task title, priority badge, and overdue indicator if applicable
 *
 * @param task - Task object containing title and priority information
 * @param isOverdue - Boolean to show overdue badge
 */
const TaskHeader = ({ task, isOverdue }: TaskHeaderProps) => (
  <div className="mb-2 flex flex-wrap items-center gap-2">
    <h3 className="text-foreground truncate font-medium">{task.title}</h3>
    <PriorityBadge priority={task.priority} />
    {isOverdue && <OverdueBadge />}
  </div>
);

interface PriorityBadgeProps {
  priority: Task["priority"];
}

/**
 * Priority badge component
 * Displays task priority with appropriate color coding
 *
 * @param priority - Priority level (urgent, high, medium, low)
 */
const PriorityBadge = ({ priority }: PriorityBadgeProps) => (
  <span
    className={cn(
      "rounded-full border px-2 py-1 text-xs font-medium",
      PRIORITY_STYLES[priority],
    )}
  >
    {priority}
  </span>
);

/**
 * Overdue badge component
 * Displays a red "Overdue" badge for tasks past their due date
 *
 */
const OverdueBadge = () => (
  <span className="rounded-full border border-red-200 bg-red-100 px-2 py-1 text-xs font-medium text-red-600">
    Overdue
  </span>
);

interface TaskDescriptionProps {
  description?: string;
}

/**
 * Task description component
 * Conditionally displays task description with line clamping for overflow
 *
 * @param description - Optional task description text
 */
const TaskDescription = ({ description }: TaskDescriptionProps) =>
  description ? (
    <p className="text-muted-foreground mb-3 line-clamp-2 text-sm">
      {description}
    </p>
  ) : null;

interface TaskDetailsProps {
  task: Task;
  isOverdue: boolean;
}

/**
 * Task details section
 * Displays assignment information, due date, and creation time
 *
 * @param task - Task object containing detail information
 * @param isOverdue - Boolean for styling due date when overdue
 */
const TaskDetails = ({ task, isOverdue }: TaskDetailsProps) => (
  <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-xs">
    <AssignedByInfo assignedBy={task.assignedBy} />
    <DueDateInfo dueDate={task.dueDate} isOverdue={isOverdue} />
    <CreatedAtInfo createdAt={task.createdAt} />
  </div>
);

interface AssignedByInfoProps {
  assignedBy: Task["assignedBy"];
}

/**
 * Assigned by information component
 * Shows who assigned the task with name and small avatar
 *
 * @param assignedBy - Object containing assigner information
 */
const AssignedByInfo = ({ assignedBy }: AssignedByInfoProps) => (
  <div className="flex items-center gap-1">
    <span>By {assignedBy.name}</span>
    <Avatar className="size-3" title={`Assigned by ${assignedBy.name}`}>
      <AvatarImage src={assignedBy.avatar} alt={assignedBy.name} />
      <AvatarFallback className="text-[8px]">
        {assignedBy.name.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  </div>
);

interface DueDateInfoProps {
  dueDate: string;
  isOverdue: boolean;
}

/**
 * Due date information component
 * Displays formatted due date with calendar icon and overdue styling
 *
 * @param dueDate - ISO date string for the task due date
 * @param isOverdue - Boolean to apply overdue styling
 */
const DueDateInfo = ({ dueDate, isOverdue }: DueDateInfoProps) => (
  <div className="flex items-center gap-1">
    <Calendar className="size-3" />
    <span className={cn(isOverdue && "text-destructive font-medium")}>
      {dateUtils.formatDueDate(dueDate)}
    </span>
  </div>
);

interface CreatedAtInfoProps {
  createdAt: string;
}

/**
 * Creation time information component
 * Shows when the task was created using relative time formatting
 *
 * @param createdAt - ISO date string for task creation time
 */
const CreatedAtInfo = ({ createdAt }: CreatedAtInfoProps) => (
  <div className="flex items-center gap-1">
    <Clock className="size-3" />
    <span>{dateUtils.formatTimeAgo(createdAt)}</span>
  </div>
);

interface TaskTagsProps {
  tags?: string[];
}

/**
 * Task tags component
 * Displays up to 3 task tags with overflow indicator
 *
 * @param tags - Optional array of tag strings
 */
const TaskTags = ({ tags }: TaskTagsProps) =>
  tags && tags.length > 0 ? (
    <div className="mt-2 flex flex-wrap gap-1">
      {tags.slice(0, 3).map((tag, index) => (
        <span
          key={index}
          className="bg-muted text-muted-foreground rounded px-2 py-1 text-xs"
        >
          {tag}
        </span>
      ))}
      {tags.length > 3 && (
        <span className="text-muted-foreground px-2 py-1 text-xs">
          +{tags.length - 3} more
        </span>
      )}
    </div>
  ) : null;

interface TaskMetadataProps {
  task: Task;
}

/**
 * Task metadata section
 * Displays task status, assigned user avatar, and navigation chevron
 * Positioned on the right side of the task item
 *
 * @param task - Task object containing metadata
 */
const TaskMetadata = ({ task }: TaskMetadataProps) => (
  <div className="ml-4 flex flex-col items-end gap-2">
    <StatusBadge status={task.status} />
    <AssignedToAvatar assignedTo={task.assignedTo} />
    <ChevronRight className="text-muted-foreground size-4" />
  </div>
);

interface StatusBadgeProps {
  status: Task["status"];
}

/**
 * Status badge component
 * Displays task status with appropriate color coding
 *
 * @param status - Task status (completed, in_progress, overdue, pending)
 */
const StatusBadge = ({ status }: StatusBadgeProps) => (
  <span className={cn("text-xs font-medium", STATUS_STYLES[status])}>
    {status.replace("_", " ").toUpperCase()}
  </span>
);

interface AssignedToAvatarProps {
  assignedTo: Task["assignedTo"];
}

/**
 * Assigned to avatar component
 * Displays the avatar of the person the task is assigned to
 *
 * @param assignedTo - Object containing assignee information
 */
const AssignedToAvatar = ({ assignedTo }: AssignedToAvatarProps) => (
  <Avatar className="size-8" title={`Assigned to ${assignedTo.name}`}>
    <AvatarImage src={assignedTo.avatar} alt={assignedTo.name} />
    <AvatarFallback>{assignedTo.name.charAt(0).toUpperCase()}</AvatarFallback>
  </Avatar>
);

export default Tasks;
