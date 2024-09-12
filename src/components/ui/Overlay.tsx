import { cn } from "@/lib/utils";

export default function Overlay({ className }: { className?: string }) {
  return (
    <div
      className={cn("absolute inset-0 z-10 bg-white opacity-60", className)}
    />
  );
}
