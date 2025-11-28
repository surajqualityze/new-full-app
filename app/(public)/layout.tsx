import { Nova_Square } from "next/font/google";
import { NavbarHead } from "@/components/public/common/Navbar/NavbarHead";
import Footer from "@/components/public/common/Footer/Footer";

const novaSquare = Nova_Square({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-nova-square",
  display: "swap",
});

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={novaSquare.variable}>
      <NavbarHead />
      <div className="max-w-[1600px] w-full mx-auto pt-4">
        <main className="min-h-screen pt-24">{children}</main>
      </div>
      <Footer />
      {/* Footer will go here */}
    </div>
  );
}
