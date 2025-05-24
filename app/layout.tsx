import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from "next/font/google";
import type React from "react"; // Import React
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="top-center" />
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}

export const metadata = {
  generator: "v0.dev",
  title: "Nguyen Van Tan",
  description: "Nguyen Van Tan's Portfolio",
  keywords: ["Nguyen Van Tan", "Portfolio", "Front-End Developer"],
  author: "Nguyen Van Tan",
  robots: "index, follow",
};
