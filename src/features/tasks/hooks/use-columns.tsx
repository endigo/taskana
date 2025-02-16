import { Task } from "@/common/types/task";
import { DataTableColumn } from "@/components/data-table/types";
import { TaskPriority } from "../components/task-priority";
import { TaskStatus } from "../components/task-status";
import { TaskEdit } from "../components/task-edit-modal";
import { TaskDelete } from "../components/task-delete";

export const useColumns = () => {
  const columns: DataTableColumn<Task>[] = [
    {
      colId: "title",
      header: "Task Name",
      headerClassName: "font-semibold",
      className: "font-medium",
      cell: (row) => row.title,
    },
    {
      colId: "priority",
      header: "Priority",
      headerClassName: "font-semibold w-[80px]",
      className: "font-medium",
      cell: (row) => <TaskPriority priority={row.priority} />,
    },
    {
      colId: "status",
      header: "Status",
      headerClassName: "font-semibold w-[80px]",
      cell: (row) => <TaskStatus status={row.status} />,
    },
    {
      colId: "id",
      header: "Action",
      headerClassName: "font-semibold w-[150px]",
      cell: (row) => {
        return (
          <>
            <TaskEdit task={row} />
            <TaskDelete task={row} />
          </>
        );
      },
    },
  ];

  // TODO: Load columns from SK_TASK_CONFIG
  // TODO: Generate columns from config

  return columns;
};
