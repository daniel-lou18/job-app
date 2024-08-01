import CompanyCard from "@/components/search/CompanyCard";
import { CompanyDto } from "@/types";
import { transformCompanyDtos } from "@/utils";

type SearchResultsProps = { data: CompanyDto[] };

export default function SearchResults({ data }: SearchResultsProps) {
  if (!data?.length) return null;

  const transformedData = transformCompanyDtos(data);

  return (
    <section className="grid min-h-screen w-full grid-cols-1 gap-4 p-4 lg:grid-cols-2 xl:grid-cols-3">
      {transformedData.map((company) => (
        <CompanyCard key={company.id} data={company} />
      ))}
    </section>
  );
}
