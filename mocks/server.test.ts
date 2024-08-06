/**
 * @jest-environment node
 */

import { getJobs } from "@/services/jobService";

test("it fetches the data", async () => {
  const jobs = await getJobs();
  console.log(jobs);
});
