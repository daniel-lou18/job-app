import { Skeleton } from "@/components/ui/skeleton";

export default function SearchResultsSkeleton() {
  return (
    <article className="grid w-full max-w-md gap-6 rounded-md border border-gray-300 bg-background p-6">
      <div className="flex gap-16">
        <Skeleton className="h-6 flex-1" />
        <Skeleton className="h-6 w-6 rounded-full" />
      </div>
      <div className="grid gap-2">
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-5 w-1/2" />
      </div>
    </article>
  );
}
