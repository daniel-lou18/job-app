import { ChangeEvent, useMemo, useState } from "react";
import { Job } from "@/types";

export function useJobsFilter(jobs: Job[]) {
  const [query, setQuery] = useState("");

  function handleQuery(e: ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  const filteredJobs = useMemo(
    () =>
      jobs.filter(
        (job) =>
          job.jobTitle.trim().toLowerCase().includes(query.toLowerCase()) ||
          job.companyName.trim().toLowerCase().includes(query.toLowerCase()) ||
          job.location.trim().toLowerCase().includes(query.toLowerCase()),
      ),
    [query, jobs],
  );

  return { filteredJobs, handleQuery, query };
}
