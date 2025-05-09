"use client";

import { useState } from "react";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { CalendarIcon, GripVertical } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { TodoItem, useTodos } from "@/hooks/useTodos";
import { Skeleton } from "./ui/skeleton";

interface SortableTodoItemProps {
  item: TodoItem;
  onToggle: (id: string) => void;
}

/**
 * Sortable todo item component
 */
const SortableTodoItem = ({ item, onToggle }: SortableTodoItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        "p-4 touch-none",
        isDragging && "opacity-50"
      )}
    >
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="cursor-grab"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4" />
        </Button>
        <Checkbox 
          id={item.id} 
          checked={item.checked}
          onCheckedChange={() => onToggle(item.id)}
        />
        <label
          htmlFor={item.id}
          className={cn(
            "text-sm text-muted-foreground flex-1 cursor-pointer",
            item.checked && "line-through"
          )}
        >
          {item.text}
        </label>
      </div>
    </Card>
  );
};

/**
 * Loading skeleton for todo items
 */
const TodoSkeleton = () => (
  <div className="space-y-2">
    {[1, 2, 3].map((i) => (
      <Card key={i} className="p-4">
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-4 flex-1" />
        </div>
      </Card>
    ))}
  </div>
);

/**
 * TodoList component with drag and drop functionality
 */
const TodoList = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);
  const { items, isLoading, toggleTodo, reorderTodos } = useTodos();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      reorderTodos(oldIndex, newIndex);
    }
  };

  return (
    <div className="">
      <h1 className="text-lg font-medium mb-6">Todo List</h1>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button className="w-full">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-auto">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
      
      <ScrollArea className="h-[400px] mt-4">
        {isLoading ? (
          <TodoSkeleton />
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
              <div className="flex flex-col gap-2">
                {items.map((item) => (
                  <SortableTodoItem 
                    key={item.id} 
                    item={item}
                    onToggle={toggleTodo}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </ScrollArea>
    </div>
  );
};

export default TodoList;
