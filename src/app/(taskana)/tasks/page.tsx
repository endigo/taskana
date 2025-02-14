import { Suspense } from "react";
import TasksPage from "@/features/task-list/pages/page";
import Loader from "@/features/task-list/components/task-table-loader";

export default function Tasks() {
  return (
    <Suspense fallback={<Loader />}>
      <TasksPage />
    </Suspense>
  );
}
