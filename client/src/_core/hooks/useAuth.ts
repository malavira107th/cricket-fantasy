import { useMemo } from "react";

type UseAuthOptions = {
  redirectOnUnauthenticated?: boolean;
  redirectPath?: string;
};

export function useAuth(_options?: UseAuthOptions) {
  // Static version for Vercel deployment - no authentication
  const state = useMemo(() => {
    return {
      user: null,
      loading: false,
      error: null,
      isAuthenticated: false,
    };
  }, []);

  return {
    ...state,
    refresh: () => Promise.resolve(),
    logout: () => Promise.resolve(),
  };
}
