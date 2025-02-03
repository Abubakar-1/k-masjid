"use client";

import { useState, useEffect } from "react";

export function useWindow() {
  const [windowObj, setWindowObj] = useState<Window | undefined>(undefined);

  useEffect(() => {
    setWindowObj(window);
  }, []);

  return windowObj;
}
