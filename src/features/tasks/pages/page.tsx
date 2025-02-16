"use client";

import { useQuery } from "@tanstack/react-query";
import TaskTable from "@/features/tasks/components/task-table";
import { fetchTasks } from "@/features/tasks/services/tasks";
import Loader from "@/features/tasks/components/task-table-loader";
import { TaskCreateModal } from "@/features/tasks/components/task-create-modal";

export default function Tasks() {
  const { data, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => fetchTasks({}),
  });

  // TODO: add Create new Task button

  // TODO: add filtering
  // TODO: add sorting
  // TODO: add pagination
  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return <div>No tasks found.</div>;
  }

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Tasks</h1>
        <TaskCreateModal />
      </div>
      <TaskTable tasks={data} />
    </div>
  );
}
