import { Loader2 } from "lucide-react";

export default function Spinner() {
  return (
    <div className="fixed inset-0 flex h-screen w-screen items-center justify-center">
      <Loader2 className="h-16 w-16 animate-spin" />
    </div>
  );
}
