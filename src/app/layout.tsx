import type { Metadata, Viewport } from "next";
import { Allura, Inter, Montserrat } from "next/font/google";
import { FournisseurTheme } from "@/components/fournisseur-theme";
import { seo, urlSite } from "@/lib/seo";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const allura = Allura({
  variable: "--font-allura",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(urlSite),
  title: { default: seo.titre, template: "%s | David Baron" },
  description: seo.description,
  keywords: seo.motsCles,
  applicationName: seo.titreCourt,
  authors: [{ name: "David Baron", url: urlSite }],
  creator: "David Baron",
  publisher: "David Baron",
  category: "technology",
  alternates: { canonical: "/" },
  formatDetection: { telephone: true, email: true },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    title: seo.titre,
    description: seo.description,
    url: "/",
    siteName: seo.titreCourt,
    type: "profile",
    firstName: "David",
    lastName: "Baron",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: seo.titre,
    description: seo.description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#050a14" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${montserrat.variable} ${inter.variable} ${allura.variable} antialiased`}
    >
      <body className="grain min-h-full font-sans">
        <FournisseurTheme>{children}</FournisseurTheme>
      </body>
    </html>
  );
}
