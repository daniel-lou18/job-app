"use client";

import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";
import Overlay from "../ui/Overlay";
import PageTitle from "../ui/Heading";
import { PAGE_SIZE, TOTAL_ITEMS } from "@/utils/constants";
import Button from "../ui/Button";
import { useJobs } from "@/hooks/useJobs";
import Container from "../ui/Container";

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
    renderedContent = <p>Erreur lors du chargement des données</p>;
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
      <Container className="flex flex-col items-center bg-gray-100 pb-12 pt-8">
        <PageTitle>Simple Job Search</PageTitle>
        <SearchInput
          placeholder="Rechercher par job, ville ou entreprise"
          value={query}
          onChange={handleQuery}
        />
      </Container>
      <Container className="relative flex min-h-screen w-full flex-1 flex-col items-center px-24 pb-12 pt-6">
        {renderedContent}
      </Container>
    </>
  );
}
