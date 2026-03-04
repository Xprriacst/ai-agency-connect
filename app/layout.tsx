import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PageTracker from "@/components/PageTracker";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AI Agency Connect — Trouve ton co-fondateur",
  description:
    "La plateforme qui connecte les fondateurs d'agences IA tech et business pour créer ensemble les leaders de demain.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="antialiased">
        <PageTracker />
        {children}
      </body>
    </html>
  );
}
