"use client";

import { useQuery } from "@tanstack/react-query";
import TaskTable from "@/features/task-list/components/task-table";
import { fetchTasks } from "@/features/task-list/services/tasks";
import Loader from "@/features/task-list/components/task-table-loader";

export default function Tasks() {
  const { data, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => fetchTasks({}),
  });

  // TODO: load tasks lists
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
    <div className="">
      <TaskTable tasks={data} />
    </div>
  );
}
