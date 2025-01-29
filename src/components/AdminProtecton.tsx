"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type React from "react";

export function AdminProtection({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login"); // Redirect to login page if not authenticated
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>; // Or a proper loading component
  }

  if (!user) {
    console.log("user is not logged in");
    return null; // Don't render anything while redirecting
  }

  return <>{children}</>;
}
