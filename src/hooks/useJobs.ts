import { useEffect, useState } from "react";
import { Job } from "@/types";
import { getJobs } from "@/services/jobService";
import { useJobsFilter } from "./useJobsFilter";
import { useJobsPagination } from "./useJobsPagination";

export function useJobs() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);

  const { filteredJobs, query, handleQuery } = useJobsFilter(jobs);
  const { page, paginatedJobs, handleLoadMore } = useJobsPagination(
    filteredJobs,
    setIsLoading,
  );

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError("");
        const jobs = await getJobs();
        setJobs(jobs);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Could not fetch jobs");
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

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
