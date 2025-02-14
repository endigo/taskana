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

export type BaseTask = {
  id: number;
  title: string;
  status: TaskStatusEnum;
  priority: TaskPriorityEnum;
};

export type Task = BaseTask & Record<string, string | number>;
