import React from "react";
import { TaskStatusEnum } from "@/common/types/task";
import { cn } from "@/lib/utils";

export const TaskStatusClassMap: Record<TaskStatusEnum, string> = {
  [TaskStatusEnum.COMPLETED]: "bg-green-500",
  [TaskStatusEnum.IN_PROGRESS]: "bg-yellow-500",
  [TaskStatusEnum.NOT_STARTED]: "bg-gray-500",
};

const TaskStatusTranslation: Record<TaskStatusEnum, string> = {
  [TaskStatusEnum.COMPLETED]: "Completed",
  [TaskStatusEnum.IN_PROGRESS]: "In Progress",
  [TaskStatusEnum.NOT_STARTED]: "Not Started",
};

export const TaskStatus = ({
  status = TaskStatusEnum.NOT_STARTED,
}: {
  status?: TaskStatusEnum;
}) => {
  return (
    <div
      className={cn(
        "flex items-center rounded-full whitespace-nowrap px-2 py-1",
        `${TaskStatusClassMap[status]}/50`,
      )}
    >
      <div
        className={cn("w-2 h-2 rounded-full mr-2", TaskStatusClassMap[status])}
      />
      <span className="text-sm font-medium">
        {TaskStatusTranslation[status]}
      </span>
    </div>
  );
};
