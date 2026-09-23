import Link from "next/link";
import { Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/challenges", label: "Challenges" },
  { href: "/rankings", label: "Rankings" },
  { href: "/friends", label: "Friends" },
  { href: "/groups", label: "Groups" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <Flame className="h-4.5 w-4.5" />
          </span>
          <span className="text-base font-semibold tracking-tight text-foreground">
            Daily<span className="text-primary">Challenge</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-foreground-muted transition-colors hover:bg-surface hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/login" className="hidden sm:block">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="primary" size="sm">
              Sign up
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
