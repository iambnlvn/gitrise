interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
    initials: string;
  };
  content: string;
  createdAt: string;
  reactions?: { emoji: string; count: number }[];
}

interface Attachment {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadedAt: string;
  uploadedBy: string;
}

interface ActivityItem {
  id: string;
  type: "status_change" | "comment" | "assignment" | "created" | "updated";
  description: string;
  user: string;
  timestamp: string;
}

export interface Task {
  id: string;
  title: string;
  createdBy: string;
  description: string;
  status: "todo" | "in-progress" | "in-review" | "completed";
  priority: "low" | "medium" | "high" | "urgent";
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  assignees: { id: string; name: string; avatar: string; initials: string }[];
  labels: { id: string; name: string; color: string }[];
  subtasks: Subtask[];
  comments: Comment[];
  attachments: Attachment[];
  activityLog: ActivityItem[];
  project: string;
  estimatedTime: string;
  timeSpent: string;
}
