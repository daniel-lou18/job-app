"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";
import { CompanyDto } from "@/types";
import Spinner from "../ui/Spinner";
import PageTitle from "../ui/Heading";
import { PAGE_SIZE, TOTAL_ITEMS } from "@/utils/constants";
import Button from "../ui/Button";

export default function Search() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [companies, setCompanies] = useState<CompanyDto[]>([]);
  const [page, setPage] = useState(1);

  function handleQuery(e: ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  const filteredData = useMemo(
    () =>
      companies.filter((company) =>
        company.name.trim().toLowerCase().includes(query.toLowerCase()),
      ),
    [query, companies],
  );

  const paginatedData = useMemo(
    () => filteredData.slice(0, page * PAGE_SIZE),
    [page, filteredData],
  );

  function handleClick() {
    console.log(page);
    if (page * PAGE_SIZE >= filteredData.length) return;
    setPage((prevState) => prevState + 1);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `https://fakerapi.it/api/v1/companies?_quantity=${TOTAL_ITEMS}`,
        );
        const { data } = await res.json();
        setCompanies(data);
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "Could not fetch companies",
        );
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (!isLoading && error) {
    return <p>Erreur lors du chargement des données</p>;
  }

  return (
    <>
      <PageTitle className="text-blue-900">Simple Search Page</PageTitle>
      <SearchInput
        placeholder="Rechercher"
        value={query}
        onChange={handleQuery}
      />
      <SearchResults data={paginatedData} />
      {page * PAGE_SIZE < filteredData.length && (
        <Button onClick={handleClick}>Plus de résultats</Button>
      )}
    </>
  );
}
