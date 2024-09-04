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

  useEffect(() => {
    function handleScroll() {
      setIsVisible(window.scrollY === 0);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  let renderedContent;

  if (!isLoading && error) {
    renderedContent = <Error errorMessage={error} />;
  } else if (!isLoading && !jobs?.length) {
    renderedContent = null;
  } else {
    renderedContent = (
      <>
        {isLoading && <Overlay />}
        <SearchResults
          data={paginatedJobs}
          isLoading={isLoading}
          count={filteredJobs?.length}
        />
        {page * PAGE_SIZE < filteredJobs.length && (
          <Button onClick={handleLoadMore}>Plus de résultats</Button>
        )}
      </>
    );
  }

  return (
    <>
      <Container className="sticky top-12 z-20 flex flex-col items-center gap-6 bg-gray-100/80 py-8 backdrop-blur-lg">
        <PageTitle>Trouver un job dans la tech</PageTitle>
        <SearchInput
          placeholder="Rechercher par job, ville ou entreprise"
          value={query}
          onChange={handleQuery}
        />
      </Container>
      <Analytics data={paginatedJobs} visible={isVisible} />
      <Container className="relative flex min-h-screen w-full flex-1 flex-col items-center px-4 py-12 md:px-24">
        {renderedContent}
      </Container>
    </>
  );
}
