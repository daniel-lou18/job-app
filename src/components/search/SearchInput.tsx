"use client";

import { Search } from "lucide-react";
import { ChangeEvent, ComponentPropsWithoutRef } from "react";

type SearchInputProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
} & ComponentPropsWithoutRef<"input">;

export default function SearchInput({
  value,
  onChange,
  ...props
}: SearchInputProps) {
  return (
    <div className="relative mb-8 block w-1/2 xl:w-1/3">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        {...props}
        name="search"
        id="search"
        className="h-10 w-full rounded-md border-0 py-1.5 pl-10 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
        value={value}
        onChange={onChange}
      />
      <Search className="absolute left-3 top-1/2 h-5 w-5 translate-y-[-50%] text-gray-400" />
    </div>
  );
}
