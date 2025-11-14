import { TaskFilter } from "../../types";

/**
 * Renders empty state when no tasks match the filter
 * @param filter - Current filter to show appropriate message
 */
export const EmptyState = ({ filter }: { filter: TaskFilter }) => (
  <div className="text-muted-foreground animate-in fade-in-0 zoom-in-95 py-10 text-center duration-500">
    <p>
      {filter === "urgent"
        ? "No urgent tasks found."
        : filter === "assigned"
          ? "You have no assigned tasks."
          : "No tasks available."}
    </p>
  </div>
);
