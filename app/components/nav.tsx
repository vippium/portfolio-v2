"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const Navigation: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIntersecting] = useState(true);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting),
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const hasVisitedSubpage = sessionStorage.getItem("hasVisitedSubpage");

    if (!hasVisitedSubpage) {
      setShouldAnimate(true);
      sessionStorage.setItem("hasVisitedSubpage", "true");
    }
  }, []);

  const headerContent = (
    <div
      className={`fixed inset-x-0 top-0 z-50 backdrop-blur  duration-200 border-b  ${
        isIntersecting
          ? "bg-zinc-900/0 border-transparent"
          : "bg-zinc-900/500  border-zinc-800 "
      }`}
    >
      <div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
        <div className="flex justify-between gap-8">
          <Link
            href="/projects"
            className="duration-200 text-zinc-400 hover:text-zinc-100"
          >
            Projects
          </Link>
          <Link
            href="/contact"
            className="duration-200 text-zinc-400 hover:text-zinc-100"
          >
            Contact
          </Link>
        </div>

        <Link
          href="/"
          className="duration-200 text-zinc-300 hover:text-zinc-100"
        >
          <ArrowLeft className="w-6 h-6 " />
        </Link>
      </div>
    </div>
  );

  return (
    <header ref={ref}>
      {shouldAnimate ? (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {headerContent}
        </motion.div>
      ) : (
        headerContent
      )}
    </header>
  );
};
