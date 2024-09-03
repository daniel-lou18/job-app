import React from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";

function TagsCard({ data }: { data: { [key: string]: number } }) {
  return (
    <Card className="col-span-2 max-w-[100%]">
      <Card.Title>Mots clés populaires</Card.Title>
      <Card.Content className="flex flex-wrap">
        {Object.entries(data).map(([key, value]) =>
          value > 1 ? (
            <Button
              className={`h-10 w-fit rounded-full border-none bg-muted text-sm ${value < 3 ? "opacity-80" : "text-black"} ${value > 5 ? "font-bold text-blue-700" : ""}`}
              key={key}
              onClick={() => {}}
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
