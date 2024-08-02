import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { PropsWithChildren, ReactElement } from "react";

function Card({ children }: PropsWithChildren<{}>) {
  return (
    <article className="grid w-full max-w-md gap-6 rounded-md border border-gray-200 bg-background p-6 transition-all hover:cursor-pointer hover:border-gray-400">
      {children}
    </article>
  );
}

function CardTitle({ children }: PropsWithChildren<{}>) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-xl font-bold">{children}</h3>
      <Heart className="h-6 w-6 text-muted-foreground" />
    </div>
  );
}

function CardContent({ children }: PropsWithChildren<{}>) {
  return <div className="grid gap-2 text-muted-foreground">{children}</div>;
}

function CardItem({
  children,
  className,
  icon,
}: {
  className?: string;
  icon?: ReactElement;
} & PropsWithChildren<{}>) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {icon}
      <p className="text-md">{children}</p>
    </div>
  );
}

Card.Title = CardTitle;
Card.Content = CardContent;
Card.Item = CardItem;

export default Card;
