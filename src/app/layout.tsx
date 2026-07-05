import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { config } from "@/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${config.app.name} | The Enterprise AI Workforce Platform`,
  description: config.app.description,
  keywords: ["Enterprise AI", "AI employee", "conversational voice agent", "n8n automation", "Salesforce voice integration", "HubSpot voice agent", "telephony routing", "RAG voice engine"],
  authors: [{ name: `${config.app.name} Founders` }],
  openGraph: {
    title: `${config.app.name} | The Enterprise AI Workforce Platform`,
    description: config.app.description,
    type: "website",
    siteName: config.app.name,
    locale: "en_US",
    url: config.app.siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: `${config.app.name} | The Enterprise AI Workforce Platform`,
    description: config.app.description,
    creator: `@${config.app.name.toLowerCase()}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured JSON-LD representation for Google search schema indexing
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": config.app.name,
    "operatingSystem": "All",
    "applicationCategory": "BusinessApplication",
    "description": config.app.description,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-zinc-950 text-white">
        {children}
      </body>
    </html>
  );
}
