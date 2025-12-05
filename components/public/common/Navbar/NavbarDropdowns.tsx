"use client";
import React, { useEffect, useState } from "react";
import { HoveredLink, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { AnimatedLink } from "../animated-text/AnimatedLink";


interface Service {
  _id?: string;
  slug: string;
  name: string;
}

interface Product {
  title: string;
  href: string;
  src: string;
  description: string;
}

interface NavbarDropdownsProps {
  setActive: (item: string | null) => void;
  active: string | null;
}

const PRODUCTS: Product[] = [
  {
    title: "Algochurn",
    href: "/product",
    src: "https://assets.aceternity.com/demos/algochurn.webp",
    description: "Prepare for tech interviews like never before.",
  },
  {
    title: "Tailwind Master Kit",
    href: "https://tailwindmasterkit.com",
    src: "https://assets.aceternity.com/demos/tailwindmasterkit.webp",
    description: "Production ready Tailwind css components for your next project",
  },
  {
    title: "Moonbeam",
    href: "https://gomoonbeam.com",
    src: "https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png",
    description: "Never write from scratch again. Go from idea to blog in minutes.",
  },
  {
    title: "Rogue",
    href: "https://userogue.com",
    src: "https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png",
    description: "Respond to government RFPs, RFIs and RFQs 10x faster using AI",
  },
];

export function NavbarDropdowns({ setActive, active }: NavbarDropdownsProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch("/api/services");
        if (res.ok) {
          const data: Service[] = await res.json();
          setServices(data);
        }
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  return (
    <>
      {/* Services Dropdown */}
      <MenuItem setActive={setActive} active={active} item="Services">
        <div className="flex flex-col space-y-4 text-sm">
          {/* {loading ? (
            <span className="text-xs text-muted-foreground">Loading...</span>
          ) : services.length === 0 ? (
            <span className="text-xs text-muted-foreground">No services available</span>
          ) : (
            services.map((service) => (
              <HoveredLink
                key={service._id || service.slug}
                href={`/services/${service.slug}`}
              >
                <AnimatedLink text={service.name} />
              </HoveredLink>
            ))
          )} */}
        </div>
      </MenuItem>

      {/* Products Dropdown */}
      <MenuItem setActive={setActive} active={active} item="Products">
        <div className="text-sm grid grid-cols-2 gap-10 p-4">
          {PRODUCTS.map((product) => (
            <ProductItem key={product.href} {...product} />
          ))}
        </div>
      </MenuItem>

      {/* Resources Dropdown */}
      <MenuItem setActive={setActive} active={active} item="Resources">
        <div className="flex flex-col space-y-4 text-sm">
          <HoveredLink href="/whitepaper">
            <AnimatedLink text="Whitepaper" />
          </HoveredLink>
          <HoveredLink href="/blogs">
            <AnimatedLink text="Blogs" />
          </HoveredLink>
          <HoveredLink href="/webinars">
            <AnimatedLink text="Webinars" />
          </HoveredLink>
          <HoveredLink href="/casestudy">
            <AnimatedLink text="Case Study" />
          </HoveredLink>
        </div>
      </MenuItem>

      {/* Company Dropdown */}
      <MenuItem setActive={setActive} active={active} item="Company">
        <div className="flex flex-col space-y-4 text-sm">
          <HoveredLink href="/about">
            <AnimatedLink text="About us" />
          </HoveredLink>
          <HoveredLink href="/careers">
            <AnimatedLink text="Careers" />
          </HoveredLink>
          <HoveredLink href="/contact">
            <AnimatedLink text="Contact Us" />
          </HoveredLink>
        </div>
      </MenuItem>
    </>
  );
}
