import { z } from "zod";
import { TaskStatusEnum, TaskPriorityEnum } from "@/common/types/task";
import { useFieldConfig } from "./use-field-config";

const BaseSchema = z.object({
  title: z.string({
    required_error: "Please enter task title",
  }),
  status: z.nativeEnum(TaskStatusEnum).or(z.string().optional()),
  priority: z.nativeEnum(TaskPriorityEnum).or(z.string().optional()),
});

export const useFormSchema = () => {
  const fieldConfig = useFieldConfig();
  const dynamicSchema: Record<
    string,
    z.ZodType<string | number>
  > = Object.entries(fieldConfig).reduce(
    (acc, [key, config]) => {
      if (config.type === "string" || config.type === "date") {
        acc[key] = z.string({
          required_error: config.required ? `Please enter ${key}` : undefined,
        });
      } else if (config.type === "number") {
        acc[key] = z.number({
          required_error: config.required ? `Please enter ${key}` : undefined,
        });
      } else if (config.type === "checkbox") {
        acc[key] = z.string({
          required_error: config.required ? `Please enter ${key}` : undefined,
        });
      } else if (config.type === "select") {
        acc[key] = z.string({
          required_error: config.required ? `Please select ${key}` : undefined,
        });
      }

      return acc;
    },
    {} as Record<string, z.ZodType<string | number>>,
  );

  return BaseSchema.extend(dynamicSchema);
};
