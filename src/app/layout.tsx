import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://maisonbeurre.example"),
  title: "Maison Beurre — A Little Art. A Lot of Buttercream.",
  description:
    "Maison Beurre is an artisan patisserie in Copenhagen composing sculptural cakes from cultured butter, seasonal fruit and a little theatre. Made by hand, in small batches.",
  keywords: [
    "luxury cake",
    "artisan patisserie",
    "Copenhagen bakery",
    "wedding cake",
    "custom cake",
    "Maison Beurre",
  ],
  openGraph: {
    title: "Maison Beurre — A Little Art. A Lot of Buttercream.",
    description:
      "Sculptural cakes, composed by hand in Copenhagen. Cultured butter, seasonal fruit, and rather a lot of patience.",
    type: "website",
    locale: "en_DK",
    images: [{ url: "/assets/hero-poster.jpg", width: 1920, height: 1080 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maison Beurre — A Little Art. A Lot of Buttercream.",
    description: "Sculptural cakes, composed by hand in Copenhagen.",
    images: ["/assets/hero-poster.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#1a0e09",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ivory text-cocoa">{children}</body>
    </html>
  );
}
