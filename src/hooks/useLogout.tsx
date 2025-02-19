import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router";

type LogoutError = AxiosError<unknown>;

async function logoutRequest(): Promise<void> {
  await axios.post("/api/auth/logout", {}, { withCredentials: true });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<void, LogoutError, void, unknown>({
    mutationFn: logoutRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      navigate("/login");
    },
    onError: (error) => {
      console.error("Logout error:", error.message);
    },
  });
}
