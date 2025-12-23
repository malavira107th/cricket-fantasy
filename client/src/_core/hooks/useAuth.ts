import { trpc } from "@/lib/trpc";

export function useAuth() {
  const { data: user, isLoading, error } = trpc.auth.me.useQuery();
  const logoutMutation = trpc.auth.logout.useMutation();

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
      window.location.href = "/";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return {
    user: user ?? null,
    isLoading,
    loading: isLoading, // Alias for compatibility
    error: error ?? null,
    isAuthenticated: !!user,
    logout,
  };
}
