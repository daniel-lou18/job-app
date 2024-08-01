import { Heart } from "lucide-react";
import Link from "next/link";
import { PropsWithChildren, ReactElement } from "react";

function Card({ children }: PropsWithChildren<{}>) {
  return (
    <article className="grid w-full max-w-md gap-6 rounded-md border border-gray-200 p-6">
      {children}
    </article>
  );
}

function CardTitle({ children }: PropsWithChildren<{}>) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-xl font-bold">{children}</h3>
      <Heart className="text-muted-foreground h-6 w-6" />
    </div>
  );
}

function CardContent({ children }: PropsWithChildren<{}>) {
  return <div className="text-muted-foreground grid gap-2">{children}</div>;
}

function CardItem({
  children,
  icon,
}: {
  icon: ReactElement;
} & PropsWithChildren<{}>) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <p className="text-md">{children}</p>
    </div>
  );
}

function CardLink({
  children,
  icon,
}: {
  icon: ReactElement;
} & PropsWithChildren<{}>) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <Link href="#" className="hover:underline" prefetch={false}>
        {children}
      </Link>
    </div>
  );
}

Card.Title = CardTitle;
Card.Content = CardContent;
Card.Item = CardItem;
Card.Link = CardLink;

export default Card;
