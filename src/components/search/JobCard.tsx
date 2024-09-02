import { Job } from "@/types";
import { Banknote, Heart, MapPin, Tag } from "lucide-react";
import React from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Container from "../ui/Container";
import { formatJobTitle, formatTags } from "@/utils/helpers";

type CardProps = {
  data: Job;
};

export default function JobCard({ data }: CardProps) {
  const { companyName, jobTitle, location, salary, tags } = data;

  return (
    <Card>
      <Card.Title icon={<Heart className="h-6 w-6 text-muted-foreground" />}>
        {formatJobTitle(jobTitle)}
      </Card.Title>
      <Card.Content className="grid-cols-[1fr_auto]">
        <Container className="grid gap-2">
          <Card.Item className="mb-2 uppercase">{companyName}</Card.Item>
          <Card.Item icon={<MapPin className="h-5 w-5" />}>
            {location}
          </Card.Item>
          <Card.Item icon={<Banknote className="h-5 w-5" />}>
            {salary}
          </Card.Item>
          <Card.Item icon={<Tag className="h-5 w-5" />}>
            {formatTags(tags)}
          </Card.Item>
        </Container>
        <Container className="flex items-end">
          <Button
            onClick={() => console.log("clicked")}
            className="rounded-bl-md rounded-tr-md border-none bg-gray-900 text-sm text-white transition-all hover:bg-gray-700"
          >
            Postuler
          </Button>
        </Container>
      </Card.Content>
    </Card>
  );
}
