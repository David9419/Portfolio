import type { Metadata, Viewport } from "next";
import { Allura, Inter, Montserrat } from "next/font/google";
import { FournisseurTheme } from "@/components/fournisseur-theme";
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
  metadataBase: new URL("https://www.david-baron.com"),
  title: "David Baron — Portfolio | Créateur digital & entrepreneur",
  description:
    "Je crée des sites, des logiciels, des SaaS et des solutions digitales. Des idées aux projets concrets : MivtsaNow, GoldenChance et plus encore.",
  openGraph: {
    title: "David Baron — Portfolio",
    description: "Créateur digital & entrepreneur. Des idées aux projets concrets.",
    type: "website",
    url: "https://www.david-baron.com",
    locale: "fr_FR",
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
