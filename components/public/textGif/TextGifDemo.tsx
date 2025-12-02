"use client";

import React, { ReactNode, useEffect, useState, CSSProperties } from "react";

interface TextGifPrimitiveProps {
  children: ReactNode;
  gifUrl: string;
  fontSize?: string;
  fontWeight?: string | number;
  opacity?: number;
  backgroundSize?: string;
  backgroundRepeat?: string;
  backgroundPosition?: string;
  textShadow?: string;
}

function TextGifPrimitive({
  children,
  gifUrl,
  fontSize = "4rem",
  fontWeight = "bold",
  opacity = 1,
  backgroundSize = "200% 200%",
  backgroundRepeat = "repeat",
  backgroundPosition = "center",
  textShadow,
}: TextGifPrimitiveProps) {
  const [gifLoaded, setGifLoaded] = useState(false);

  useEffect(() => {
    if (!gifUrl) return;
    
    const img = new window.Image();
    img.onload = () => setGifLoaded(true);
    img.onerror = () => console.warn(`Failed to load GIF: ${gifUrl}`);
    img.src = gifUrl;
    
    return () => {
      // Cleanup if needed
      img.onload = null;
      img.onerror = null;
    };
  }, [gifUrl]);

  const baseTextStyle: CSSProperties = {
    fontSize,
    fontWeight,
    color: "#222",
    position: "relative",
    zIndex: 1,
  };

  const overlayStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    fontSize,
    fontWeight,
    backgroundImage: `url(${gifUrl})`,
    backgroundSize,
    backgroundRepeat,
    backgroundPosition,
    opacity,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    pointerEvents: "none",
    zIndex: 2,
    textShadow,
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* Base Text (always visible fallback) */}
      <div style={baseTextStyle}>{children}</div>

      {/* Animated GIF Overlay */}
      {gifLoaded && <div style={overlayStyle}>{children}</div>}

      {/* WebKit text fill fix */}
      <style jsx>{`
        div[style*="background-clip"] {
          -webkit-text-fill-color: transparent !important;
        }
      `}</style>
    </div>
  );
}

interface TextGifHeadingProps {
  children: ReactNode;
  fontSize?: string;
}

/**
 * 1) Heading One - Confetti-like GIF for celebrations
 * Extra large size, bold, perfect for hero sections
 */
export function TextGifHeadingOne({ 
  children, 
  fontSize = "3rem" 
}: TextGifHeadingProps) {
  const gifUrl = "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2k3bjdrOWVka3BkejgzMWwwN3QyMnphNXNmOWQzM284MTlseDVlaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YV3hvYumOAvWNLRAPH/giphy.gif";
  
  return (
    <TextGifPrimitive
      gifUrl={gifUrl}
      fontSize={fontSize}
      fontWeight="bold"
      opacity={0.9}
      backgroundSize="200% 200%"
      backgroundRepeat="repeat"
      backgroundPosition="center"
      textShadow="0 2px 8px rgba(0,0,0,0.25)"
    >
      {children}
    </TextGifPrimitive>
  );
}

/**
 * 2) Heading Two - Dynamic energy GIF
 * Larger size for hero sections and prominent headings
 */
export function TextGifHeadingTwo({ 
  children 
}: TextGifHeadingProps) {
  const gifUrl = "https://media.giphy.com/media/fnglNFjBGiyAFtm6ke/giphy.gif";
  
  return (
    <TextGifPrimitive
      gifUrl={gifUrl}
      fontSize="5rem"
      fontWeight="bold"
      opacity={0.9}
      backgroundSize="200% 200%"
      backgroundRepeat="repeat"
      backgroundPosition="center"
      textShadow="0 2px 8px rgba(0,0,0,0.25)"
    >
      {children}
    </TextGifPrimitive>
  );
}

/**
 * 3) Heading Three - Geometric pattern GIF
 * Slightly smaller, heavier weight for section headers
 */
export function TextGifHeadingThree({ 
  children 
}: TextGifHeadingProps) {
  const gifUrl = "https://media.giphy.com/media/9Pmfazv34l7aNIKK05/giphy.gif";
  
  return (
    <TextGifPrimitive
      gifUrl={gifUrl}
      fontSize="3.5rem"
      fontWeight="900"
      opacity={0.9}
      backgroundSize="180% 180%"
      backgroundRepeat="repeat"
      backgroundPosition="center"
      textShadow="0 2px 8px rgba(0,0,0,0.25)"
    >
      {children}
    </TextGifPrimitive>  // ✅ Added missing closing brace & tag
  );
}

/**
 * 4) Heading Four - Vibrant display GIF
 * Very large for display headlines and banners
 */
export function TextGifHeadingFour({ 
  children 
}: TextGifHeadingProps) {
  const gifUrl = "https://media.giphy.com/media/4bhs1boql4XVJgmm4H/giphy.gif";
  
  return (
    <TextGifPrimitive
      gifUrl={gifUrl}
      fontSize="6rem"
      fontWeight="800"
      opacity={0.9}
      backgroundSize="220% 220%"
      backgroundRepeat="repeat"
      backgroundPosition="center"
      textShadow="0 4px 12px rgba(0,0,0,0.3)"
    >
      {children}
    </TextGifPrimitive>
  );
}

/**
 * 5) Bonus: Custom TextGif (fully configurable)
 */
export function TextGifCustom({
  children,
  gifUrl,
  ...props
}: TextGifPrimitiveProps) {
  return (
    <TextGifPrimitive gifUrl={gifUrl} {...props}>
      {children}
    </TextGifPrimitive>
  );
}
