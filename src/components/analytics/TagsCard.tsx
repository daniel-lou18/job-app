import React from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { useQuery } from "@/hooks/useQuery";

function TagsCard({ data }: { data: Record<string, number> }) {
  const { setQueryParams } = useQuery();

  return (
    <Card className="flex-start col-span-2 flex max-w-[100%] flex-col">
      <Card.Title className="text-lg">Mots clés populaires</Card.Title>
      <Card.Content className="flex flex-wrap gap-x-4 gap-y-6">
        {Object.entries(data)
          .slice(0, 40)
          .map(([key, value]) =>
            value > 1 ? (
              <Button
                className={`h-10 w-fit rounded-full border-none bg-muted text-sm ${value > 2 ? "font-bold" : ""} ${value > 5 ? "bg-muted-foreground text-white" : ""}`}
                key={key}
                onClick={() => {
                  setQueryParams(key);
                }}
              >
                {key}
              </Button>
            ) : null,
          )}
      </Card.Content>
    </Card>
  );
}

export default TagsCard;
