"use client";

import { useAuth } from "../app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type React from "react"; // Added import for React

export function withAdminProtection<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function ProtectedRoute(props: P) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push("/login"); // Redirect to login page if not authenticated
      }
    }, [user, loading, router]);

    if (loading) {
      return <div>Loading...</div>; // Or a proper loading component
    }

    if (!user) {
      return null; // Don't render anything while redirecting
    }

    return <WrappedComponent {...props} />;
  };
}
