import { Task } from "@/common/types/task";
import { useSortable } from "@dnd-kit/sortable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TaskPriority } from "@/features/tasks/components/task-priority";

export const KanbanTaskCard = ({
  task,
}: Readonly<{
  task: Task;
}>) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task.id,
    });

  return (
    <Card
      ref={setNodeRef}
      style={{ transition }}
      className={
        transform
          ? `translate-x-[${transform.x}px] translate-y-[${transform.y}px]`
          : undefined
      }
      {...listeners}
      {...attributes}
    >
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <TaskPriority priority={task.priority} />
        </div>
      </CardContent>
    </Card>
  );
};

export default KanbanTaskCard;
