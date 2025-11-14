import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerClose,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { CheckCircle2, CheckSquare, MoreVertical, Trash2 } from "lucide-react";

interface TaskActionsProps {
  /** Callback when the complete action is triggered */
  onComplete: () => void;
  /** Callback when the edit action is triggered */
  onEdit?: () => void;
  /** Callback when the delete action is triggered */
  onDelete?: () => void;
  /** Whether the actions menu/drawer is open */
  open?: boolean;
  /** Callback when the open state changes */
  onOpenChange?: (open: boolean) => void;
}

export const TaskActions = ({
  onComplete,
  onEdit,
  onDelete,
  open,
  onOpenChange,
}: TaskActionsProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <MoreVertical className="size-4" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Task Actions</DrawerTitle>
            <DrawerDescription>
              Manage this task&apos;s status and details.
            </DrawerDescription>
          </DrawerHeader>
          <div className="space-y-2 px-4">
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={onComplete}
            >
              <CheckCircle2 className="size-4 text-emerald-500" />
              Mark as Complete
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={onEdit}
            >
              <CheckSquare className="size-4" />
              Edit Task
            </Button>
            <Button
              variant="destructive"
              className="w-full justify-start gap-2"
              onClick={onDelete}
            >
              <Trash2 className="size-4" />
              Delete Task
            </Button>
          </div>
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-8 cursor-pointer opacity-0 transition-opacity group-hover:opacity-100"
        >
          <MoreVertical className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={onComplete} className="cursor-pointer">
          <CheckCircle2 className="text-muted-foreground mr-2 size-4" />
          Mark Complete
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onEdit} className="cursor-pointer">
          <CheckSquare className="text-muted-foreground mr-2 size-4" />
          Edit Task
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={onDelete}
          className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700"
        >
          <Trash2 className="mr-2 size-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
