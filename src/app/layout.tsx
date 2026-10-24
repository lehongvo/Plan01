import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import Link from "next/link";
import { Suspense } from "react";
import LangSwitch from "@/components/LangSwitch";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: { default: "Plan01 · 100 days", template: "%s · Plan01" },
  description:
    "A 100-day study plan: Rust (Solana, core chain / Layer 2), Solidity, English and Upwork, with daily slots, weekly checklists and progress tracking.",
  appleWebApp: { title: "Plan01", statusBarStyle: "default" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f4f1" },
    { media: "(prefers-color-scheme: dark)", color: "#12100e" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={beVietnamPro.variable}>
      <body>
        <header className="site-header">
          <div className="site-header-inner">
            <Link href="/" className="brand">
              <span className="logo" aria-hidden="true">
                P
              </span>
              Plan01
            </Link>
            <Suspense>
              <SiteNav />
            </Suspense>
            <LangSwitch />
          </div>
        </header>
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
