import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://matchpolitico.com"),
  title: "Match Político",
  description:
    "Haz el test ideológico de Match Político y descubre tu perfil político real y el partido más afín en 2 minutos.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Match Político",
    description:
      "Haz el test y descubre tu perfil ideológico, tu afinidad política y qué partido encaja más contigo.",
    url: "https://matchpolitico.com",
    siteName: "Match Político",
    images: [
      {
        url: "https://matchpolitico.com/og-image.jpg",
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
    <html lang="es" className={`${interTight.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}