import type { Metadata, Viewport } from "next";
import { Figtree, Newsreader, Space_Mono } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const title = "Ketan Ratan Roy — Software Engineer";
const description =
  "Software engineer at Dassault Systèmes building backend systems in Python and C++, cloud-native infrastructure and real-time AI.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary", title, description },
};

export const viewport: Viewport = {
  themeColor: "#fffefa",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${newsreader.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper font-sans">{children}</body>
    </html>
  );
}
