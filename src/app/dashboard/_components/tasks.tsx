"use client";

import { useState, useMemo, useEffect } from "react";
import { cn } from "@/lib/utils";
import { mockTasks } from "../constants";

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { TaskItem } from "./tasks/task-item";
import { TaskHeader } from "./tasks/task-header";
import { EmptyState } from "./tasks/empty-state";
import { useTaskFilters } from "@/hooks/tasks/use-task-filters";

export default function Tasks() {
  const tasks = mockTasks;
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [isCompact, setIsCompact] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const { filter, setFilter, sortBy, setSortBy, sortedTasks } =
    useTaskFilters(tasks);

  //TODO!:Note: Pagination controls ui is not yet implemented
  // const totalPages = Math.ceil(sortedTasks.length / itemsPerPage);
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

      <CardContent className="">
        <div className="px-4">
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
