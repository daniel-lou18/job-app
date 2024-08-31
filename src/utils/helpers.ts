import { Job } from "@/types";

export const filterJobs = (jobs: Job[], query: string) =>
  jobs.filter(
    (job) =>
      job.jobTitle.trim().toLowerCase().includes(query.toLowerCase()) ||
      job.companyName.trim().toLowerCase().includes(query.toLowerCase()) ||
      job.location.trim().toLowerCase().includes(query.toLowerCase()),
  );
