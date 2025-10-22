import { Plus } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { Row } from "./ui/row";

import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full h-20 bg-background border-b flex items-center justify-center z-50">
      <Row align="center">
        <h1 className="text-base font-semibold">
          <Link href="/"> App Header</Link>
        </h1>
        <div className="flex gap-x-5">
          <ThemeToggle />

          <Link
            className="rounded-full p-2 hover:bg-accent hover:text-accent-foreground"
            href="/new"
          >
            <Plus className="h-5 w-5" />
          </Link>
        </div>
      </Row>
    </header>
  );
}
