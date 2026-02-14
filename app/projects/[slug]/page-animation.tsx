"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function PageAnimation({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
