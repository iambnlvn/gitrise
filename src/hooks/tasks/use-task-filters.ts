import { Task } from "@/app/dashboard/constants";
import { SortOption, TaskFilter } from "@/app/dashboard/types";
import { useState, useMemo } from "react";

export const useTaskFilters = (tasks: Task[]) => {
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filter === "urgent")
        return ["urgent", "high"].includes(task.priority);
      if (filter === "assigned") return task.assignedTo.id === "currentUser";
      return true;
    });
  }, [filter, tasks]);

  const sortedTasks = useMemo(() => {
    return [...filteredTasks].sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "priority":
          const priorityMap = { urgent: 3, high: 2, medium: 1, low: 0 };
          return priorityMap[b.priority] - priorityMap[a.priority];
        case "dueDate":
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case "newest":
        default:
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
      }
    });
  }, [filteredTasks, sortBy]);

  return {
    filter,
    setFilter,
    sortBy,
    setSortBy,
    filteredTasks,
    sortedTasks,
  };
};
