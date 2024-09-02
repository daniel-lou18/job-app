import { Job } from "@/types";
import { Banknote, MapPin, Tag } from "lucide-react";
import React from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";

type CardProps = {
  data: Job;
};

export default function JobCard({ data }: CardProps) {
  const { companyName, jobTitle, location, salary, tags } = data;

  console.log(tags);

  return (
    <Card>
      <Card.Title>{jobTitle}</Card.Title>
      <Card.Content>
        <Card.Item className="uppercase">{companyName}</Card.Item>
        <Card.Item icon={<MapPin className="h-5 w-5" />}>{location}</Card.Item>
        <Card.Item icon={<Banknote className="h-5 w-5" />}>{salary}</Card.Item>
        <Card.Item icon={<Tag className="h-5 w-5" />}>
          {tags.join(", ")}
        </Card.Item>
        <Button
          onClick={() => console.log("clicked")}
          className="absolute bottom-6 right-6 justify-self-end rounded-bl-md rounded-tr-md border-none bg-gray-900 text-sm text-white transition-all hover:bg-gray-700"
        >
          Postuler
        </Button>
      </Card.Content>
    </Card>
  );
}
