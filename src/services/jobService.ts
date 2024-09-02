import { Job } from "@/types";
import axiosClient from "./axiosClient";
import { handleServiceError } from "./handleServiceError";

// jobService function uses dependency injection (SOLID principles), accepting an apiClient parameter that implements the IApiClient interface.
// The IApiClient interface defines the contract for the expected apiClient.

const jobService = (apiClient: IApiClient) => ({
  getJobs: async (searchParams?: URLSearchParams): Promise<Job[]> => {
    console.log(process.env.NODE_ENV);
    // Simulate the fetching delay
    await new Promise((resolve) => setTimeout(resolve, 750));

    try {
      const url = searchParams ? `/api/jobs?${searchParams}` : "/api/jobs";
      const res = await apiClient.get<Job[]>(url);
      return res.data;
    } catch (err: unknown) {
      throw handleServiceError(err);
    }
  },
});

// We inject the axiosClient into the jobService function
export const { getJobs } = jobService(axiosClient);
