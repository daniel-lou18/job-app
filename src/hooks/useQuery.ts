import { Job } from "@/types";
import { filterJobs } from "@/utils/helpers";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";

export function useQuery() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [jobs, setJobs] = useState<Job[]>([]);

  const setQueryParams = useCallback(
    (params: string) => {
      if (!params) {
        router.push(pathname);
      } else {
        router.push(`${pathname}?q=${params}`);
      }
    },
    [pathname, router],
  );

  useEffect(() => {
    // Debouncing ensures that setQueryParams only gets executed after the user has stopped typing for the specified delay.
    const timer = setTimeout(() => {
      setQueryParams(query);
    }, 300);

    // Cleanup function clears the timeout after re-rendering or on unmount. If the user types again before the timeout delay has passed,
    // the cleanup function will be executed and this specific callback will not get executed. Then, a new timeout is set.
    return () => clearTimeout(timer);
  }, [query, setQueryParams]);

  function handleQuery(e: ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  const getQuery = useCallback(() => {
    return searchParams.get("q") || "";
  }, [searchParams]);

  const getQueryParams = useCallback(() => {
    return searchParams;
  }, [searchParams]);

  const filteredJobs = useMemo(
    () => filterJobs(jobs, getQuery()),
    [getQuery, jobs],
  );

  return {
    query,
    getQueryParams,
    setQueryParams,
    handleQuery,
    filteredJobs,
    jobs,
    setJobs,
  };
}
