"use client";
import React, { useState } from "react";
import Link from "next/link";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
// import { GradientButton } from "@/components/public/common/my-button/GradientButton";

interface MenuItem {
  label: string;
  href: string;
}

interface MenuSection {
  services: MenuItem[];
  products: MenuItem[];
  resources: MenuItem[];
  company: MenuItem[];
}

interface MobileMenuContentProps {
  closeMenu: () => void;
}

interface DropdownSectionProps {
  title: string;
  items: MenuItem[];
  isOpen: boolean;
  onToggle: () => void;
  onLinkClick: () => void;
}

const MENU_ITEMS: MenuSection = {
  services: [
    { label: "Branding", href: "/services/branding" },
    { label: "Experience Design", href: "/services/experience-design" },
    { label: "Technologies", href: "/services/technologies" },
    { label: "Marketing", href: "/services/marketing" },
  ],
  products: [
    { label: "Algochurn", href: "/product" },
    { label: "Tailwind Master Kit", href: "https://tailwindmasterkit.com" },
    { label: "Moonbeam", href: "https://gomoonbeam.com" },
    { label: "Rogue", href: "https://userogue.com" },
  ],
  resources: [
    { label: "Whitepaper", href: "/whitepaper" },
    { label: "Blogs", href: "/blogs" },
    { label: "Webinars", href: "/webinars" },
    { label: "Case Study", href: "/casestudy" },
  ],
  company: [
    { label: "About us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Contact Us", href: "/contact" },
  ],
};

export default function MobileMenuContent({ closeMenu }: MobileMenuContentProps) {
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});

  const toggleDropdown = (section: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleLinkClick = () => closeMenu();

  return (
    <div className="px-4 py-6 space-y-4">
      {/* Training */}
      <Link
        href="/training"
        className="block text-black text-lg font-medium hover:text-gray-600 transition-colors py-2"
        onClick={handleLinkClick}
      >
        Training
      </Link>

      {/* Dropdown Sections */}
      {(Object.entries(MENU_ITEMS) as [keyof MenuSection, MenuItem[]][]).map(([key, items]) => (
        <DropdownSection
          key={key}
          title={key.charAt(0).toUpperCase() + key.slice(1)}
          items={items}
          isOpen={openDropdowns[key] || false}
          onToggle={() => toggleDropdown(key)}
          onLinkClick={handleLinkClick}
        />
      ))}

      {/* Schedule Demo Button */}
      <div className="pt-4 border-t border-gray-300">
        <Link href="/schedule-demo" onClick={handleLinkClick}>
          {/* <GradientButton
            variant="gradient"
            className="w-fit text-center justify-center text-black text-base font-normal leading-tight"
          >
            Schedule Demo
          </GradientButton> */}
        </Link>
      </div>
    </div>
  );
}

function DropdownSection({ title, items, isOpen, onToggle, onLinkClick }: DropdownSectionProps) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-black text-lg font-medium hover:text-gray-600 transition-colors py-2"
      >
        {title}
        {isOpen ? <IconChevronUp size={20} /> : <IconChevronDown size={20} />}
      </button>

      {isOpen && (
        <div className="pl-4 mt-2 space-y-2 border-l border-gray-300">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block text-gray-600 hover:text-black transition-colors py-1 "
              onClick={onLinkClick}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
