import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, MenuItem } from "@/components/ui/navbar-menu";
import { NavbarDropdowns } from "./NavbarDropdowns";
import { GradientButton } from "../my-button/GradientButton";
// import { GradientButton } from "@/components/public/common/my-button/GradientButton";

interface DesktopNavbarProps {
  active: string | null;
  setActive: (item: string | null) => void;
}

export function DesktopNavbar({ active, setActive }: DesktopNavbarProps) {
  return (
    <div className="hidden md:block">
      <Menu setActive={setActive}>
        {/* Logo */}
        <Link href="/" className="flex items-center">
          {/* <Image
            src="/images/logo/Saas_Logo_blk.png"
            alt="Logo"
            width={140}
            height={40}
            className="object-contain cursor-pointer"
            priority
          /> */}
          <div className="text-2xl font-extrabold">
            Qualityze
          </div>
        </Link>

        <div className="flex items-center space-x-6">
          {/* Training Link */}
          <MenuItem
            setActive={setActive}
            active={active}
            item="Training"
            href="/training"
          />

          {/* Dropdowns */}
          <NavbarDropdowns setActive={setActive} active={active} />

          {/* CTA Button */}
          <Link href="/schedule-demo">
            <GradientButton
              variant="gradient"
              className="text-center justify-center text-black text-base font-normal leading-tight"
            >
              Schedule Demo
            </GradientButton>
          </Link>
        </div>
      </Menu>
    </div>
  );
}
