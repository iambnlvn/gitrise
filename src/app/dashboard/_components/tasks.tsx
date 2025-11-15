"use client";

import { useState, useMemo, useEffect } from "react";
import { mockTasks } from "../constants";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import { TaskItem } from "./tasks/task-item";
import { TaskHeader } from "./tasks/task-header";
import { EmptyState } from "./tasks/empty-state";
import { useTaskFilters } from "@/hooks/tasks/use-task-filters";
import { TaskFooter } from "./tasks/task-footer";
//TODO!: reduce prop drilling

export default function Tasks() {
  const tasks = mockTasks;
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [isCompact, setIsCompact] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const { filter, setFilter, sortBy, setSortBy, sortedTasks } =
    useTaskFilters(tasks);

  const totalPages = Math.ceil(sortedTasks.length / itemsPerPage);
  const paginatedTasks = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedTasks.slice(start, start + itemsPerPage);
  }, [sortedTasks, currentPage, itemsPerPage]);

  useEffect(() => setCurrentPage(1), [filter, itemsPerPage]);

  return (
    <Card className="animate-in fade-in-0 slide-in-from-bottom-8 flex h-full flex-col shadow-sm duration-700">
      <CardHeader className="px-6">
        <TaskHeader
          filter={filter}
          setFilter={setFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          selectedTasks={selectedTasks}
          isCompact={isCompact}
          setIsCompact={setIsCompact}
        />
      </CardHeader>

      <CardContent>
        <div className="sm:px-4">
          <div className="space-y-4">
            {paginatedTasks.length > 0 ? (
              paginatedTasks.map((task, i) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.2 }}
                >
                  <TaskItem
                    task={task}
                    isSelected={selectedTasks.includes(task.id)}
                    onToggleSelect={(id) => {
                      setSelectedTasks((prev) =>
                        prev.includes(id)
                          ? prev.filter((tid) => tid !== id)
                          : [...prev, id],
                      );
                    }}
                    isCompact={isCompact}
                  />
                </motion.div>
              ))
            ) : (
              <EmptyState filter={filter} />
            )}
          </div>
        </div>
      </CardContent>

      <TaskFooter
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        sortedTasks={sortedTasks}
        setItemsPerPage={setItemsPerPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </Card>
  );
}
