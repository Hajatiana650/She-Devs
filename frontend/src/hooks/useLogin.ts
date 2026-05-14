import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { loginByRole } from "@/api/auth";
import { useAuth, type Role } from "@/lib/auth";

interface LoginPayload {
  role: Role;
  email: string;
  password: string;
}

const ROLE_ROUTES: Record<Role, string> = {
  POPULATION: "/app/bus",
  CHAUFFEUR: "/chauffeur/mon-bus",
  ADMIN_BUS: "/admin-bus/dashboard",
  ADMIN_TRASH: "/admin-trash/dashboard",
};

export function useLogin() {
  const { setRole } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: ({ role, email, password }: LoginPayload) =>
      loginByRole(role, email, password),

    onSuccess: (user, variables) => {
      // user = backend user object directement
      const userEmail = (user as any)?.email;

      setRole(variables.role, userEmail);

      navigate({
        to: ROLE_ROUTES[variables.role],
      });
    },
  });

  return {
    login: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error?.message ?? null,
  };
}