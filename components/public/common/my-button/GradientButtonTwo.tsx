"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

interface GradientButtonTwoProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

function GradientButtonTwo({ 
  className, 
  asChild = false, 
  children,
  ...props 
}: GradientButtonTwoProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium",
        "h-10 px-6 cursor-pointer ",
        "border-1 border-saas-primary text-saas-primary bg-transparent",
        // "hover:bg-saas-primary hover:text-white",
        "hover:border-3 hover:text-black",
        "transition-all duration-300 ease-in-out",
        "shadow-md hover:shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

export { GradientButtonTwo };
