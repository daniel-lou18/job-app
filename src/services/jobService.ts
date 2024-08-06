import { Job } from "@/types";
import axiosClient from "./axiosClient";
import { handleServiceError } from "./handleServiceError";

// jobService function uses dependency injection (SOLID principles), accepting an apiClient parameter that implements the IApiClient interface.
// The IApiClient interface defines the contract for the expected apiClient.

const jobService = (apiClient: IApiClient) => ({
  getJobs: async (): Promise<Job[]> => {
    // Simulate the fetching delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
      const res = await apiClient.get<Job[]>("/api/jobs");
      return res.data;
    } catch (err: unknown) {
      throw handleServiceError(err);
    }
  },
});

// We inject the axiosClient into the jobService function
export const { getJobs } = jobService(axiosClient);
