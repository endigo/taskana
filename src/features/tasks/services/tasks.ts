import { SK_DATA, SK_TASK_ID } from "@/common/constants";
import {
  Task,
  TaskPriorityEnum,
  TaskPriorityOrder,
  TaskStatusEnum,
} from "@/common/types/task";
import { SortDirection } from "@/components/data-table/types";

export type TaskParams = {
  limit?: string | number;
  page?: string | number;
  sort?: string;
  filter?: Record<string, string>;
};

export type TaskInput = Record<string, string | number>;

export const syncTasksFromGist = async () => {
  if (typeof window === "undefined" || typeof localStorage === "undefined") {
    console.error("Syncing cannot be performed in a server environment");
    return;
  }

  console.info("Syncing tasks from gist...");

  const gistUrl =
    "https://gist.githubusercontent.com/yangshun/7acbe005af922e43a26dea8109e16aed/raw/01df391c8320df0a37c73fdbf6b8fc7d88aae719/greatfrontend-tasks.json";

  const response = await fetch(gistUrl);
  const data = await response.json();

  localStorage.setItem(SK_DATA, JSON.stringify(data));

  const nextId = Math.max(...data.map((task: Task) => task.id)) + 1;

  localStorage.setItem(SK_TASK_ID, `${nextId}`);

  console.info("Tasks synced successfully");

  return data;
};

export const fetchTasks = async (params: TaskParams): Promise<Task[]> => {
  if (!localStorage[SK_DATA]) {
    console.info("No tasks found");
    await syncTasksFromGist();
  }

  const data = localStorage[SK_DATA];

  if (data) {
    const parsedData = JSON.parse(data) as Task[];

    if (params.sort) {
      const splittedSort = params.sort.split("_");

      const sortColumn = splittedSort[0] as keyof Task;
      const direction = splittedSort[1] as SortDirection;

      if (sortColumn === "priority") {
        parsedData.sort(sortByPriority(direction));
      } else {
        parsedData.sort((a: Task, b: Task) => {
          const valA = a[sortColumn];
          const valB = b[sortColumn];

          if (!valA || !valB) return 0;

          if (typeof valA === "string" && typeof valB === "string") {
            if (direction === "asc") {
              return valA.toLowerCase().localeCompare(valB.toLowerCase());
            }
            return valB.toLowerCase().localeCompare(valA.toLowerCase());
          }

          // TODO: handle other types of fields numbers, boolean, date
          if (direction === "asc") {
            return +valA - +valB;
          }
          return +valB - +valA;
        });
      }
    }

    let result = parsedData;

    if (params.filter) {
      result = result.filter((task) => {
        return Object.entries(params.filter ?? {}).every(([field, value]) => {
          const fieldValue = task[field];

          if (typeof value === "string" && typeof fieldValue === "string") {
            return fieldValue.toLowerCase().includes(value.toLowerCase());
          }
          return task[field] === value;
        });
      });
    }

    return result;
  }
  return [];
};

const sortByPriority = (direction: SortDirection) => {
  return (a: Task, b: Task) => {
    // Sort by following priority
    // 1. Urgent
    // 2. High
    // 3. Medium
    // 4. Low
    // 5. None
    const aIndex = TaskPriorityOrder.indexOf(a.priority);
    const bIndex = TaskPriorityOrder.indexOf(b.priority);

    if (direction === "asc") {
      return aIndex - bIndex;
    }
    return bIndex - aIndex;
  };
};

export const createTask = async (input: TaskInput) => {
  const data = await fetchTasks({});

  const nextId = parseInt(localStorage[SK_TASK_ID] ?? "1");

  const newTask: Task = {
    ...input,
    id: nextId,
    title: input.title as string,
    status: input.status as TaskStatusEnum,
    priority: input.priority as TaskPriorityEnum,
  };

  data.push(newTask);

  localStorage.setItem(SK_DATA, JSON.stringify(data));
  localStorage.setItem(SK_TASK_ID, `${nextId + 1}`);

  return newTask;
};

export const deleteTask = async (taskId: number) => {
  const data = await fetchTasks({});

  const nextData = data.filter((task) => task.id !== taskId);
  localStorage.setItem(SK_DATA, JSON.stringify(nextData));

  return taskId;
};

export const updateTask = async (taskId: number, input: TaskInput) => {
  const data = await fetchTasks({});

  // TODO: improve the following code
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    if (row.id === taskId) {
      data[i] = { ...row, ...input };
    }
  }

  localStorage.setItem(SK_DATA, JSON.stringify(data));

  return taskId;
};
