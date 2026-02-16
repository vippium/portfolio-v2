import "../global.css";
import { Poppins } from "next/font/google";
import LocalFont from "next/font/local";
import { Metadata } from "next";
import { FollowCursor } from "./components/follow-cursor";
import Particles from "./components/particles";

export const metadata: Metadata = {
  title: {
    default: "Vipin Prajapat",
    template: "%s | Vipin Prajapat",
  },
  description:
    "React-first Web Developer experienced in building full-stack applications with modern JavaScript and clean architecture.",
  metadataBase: new URL("https://vipinprajapat.dev"),
  openGraph: {
    title: "Vipin Prajapat",
    description:
      "React-first Web Developer experienced in building full-stack applications with modern JavaScript and clean architecture.",
    url: "https://vipinprajapat.dev",
    siteName: "vipinprajapat.dev",
    images: [
      {
        url: "https://vipinprajapat.dev/og.png",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Vipin Prajapat",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.png",
  },
};
const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={[poppins.variable, calSans.variable].join(" ")}>
      <head></head>
      <body
        className={`bg-black ${
          process.env.NODE_ENV === "development" ? "debug-screens" : undefined
        }`}
      >
        <FollowCursor />
        <Particles
          className="fixed inset-0 -z-10"
          quantity={150}
          staticity={50}
        />
        {children}
      </body>
    </html>
  );
}
