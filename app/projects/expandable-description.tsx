"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

type Props = {
	description: string;
};

export const ExpandableDescription: React.FC<Props> = ({ description }) => {
	const [expanded, setExpanded] = useState(false);
	const [isOverflowing, setIsOverflowing] = useState(false);
	const pRef = useRef<HTMLParagraphElement>(null);
	const MAX_COLLAPSED_HEIGHT = "5rem"; 

	useEffect(() => {
		if (pRef.current) {
			// Check if scrollHeight is significantly greater than the collapsed height limit
			setIsOverflowing(pRef.current.scrollHeight > 85); // Slight buffer
		}
	}, [description]);

	return (
		<div className="relative mt-4">
			<motion.div
				initial={false}
				animate={{ height: expanded ? "auto" : MAX_COLLAPSED_HEIGHT }}
				transition={{ duration: 0.3, ease: "easeInOut" }}
				className="overflow-hidden relative"
			>
				<p 
					ref={pRef}
					className="text-sm duration-150 text-zinc-400 group-hover:text-zinc-300 cursor-pointer"
					onClick={(e) => {
						if (isOverflowing) {
							e.preventDefault();
							e.stopPropagation();
							setExpanded(!expanded);
						}
					}}
				>
					{description}
				</p>
			</motion.div>

			{!expanded && isOverflowing && (
				<div 
					className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-transparent pointer-events-none"
				/>
			)}
		</div>
	);
};
