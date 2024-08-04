import { Job } from "@/types";
import { PAGE_SIZE } from "@/utils/constants";
import { Dispatch, SetStateAction, useMemo, useState } from "react";

export function useJobsPagination(
  filteredJobs: Job[],
  setIsLoading: Dispatch<SetStateAction<boolean>>,
) {
  const [page, setPage] = useState(1);

  const paginatedJobs = useMemo(
    () => filteredJobs.slice(0, page * PAGE_SIZE),
    [page, filteredJobs],
  );

  const hasMoreData = page * PAGE_SIZE >= filteredJobs.length;

  async function handleLoadMore() {
    if (hasMoreData) return;
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setPage((prevState) => prevState + 1);
    setIsLoading(false);
  }

  return { page, paginatedJobs, handleLoadMore };
}
