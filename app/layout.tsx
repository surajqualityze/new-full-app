import { Oxanium } from "next/font/google";
import "./globals.css";

const oxanium = Oxanium({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-oxanium",
  display: "swap",
});

export const metadata = {
  title: "qualityze",
  description: "Your site description",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${oxanium.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
