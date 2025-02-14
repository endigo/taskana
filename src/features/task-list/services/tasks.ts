import { Task, TaskPriority, TaskStatus } from "@/common/types/task";

export type TaskParams = {
  limit?: number;
  offset?: number;
  status?: TaskStatus;
  priority?: TaskPriority;
  query?: string;
};

export const BASE_URL = "/api/tasks";

export const fetchTasks = async (params: TaskParams) => {
  const queryParams = new URLSearchParams(
    Object.entries(params).reduce(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = value.toString();
        }
        return acc;
      },
      {} as Record<string, string>,
    ),
  );

  let serviceUrl = BASE_URL;

  if (queryParams.size > 0) {
    serviceUrl += `?${queryParams.toString()}`;
  }

  const response = await fetch(serviceUrl);
  const data: Task[] = await response.json();
  return data;
};
