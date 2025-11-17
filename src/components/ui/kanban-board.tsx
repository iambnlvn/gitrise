"use client";

import type {
  Announcements,
  DndContextProps,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  createContext,
  memo,
  type HTMLAttributes,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";
import tunnel from "tunnel-rat";

import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

// Re-export for consumer convenience
export type { DragEndEvent } from "@dnd-kit/core";

/**
 * Base properties required for a kanban item.
 * Extend this type to add custom properties to your kanban cards.
 *
 * @example
 * ```ts
 * type TaskItem = KanbanItemProps & {
 *   priority: 'low' | 'medium' | 'high';
 *   assignee: string;
 * };
 * ```
 */
export type KanbanItemProps = {
  /** Unique identifier for the item */
  id: string;
  /** Display name of the item */
  name: string;
  /** ID of the column this item belongs to */
  column: string;
} & Record<string, unknown>;

/**
 * Base properties required for a kanban column.
 * Extend this type to add custom properties to your columns.
 *
 * @example
 * ```ts
 * type StatusColumn = KanbanColumnProps & {
 *   color: string;
 *   limit?: number;
 * };
 * ```
 */
export type KanbanColumnProps = {
  /** Unique identifier for the column */
  id: string;
  /** Display name of the column */
  name: string;
} & Record<string, unknown>;

/**
 * Internal context state for the kanban board.
 * @internal
 */
type KanbanContextState<
  TItem extends KanbanItemProps = KanbanItemProps,
  TColumn extends KanbanColumnProps = KanbanColumnProps,
> = {
  columns: TColumn[];
  data: TItem[];
  activeCardId: string | null;
};

const KanbanContext = createContext<KanbanContextState | null>(null);

/**
 * Custom hook to access the kanban context.
 * Must be used within a KanbanProvider.
 *
 * @throws {Error} When used outside of KanbanProvider
 * @returns The kanban context state
 *
 * @example
 * ```tsx
 * const { data, columns, activeCardId } = useKanbanContext<MyItemType>();
 * ```
 */
export function useKanbanContext<
  TItem extends KanbanItemProps = KanbanItemProps,
  TColumn extends KanbanColumnProps = KanbanColumnProps,
>(): KanbanContextState<TItem, TColumn> {
  const context = useContext(KanbanContext);

  if (!context) {
    throw new Error(
      "useKanbanContext must be used within a KanbanProvider. " +
        "Wrap your component tree with <KanbanProvider>.",
    );
  }

  return context as KanbanContextState<TItem, TColumn>;
}

const dragOverlayTunnel = tunnel();

/**
 * Finds an item by ID in the data array.
 * @internal
 */
function findItemById<T extends KanbanItemProps>(
  data: T[],
  id: string | number,
): T | undefined {
  return data.find((item) => item.id === id);
}

/**
 * Creates accessibility announcements for drag operations.
 * @internal
 */
function createAnnouncements<
  TItem extends KanbanItemProps,
  TColumn extends KanbanColumnProps,
>(data: TItem[], columns: TColumn[]): Announcements {
  return {
    onDragStart({ active }) {
      const item = findItemById(data, active.id as string);
      return `Picked up the card "${item?.name}" from the "${item?.column}" column`;
    },
    onDragOver({ active, over }) {
      const item = findItemById(data, active.id as string);
      const newColumn = columns.find((col) => col.id === over?.id)?.name;
      return `Dragged the card "${item?.name}" over the "${newColumn}" column`;
    },
    onDragEnd({ active, over }) {
      const item = findItemById(data, active.id as string);
      const newColumn = columns.find((col) => col.id === over?.id)?.name;
      return `Dropped the card "${item?.name}" into the "${newColumn}" column`;
    },
    onDragCancel({ active }) {
      const item = findItemById(data, active.id as string);
      return `Cancelled dragging the card "${item?.name}"`;
    },
  };
}

export type KanbanBoardProps = {
  /** Unique identifier for the droppable board area */
  id: string;
  /** Content to render inside the board */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
};

/**
 * A droppable container representing a single column in the kanban board.
 * Provides visual feedback when items are dragged over it.
 *
 * @example
 * ```tsx
 * <KanbanBoard id="todo" className="min-h-[400px]">
 *   <KanbanHeader>To Do</KanbanHeader>
 *   <KanbanCards id="todo">
 *     {(item) => <KanbanCard key={item.id} {...item} />}
 *   </KanbanCards>
 * </KanbanBoard>
 * ```
 */
export const KanbanBoard = memo(function KanbanBoard({
  id,
  children,
  className,
}: KanbanBoardProps) {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "bg-secondary flex size-full min-h-40 flex-col divide-y overflow-hidden rounded-md border text-xs shadow-sm ring-2 transition-all",
        isOver ? "ring-primary" : "ring-transparent",
        className,
      )}
    >
      {children}
    </div>
  );
});

export type KanbanHeaderProps = HTMLAttributes<HTMLDivElement>;

/**
 * Header component for a kanban column.
 * Typically used to display the column title and optional actions.
 *
 * @example
 * ```tsx
 * <KanbanHeader className="flex justify-between items-center">
 *   <span>In Progress</span>
 *   <Badge>{count}</Badge>
 * </KanbanHeader>
 * ```
 */
export const KanbanHeader = memo(function KanbanHeader({
  className,
  ...props
}: KanbanHeaderProps) {
  return (
    <div
      className={cn("m-0 p-2 text-sm font-semibold", className)}
      {...props}
    />
  );
});

export type KanbanCardProps<TItem extends KanbanItemProps = KanbanItemProps> =
  TItem & {
    /** Custom content to render inside the card */
    children?: ReactNode;
    /** Additional CSS classes */
    className?: string;
  };

/**
 * A draggable card component representing a single item in the kanban board.
 * Supports custom content through children prop.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <KanbanCard id="1" name="Task 1" column="todo" />
 *
 * // With custom content
 * <KanbanCard id="1" name="Task 1" column="todo">
 *   <div className="flex flex-col gap-2">
 *     <h3>{item.name}</h3>
 *     <p>{item.description}</p>
 *   </div>
 * </KanbanCard>
 * ```
 */
function KanbanCardComponent<TItem extends KanbanItemProps = KanbanItemProps>({
  id,
  name,
  children,
  className,
}: KanbanCardProps<TItem>) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transition,
    transform,
    isDragging,
  } = useSortable({ id });

  const { activeCardId } = useKanbanContext();

  const style = useMemo(
    () => ({
      transition,
      transform: CSS.Transform.toString(transform),
    }),
    [transition, transform],
  );

  const cardContent = useMemo(
    () => children ?? <p className="m-0 text-sm font-medium">{name}</p>,
    [children, name],
  );

  const baseCardClasses = "cursor-grab gap-4 rounded-md p-3 shadow-sm";

  return (
    <>
      <div style={style} {...listeners} {...attributes} ref={setNodeRef}>
        <Card
          className={cn(
            baseCardClasses,
            isDragging && "pointer-events-none cursor-grabbing opacity-30",
            className,
          )}
        >
          {cardContent}
        </Card>
      </div>

      {activeCardId === id && (
        <dragOverlayTunnel.In>
          <Card
            className={cn(
              baseCardClasses,
              "ring-primary ring-2",
              isDragging && "cursor-grabbing",
              className,
            )}
          >
            {cardContent}
          </Card>
        </dragOverlayTunnel.In>
      )}
    </>
  );
}

export const KanbanCard = memo(
  KanbanCardComponent,
) as typeof KanbanCardComponent;

export type KanbanCardsProps<TItem extends KanbanItemProps = KanbanItemProps> =
  Omit<HTMLAttributes<HTMLDivElement>, "children" | "id"> & {
    /** Render function for each card item */
    children: (item: TItem) => ReactNode;
    /** Column ID to filter items */
    id: string;
  };

/**
 * Container component that renders all cards for a specific column.
 * Automatically filters items by column ID and provides sortable context.
 *
 * @example
 * ```tsx
 * <KanbanCards<TaskItem> id="in-progress">
 *   {(item) => (
 *     <KanbanCard key={item.id} {...item}>
 *       <TaskCardContent task={item} />
 *     </KanbanCard>
 *   )}
 * </KanbanCards>
 * ```
 */
function KanbanCardsComponent<TItem extends KanbanItemProps = KanbanItemProps>({
  children,
  className,
  id,
  ...props
}: KanbanCardsProps<TItem>) {
  const { data } = useKanbanContext<TItem>();

  const filteredData = useMemo(
    () => data.filter((item) => item.column === id),
    [data, id],
  );

  const sortableItems = useMemo(
    () => filteredData.map((item) => item.id),
    [filteredData],
  );

  return (
    <ScrollArea className="overflow-hidden">
      <SortableContext items={sortableItems}>
        <div
          className={cn("flex flex-grow flex-col gap-2 p-2", className)}
          {...props}
        >
          {filteredData.map(children)}
        </div>
      </SortableContext>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
}

export const KanbanCards = memo(
  KanbanCardsComponent,
) as typeof KanbanCardsComponent;

export type KanbanProviderProps<
  TItem extends KanbanItemProps = KanbanItemProps,
  TColumn extends KanbanColumnProps = KanbanColumnProps,
> = Omit<DndContextProps, "children"> & {
  /** Render function for each column */
  children: (column: TColumn) => ReactNode;
  /** Additional CSS classes for the grid container */
  className?: string;
  /** Array of column definitions */
  columns: TColumn[];
  /** Array of item data */
  data: TItem[];
  /** Callback when data changes due to drag operations */
  onDataChange?: (data: TItem[]) => void;
  /** Optional callback for drag start events */
  onDragStart?: (event: DragStartEvent) => void;
  /** Optional callback for drag end events */
  onDragEnd?: (event: DragEndEvent) => void;
  /** Optional callback for drag over events */
  onDragOver?: (event: DragOverEvent) => void;
};

/**
 * Root provider component for the kanban board.
 * Manages drag and drop state, context, and sensors.
 *
 * @example
 * ```tsx
 * const [data, setData] = useState<TaskItem[]>(initialTasks);
 *
 * <KanbanProvider
 *   columns={columns}
 *   data={data}
 *   onDataChange={setData}
 * >
 *   {(column) => (
 *     <KanbanBoard key={column.id} id={column.id}>
 *       <KanbanHeader>{column.name}</KanbanHeader>
 *       <KanbanCards id={column.id}>
 *         {(item) => <KanbanCard key={item.id} {...item} />}
 *       </KanbanCards>
 *     </KanbanBoard>
 *   )}
 * </KanbanProvider>
 * ```
 */
export function KanbanProvider<
  TItem extends KanbanItemProps = KanbanItemProps,
  TColumn extends KanbanColumnProps = KanbanColumnProps,
>({
  children,
  onDragStart,
  onDragEnd,
  onDragOver,
  className,
  columns,
  data,
  onDataChange,
  ...dndProps
}: KanbanProviderProps<TItem, TColumn>) {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5, // Require 5px movement before drag starts
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250, // 250ms hold before drag starts on touch
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor),
  );

  /**
   * Handles the start of a drag operation.
   * Sets the active card ID for overlay rendering.
   */
  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const card = findItemById(data, event.active.id as string);
      if (card) {
        setActiveCardId(event.active.id as string);
      }
      onDragStart?.(event);
    },
    [data, onDragStart],
  );

  /**
   * Handles drag over events for cross-column movement.
   * Updates item column assignment when dragged to a different column.
   */
  const handleDragOver = useCallback(
    (event: DragOverEvent) => {
      const { active, over } = event;

      if (!over) return;

      const activeItem = findItemById(data, active.id as string);
      if (!activeItem) return;

      const overItem = findItemById(data, over.id as string);
      const activeColumn = activeItem.column;
      const overColumn =
        overItem?.column ??
        columns.find((col) => col.id === over.id)?.id ??
        columns[0]?.id;

      // Only update if moving to a different column
      if (activeColumn !== overColumn) {
        const activeIndex = data.findIndex((item) => item.id === active.id);
        const overIndex = data.findIndex((item) => item.id === over.id);

        // Create new array with updated column assignment
        const updatedData = data.map((item, index) =>
          index === activeIndex ? { ...item, column: overColumn } : item,
        );

        // Reorder if needed
        const reorderedData =
          overIndex >= 0
            ? arrayMove(updatedData, activeIndex, overIndex)
            : updatedData;

        onDataChange?.(reorderedData);
      }

      onDragOver?.(event);
    },
    [data, columns, onDataChange, onDragOver],
  );

  /**
   * Handles the end of a drag operation.
   * Finalizes item position within its column.
   */
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveCardId(null);
      onDragEnd?.(event);

      const { active, over } = event;
      if (!over || active.id === over.id) return;

      const oldIndex = data.findIndex((item) => item.id === active.id);
      const newIndex = data.findIndex((item) => item.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const reorderedData = arrayMove([...data], oldIndex, newIndex);
        onDataChange?.(reorderedData);
      }
    },
    [data, onDataChange, onDragEnd],
  );

  const announcements = useMemo(
    () => createAnnouncements(data, columns),
    [data, columns],
  );

  const contextValue = useMemo<KanbanContextState<TItem, TColumn>>(
    () => ({ columns, data, activeCardId }),
    [columns, data, activeCardId],
  );

  const renderedColumns = useMemo(
    () => columns.map((column) => children(column)),
    [columns, children],
  );

  return (
    <KanbanContext.Provider value={contextValue}>
      <DndContext
        accessibility={{ announcements }}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDragStart={handleDragStart}
        sensors={sensors}
        {...dndProps}
      >
        <div
          className={cn(
            "grid size-full auto-cols-fr grid-flow-col gap-4",
            className,
          )}
        >
          {renderedColumns}
        </div>

        {typeof window !== "undefined" &&
          createPortal(
            <DragOverlay dropAnimation={null}>
              <dragOverlayTunnel.Out />
            </DragOverlay>,
            document.body,
          )}
      </DndContext>
    </KanbanContext.Provider>
  );
}
