// web/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/ui/bottom-nav";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import SideNav from "@/components/ui/side-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Chat - Powered by Gemini AI",
  description: "Chat with an AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.className} bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900`}
        suppressHydrationWarning={true}
      >
        <MaxWidthWrapper>
          <SideNav />
          <main className="flex-1">{children}</main>
        </MaxWidthWrapper>
        <BottomNav />
      </body>
    </html>
  );
}
