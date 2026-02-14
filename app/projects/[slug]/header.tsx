"use client";
import {
  ArrowLeft,
  Eye,
  Github,
  ExternalLink,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Props = {
  project: {
    url?: string;
    title: string;
    description: string;
    repository?: string;
  };
};
export const Header: React.FC<Props> = ({ project }) => {
  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIntersecting] = useState(true);

  const links: { label: string; href: string }[] = [];
  if (project.repository) {
    links.push({
      label: "GitHub",
      href: project.repository.startsWith("https://")
        ? project.repository
        : `https://github.com/${project.repository}`,
    });
  }
  if (project.url) {
    links.push({
      label: "Website",
      href: project.url,
    });
  }
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting),
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      ref={ref}
      className="relative isolate overflow-hidden bg-gradient-to-tl from-black via-zinc-900 to-black"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div
        className={`fixed inset-x-0 top-0 z-50 backdrop-blur lg:backdrop-blur-none duration-200 border-b lg:bg-transparent ${
          isIntersecting
            ? "bg-zinc-900/0 border-transparent"
            : "bg-white/10  border-zinc-200 lg:border-transparent"
        }`}
      >
        <div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
          <div className="flex justify-between gap-8">
            {/* Links will be shown in the main section below */}
          </div>

          <Link
            href="/projects"
            className={`duration-200 hover:font-medium ${
              isIntersecting
                ? " text-zinc-400 hover:text-zinc-100"
                : "text-zinc-600 hover:text-zinc-900"
            } `}
          >
            <ArrowLeft className="w-6 h-6 " />
          </Link>
        </div>
      </div>
      <div className="container mx-auto relative isolate overflow-hidden py-16 sm:py-20 lg:py-24 pt-24 sm:pt-24 pb-8 sm:pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white font-display">
              {project.title}
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-zinc-300">
              {project.description}
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="flex justify-center gap-6 text-base font-semibold leading-7 text-white">
              {links.map((link) => (
                <Link
                  target="_blank"
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-2 hover:text-zinc-300 transition-colors"
                >
                  {link.label === "GitHub" ? (
                    <>
                      <Github className="w-5 h-5" />
                      <span className="hidden sm:inline">{link.label}</span>
                    </>
                  ) : (
                    <>
                      <ExternalLink className="w-5 h-5" />
                      <span className="hidden sm:inline">{link.label}</span>
                    </>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {project.title === "Online Bookstore System" && (
            <div className="mt-8 bg-yellow-900/20 border border-yellow-700/50 px-6 py-4 rounded-lg max-w-2xl">
              <div className="text-center">
                <div className="flex items-center justify-center gap-5 mb-2">
                  <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                  <p className="text-yellow-200 font-semibold">
                    Free Server Notice
                  </p>
                </div>
                <p className="text-yellow-100/80 text-sm">
                  This application is hosted on a free server. UI and data
                  loading may take longer than expected. Please wait patiently
                  while books and content render.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
};
