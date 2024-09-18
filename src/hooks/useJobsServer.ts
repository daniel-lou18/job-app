import { useEffect, useState } from "react";
import { Job } from "@/types";
import { getJobs } from "@/services/jobService";
import { useJobsPagination } from "./useJobsPagination";
import { useQuery } from "./useQuery";

export function useJobs() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { filteredJobs, query, handleQuery, getQueryParams, jobs, setJobs } =
    useQuery();
  const { page, paginatedJobs, handleLoadMore } = useJobsPagination(
    jobs,
    setIsLoading,
  );

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError("");
        const jobs = getQueryParams()
          ? await getJobs(getQueryParams())
          : await getJobs();
        console.log(jobs);
        setJobs(jobs);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Could not fetch jobs");
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [getQueryParams, setJobs]);

  return {
    isLoading,
    error,
    query,
    handleQuery,
    page,
    filteredJobs,
    paginatedJobs,
    handleLoadMore,
  };
}
