import { Active, DataRef, Over } from "@dnd-kit/core";
import { TaskDragData } from "@/features/kanban/components/card";
import { ColumnDragData } from "@/features/kanban/components/column";

type DraggableData = ColumnDragData | TaskDragData;

export function hasDraggableData<T extends Active | Over>(
  entry: T | null | undefined,
): entry is T & {
  data: DataRef<DraggableData>;
} {
  if (!entry) {
    return false;
  }

  const data = entry.data.current;

  if (data?.type === "Task") {
    return true;
  }

  return false;
}
