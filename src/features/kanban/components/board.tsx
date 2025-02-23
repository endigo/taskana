import { Task, TaskPriorityEnum } from "@/common/types/task";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import KanbanBoardColumn from "./column";
import KanbanTaskCard from "./card";
import React from "react";
import toast from "react-hot-toast";
import { updateTask } from "@/features/tasks/services/tasks";
import { hasDraggableData } from "@/features/kanban/utils";
import { createPortal } from "react-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useFilter } from "@/features/tasks/hooks/use-filter";
import { arrayMove } from "@dnd-kit/sortable";

export const KanbanBoard = ({ tasks }: { tasks: Task[] }) => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") || undefined;
  const filter = useFilter();

  const [activeTask, setActiveTask] = React.useState<Task | undefined>(
    undefined,
  );

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    // useSensor(KeyboardSensor, {
    //   coordinateGetter: coordinateGetter,
    // }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    if (!hasDraggableData(event.active)) return;
    const data = event.active.data.current;

    if (data?.type === "Task") {
      setActiveTask(data.task);
      return;
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveTask(undefined);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (!hasDraggableData(active)) return;

    if (activeId === overId) return;

    if (activeId) {
      await toast.promise(
        updateTask(activeId as number, { priority: overId }),
        {
          loading: "Updating...",
          success: <b>Task updated!</b>,
          error: <b>Something went wrong!.</b>,
        },
      );
    }
  };

  const handleDragOver = async (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    if (!hasDraggableData(active) || !hasDraggableData(over)) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    const isActiveATask = activeData?.type === "Task";
    const isOverATask = overData?.type === "Task";

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      queryClient.setQueryData(["tasks", sort, filter], (tasks: Task[]) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);
        const activeTask = tasks[activeIndex];
        const overTask = tasks[overIndex];
        if (
          activeTask &&
          overTask &&
          activeTask.columnId !== overTask.columnId
        ) {
          activeTask.columnId = overTask.columnId;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = overData?.type === "Column";

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      queryClient.setQueryData(["tasks", sort, filter], (tasks: Task[]) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const activeTask = tasks[activeIndex];
        if (activeTask) {
          activeTask.priority = overId as TaskPriorityEnum;
          return arrayMove(tasks, activeIndex, activeIndex);
        }

        return tasks;
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div className="flex gap-x-6">
        {Object.entries(TaskPriorityEnum).map(([key, priority]) => (
          <KanbanBoardColumn
            key={key}
            priority={priority}
            tasks={tasks.filter((task) => task.priority === priority)}
          />
        ))}
        {"document" in window &&
          createPortal(
            <DragOverlay>
              {activeTask && <KanbanTaskCard task={activeTask} isOverlay />}
            </DragOverlay>,
            document.body,
          )}
      </div>
    </DndContext>
  );
};

export default KanbanBoard;
