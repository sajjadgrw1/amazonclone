import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppStoreProvider } from "@/lib/store/app-store";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nuvara — Shop everything",
  description:
    "Nuvara is an original, Amazon-inspired marketplace prototype built with Next.js, TypeScript, and Tailwind CSS.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bodyFont.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background text-text" suppressHydrationWarning>
        <AppStoreProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppStoreProvider>
      </body>
    </html>
  );
}
