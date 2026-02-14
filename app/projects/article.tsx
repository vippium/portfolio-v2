"use client";

import type { Project } from "@/.contentlayer/generated";
import Link from "next/link";
import { Eye } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

type Props = {
  project: Project;
};

export const Article: React.FC<Props> = ({ project }) => {
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const pRef = useRef<HTMLParagraphElement>(null);

  // Estimate line height for text-sm (1.25rem = 20px) -> 4 lines = 5rem
  const MAX_COLLAPSED_HEIGHT = "5rem";

  useEffect(() => {
    if (pRef.current) {
      setIsOverflowing(pRef.current.scrollHeight > 80);
    }
  }, [project.description]);

  return (
    <Link href={`/projects/${project.slug}`} className="group block h-full">
      <article className="p-4 md:p-8 h-full flex flex-col transition-all duration-700">
        <div className="flex lg:flex-col justify-between lg:justify-start gap-2 items-center lg:items-start transition-all duration-500">
          <h2 className="z-20 text-xl font-medium duration-1000 lg:text-3xl text-zinc-200 group-hover:text-white font-display lg:order-2 lg:mt-4 transition-all">
            {project.title}
          </h2>
          <span className="text-xs duration-1000 text-zinc-200 group-hover:text-white group-hover:border-zinc-200 drop-shadow-orange flex-shrink-0 lg:order-1 transition-all">
            {project.date ? (
              <time dateTime={new Date(project.date).toISOString()}>
                {Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
                  new Date(project.date),
                )}
              </time>
            ) : (
              <span>SOON</span>
            )}
          </span>
        </div>
        <div className="w-full h-px mt-4 bg-zinc-800 transition-all duration-500" />

        <div className="relative mt-4 flex-grow transition-all duration-500">
          <motion.div
            initial={false}
            animate={{ height: expanded ? "auto" : MAX_COLLAPSED_HEIGHT }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden relative"
          >
            <p
              ref={pRef}
              className="text-sm duration-1000 text-zinc-400 group-hover:text-zinc-200 cursor-pointer transition-all"
              onClick={(e) => {
                if (isOverflowing) {
                  e.preventDefault();
                  e.stopPropagation();
                  setExpanded(!expanded);
                }
              }}
            >
              {project.description}
            </p>
          </motion.div>

          {!expanded && isOverflowing && (
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black via-zinc-900/80 to-transparent pointer-events-none" />
          )}
        </div>
      </article>
    </Link>
  );
};
