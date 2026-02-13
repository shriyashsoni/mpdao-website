import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MP DAO - Bringing Web3 to the Heart of India",
  description: "MP DAO is a decentralized community initiative bringing Web3 technology to Madhya Pradesh and India. Join us for events, meetups, and workshops.",
  keywords: ["MP DAO", "Web3", "Madhya Pradesh", "Blockchain", "DAO", "Ethereum", "India", "Decentralized"],
  authors: [{ name: "MP DAO" }],
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "MP DAO - Bringing Web3 to the Heart of India",
    description: "A decentralized community empowering Madhya Pradesh and beyond",
    url: "https://mpdao.xyz",
    siteName: "MP DAO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MP DAO - Web3 Community in India",
    description: "Bringing Web3 to the Heart of India ❤️",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased bg-black text-white`}>
        <Navigation />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
