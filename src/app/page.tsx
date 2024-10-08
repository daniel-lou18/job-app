import Search from "@/components/search";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Suspense>
        <Search />
      </Suspense>
    </main>
  );
}
