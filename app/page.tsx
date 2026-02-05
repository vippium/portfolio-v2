import Link from "next/link";
import React from "react";
import Particles from "./components/particles";
import { ResetNavigation } from "./components/reset-navigation";
import { FaGithub, FaLinkedinIn, FaAt } from "react-icons/fa";

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

const socials = [
  {
    icon: <FaGithub className="w-5 h-5" />,
    href: "https://www.github.com/vippium",
    label: "GitHub",
  },
  {
    icon: <FaLinkedinIn className="w-5 h-5" />,
    href: "https://www.linkedin.com/in/vipinprajapat",
    label: "LinkedIn",
  },
  {
    icon: <FaAt className="w-5 h-5" />,
    href: "mailto:iamvipin.prajapat@gmail.com",
    label: "Email",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <ResetNavigation />
      <nav className="my-16 animate-fade-in">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm duration-500 text-zinc-500 hover:text-zinc-300"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>
      <div className="w-screen h-px animate-glow animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      <h1 className="py-3.5 px-0.5 z-10 text-5xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text ">
        Vipin Prajapat
      </h1>

      <div className="w-screen h-px animate-glow animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <div className="my-8 sm:my-16 text-center animate-fade-in max-w-xs sm:max-w-2xl px-6 sm:px-8">
        {/* Mobile description */}
        <h2 className="sm:hidden text-sm text-zinc-400 leading-relaxed">
          Full-Stack Web Developer with a strong focus on React.
        </h2>
        {/* Desktop description */}
        <h2 className="hidden sm:block text-sm md:text-base text-zinc-400 leading-relaxed">
          React-first Web Developer experienced in building full-stack
          applications with modern JavaScript and clean architecture.
        </h2>
        <div className="mt-8 flex items-center justify-center gap-6">
          {socials.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              target="_blank"
              aria-label={social.label}
              className="text-zinc-500 hover:text-zinc-300 duration-500"
            >
              {social.icon}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
