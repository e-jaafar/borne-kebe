import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { LangProvider } from "@/context/LangContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smarthebooth",
  description: "Solutions de photobooth haut de gamme pour vos événements",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <LangProvider>
          <Navbar />
          {children}
        </LangProvider>
      </body>
    </html>
  );
}
