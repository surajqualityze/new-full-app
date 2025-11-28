"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { AnimatedLink } from "../public/common/animated-text/AnimatedLink";


export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  const isActive = active === item;
  const hasChildren = children !== undefined && children !== null;
  
  return (
    <div onMouseEnter={() => hasChildren && setActive(item)} className="relative">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer"
      >
        {isActive ? (
          <span style={{ color: "#06BDFF" }}>{item}</span>
        ) : (
          <AnimatedLink text={item} />
        )}
      </motion.p>
      {active !== null && hasChildren && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {isActive && (
            <>
              {/* Vertical line connecting menu to submenu */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "calc(1rem + 14px)", opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute top-full left-1/2 transform -translate-x-1/2 w-[2px] bg-[#06BDFF]"
                style={{ zIndex: 10 }}
              />
              
              <div className="absolute top-[calc(100%_+_0.8rem)] left-1/2 transform -translate-x-1/2 pt-4">
                <motion.div
                  layoutId="active"
                  className="bg-white backdrop-blur-sm overflow-hidden border border-black/[0.2]  shadow-xl relative"
                >
                  {/* Animated top border */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute top-0 left-0 right-0 h-[2px] bg-[#06BDFF] origin-center"
                  />
                  
                  <motion.div layout className="w-max h-full p-4">
                    {children}
                  </motion.div>
                </motion.div>
              </div>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative bg-white border border-transparent shadow-lg flex justify-between items-center space-x-4 px-8 py-4"
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <a href={href} className="flex space-x-2 group">
      <img
        src={src}
        width={140}
        height={70}
        alt={title}
        className="shrink-0 shadow-2xl"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-black group-hover:text-[#06BDFF] transition-colors">
          {title}
        </h4>
        <p className="text-neutral-700 text-sm max-w-[10rem]">
          {description}
        </p>
      </div>
    </a>
  );
};

export const HoveredLink = ({ children, className, ...rest }: any) => {
  return (
    <a
      {...rest}
      className={cn(
        "text-neutral-700",
        className
      )}
    >
      {children}
    </a>
  );
};
