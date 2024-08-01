import { Company } from "@/types";
import { Globe, Locate, MailOpen, Phone } from "lucide-react";
import React from "react";
import Card from "../ui/Card";

type CardProps = {
  data: Company;
};

export default function CompanyCard({ data }: CardProps) {
  const { name, address, phone, email, website } = data;

  return (
    <Card>
      <Card.Title>{name}</Card.Title>
      <Card.Content>
        <Card.Item icon={<Locate className="h-5 w-5" />}>{address}</Card.Item>
        <Card.Item icon={<Phone className="h-5 w-5" />}>{phone}</Card.Item>
        <Card.Item icon={<MailOpen className="h-5 w-5" />}>{email}</Card.Item>
        <Card.Link icon={<Globe className="h-5 w-5" />}>{website}</Card.Link>
      </Card.Content>
    </Card>
  );
}
