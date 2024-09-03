import { Job } from "@/types";
import Container from "../ui/Container";
import SalaryCard from "./SalaryCard";
import { LocationsCard } from "./LocationsCard";
import TagsCard from "./TagsCard";
import { calcSalaryData, calcTagCount } from "@/utils/helpers";

function Analytics({ data }: { data: Job[] }) {
  const { minSalary, maxSalary, meanSalary } = calcSalaryData(data);
  const jobTagsTable = calcTagCount(data);

  return (
    <Container className="grid grid-cols-4 gap-6">
      <SalaryCard data={{ meanSalary, minSalary, maxSalary }} />
      <TagsCard data={jobTagsTable} />
      <LocationsCard />
    </Container>
  );
}

export default Analytics;
