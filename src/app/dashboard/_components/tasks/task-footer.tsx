import { CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Task } from "../../constants";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
interface TaskFooterProps {
  currentPage: number;
  itemsPerPage: number;
  sortedTasks: Task[];
  setItemsPerPage: (itemsPerPage: number) => void;
  setCurrentPage: (value: number | ((prev: number) => number)) => void;
  totalPages: number;
}
export const TaskFooter = ({
  currentPage,
  itemsPerPage,
  sortedTasks,
  setItemsPerPage,
  setCurrentPage,
  totalPages,
}: TaskFooterProps) => {
  return (
    <CardFooter className="bg-muted/10 flex flex-col items-center justify-between gap-4 border-t p-4 sm:flex-row">
      <div className="text-muted-foreground text-xs">
        Showing <strong>{(currentPage - 1) * itemsPerPage + 1}</strong> to{" "}
        <strong>
          {Math.min(currentPage * itemsPerPage, sortedTasks.length)}
        </strong>{" "}
        of <strong>{sortedTasks.length}</strong> tasks
      </div>

      <div className="flex items-center gap-2">
        <div className="mr-4 flex items-center gap-1">
          <span className="text-muted-foreground text-xs whitespace-nowrap">
            Rows per page
          </span>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(v) => setItemsPerPage(Number(v))}
          >
            <SelectTrigger className="h-8 w-16 text-xs">
              <SelectValue placeholder={itemsPerPage.toString()} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => setCurrentPage((p: number) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <div className="flex min-w-[2rem] items-center justify-center text-sm font-medium">
            {currentPage}
          </div>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() =>
              setCurrentPage((p: number) => Math.min(totalPages, p + 1))
            }
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </CardFooter>
  );
};
