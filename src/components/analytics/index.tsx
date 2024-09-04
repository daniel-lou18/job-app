import { Job } from "@/types";
import Container from "../ui/Container";
import SalaryCard from "./SalaryCard";
import { LocationsCard } from "./LocationsCard";
import TagsCard from "./TagsCard";
import {
  calcLocationsData,
  calcSalaryData,
  calcTagCount,
  generateChartConfig,
} from "@/utils/helpers";

type AnalyticsProps = { data: Job[]; visible: boolean };

function Analytics({ data, visible }: AnalyticsProps) {
  const { minSalary, maxSalary, meanSalary } = calcSalaryData(data);
  const jobTagsTable = calcTagCount(data);
  const locationsChartData = calcLocationsData(data);
  const chartConfig = generateChartConfig(locationsChartData);

  return (
    <Container
      className={`grid grid-cols-2 gap-6 bg-gray-100/80 px-10 pb-10 pt-4 md:grid-cols-3 xl:grid-cols-4 ${visible ? "max-h-screen opacity-100" : "max-h-0 opacity-0"} transition-all duration-100`}
    >
      <SalaryCard data={{ meanSalary, minSalary, maxSalary }} />
      <TagsCard data={jobTagsTable} />
      <LocationsCard chartData={locationsChartData} chartConfig={chartConfig} />
    </Container>
  );
}

export default Analytics;
