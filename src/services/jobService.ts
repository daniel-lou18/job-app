import { Job } from "@/types";
import apiClient from "@/utils/apiClient";
import { handleServiceError } from "./handleServiceError";

export async function getJobs(): Promise<Job[]> {
  try {
    const res = await apiClient.get("/data/data.json");
    return res.data;
  } catch (err: unknown) {
    throw handleServiceError(err);
  }
}
