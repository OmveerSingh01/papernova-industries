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
  metadataBase: new URL("https://papernova-industries.vercel.app"),

  title: {
    default: "PaperNova Industries | Premium Paper Products Manufacturer",
    template: "%s | PaperNova Industries",
  },

  description:
    "PaperNova Industries is a trusted manufacturer of premium paper products including notebooks, A4 paper, office stationery, packaging paper, and customized paper solutions for businesses across India.",

  keywords: [
    "PaperNova Industries",
    "Paper Manufacturer",
    "A4 Paper",
    "Notebooks",
    "Office Stationery",
    "Packaging Paper",
    "Printing Paper",
    "Paper Products",
    "Industrial Paper",
    "Wholesale Paper Supplier",
    "Paper Manufacturing Company",
    "India",
  ],

  authors: [
    {
      name: "Omveer Singh",
    },
  ],

  creator: "Omveer Singh",

  publisher: "PaperNova Industries",

  applicationName: "PaperNova Industries",

  openGraph: {
    title: "PaperNova Industries",
    description:
      "Premium paper manufacturing company delivering high-quality paper products for education, offices, publishing, packaging, and industrial businesses.",

    url: "https://papernova-industries.vercel.app",

    siteName: "PaperNova Industries",

    locale: "en_IN",

    type: "website",

    images: [
      {
        url: "/images/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "PaperNova Industries",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "PaperNova Industries",
    description:
      "Premium paper products manufactured with quality, innovation, and reliability.",

    images: ["/images/hero-bg.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
  icon: "/favicon.png",
  shortcut: "/favicon.png",
  apple: "/favicon.png",
},
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
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}