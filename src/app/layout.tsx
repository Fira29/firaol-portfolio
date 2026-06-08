import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Firaol Gebi — Full Stack Developer",
    template: "%s | Firaol Gebi",
  },
  description:
    "Computer Science student at Infolink University College. Full Stack Developer building impactful products with React, Next.js, Node.js and modern web technologies.",
  keywords: [
    "Firaol Gebi",
    "Full Stack Developer",
    "React Developer",
    "Next.js",
    "Computer Science",
    "Ethiopia",
    "Web Developer",
    "Software Engineer",
    "Portfolio",
  ],
  authors: [{ name: "Firaol Gebi", url: "https://firaolgebi.dev" }],
  creator: "Firaol Gebi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://firaolgebi.dev",
    title: "Firaol Gebi — Full Stack Developer",
    description:
      "Computer Science student building impactful digital experiences. Full Stack Developer with a passion for crafting meaningful products.",
    siteName: "Firaol Gebi Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Firaol Gebi — Full Stack Developer",
    description:
      "Computer Science student building impactful digital experiences.",
    creator: "@firaolgebi",
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
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#09090b" }],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "rgba(15, 15, 20, 0.9)",
                border: "1px solid rgba(139, 92, 246, 0.3)",
                color: "white",
                backdropFilter: "blur(20px)",
              },
            }}
          />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
