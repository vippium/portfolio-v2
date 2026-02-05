"use client";
import { useEffect } from "react";

export function ResetNavigation() {
  useEffect(() => {
    sessionStorage.removeItem("hasVisitedSubpage");
  }, []);

  return null;
}
