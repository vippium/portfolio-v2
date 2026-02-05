"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
	children: ReactNode;
}

const variants = {
	hidden: { opacity: 0, y: 20 },
	enter: { opacity: 1, y: 0 },
};

export function PageTransition({ children }: PageTransitionProps) {
	return (
		<motion.div
			initial="hidden"
			animate="enter"
			variants={variants}
			transition={{ duration: 0.4, ease: "easeInOut" }}
		>
			{children}
		</motion.div>
	);
}


