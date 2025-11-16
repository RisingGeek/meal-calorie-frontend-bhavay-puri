"use client";

import useAuthGuard from "@/hooks/useAuthGuard";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";

const AuthGuardLayout = ({ children }: { children: ReactNode }) => {
  const { isLoading } = useAuthGuard();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return children;
}

export default AuthGuardLayout;
