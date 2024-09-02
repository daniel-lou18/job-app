import { Job } from "@/types";

export const filterJobs = (jobs: Job[], query: string) =>
  jobs.filter(
    (job) =>
      job.jobTitle.trim().toLowerCase().includes(query.toLowerCase()) ||
      job.companyName.trim().toLowerCase().includes(query.toLowerCase()) ||
      job.location.trim().toLowerCase().includes(query.toLowerCase()),
  );

export const formatJobTitle = (jobTitle: string) =>
  jobTitle.length > 30 ? jobTitle.slice(0, 30) + "..." : jobTitle;

export const formatTags = (tags: string[]) =>
  tags.slice(0, 3).join(", ").length > 30
    ? tags.slice(0, 1).join(", ")
    : tags.slice(0, 3).join(", ");

export const calcMin = (jobs: Job[]) => {
  const meanSalaries = jobs.map((job) => {
    const [str1, str2] = job.salary.split(" à ");
    const [num1] = str1.split("K");
    const [num2] = str2.split("K");
    const mean = (parseInt(num1) + parseInt(num2)) / 2;
    return mean;
  });
  return meanSalaries;
};
