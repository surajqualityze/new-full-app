import type { Metadata } from "next";
import { Oxanium } from "next/font/google";
import "./globals.css";

const oxanium = Oxanium({
  subsets: ["latin"],
  variable: "--font-oxanium",
});

export const metadata: Metadata = {
  title: "Qualityze",
  description: "Quality Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${oxanium.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
