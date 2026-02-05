"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

export function FollowCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const normalSize = 20;
  const shrinkSize = 35;

  const currentSize = isHoveringClickable ? shrinkSize : normalSize;

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const size = isHoveringClickable ? shrinkSize : normalSize;
      setCursorPos({ x: e.clientX - size / 2, y: e.clientY - size / 2 });
      if (!isVisible) setIsVisible(true);

      // Check if hovering over clickable element
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        window.getComputedStyle(target).cursor === "pointer";

      setIsHoveringClickable(!!isClickable);
    },
    [isVisible, isHoveringClickable],
  );

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    // Check if mobile/touch device
    const checkMobile = () => {
      setIsMobile(
        window.matchMedia("(max-width: 768px)").matches ||
          "ontouchstart" in window,
      );
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    window.addEventListener("mousemove", handleMouseMove);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave,
      );
      document.documentElement.removeEventListener(
        "mouseenter",
        handleMouseEnter,
      );
    };
  }, [handleMouseMove, handleMouseLeave, handleMouseEnter]);

  // Don't render on mobile
  if (isMobile) return null;

  return (
    <motion.div
      animate={{
        width: currentSize,
        height: currentSize,
      }}
      transition={{
        width: { duration: 0.15, ease: "easeOut" },
        height: { duration: 0.15, ease: "easeOut" },
      }}
      style={{
        left: cursorPos.x,
        top: cursorPos.y,
      }}
      className={`fixed rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference ${
        isVisible ? "divide-opacity-100" : "opacity-0"
      }`}
    />
  );
}
