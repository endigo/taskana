import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

import { TaskStatusEnum, TaskPriorityEnum, Task } from "@/common/types/task";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TaskPriority } from "./task-priority";
import { TaskStatus } from "./task-status";
import { createTask, updateTask } from "@/features/tasks/services/tasks";
import { useFieldConfig } from "@/features/tasks/hooks/use-field-config";
import { useFormSchema } from "@/features/tasks/hooks/use-form-schema";
import { useFilter } from "@/features/tasks/hooks/use-filter";
import { Checkbox } from "@/components/ui/checkbox";

interface IProps {
  task?: Task;
  closeDialog?: () => void;
}

export const TaskForm = ({ task, closeDialog }: IProps) => {
  const queryClient = useQueryClient();

  const fieldConfig = useFieldConfig();
  const taskFormSchema = useFormSchema();
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") || undefined;
  const filter = useFilter();

  const form = useForm<z.infer<typeof taskFormSchema>>({
    defaultValues: task ?? {
      title: "",
      status: TaskStatusEnum.NOT_STARTED,
      priority: TaskPriorityEnum.NONE,
    },
    resolver: zodResolver(taskFormSchema),
  });

  async function onSubmit(data: z.infer<typeof taskFormSchema>) {
    if (task && task.id) {
      await toast.promise(updateTask(task.id, data), {
        loading: "Updating...",
        success: <b>Task updated!</b>,
        error: <b>Something went wrong!.</b>,
      });

      queryClient.invalidateQueries({
        queryKey: ["tasks", sort, filter],
      });
      closeDialog?.();
    } else {
      const newTask = await toast.promise(createTask(data), {
        loading: "Saving...",
        success: <b>Task created!</b>,
        error: <b>Something went wrong!.</b>,
      });

      queryClient.setQueryData(["tasks", sort, filter], (prev: Task[]) => [
        ...prev,
        newTask,
      ]);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Title</FormLabel>
              <Input
                defaultValue={field.value}
                onChange={field.onChange}
                placeholder="New Task"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row gap-4">
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(TaskPriorityEnum).map((value) => (
                      <SelectItem key={value} value={value}>
                        {value === TaskPriorityEnum.NONE ? (
                          <span className="text-gray-400">None</span>
                        ) : (
                          <TaskPriority priority={value} />
                        )}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(TaskStatusEnum).map((value) => (
                      <SelectItem key={value} value={value}>
                        <TaskStatus status={value} />
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {...Object.entries(fieldConfig).map(([key, config]) => (
          <FormField
            control={form.control}
            key={key}
            name={key}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{config.label}</FormLabel>
                {config.type === "text" ? (
                  <Input
                    defaultValue={field.value}
                    onChange={field.onChange}
                    placeholder={config.label}
                  />
                ) : config.type === "select" ? (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={config.label} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {(Array.isArray(config.options)
                        ? config.options
                        : (config.options || "").split(", ")
                      ).map((value) => (
                        <SelectItem key={value} value={value}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : config.type === "checkbox" ? (
                  <Checkbox
                    checked={Boolean(field.value)}
                    onCheckedChange={field.onChange}
                  />
                ) : (
                  <Input
                    defaultValue={field.value}
                    onChange={field.onChange}
                    placeholder={config.label}
                  />
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
