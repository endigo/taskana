import { FieldConfig, Task } from "@/common/types/task";
import { DataTableColumn } from "@/components/data-table/types";
import { TaskPriority } from "@/features/tasks/components/task-priority";
import { TaskStatus } from "@/features/tasks/components/task-status";
import { TaskEdit } from "@/features/tasks/components/task-edit-modal";
import { TaskDelete } from "@/features/tasks/components/task-delete";
import { useFieldConfig } from "@/features/tasks/hooks/use-field-config";

export const useColumns = () => {
  const fieldConfig = useFieldConfig();

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
    ...Object.entries(fieldConfig as Record<string, FieldConfig>).map(
      ([key, config]) => ({
        colId: key,
        header: config.label,
        headerClassName: "font-semibold w-[150px]",
        cell: (row: Task) => row[key]?.toString() || "-",
      }),
    ),

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
