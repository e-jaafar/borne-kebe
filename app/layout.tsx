import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { LangProvider } from "@/context/LangContext";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Borne Kébè | Location de Photobooth Professionnel",
  description: "Location de photobooths haut de gamme pour vos événements professionnels et privés. Qualité studio, partage instantané et personnalisation complète.",
  keywords: "photobooth, borne photo, événement, mariage, soirée entreprise, photo booth, animation événementielle",
  openGraph: {
    title: "Borne Kébè | Location de Photobooth Professionnel",
    description: "Location de photobooths haut de gamme pour vos événements",
    images: ['/og-image.jpg'],
    locale: 'fr_FR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.borne-kébé.com',
    languages: {
      'fr': 'https://www.borne-kébé.com/fr',
      'en': 'https://www.borne-kébé.com/en',
      'nl': 'https://www.borne-kébé.com/nl',
    }
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `,
          }}
        />
      </head>
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
