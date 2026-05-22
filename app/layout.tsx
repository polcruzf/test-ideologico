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

export const metadata: Metadata = {
  metadataBase: new URL("https://matchpolitico.com"),

  title: "Match Político",
  description: "Haz el test ideológico de Match Político y descubre tu perfil político real y el partido más afín en 2 minutos.",

  openGraph: {
    title: "Match Político",
    description: "Haz el test y descubre tu perfil ideológico, tu afinidad política y qué partido encaja más contigo.",
    url: "https://matchpolitico.com",
    siteName: "Match Político",
    images: [
      {
        url: "https://matchpolitico.com/og-image.jpg", // 👈 ABSOLUTA
        width: 1200,
        height: 630,
        alt: "Match Político",
      },
    ],
    locale: "es_ES",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Match Político",
    description: "Descubre tu perfil ideológico",
    images: ["https://matchpolitico.com/og-image.jpg"],
  },

  icons: {
  icon: "/favicon.ico",
},
alternates: {
  canonical: "https://matchpolitico.com",
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
      className={`${interTight.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

