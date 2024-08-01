"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";
import { CompanyDto } from "@/types";
import Spinner from "../ui/Spinner";

export default function Search() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [companies, setCompanies] = useState<CompanyDto[]>([]);
  console.log(companies);

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

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          "https://fakerapi.it/api/v1/companies?_quantity=1000",
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
      <SearchInput
        placeholder="Rechercher"
        value={query}
        onChange={handleQuery}
      />
      <SearchResults data={filteredData} />
    </>
  );
}
