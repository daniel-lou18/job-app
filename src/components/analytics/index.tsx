import { Job } from "@/types";
import Container from "../ui/Container";
import SalaryCard from "./SalaryCard";
import { LocationsCard } from "./LocationsCard";
import TagsCard from "./TagsCard";
import { calcSalaryData } from "@/utils/helpers";

function Analytics({ data }: { data: Job[] }) {
  const { minSalary, maxSalary, meanSalary } = calcSalaryData(data);

  return (
    <Container className="grid grid-cols-4 gap-6">
      <SalaryCard data={{ meanSalary, minSalary, maxSalary }} />
      <TagsCard />
      <LocationsCard />
    </Container>
  );
}

export default Analytics;
