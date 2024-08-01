import { cn } from "@/lib/utils";
import React, { ComponentPropsWithoutRef } from "react";

type ButtonProps = {
  onClick: () => void;
  className?: string;
} & ComponentPropsWithoutRef<"button">;

export default function Button({ children, onClick, className }: ButtonProps) {
  return (
    <button
      className={cn(
        "rounded-md border border-gray-500 px-4 py-2 hover:bg-gray-100",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
