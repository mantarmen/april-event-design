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

export const metadata = {
  title: "April Event Design",
  description: "Luxury Event Design & Rentals for weddings, baby showers, and private events.",

  openGraph: {
    title: "April Event Design",
    description:
      "Luxury event design, elegant styling, and premium rentals for unforgettable moments.",
    url: "https://www.aprileventdesign.com",
    siteName: "April Event Design",
    images: [
      {
        url: "https://www.aprileventdesign.com/og-image.jpg", // bunu ekleyeceğiz
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "April Event Design",
    description:
      "Luxury event design & rentals for refined celebrations.",
    images: ["https://www.aprileventdesign.com/og-image.jpg"],
  },
}

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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
