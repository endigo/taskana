export enum TaskStatus {
  NOT_STARTED = "not_started",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
}
export enum TaskPriority {
  NONE = "none",
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  URGENT = "urgent",
}

export type BaseTask = {
  id: number;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
};

export type Task = BaseTask & Record<string, string | number>;
