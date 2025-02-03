"use client";

import type React from "react"; // Importing React to fix the undeclared variable
import { useWindow } from "../utils/use-window";

export function WindowSafe({ children }: { children: React.ReactNode }) {
  const windowObj = useWindow();

  if (!windowObj) {
    return null; // Or a loading state
  }

  return <>{children}</>;
}
