"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import DataTable from "@/components/data-table/data-table";
import { TaskCreateModal } from "@/features/tasks/components/task-create-modal";
import { TaskCustomFieldModal } from "@/features/tasks/components/task-custom-field";
import { GlobalFilters } from "@/features/tasks/components/task-global-filters";
import Loader from "@/features/tasks/components/task-table-loader";
import { useColumns } from "@/features/tasks/hooks/use-columns";
import { useFilter } from "@/features/tasks/hooks/use-filter";
import { fetchTasks } from "@/features/tasks/services/tasks";
import KanbanBoard from "@/features/kanban/components/board";

export default function Tasks() {
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") || undefined;
  const filter = useFilter();

  const { data, isLoading } = useQuery({
    queryKey: ["tasks", sort, filter],
    queryFn: () =>
      fetchTasks({
        sort,
        filter,
      }),
  });

  const columns = useColumns();

  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return <div>No tasks found.</div>;
  }

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Taskana</h1>
        <div className="flex space-x-2">
          <TaskCreateModal />
          <TaskCustomFieldModal />
        </div>
      </div>

      <KanbanBoard tasks={data} />

      <GlobalFilters />

      <DataTable
        columns={columns}
        data={data}
        className="w-full border rounded-md"
      />
    </div>
  );
}
