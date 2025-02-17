import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

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
import { useFieldConfig } from "../hooks/use-field-config";
import { Checkbox } from "@/components/ui/checkbox";

export const GlobalFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fieldConfig = useFieldConfig();

  const form = useForm({
    defaultValues: {
      title: searchParams.get("title") ?? "",
      status: searchParams.get("status") ?? "na",
      priority: searchParams.get("priority") ?? "na",
    } as { [x: string]: string | number },
  });

  async function onSubmit(data: { [x: string]: string | number }) {
    const nextSearchParams = new URLSearchParams(searchParams);

    Object.entries(data).forEach(([key, value]) => {
      if (Boolean(value) && value !== "na") {
        nextSearchParams.set(key, value.toString());
      } else {
        nextSearchParams.delete(key);
      }
    });

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
                  defaultValue={field.value.toString()}
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
                  defaultValue={field.value.toString()}
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

          {...Object.entries(fieldConfig).map(([key, config]) => (
            <FormField
              control={form.control}
              key={key}
              name={key}
              render={({ field }) => (
                <FormItem>
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
                        <SelectItem value="na">{config.label}</SelectItem>
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
          <Button variant="secondary" onClick={handleClear}>
            Clear
          </Button>
        </div>
      </form>
    </Form>
  );
};
