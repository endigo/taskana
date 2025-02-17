import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { TaskStatusEnum, TaskPriorityEnum } from "@/common/types/task";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
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

const FormSchema = z.object({
  title: z.string({
    required_error: "Please enter task title",
  }),
  status: z.nativeEnum(TaskStatusEnum).or(z.string().optional()),
  priority: z.nativeEnum(TaskPriorityEnum).or(z.string().optional()),
});

export const GlobalFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: {
      title: searchParams.get("title") ?? "",
      status: searchParams.get("status") ?? "na",
      priority: searchParams.get("priority") ?? "na",
    },
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const nextSearchParams = new URLSearchParams(searchParams);

    if (Boolean(data.title)) {
      nextSearchParams.set("title", data.title);
    } else {
      nextSearchParams.delete("title");
    }

    if (data.status) {
      if (data.status !== "na") {
        nextSearchParams.set("status", data.status);
      } else {
        nextSearchParams.delete("status");
      }
    }

    if (data.priority) {
      if (data.priority !== "na") {
        nextSearchParams.set("priority", data.priority);
      } else {
        nextSearchParams.delete("priority");
      }
    }

    router.push(`?${nextSearchParams.toString()}`);
  }

  const handleClear = () => {
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.delete("title");
    nextSearchParams.delete("status");
    nextSearchParams.delete("priority");

    window.location.href = `?${nextSearchParams.toString()}`;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="my-4">
        <div className="flex flex-row gap-4 items-center ">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center mr-2">
                <Input
                  defaultValue={field.value}
                  onChange={field.onChange}
                  placeholder="Search by title"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center mr-2">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="na">Priority</SelectItem>
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
              <FormItem className="flex flex-row items-center mr-2">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="na">Status</SelectItem>
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
          <Button type="submit">Submit</Button>
          <Button variant="secondary" onClick={handleClear}>
            Clear
          </Button>
        </div>
      </form>
    </Form>
  );
};
