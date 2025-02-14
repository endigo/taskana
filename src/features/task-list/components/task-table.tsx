import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Task } from "@/common/types/task";
import { TaskPriority } from "./task-priority";
import { TaskStatus } from "./task-status";

export default function AllTasks({ tasks = [] }: { tasks: Task[] }) {
  if (tasks.length === 0) {
    // TODO: render empty state
  }

  return (
    <Table className="w-full border rounded-md">
      <TableHeader>
        <TableRow>
          <TableHead className="font-semibold">Task Name</TableHead>
          <TableHead className="font-semibold w-[80px]">Priority</TableHead>
          <TableHead className="font-semibold w-[80px]">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell className="font-medium">{task.title}</TableCell>
            <TableCell>
              <TaskPriority priority={task.priority} />
            </TableCell>
            <TableCell>
              <TaskStatus status={task.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
