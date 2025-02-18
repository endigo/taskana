import { APP_NAME } from "@/common/constants";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-[24px] font-medium">{APP_NAME}</h1>

      <Button asChild variant="default" className="px-12 py-6 rounded-[32px]">
        <Link href="/tasks">Go To Tasks</Link>
      </Button>
    </div>
  );
}
