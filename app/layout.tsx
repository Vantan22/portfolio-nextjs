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
  title: "Nguyen Van Tan",
  description: "Nguyen Van Tan's Portfolio",
  keywords: ["Nguyen Van Tan", "Portfolio", "Front-End Developer"],
  author: "Nguyen Van Tan",
  robots: "index, follow",
  openGraph: {
    title: "Nguyen Van Tan | Front-End Developer Portfolio",
    description:
      "View the products, projects, and experience of Nguyen Van Tan - Front-End Developer.",
    url: "https://ik.imagekit.io/72qx25spl/CV-photo.jpg?updatedAt=1748093758961",
    siteName: "Nguyen Van Tan Portfolio",
    images: [
      {
        url: "https://ik.imagekit.io/72qx25spl/CV-photo.jpg?updatedAt=1748093758961", // beautiful avatar or banner (aspect ratio 1.91:1, e.g., 1200x630px)
        width: 1200,
        height: 630,
        alt: "Nguyen Van Tan Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "https://ik.imagekit.io/72qx25spl/CV-photo.jpg?updatedAt=1748093758961",
    title: "Nguyen Van Tan | Front-End Developer Portfolio",
    description:
      "View the products, projects, and experience of Nguyen Van Tan - Front-End Developer.",
    images: [
      "https://ik.imagekit.io/72qx25spl/CV-photo.jpg?updatedAt=1748093758961",
    ],
    site: "@yourtwitter",
  },
};
