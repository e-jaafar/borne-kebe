import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { LangProvider } from "@/context/LangContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { RootLayoutClient } from "@/components/RootLayoutClient";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  fallback: ['system-ui', 'arial'],
  preload: true,
  variable: '--font-inter',
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "Borne Kébè | Location de Photobooth Professionnel",
  description: "Location de photobooths haut de gamme pour vos événements professionnels et privés. Qualité studio, partage instantané et personnalisation complète.",
  keywords: "photobooth, borne photo, événement, mariage, soirée entreprise, photo booth, animation événementielle",
  openGraph: {
    title: "Borne Kébè | Location de Photobooth Professionnel",
    description: "Location de photobooths haut de gamme pour vos événements",
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Borne Kébè Photobooth',
      type: 'image/jpeg',
    }],
    locale: 'fr_FR',
    type: 'website',
    url: 'https://www.xn--borne-kb-80ai.com',
    siteName: 'Borne Kébè'
  },
  alternates: {
    canonical: 'https://www.xn--borne-kb-80ai.com',
    languages: {
      'fr': 'https://www.xn--borne-kb-80ai.com/fr',
      'en': 'https://www.xn--borne-kb-80ai.com/en',
      'nl': 'https://www.xn--borne-kb-80ai.com/nl',
    }
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#1a0f2e' },
      { rel: 'msapplication-TileImage', url: '/mstile-150x150.png' },
    ],
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Borne Kébè',
    'application-name': 'Borne Kébè',
    'msapplication-TileColor': '#1a0f2e',
    'msapplication-config': '/browserconfig.xml',
  },
  formatDetection: {
    telephone: true,
    date: false,
    address: false,
    email: true,
  },
  manifest: '/manifest.json',
  metadataBase: new URL('https://www.xn--borne-kb-80ai.com'),
  verification: {
    google: 'your-google-verification-code',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Borne Kébè',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <LangProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow md:pb-0">
                <RootLayoutClient>
                  {children}
                </RootLayoutClient>
              </main>
              <Footer />
              <MobileNav />
            </div>
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
