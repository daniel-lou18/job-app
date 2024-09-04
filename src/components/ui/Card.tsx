import { cn } from "@/lib/utils";
import { PropsWithChildren, ReactElement } from "react";

function Card({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
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
  className,
}: PropsWithChildren<{ icon?: ReactElement; className?: string }>) {
  return (
    <div className="flex items-center justify-between">
      <h3 className={cn("text-xl font-bold", className)}>{children}</h3>
      {icon}
    </div>
  );
}

function CardContent({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
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
}: PropsWithChildren<{ className?: string; icon?: ReactElement }>) {
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
