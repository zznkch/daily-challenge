import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border-subtle pb-20 pt-8 md:pb-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-xs text-foreground-faint">
          &copy; {new Date().getFullYear()} Daily Challenge. One challenge. Every day.
        </p>
        <div className="flex items-center gap-4 text-xs text-foreground-faint">
          <Link href="/privacy" className="hover:text-foreground-muted">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-foreground-muted">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
