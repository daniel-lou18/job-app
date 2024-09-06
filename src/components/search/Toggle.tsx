import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export function Toggle({ onToggle }: { onToggle: () => void }) {
  const [isChecked, setIsChecked] = useState(true);

  function handleCheckChange() {
    setIsChecked((prevState) => !prevState);
    onToggle();
  }
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="analytics-mode"
        checked={isChecked}
        onCheckedChange={handleCheckChange}
      />
      <Label htmlFor="analytics-mode" className="hover:cursor-pointer">
        Afficher détails de recherche
      </Label>
    </div>
  );
}
