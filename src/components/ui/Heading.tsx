import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";

type PageTitleProps = {
  className?: string;
} & ComponentPropsWithoutRef<"h1">;

export default function PageTitle({
  children,
  className,
  ...props
}: PageTitleProps) {
  return (
    <h1 {...props} className={cn(className, "my-8 text-3xl font-semibold")}>
      {children}
    </h1>
  );
}
