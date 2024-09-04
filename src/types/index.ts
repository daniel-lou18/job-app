export type Job = {
  id: number;
  companyName: string;
  jobTitle: string;
  location: string;
  salary: string;
  tags: string[];
};

export type LocationsChartDataType = {
  location: string;
  count: number;
  fill: string;
}[];

export type LocationsChartConfigType = Record<
  string,
  { label: string; color?: string }
>;
