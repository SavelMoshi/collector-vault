import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Collector Vault",
  description: "A modern collection management app built with Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-black text-white">
        <Navbar />

        <main className="flex-1">
          {children}
        </main>

        <footer className="border-t border-gray-800 bg-gray-950">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-sm text-gray-400 sm:flex-row sm:items-center sm:justify-between">
            <p>Collector Vault</p>

            <p>
              Built with Next.js, TypeScript, Prisma, and SQLite.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}