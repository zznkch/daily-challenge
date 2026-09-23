import Link from "next/link";
import { Construction } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ComingSoon({
  title,
  description,
  phase,
}: {
  title: string;
  description: string;
  phase: string;
}) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-6 text-center">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-surface text-primary">
        <Construction className="h-6 w-6" />
      </div>
      <h1 className="text-xl font-semibold text-foreground">{title}</h1>
      <p className="mt-2 text-sm text-foreground-muted">{description}</p>
      <p className="mt-1 text-xs text-foreground-faint">Arriving in {phase}.</p>
      <Link href="/" className="mt-6">
        <Button variant="secondary">Back to home</Button>
      </Link>
    </div>
  );
}
