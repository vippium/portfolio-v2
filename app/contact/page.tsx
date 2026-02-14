"use client";
import { Github, Mail, Linkedin } from "lucide-react";
import Link from "next/link";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { PageTransition } from "../components/page-transition";

const socials = [
  {
    icon: <Mail size={20} />,
    href: "mailto:iamvipin.prajapat@gmail.com",
    label: "Email",
    handle: "iamvipin.prajapat@gmail.com",
    handleShort: "iamvipin . . . at@gmail.com",
  },
  {
    icon: <Linkedin size={20} />,
    href: "https://www.linkedin.com/in/vipinprajapat",
    label: "LinkedIn",
    handle: "linkedin.com/vipinprajapat",
  },
  {
    icon: <Github size={20} />,
    href: "https://www.github.com/vippium",
    label: "GitHub",
    handle: "github.com/vippium",
  },
];

export default function Example() {
  return (
    <div className=" bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
      <Navigation />
      <PageTransition>
        <div className="container flex items-center justify-center min-h-screen px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 mx-auto">
          <div className="grid w-full grid-cols-1 gap-4 mx-auto mt-12 sm:mt-16 md:mt-24 lg:mt-0 sm:grid-cols-3 lg:gap-12">
            {socials.map((s) => (
              <Card>
                <Link
                  href={s.href}
                  target="_blank"
                  className="p-3 sm:p-4 relative flex flex-col items-center gap-3 duration-700 group md:gap-6 md:py-16 lg:pb-32 md:p-12"
                >
                  <span
                    className="absolute w-px h-2/3 bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent"
                    aria-hidden="true"
                  />
                  <span className="relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-zinc-200 group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-zinc-200 drop-shadow-orange">
                    {s.icon}
                  </span>{" "}
                  <div className="z-10 flex flex-col items-center">
                    {/* Full email on mobile */}
                    <span className="md:hidden text-xs sm:text-sm font-medium duration-150 text-zinc-200 group-hover:text-white font-display whitespace-nowrap">
                      {s.handle}
                    </span>
                    {/* Truncated email on md+ */}
                    <span className="hidden md:block text-base lg:text-lg xl:text-xl font-medium duration-150 text-zinc-200 group-hover:text-white font-display whitespace-nowrap">
                      {s.handleShort || s.handle}
                    </span>
                    <span className="mt-4 text-sm text-center duration-1000 text-zinc-400 group-hover:text-zinc-200">
                      {s.label}
                    </span>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </PageTransition>
    </div>
  );
}
