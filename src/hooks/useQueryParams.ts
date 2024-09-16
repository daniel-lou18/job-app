import { useRouter, useSearchParams, usePathname } from "next/navigation";

export function useQueryParams() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  function getQueryParams() {
    return searchParams;
  }

  function setQueryParams(params: string) {
    if (!params) {
      router.push(pathname);
    } else {
      router.push(`${pathname}?search=${params}`);
    }
  }

  return { getQueryParams, setQueryParams };
}
