"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const NORMAL_SIZE = 20;
const SHRINK_SIZE = 35;

export function FollowCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isHoveringClickableRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const lastSizeRef = useRef(NORMAL_SIZE);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorSize = useMotionValue(NORMAL_SIZE);

  const smoothX = useSpring(cursorX, {
    stiffness: 1500,
    damping: 80,
    mass: 0.3,
  });
  const smoothY = useSpring(cursorY, {
    stiffness: 1500,
    damping: 80,
    mass: 0.3,
  });
  const smoothSize = useSpring(cursorSize, {
    stiffness: 800,
    damping: 60,
    mass: 0.4,
  });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
      const size = lastSizeRef.current;
      cursorX.set(e.clientX - size / 2);
      cursorY.set(e.clientY - size / 2);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        window.getComputedStyle(target).cursor === "pointer";

      if (isHoveringClickableRef.current !== !!isClickable) {
        isHoveringClickableRef.current = !!isClickable;
        const nextSize = isClickable ? SHRINK_SIZE : NORMAL_SIZE;
        lastSizeRef.current = nextSize;
        cursorSize.set(nextSize);
        cursorX.set(lastMousePosRef.current.x - nextSize / 2);
        cursorY.set(lastMousePosRef.current.y - nextSize / 2);
      }
    },
    [isVisible, cursorX, cursorY, cursorSize],
  );

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
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

  if (isMobile) return null;

  return (
    <motion.div
      style={{
        x: smoothX,
        y: smoothY,
        width: smoothSize,
        height: smoothSize,
      }}
      className={`fixed rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference will-change-transform ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
