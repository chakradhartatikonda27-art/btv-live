import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://btv-live-72s3.vercel.app"),
  title: {
    default: "BTV LIVE — The Trusted Business Channel",
    template: "%s | BTV LIVE",
  },
  description:
    "Inspiring Success. Creating Legacy. India's premium Business & Lifestyle Media Platform.",
  keywords: ["business interviews", "entrepreneur stories", "BTV LIVE", "success stories India"],
  icons: { icon: "/favicon.ico" },
  twitter: {
    card: "summary_large_image",
    site: "@BTVLiveIndia",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-obsidian-950 text-platinum-100 antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
