import { Job } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const filterJobs = (jobs: Job[], query: string) =>
  jobs.filter(
    (job) =>
      job.jobTitle.trim().toLowerCase().includes(query.toLowerCase()) ||
      job.companyName.trim().toLowerCase().includes(query.toLowerCase()) ||
      job.location.trim().toLowerCase().includes(query.toLowerCase()),
  );
