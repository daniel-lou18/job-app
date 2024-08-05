import { Job } from "@/types";
import axiosClient from "./axiosClient";
import { handleServiceError } from "./handleServiceError";

// jobService function uses dependency injection (SOLID principles), accepting an apiClient parameter that implements the IApiClient interface.
// The IApiClient interface defines the contract for the expected apiClient.

const jobService = (apiClient: IApiClient) => ({
  getJobs: async (): Promise<Job[]> => {
    try {
      const res = await apiClient.get<Job[]>("/data/data.json");
      return res.data;
    } catch (err: unknown) {
      throw handleServiceError(err);
    }
  },
});

export const { getJobs } = jobService(axiosClient);
