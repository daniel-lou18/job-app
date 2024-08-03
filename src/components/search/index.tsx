"use client";

import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";
import Overlay from "../ui/Overlay";
import PageTitle from "../ui/Heading";
import { PAGE_SIZE, TOTAL_ITEMS } from "@/utils/constants";
import Button from "../ui/Button";
import { useJobs } from "@/hooks/useJobs";
import Container from "../ui/Container";
import Error from "../ui/Error";

export default function Search() {
  const {
    isLoading,
    error,
    query,
    handleQuery,
    page,
    filteredData,
    paginatedData,
    handleClick,
  } = useJobs();

  let renderedContent;

  if (!isLoading && error) {
    renderedContent = <Error errorMessage={error} />;
  } else {
    renderedContent = (
      <>
        {isLoading && <Overlay />}
        <SearchResults
          data={paginatedData}
          isLoading={isLoading}
          count={filteredData?.length}
        />
        {page * PAGE_SIZE < filteredData.length && (
          <Button onClick={handleClick}>Plus de résultats</Button>
        )}
      </>
    );
  }

  return (
    <>
      <Container className="sticky top-12 z-20 flex flex-col items-center gap-6 bg-gray-100/80 py-10 backdrop-blur-md">
        <PageTitle>Trouver un job dans la tech</PageTitle>
        <SearchInput
          placeholder="Rechercher par job, ville ou entreprise"
          value={query}
          onChange={handleQuery}
        />
      </Container>
      <Container className="relative mt-4 flex min-h-screen w-full flex-1 flex-col items-center px-4 pb-12 pt-6 md:px-24">
        {renderedContent}
      </Container>
    </>
  );
}
