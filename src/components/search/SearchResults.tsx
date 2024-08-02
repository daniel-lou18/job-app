import JobCard from "@/components/search/JobCard";
import { Job } from "@/types";
import SearchResultsSkeleton from "./SearchResultsSkeleton";

type SearchResultsProps = { data: Job[]; count: number; isLoading: boolean };

export default function SearchResults({
  data,
  count,
  isLoading,
}: SearchResultsProps) {
  if (!data?.length && !isLoading) return null;

  return (
    <section className="mb-8 w-full p-4">
      <h4 className="mb-6 text-xl font-bold">
        Jobs
        {count > 0 && (
          <span className="ml-4 rounded-full border border-gray-200 bg-gray-200 px-4 py-2">
            {count}
          </span>
        )}
      </h4>
      <div className="grid grid-cols-1 gap-x-6 gap-y-12 lg:grid-cols-2 xl:grid-cols-3">
        {!data?.length &&
          isLoading &&
          Array.from({ length: 12 }, (_, idx) => (
            <SearchResultsSkeleton key={idx} />
          ))}

        {data.map((job) => (
          <JobCard key={job.id} data={job} />
        ))}
      </div>
    </section>
  );
}
