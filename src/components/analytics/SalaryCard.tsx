import React from "react";
import Card from "../ui/Card";

const formatSalary = (salary: number) => `${salary.toLocaleString()}`;
const calculateBarWidth = (salary: number, maxSalary: number) =>
  (salary / maxSalary) * 100;

type SalaryCardProps = {
  data: { minSalary: number; maxSalary: number; meanSalary: number };
};

const SalaryCard = ({
  data: { minSalary, maxSalary, meanSalary },
}: SalaryCardProps) => {
  return (
    <Card>
      <Card.Title>Salary Range</Card.Title>
      <Card.Content>
        <div className="space-y-6">
          <div className="relative pt-1">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <span className="inline-block rounded-full bg-blue-200 px-2 py-1 text-xs font-semibold uppercase text-blue-600">
                  Min
                </span>
              </div>
              <div className="text-right">
                <span className="inline-block text-xs font-semibold text-blue-600">
                  {formatSalary(minSalary)}
                </span>
              </div>
            </div>
            <div className="mb-4 flex h-2 overflow-hidden rounded bg-blue-200 text-xs">
              <div
                style={{ width: `${calculateBarWidth(minSalary, maxSalary)}%` }}
                className="flex flex-col justify-center whitespace-nowrap bg-blue-500 text-center text-white shadow-none"
              ></div>
            </div>
          </div>

          <div className="relative pt-1">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <span className="inline-block rounded-full bg-yellow-200 px-2 py-1 text-xs font-semibold uppercase text-yellow-600">
                  Avg
                </span>
              </div>
              <div className="text-right">
                <span className="inline-block text-xs font-semibold text-yellow-600">
                  {formatSalary(meanSalary)}
                </span>
              </div>
            </div>
            <div className="mb-4 flex h-2 overflow-hidden rounded bg-yellow-200 text-xs">
              <div
                style={{
                  width: `${calculateBarWidth(meanSalary, maxSalary)}%`,
                }}
                className="flex flex-col justify-center whitespace-nowrap bg-yellow-500 text-center text-white shadow-none"
              ></div>
            </div>
          </div>

          <div className="relative pt-1">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <span className="inline-block rounded-full bg-green-200 px-2 py-1 text-xs font-semibold uppercase text-green-600">
                  Max
                </span>
              </div>
              <div className="text-right">
                <span className="inline-block text-xs font-semibold text-green-600">
                  {formatSalary(maxSalary)}
                </span>
              </div>
            </div>
            <div className="mb-4 flex h-2 overflow-hidden rounded bg-green-200 text-xs">
              <div
                style={{ width: "100%" }}
                className="flex flex-col justify-center whitespace-nowrap bg-green-500 text-center text-white shadow-none"
              ></div>
            </div>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};

export default SalaryCard;
