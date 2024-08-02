import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export default function Container({
  children,
  className,
}: PropsWithChildren & { className?: string }) {
  return <div className={cn("w-full", className)}>{children}</div>;
}
