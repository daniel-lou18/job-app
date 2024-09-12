import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function AnalyticsSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <article
      className={cn(
        "grid w-full gap-6 rounded-md border border-gray-300 bg-background p-6",
        className,
      )}
    >
      <div className="flex gap-16">
        <Skeleton className="h-6 flex-1" />
      </div>
      <div className="grid gap-2">
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-5 w-1/2" />
      </div>
    </article>
  );
}
