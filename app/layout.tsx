import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { LangProvider } from "@/context/LangContext";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Borne Kébè",
  description: "Solutions de photobooth haut de gamme pour vos événements",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <LangProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow pb-20 md:pb-0">
              {children}
            </main>
            <Footer />
            <MobileNav />
          </div>
        </LangProvider>
      </body>
    </html>
  );
}
