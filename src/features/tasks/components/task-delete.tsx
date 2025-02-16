import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Task } from "@/common/types/task";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "@/features/tasks/services/tasks";

export const TaskDelete = ({ task }: { task: Task }) => {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const handleDelete = async () => {
    await toast.promise(deleteTask(task.id), {
      loading: "Deleting...",
      success: <b>Task deleted!</b>,
      error: <b>Something went wrong!.</b>,
    });

    queryClient.setQueryData(["tasks"], (prevTasks: Task[]) =>
      prevTasks.filter((t) => t.id !== task.id),
    );

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this task?</DialogTitle>
          <DialogDescription>
            Title: <strong className="text-black text-lg">{task.title}</strong>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
