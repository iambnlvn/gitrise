import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown, CheckSquare, ListFilter, Trash2 } from "lucide-react";
import { SortOption, TaskFilter } from "../../types";
import { Separator } from "@/components/ui/separator";

interface TaskHeaderProps {
  /** Current filter value */
  filter: TaskFilter;
  /** Callback to set filter value */
  setFilter: (filter: TaskFilter) => void;
  /** Current sort option */
  sortBy: SortOption;
  /** Callback to set sort option */
  setSortBy: (sortBy: SortOption) => void;
  /** Number of selected tasks */
  selectedTasks: string[];
  /** Whether compact mode is enabled */
  isCompact: boolean;
  /** Callback to toggle compact mode */
  setIsCompact: (compact: boolean) => void;
}

export const TaskHeader = ({
  filter,
  setFilter,
  sortBy,
  setSortBy,
  selectedTasks,
  isCompact,
  setIsCompact,
}: TaskHeaderProps) => {
  return (
    <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
      {/* Left: Search & Tabs */}
      <div className="flex w-full flex-col gap-4 sm:flex-row lg:w-auto">
        <Tabs
          value={filter}
          onValueChange={(v: string) => setFilter(v as TaskFilter)}
          className="w-full sm:w-auto"
        >
          <TabsList className="grid w-full grid-cols-3 sm:w-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="assigned">Mine</TabsTrigger>
            <TabsTrigger value="urgent">Urgent</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex w-full items-center justify-end gap-2 lg:w-auto">
        {selectedTasks.length > 0 && (
          <div className="animate-in slide-in-from-right-4 fade-in mr-2 flex items-center gap-2">
            <span className="text-muted-foreground text-xs font-medium">
              {selectedTasks.length} selected
            </span>
            <Button size="icon" variant="destructive" className="size-8">
              <Trash2 className="size-4" />
            </Button>
            <Button size="icon" variant="outline" className="size-8">
              <CheckSquare className="size-4" />
            </Button>
            <Separator orientation="vertical" className="mx-1 h-6" />
          </div>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <ListFilter className="size-4" />
              <span className="hidden sm:inline">View</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>View Options</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={isCompact}
              onCheckedChange={setIsCompact}
            >
              Compact Mode
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Sort By</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setSortBy("newest")}>
              Newest First
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("dueDate")}>
              Due Date
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("priority")}>
              Priority
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Select
          value={sortBy}
          onValueChange={(v) => setSortBy(v as SortOption)}
        >
          <SelectTrigger className="h-9 w-[140px] text-xs">
            <ArrowUpDown className="mr-2 size-3.5" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="priority">Priority</SelectItem>
            <SelectItem value="dueDate">Due Date</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
