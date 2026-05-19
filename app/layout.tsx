import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Inter_Tight } from "next/font/google";
const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

openGraph: {
  title: "Match Político",
  description: "Descubre tu perfil ideológico y tu afinidad política.",
  url: "https://matchpolitico.com",
  siteName: "Match Político",
  images: [
    {
      url: "/og-image.jpg", // horizontal
      width: 1200,
      height: 630,
    },
    {
      url: "/og-image-square.jpg", // 👈 AÑADE ESTA
      width: 800,
      height: 800,
    },
  ],
  locale: "es_ES",
  type: "website",
},


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
