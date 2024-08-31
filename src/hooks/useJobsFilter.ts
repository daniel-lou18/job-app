import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Job } from "@/types";
import { filterJobs } from "@/utils/helpers";

export function useJobsFilter(jobs: Job[]) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  function handleQuery(e: ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  useEffect(() => {
    // Debouncing ensures that debouncedQuery only updates after the user has stopped typing for the specified delay.
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    // Cleanup function clears the timeout after re-rendering or on unmount. If the user types again before the timeout delay has passed,
    // the cleanup function will be executed and this specific callback will not get executed. Then, a new timeout is set.
    return () => clearTimeout(timer);
  }, [query]);

  const filteredJobs = useMemo(
    () => filterJobs(jobs, debouncedQuery),
    [debouncedQuery, jobs],
  );

  return { filteredJobs, handleQuery, query, debouncedQuery };
}
