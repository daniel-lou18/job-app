"use client";

import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";
import Overlay from "../ui/Overlay";
import PageTitle from "../ui/Heading";
import { PAGE_SIZE } from "@/utils/constants";
import Button from "../ui/Button";
import { useJobs } from "@/hooks/useJobsServer";
import Container from "../ui/Container";
import Error from "../ui/Error";
import Analytics from "../analytics";
import { useEffect, useState } from "react";
import { Toggle } from "./Toggle";

export default function Search() {
  const {
    isLoading,
    error,
    query,
    handleQuery,
    page,
    jobs,
    filteredJobs,
    paginatedJobs,
    handleLoadMore,
  } = useJobs();
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    function handleScroll() {
      setIsAtTop(window.scrollY === 0);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleVisibility() {
    setIsVisible((prevState) => !prevState);
  }

  let renderedContent;

  if (!isLoading && error) {
    renderedContent = <Error errorMessage={error} />;
  } else {
    renderedContent = (
      <>
        {isLoading && <Overlay />}
        <Analytics
          data={paginatedJobs}
          isLoading={isLoading}
          visible={isVisible && isAtTop}
        />
        <Container className="relative flex min-h-screen w-full flex-1 flex-col items-center px-4 py-12 md:px-24">
          <SearchResults
            data={paginatedJobs}
            isLoading={isLoading}
            count={filteredJobs?.length}
          />
          {page * PAGE_SIZE < filteredJobs.length && (
            <Button onClick={handleLoadMore}>Plus de résultats</Button>
          )}
        </Container>
      </>
    );
  }

  return (
    <>
      <Container className="sticky top-12 z-20 flex flex-col items-center gap-6 bg-gray-100 py-8 backdrop-blur-lg">
        <PageTitle>Trouver un job dans la tech</PageTitle>
        <Container className="flex w-full justify-center gap-6">
          <SearchInput
            placeholder="Rechercher par job, ville ou entreprise"
            value={query}
            onChange={handleQuery}
          />
          <Toggle onToggle={handleVisibility} />
        </Container>
      </Container>
      {renderedContent}
    </>
  );
}
