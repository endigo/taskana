import { Task } from "@/common/types/task";
import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import KanbanTaskCard from "./card";

export const KanbanBoardColumn = ({
  children,
  label,
  tasks,
  // active,
}: Readonly<{
  children?: React.ReactNode;
  label: string;
  tasks: Task[];
  // active?: Task;
}>) => {
  const { isOver, setNodeRef } = useDroppable({
    id: `column-${label}`,
  });

  return (
    <SortableContext items={tasks}>
      <div ref={setNodeRef} className={cn("flex flex-col gap-2 p-2")}>
        <h2>{label}</h2>

        {isOver && <div className="bg-black p-4">Drop here to</div>}

        {/* {isOver && active && (
          <div className="opacity-40">
            <KanbanTaskCard task={active} />
          </div>
        )} */}

        {tasks
          .map((task) => (
            <KanbanTaskCard key={task.id} task={task} />
          ))}
        {children}
      </div>
    </SortableContext>
  );
};

export default KanbanBoardColumn;
