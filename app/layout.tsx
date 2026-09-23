import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SiteFooter } from "@/components/layout/site-footer";

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: "Daily Challenge — One challenge. Every day.",
    template: "%s · Daily Challenge",
  },
  description:
    "Play a new mini-game challenge every day and compete against the global community, your friends, and your private groups.",
  openGraph: {
    title: "Daily Challenge",
    description:
      "One challenge. Every day. Compete against friends, groups, and the world.",
    type: "website",
    url: appUrl,
    siteName: "Daily Challenge",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily Challenge",
    description: "One challenge. Every day.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 pb-24 md:pb-0">{children}</main>
        <SiteFooter />
        <MobileNav />
      </body>
    </html>
  );
}
