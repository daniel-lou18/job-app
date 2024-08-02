import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Job } from "@/types";
import data from "@/utils/data.json";
import { PAGE_SIZE } from "@/utils/constants";

export function useJobs() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError("");
        await new Promise((resolve) => setTimeout(resolve, 1500));
        // throw new Error("There was an error");
        setJobs(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Could not fetch jobs");
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  function handleQuery(e: ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  const filteredData = useMemo(
    () =>
      jobs.filter(
        (job) =>
          job.jobTitle.trim().toLowerCase().includes(query.toLowerCase()) ||
          job.companyName.trim().toLowerCase().includes(query.toLowerCase()) ||
          job.location.trim().toLowerCase().includes(query.toLowerCase()),
      ),
    [query, jobs],
  );

  const paginatedData = useMemo(
    () => filteredData.slice(0, page * PAGE_SIZE),
    [page, filteredData],
  );

  async function handleClick() {
    if (page * PAGE_SIZE >= filteredData.length) return;
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setPage((prevState) => prevState + 1);
    setIsLoading(false);
  }

  return {
    isLoading,
    error,
    query,
    handleQuery,
    page,
    filteredData,
    paginatedData,
    handleClick,
  };
}
