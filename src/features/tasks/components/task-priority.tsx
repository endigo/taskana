import React from "react";
import { TaskPriorityEnum } from "@/common/types/task";
import { cn } from "@/lib/utils";

export const TaskPriorityClassMap: Record<TaskPriorityEnum, string> = {
  [TaskPriorityEnum.NONE]: "",
  [TaskPriorityEnum.LOW]: "bg-green-900",
  [TaskPriorityEnum.MEDIUM]: "bg-yellow-900",
  [TaskPriorityEnum.HIGH]: "bg-red-900",
  [TaskPriorityEnum.URGENT]: "bg-red-900",
};

const TaskPriorityLabelMap: Record<TaskPriorityEnum, string> = {
  [TaskPriorityEnum.NONE]: "",
  [TaskPriorityEnum.LOW]: "Low 🤫",
  [TaskPriorityEnum.MEDIUM]: "Medium",
  [TaskPriorityEnum.HIGH]: "High ‼️",
  [TaskPriorityEnum.URGENT]: "Urgent 🚨",
};

export const TaskPriority = ({ priority }: { priority?: TaskPriorityEnum }) => {
  if (!priority) return null;

  return (
    <div
      className={cn(
        "text-center rounded-sm text-white whitespace-nowrap px-2 py-1",
        TaskPriorityClassMap[priority],
      )}
    >
      <span className="text-sm font-medium">
        {TaskPriorityLabelMap[priority]}
      </span>
    </div>
  );
};
