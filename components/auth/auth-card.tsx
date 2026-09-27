import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";

export function AuthCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-4 py-12">
      <div className="mb-6 text-center">
        <h1 className="text-xl font-semibold text-foreground">{title}</h1>
        {subtitle ? (
          <p className="mt-1.5 text-sm text-foreground-muted">{subtitle}</p>
        ) : null}
      </div>
      <Card>{children}</Card>
    </div>
  );
}
