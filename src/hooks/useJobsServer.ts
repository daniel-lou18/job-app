import { useEffect, useState } from "react";
import { Job } from "@/types";
import { getJobs } from "@/services/jobService";
import { useJobsFilter } from "./useJobsFilter";
import { useJobsPagination } from "./useJobsPagination";

export function useJobs() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);

  const { filteredJobs, query, handleQuery, debouncedQuery } =
    useJobsFilter(jobs);
  const { page, paginatedJobs, handleLoadMore } = useJobsPagination(
    jobs,
    setIsLoading,
  );

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError("");
        const searchParams = new URLSearchParams({ q: debouncedQuery });
        const jobs = debouncedQuery
          ? await getJobs(searchParams)
          : await getJobs();
        setJobs(jobs);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Could not fetch jobs");
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [debouncedQuery]);

  return {
    isLoading,
    error,
    query,
    handleQuery,
    page,
    jobs,
    filteredJobs,
    paginatedJobs,
    handleLoadMore,
  };
}
