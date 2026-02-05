"use client";
import { useEffect } from "react";

export function ResetNavigation() {
	useEffect(() => {
		// Clear the flag when user returns to home page
		// So animation triggers again on next subpage visit
		sessionStorage.removeItem("hasVisitedSubpage");
	}, []);

	return null;
}
