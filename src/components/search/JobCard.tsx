import { Job } from "@/types";
import { Banknote, MapPin } from "lucide-react";
import React from "react";
import Card from "../ui/Card";

type CardProps = {
  data: Job;
};

export default function JobCard({ data }: CardProps) {
  const { companyName, jobTitle, location, salary } = data;

  return (
    <Card>
      <Card.Title>{jobTitle}</Card.Title>
      <Card.Content>
        <Card.Item className="uppercase">{companyName}</Card.Item>
        <Card.Item icon={<MapPin className="h-5 w-5" />}>{location}</Card.Item>
        <Card.Item icon={<Banknote className="h-5 w-5" />}>{salary}</Card.Item>
      </Card.Content>
    </Card>
  );
}
