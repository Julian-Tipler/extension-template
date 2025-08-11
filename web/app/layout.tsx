import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

import { Header } from "../components/ui/layout/Header";
import { Footer } from "../components/ui/layout/Footer";
import { ScrollToTop } from "../components/ui/layout/ScrollToTop";
import { ModalProvider } from "./context/ModalContext";
import { LoginModal } from "@/components/auth/LoginModal";
import { CookiesDisclaimer } from "@/components/ui/CookiesDisclaimer";
import { AuthProvider } from "./context/AuthProvider";
import RootJsonLd from "./JsonLd";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    default: "Wise Systems | Next.js and Supabase SaaS Starter Kit",
    template: "%s | Wise Systems",
  },
  description:
    "Build powerful SaaS applications with our Next.js and Supabase starter kit. Ready-to-use authentication, payments, and UI components for modern web applications.",
  keywords: [
    "Next.js",
    "Supabase",
    "React",
    "Web Development",
    "SaaS Template",
    "Starter Kit",
    "Authentication",
    "Stripe Integration",
    "TypeScript",
  ],
  authors: [{ name: "Wise Systems LLC", url: "https://wisepilot.io" }],
  creator: "Wise Systems LLC",
  publisher: "Wise Systems LLC",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: defaultUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: defaultUrl,
    title: "Wise Systems | Next.js and Supabase SaaS Starter Kit",
    description:
      "Build powerful SaaS applications with our Next.js and Supabase starter kit. Ready-to-use authentication, payments, and UI components.",
    siteName: "Wise Systems",
    images: [
      {
        url: `${defaultUrl}/opengraph-image.png`,
        width: 1200,
        height: 600,
        alt: "Wise Systems SaaS Starter Kit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wise Systems | Next.js and Supabase SaaS Starter Kit",
    description:
      "Build powerful SaaS applications with our Next.js and Supabase starter kit. Ready-to-use authentication, payments, and UI components.",
    creator: "@wisesystems",
    images: [`${defaultUrl}/twitter-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Use key to help React reconcile the elements */}
        <RootJsonLd key="json-ld-scripts" />
      </head>
      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <ModalProvider>
              <ScrollToTop />
              <Header />
              <main id="main-content" className="min-h-screen">
                {children}
              </main>
              <Footer />
              <LoginModal />
              <CookiesDisclaimer />
            </ModalProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
