import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IconMenu2, IconX } from "@tabler/icons-react";
import MobileMenuContent from "./MobileMenuContent";


interface MobileNavbarProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

export function MobileNavbar({ isMobileMenuOpen, toggleMobileMenu }: MobileNavbarProps) {
  return (
    <div className="md:hidden">
      {/* Mobile Header */}
      <div className="flex items-center justify-between bg-white/90 backdrop-blur-md rounded-lg px-4 py-3 border border-gray-200 shadow-lg">
        <Link href="/">
          <Image
            src="/images/logo/Saas_Logo_blk.png"
            alt="Logo"
            width={120}
            height={40}
            className="object-contain cursor-pointer"
            priority
          />
        </Link>

        <button
          onClick={toggleMobileMenu}
          className="text-black p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="mt-2 bg-white/95 backdrop-blur-md rounded-lg border border-gray-200 shadow-lg overflow-hidden animate-in slide-in-from-top-2 duration-200">
          <MobileMenuContent closeMenu={toggleMobileMenu} />
        </div>
      )}
    </div>
  );
}
