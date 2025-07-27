import { Suspense } from "react";
import CronEditor from "@/components/CronEditor";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            Loading...
          </div>
        }
      >
        <CronEditor />
      </Suspense>
    </div>
  );
}
