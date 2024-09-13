import { Job } from "@/types";
import { PAGE_SIZE } from "@/utils/constants";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";

export function useJobsPagination(
  filteredJobs: Job[],
  setIsLoading: Dispatch<SetStateAction<boolean>>,
) {
  const [page, setPage] = useState(1);

  const paginatedJobs = useMemo(
    () => filteredJobs.slice(0, page * PAGE_SIZE),
    [page, filteredJobs],
  );

  const hasNoMoreData = page * PAGE_SIZE >= filteredJobs.length;

  const handleLoadMore = useCallback(async () => {
    if (hasNoMoreData) return;
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 250));
    setPage((prevState) => prevState + 1);
    setIsLoading(false);
  }, [setIsLoading, hasNoMoreData]);

  return { page, paginatedJobs, handleLoadMore };
}
