import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Task } from "../constants";

function Tasks({ tasks }: { tasks: Task[] }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <CheckCircle2 className="text-primary h-5 w-5" />
          My Tasks
        </CardTitle>
        <Badge variant="secondary" className="px-2 py-0.5">
          {tasks.length} Pending
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-primary mt-4 w-full text-xs"
        >
          View all tasks
        </Button>
      </CardContent>
    </Card>
  );
}

export default Tasks;

const TaskItem = ({ task }: { task: Task }) => {
  return (
    <div
      key={task.id}
      className="group hover:bg-accent/50 hover:border-border flex items-start justify-between rounded-lg border border-transparent p-3 transition-all"
    >
      <div className="flex items-start gap-3">
        <div className="border-primary/50 hover:bg-primary/20 mt-1 h-4 w-4 cursor-pointer rounded-full border" />
        <div>
          <p className="group-hover:text-primary cursor-pointer text-sm leading-none font-medium transition-colors">
            {task.title}
          </p>
          <p className="text-muted-foreground mt-1 text-xs">
            {task.project} • Due {task.due}
          </p>
        </div>
      </div>
      <Badge
        variant={
          task.priority === "Critical"
            ? "destructive"
            : task.priority === "High"
              ? "default"
              : "outline"
        }
        className="h-5 text-[10px]"
      >
        {task.priority}
      </Badge>
    </div>
  );
};
