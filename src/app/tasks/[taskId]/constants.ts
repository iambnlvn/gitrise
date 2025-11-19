import { AlertCircle, CheckCircle2, Circle, Clock } from "lucide-react";
import { Task } from "../types";

const mockTask: Task[] = [
  {
    id: "1",
    title: "Implement user authentication flow",
    description: `## Overview
Implement a complete user authentication system including login, registration, password reset, and session management.

## Requirements
- Email/password authentication
- OAuth integration (Google, GitHub)
- JWT token management
- Remember me functionality
- Password strength validation

## Technical Notes
Use NextAuth.js for the implementation with Prisma adapter for database persistence.`,
    status: "in-progress",
    priority: "high",
    dueDate: "2025-01-15",
    createdAt: "2024-12-20",
    updatedAt: "2024-12-27",
    project: "GitRise Platform",
    estimatedTime: "16h",
    timeSpent: "8h 30m",
    assignees: [
      { id: "1", name: "John Doe", avatar: "", initials: "JD" },
      { id: "2", name: "Sarah Smith", avatar: "", initials: "SS" },
    ],
    labels: [
      { id: "1", name: "Feature", color: "bg-blue-500" },
      { id: "2", name: "Backend", color: "bg-purple-500" },
      { id: "3", name: "Security", color: "bg-red-500" },
    ],
    subtasks: [
      {
        id: "st-1",
        title: "Set up NextAuth.js configuration",
        completed: true,
      },
      { id: "st-2", title: "Create login page UI", completed: true },
      {
        id: "st-3",
        title: "Implement email/password provider",
        completed: false,
      },
      { id: "st-4", title: "Add OAuth providers", completed: false },
      { id: "st-5", title: "Set up session management", completed: false },
      { id: "st-6", title: "Write unit tests", completed: false },
    ],
    comments: [
      {
        id: "c-1",
        author: { name: "Sarah Smith", avatar: "", initials: "SS" },
        content:
          "I've started working on the login page UI. Should have a draft ready by tomorrow.",
        createdAt: "2024-12-25T10:30:00Z",
        reactions: [{ emoji: "👍", count: 2 }],
      },
      {
        id: "c-2",
        author: { name: "John Doe", avatar: "", initials: "JD" },
        content:
          "Great! Let me know if you need any help with the form validation logic.",
        createdAt: "2024-12-25T14:15:00Z",
        reactions: [],
      },
      {
        id: "c-3",
        author: { name: "Mike Johnson", avatar: "", initials: "MJ" },
        content: "Should we consider adding 2FA support in this iteration?",
        createdAt: "2024-12-26T09:00:00Z",
        reactions: [{ emoji: "🤔", count: 1 }],
      },
    ],
    attachments: [
      {
        id: "a-1",
        name: "auth-flow-diagram.pdf",
        size: "2.4 MB",
        type: "pdf",
        uploadedAt: "2024-12-21",
        uploadedBy: "John Doe",
      },
      {
        id: "a-2",
        name: "ui-mockups.figma",
        size: "1.1 MB",
        type: "figma",
        uploadedAt: "2024-12-22",
        uploadedBy: "Sarah Smith",
      },
    ],
    activityLog: [
      {
        id: "al-1",
        type: "created",
        description: "created this task",
        user: "John Doe",
        timestamp: "2024-12-20T09:00:00Z",
      },
      {
        id: "al-2",
        type: "assignment",
        description: "assigned Sarah Smith",
        user: "John Doe",
        timestamp: "2024-12-20T09:05:00Z",
      },
      {
        id: "al-3",
        type: "status_change",
        description: 'changed status from "To Do" to "In Progress"',
        user: "Sarah Smith",
        timestamp: "2024-12-23T10:00:00Z",
      },
      {
        id: "al-4",
        type: "updated",
        description: "updated the description",
        user: "John Doe",
        timestamp: "2024-12-25T15:30:00Z",
      },
    ],
  },
  {
    id: "2",
    title: "Design database schema for project management",
    description: `## Overview
Design a scalable and efficient database schema to support project management features including tasks, projects, users, comments, and activity logs.

## Requirements
- Support for multiple projects per user
- Task assignments and statuses
- Commenting system with reactions
- Activity logging for auditing

## Technical Notes
Use PostgreSQL as the database with Prisma ORM for schema definition and migrations.`,
    status: "todo",
    priority: "medium",
    dueDate: "2025-01-20",
    createdAt: "2024-12-22",
    updatedAt: "2024-12-22",
    project: "GitRise Platform",
    estimatedTime: "12h",
    timeSpent: "0h",
    assignees: [{ id: "3", name: "Mike Johnson", avatar: "", initials: "MJ" }],
    labels: [
      { id: "4", name: "Design", color: "bg-green-500" },
      { id: "5", name: "Database", color: "bg-yellow-500" },
    ],
    subtasks: [
      {
        id: "st-7",
        title: "Define entities and relationships",
        completed: false,
      },
      { id: "st-8", title: "Create ER diagrams", completed: false },
      { id: "st-9", title: "Set up Prisma schema", completed: false },
      { id: "st-10", title: "Write migration scripts", completed: false },
    ],
    comments: [],
    attachments: [],
    activityLog: [
      {
        id: "al-5",
        type: "created",
        description: "created this task",
        user: "Mike Johnson",
        timestamp: "2024-12-22T11:00:00Z",
      },
    ],
  },
];

const statusConfig = {
  todo: {
    label: "To Do",
    icon: Circle,
    color: "text-gray-500",
    bg: "bg-gray-100",
  },
  "in-progress": {
    label: "In Progress",
    icon: Clock,
    color: "text-blue-500",
    bg: "bg-blue-100",
  },
  "in-review": {
    label: "In Review",
    icon: AlertCircle,
    color: "text-yellow-500",
    bg: "bg-yellow-100",
  },
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    color: "text-green-500",
    bg: "bg-green-100",
  },
};

const priorityConfig = {
  low: { label: "Low", color: "text-gray-500", bg: "bg-gray-100" },
  medium: { label: "Medium", color: "text-blue-500", bg: "bg-blue-100" },
  high: { label: "High", color: "text-orange-500", bg: "bg-orange-100" },
  urgent: { label: "Urgent", color: "text-red-500", bg: "bg-red-100" },
};

export { mockTask, statusConfig, priorityConfig };
