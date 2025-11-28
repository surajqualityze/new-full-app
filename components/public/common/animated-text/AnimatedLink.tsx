"use client";
import React, { useState, useEffect } from "react";

interface AnimatedLinkProps {
  text: string;
  className?: string;
  hoverColor?: string;
  defaultColor?: string;
  hoverDelay?: number;
  leaveDelay?: number;
}

export function AnimatedLink({ 
  text,
  className = "",
  hoverColor = "#06BDFF",
  defaultColor = "currentColor",
  hoverDelay = 50,
  leaveDelay = 30,
}: AnimatedLinkProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  const [isLeaving, setIsLeaving] = useState(false);

  // Handle forward animation (hover in)
  useEffect(() => {
    if (!isLeaving && hoveredIndex >= 0 && hoveredIndex < text.length) {
      const timer = setTimeout(() => {
        setHoveredIndex(hoveredIndex + 1);
      }, hoverDelay);
      return () => clearTimeout(timer);
    }
  }, [hoveredIndex, text.length, isLeaving, hoverDelay]);

  // Handle backward animation (hover out)
  useEffect(() => {
    if (isLeaving && hoveredIndex > 0) {
      const timer = setTimeout(() => {
        setHoveredIndex(hoveredIndex - 1);
      }, leaveDelay);
      return () => clearTimeout(timer);
    }
    if (isLeaving && hoveredIndex <= 0) {
      setIsLeaving(false);
      setHoveredIndex(-1);
    }
  }, [hoveredIndex, isLeaving, leaveDelay]);

  const handleMouseEnter = () => {
    setIsLeaving(false);
    setHoveredIndex(0);
  };

  const handleMouseLeave = () => {
    if (hoveredIndex > 0) {
      setIsLeaving(true);
    } else {
      setHoveredIndex(-1);
    }
  };

  return (
    <span
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ display: "inline-block" }}
    >
      {text.split("").map((char, index) => (
        <span
          key={index}
          style={{
            display: "inline-block",
            color: index < hoveredIndex ? hoverColor : defaultColor,
            transition: "color 0.15s ease",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
