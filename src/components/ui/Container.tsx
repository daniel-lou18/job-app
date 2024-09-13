import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";

type ContainerProps = {
  className?: string;
} & (DivProps | SectionProps);

type DivProps = ComponentPropsWithoutRef<"div"> & { element?: "div" };

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  element: "section";
};

export default function Container({
  children,
  className,
  element = "div",
}: ContainerProps) {
  if (element === "section") {
    return <section className={cn("w-full", className)}>{children}</section>;
  }
  return <div className={cn("w-full", className)}>{children}</div>;
}
