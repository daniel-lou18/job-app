import { CodeXml } from "lucide-react";
import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 flex h-12 w-full items-center justify-between bg-background bg-white px-4 md:px-24">
      <div className="flex gap-4">
        <Link href="#" className="flex gap-2" prefetch={false}>
          <CodeXml className="h-7 w-7" />
          <span className="text-lg font-semibold">Tech Jobs</span>
        </Link>
        <nav className="hidden pt-[1px] leading-7 md:flex">
          <ul>
            <li className="px-4">
              <Link
                href="#"
                className="font-medium transition-colors hover:border-b-2 hover:border-accent-foreground"
                prefetch={false}
              >
                Home
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <Link
          href="#"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
          prefetch={false}
        >
          <GithubIcon className="h-5 w-5" />
          <span className="sr-only">GitHub</span>
        </Link>
      </div>
    </header>
  );
}

function GithubIcon({ ...props }: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}
