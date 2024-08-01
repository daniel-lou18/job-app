import { Company, CompanyDto } from "@/types";

export function transformCompanyDtos(companies: CompanyDto[]): Company[] {
  return companies.map((company) => ({
    ...company,
    address: `${company.addresses[0].city}, ${company.addresses[0].country.toUpperCase()}`,
  }));
}
