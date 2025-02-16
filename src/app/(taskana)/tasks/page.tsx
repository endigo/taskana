import { Suspense } from "react";
import TasksPage from "@/features/tasks/pages/page";
import Loader from "@/features/tasks/components/task-table-loader";

export default function Tasks() {
  return (
    <Suspense fallback={<Loader />}>
      <TasksPage />
    </Suspense>
  );
}
