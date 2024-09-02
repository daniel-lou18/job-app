import { cn } from "@/lib/utils";
import { PropsWithChildren, ReactElement } from "react";

function Card({
  children,
  className,
}: { className?: string } & PropsWithChildren<{}>) {
  return (
    <article
      className={cn(
        "grid w-full max-w-md gap-6 rounded-md border border-gray-200 bg-background p-6 transition-all hover:cursor-pointer hover:border-gray-400",
        className,
      )}
    >
      {children}
    </article>
  );
}

function CardTitle({
  children,
  icon,
}: { icon?: ReactElement } & PropsWithChildren<{}>) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-xl font-bold">{children}</h3>
      {icon}
    </div>
  );
}

function CardContent({
  children,
  className,
}: { className?: string } & PropsWithChildren<{}>) {
  return (
    <div className={cn("grid gap-2 text-muted-foreground", className)}>
      {children}
    </div>
  );
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
