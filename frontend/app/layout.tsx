import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@/contexts/WalletContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GhostLance - Privacy-First Freelance Marketplace",
  description: "Prove skills. Hide identity. Work without bias. A privacy-preserving freelance marketplace built on Aleo blockchain using Zero-Knowledge Proofs.",
  keywords: ["freelance", "privacy", "zero-knowledge", "aleo", "blockchain", "anonimity", "hiring", "marketplace"],
  authors: [{ name: "GhostLance Team" }],
  openGraph: {
    title: "GhostLance - Privacy-First Freelance Marketplace",
    description: "Prove skills. Hide identity. Work without bias.",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProvider>
          {children}
        </WalletProvider>
      </body>
    </html>
  );
}
