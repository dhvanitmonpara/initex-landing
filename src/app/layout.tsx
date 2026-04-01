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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "Initex",
      url: "https://initex.dhvanitm.in",
      description:
        "Opinionated backend scaffolding with explicit configuration and no magic.",
    },
    {
      "@type": "SoftwareApplication",
      name: "Initex",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "macOS, Windows, Linux",
      url: "https://initex.dhvanitm.in",
      image: "https://initex.dhvanitm.in/og.png",
      description:
        "Opinionated backend scaffolding with explicit configuration and no magic.",
      author: {
        "@type": "Person",
        name: "Dhvanit",
      },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://initex.dhvanitm.in"),
  title: {
    default: "Initex",
    template: "%s | Initex",
  },
  description:
    "Opinionated backend scaffolding with explicit configuration and no magic.",
  applicationName: "Initex",
  keywords: [
    "Initex",
    "backend scaffolding",
    "CLI",
    "Express",
    "boilerplate",
    "developer tools",
    "infrastructure presets",
  ],
  authors: [{ name: "Dhvanit" }],
  creator: "Dhvanit",
  publisher: "Initex",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Initex",
    description:
      "Opinionated backend scaffolding with explicit configuration and no magic.",
    url: "/",
    siteName: "Initex",
    images: [
      {
        url: "/og.png",
        alt: "Initex Open Graph image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Initex",
    description:
      "Opinionated backend scaffolding with explicit configuration and no magic.",
    images: ["/og.png"],
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
      <body className="min-h-full flex flex-col bg-carbon text-silver">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
