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

const calcMeanSalaries = (jobs: Job[]) =>
  jobs.map((job) => {
    const [str1, str2] = job.salary.split(" à ");
    const [num1] = str1.split("K");
    const [num2] = str2.split("K");
    const mean = (parseInt(num1) + parseInt(num2)) / 2;
    return mean;
  });

export const calcMeanSalary = (meanSalaries: number[]) => {
  return parseFloat(
    (
      meanSalaries.reduce((acc: number, elem: number) => acc + elem, 0) /
      meanSalaries.length
    ).toFixed(1),
  );
};

export const calcMinSalary = (meanSalaries: number[]) => {
  return Math.min(...meanSalaries);
};

export const calcMaxSalary = (meanSalaries: number[]) => {
  return Math.max(...meanSalaries);
};

export const calcSalaryData = (jobs: Job[]) => {
  const meanSalaries = calcMeanSalaries(jobs);
  return {
    minSalary: calcMinSalary(meanSalaries),
    maxSalary: calcMaxSalary(meanSalaries),
    meanSalary: calcMeanSalary(meanSalaries),
  };
};

export const calcTagCount = (jobs: Job[]) => {
  const tagTable = jobs.reduce((acc: { [key: string]: number }, job) => {
    job.tags.forEach((tag) => {
      if (acc[tag]) acc[tag] += 1;
      else acc[tag] = 1;
    });
    return acc;
  }, {});

  return tagTable;
};
