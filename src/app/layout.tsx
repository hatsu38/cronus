import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CRONUS - Beautiful Cron Expression Editor",
  description:
    "A powerful, multilingual cron expression editor with real-time validation, timezone support, and visual builder. Create and understand cron expressions easily with Japanese and English support.",
  keywords: [
    "cron",
    "scheduler",
    "cron expression",
    "task scheduler",
    "automation",
    "cronjob",
    "timezone",
    "multilingual",
  ],
  authors: [{ name: "hatsu38", url: "https://github.com/hatsu38" }],
  creator: "hatsu38",
  publisher: "hatsu38",

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ja_JP"],
    url: "https://cron-us.vercel.app",
    siteName: "CRONUS",
    title: "CRONUS - Beautiful Cron Expression Editor",
    description:
      "A powerful, multilingual cron expression editor with real-time validation, timezone support, and visual builder.",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "CRONUS Logo",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary",
    title: "CRONUS - Beautiful Cron Expression Editor",
    description:
      "A powerful, multilingual cron expression editor with real-time validation, timezone support, and visual builder.",
    images: ["/logo.png"],
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

  applicationName: "CRONUS",
  category: "developer tools",
  classification: "Business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
