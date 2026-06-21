import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import ConvexClientProvider from "@/components/ConvexClientProvider";

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
    icon: [
      { url: "/favicon.png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "MP DAO - Bringing Web3 to the Heart of India",
    description: "A decentralized community empowering Madhya Pradesh and beyond",
    url: "https://mpdao.site",
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
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-[#06080E] text-white relative min-h-screen`}>
        {/* Global Background Dots */}
        <div className="fixed inset-0 bg-[radial-gradient(#ffffff04_1.2px,transparent_1px)] [background-size:24px_24px] pointer-events-none -z-50" />
        <ConvexClientProvider>
          <ClientLayout>{children}</ClientLayout>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
