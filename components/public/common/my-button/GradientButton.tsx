"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "gradient" | "default";
}

function GradientButton({ 
  className, 
  asChild = false, 
  variant = "gradient",
  children,
  ...props 
}: GradientButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium",
        "h-10 px-6 text-black cursor-pointer",
        "bg-linear-to-r from-white via-[#06BDFF] to-white",
        "bg-size-[200%_100%] bg-left hover:bg-right",
        "transition-[background-position,colors] duration-700 ease-in-out",
        "shadow-md hover:shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

export { GradientButton };
