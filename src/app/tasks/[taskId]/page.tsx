import { notFound } from "next/navigation";
import TaskPageClient from "./_components/task-page-client";
import { mockTask } from "./constants";
import { createClient } from "@/utils/supabase/server";

export default async function TaskPage({
  params,
}: {
  params: Promise<{ taskId: string }>;
}) {
  const fetchedTaskId = (await params).taskId;
  const task = mockTask.find((t) => t.id === fetchedTaskId);
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!task || !user) notFound();

  return (
    <TaskPageClient
      task={task}
      capabilities={{
        canEdit: user?.id === task.createdBy,
      }}
    />
  );
}
