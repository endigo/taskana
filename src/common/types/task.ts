export enum TaskStatusEnum {
  NOT_STARTED = "not_started",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
}

export enum TaskPriorityEnum {
  NONE = "none",
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  URGENT = "urgent",
}

export const TaskPriorityOrder = [
  TaskPriorityEnum.URGENT,
  TaskPriorityEnum.HIGH,
  TaskPriorityEnum.MEDIUM,
  TaskPriorityEnum.LOW,
  TaskPriorityEnum.NONE,
];

export type FieldConfig = {
  label: string;
  type: string;
  options?: string[] | string;
  required?: boolean;
  hidden?: boolean;
};

export const DEFAULT_TASK_FIELD_CONFIG: Record<string, FieldConfig> = {
  id: {
    label: "ID",
    type: "number",
    hidden: true,
    required: true,
  },
  title: {
    label: "Title",
    type: "string",
    required: true,
  },
  status: {
    label: "Status",
    type: "string",
    options: Object.values(TaskStatusEnum),
  },
  priority: {
    label: "Priority",
    type: "string",
    options: Object.values(TaskPriorityEnum),
  },
};
export const DEFAULT_TASK_FIELDS = Object.keys(DEFAULT_TASK_FIELD_CONFIG);

export type BaseTask = {
  id: number;
  title: string;
  status: TaskStatusEnum;
  priority: TaskPriorityEnum;
};

export type Task = BaseTask & {
  [x: string]: string | number;
};
