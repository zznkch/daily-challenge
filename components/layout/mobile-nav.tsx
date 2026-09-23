import Link from "next/link";
import { Home, Swords, Trophy, Users, CircleUser } from "lucide-react";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/challenges", label: "Challenges", icon: Swords },
  { href: "/rankings", label: "Rankings", icon: Trophy },
  { href: "/friends", label: "Friends", icon: Users },
  { href: "/profile", label: "Profile", icon: CircleUser },
];

export function MobileNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border-subtle bg-background/95 backdrop-blur-md md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <ul className="grid grid-cols-5">
        {items.map(({ href, label, icon: Icon }) => (
          <li key={href}>
            <Link
              href={href}
              className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium text-foreground-muted transition-colors active:text-primary"
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
