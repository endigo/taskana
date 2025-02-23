import React from "react";
import { Task } from "@/common/types/task";
import { cn } from "@/lib/utils";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import KanbanTaskCard from "./card";

export type ColumnType = "Column";

export interface ColumnDragData {
  type: ColumnType;
  priority: string;
}

export const KanbanBoardColumn = ({
  priority,
  tasks,
}: Readonly<{
  priority: string;
  tasks: Task[];
}>) => {
  const tasksIds = React.useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const { setNodeRef } = useSortable({
    id: priority,
    data: {
      type: "Column",
      priority,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={cn("flex flex-col flex-shrink-0 snap-cente")}
    >
      <h2>{priority}</h2>

      <div className="flex flex-col max-h-[calc(100vh-250px)] overflow-y-auto gap-2">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <KanbanTaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default KanbanBoardColumn;
