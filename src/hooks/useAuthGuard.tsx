"use client";

import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function decodeJWT(token: string): { exp?: number;[key: string]: any } | null {
  try {
    // JWT format: header.payload.signature
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    // Decode the payload (middle part)
    const payload = parts[1];
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}

function isTokenExpired(token: string | null): boolean {
  if (!token) return true;

  const payload = decodeJWT(token);
  if (!payload || !payload.exp) return true;

  // Get current time in seconds (JWT exp is in seconds)
  const currentTime = Math.floor(Date.now() / 1000);

  // Token is expired if current time is past expiration
  return currentTime >= payload.exp;
}

export default function useAuthGuard() {
  const router = useRouter();
  const { token, logout } = useAuthStore();
  const [isHydrated, setIsHydrated] = useState(false);

  // Wait for Zustand to hydrate from localStorage
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    // Don't check auth until after hydration
    if (!isHydrated) return;

    // No token - redirect to login
    if (!token) {
      router.push('/login');
      return;
    }

    // Token expired - logout and redirect
    if (isTokenExpired(token)) {
      logout();
      router.push('/login');
      return;
    }
  }, [token, router, logout, isHydrated]);

  return { isLoading: !isHydrated };
}