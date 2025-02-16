"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "@/features/tasks/services/tasks";
import Loader from "@/features/tasks/components/task-table-loader";
import { TaskCreateModal } from "@/features/tasks/components/task-create-modal";
import DataTable from "@/components/data-table/data-table";
import { useColumns } from "@/features/tasks/hooks/use-columns";
import { useSearchParams } from "next/navigation";

export default function Tasks() {
  const searchParams = useSearchParams();

  const sort = searchParams.get("sort") || undefined;

  const { data, isLoading } = useQuery({
    queryKey: ["tasks", sort],
    queryFn: () =>
      fetchTasks({
        sort,
      }),
  });

  const columns = useColumns();

  // TODO: add sorting
  // TODO: add filtering
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

      <DataTable
        columns={columns}
        data={data}
        className="w-full border rounded-md"
      />
    </div>
  );
}
