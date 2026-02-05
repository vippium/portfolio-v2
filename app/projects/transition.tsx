"use client";
import { PageTransition } from "../components/page-transition";
import { ReactNode } from "react";

export function ProjectsTransition({ children }: { children: ReactNode }) {
	return <PageTransition>{children}</PageTransition>;
}
