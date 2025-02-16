import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { TaskForm } from "@/features/tasks/components/task-form";
import { Task } from "@/common/types/task";

export const TaskEdit = ({ task }: { task: Task }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="secondary">
          <Edit />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit: {task.title}</DialogTitle>
          <DialogDescription>Modify the task details.</DialogDescription>
        </DialogHeader>
        <TaskForm
          task={task}
          closeDialog={() => {
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
