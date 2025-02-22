import { Task, TaskStatusEnum } from "@/common/types/task";
import { DndContext, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import KanbanBoardColumn from "./column";
import KanbanTaskCard from "./card";
import React from "react";

export const KanbanBoard = ({ tasks }: { tasks: Task[] }) => {
  const [activeTask, setActiveTask] = React.useState<Task | undefined>(
    undefined,
  );

  function handleDragStart(event: DragStartEvent) {
    const task = tasks.find((task) => task.id === event.active.id);
    setActiveTask(task);
  }

  function handleDragEnd() {
    setActiveTask(undefined);
  }

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex gap-x-6">
        {Object.entries(TaskStatusEnum).map(([key, status]) => (
          <KanbanBoardColumn
            key={key}
            label={status}
            tasks={tasks.filter((task) => task.status === status)}
            // active={activeTask}
          />
        ))}
        <DragOverlay>
          {activeTask ? <KanbanTaskCard task={activeTask} /> : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
};

export default KanbanBoard;
