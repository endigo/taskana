import { Task } from "@/common/types/task";
import { useSortable } from "@dnd-kit/sortable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskStatus } from "@/features/tasks/components/task-status";
import { cva } from "class-variance-authority";

export type TaskType = "Task";

export interface TaskDragData {
  type: TaskType;
  task: Task;
}

export const KanbanTaskCard = ({
  task,
  isOverlay,
}: Readonly<{
  task: Task;
  isOverlay?: boolean;
}>) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    attributes: {
      roleDescription: "Task",
    },
  });

  const style = {
    transition,
    transform: `translate3d(${transform?.x ?? 0}px, ${transform?.y ?? 0}px, 0)`,
  };

  const variants = cva("", {
    variants: {
      dragging: {
        over: "ring-2 opacity-30",
        overlay: "ring-2 ring-primary",
      },
    },
  });

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })}
      {...listeners}
      {...attributes}
    >
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex">
          <TaskStatus status={task.status} />
        </div>
      </CardContent>
    </Card>
  );
};

export default KanbanTaskCard;
