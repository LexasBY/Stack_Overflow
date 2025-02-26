import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
//import { useNavigate } from "react-router";
import { instance } from "../../../App/providers/config";

type LogoutError = AxiosError<unknown>;

async function logoutRequest(): Promise<void> {
  await instance.post("/auth/logout");
}

export function useLogout() {
  const queryClient = useQueryClient();
  //const navigate = useNavigate();

  return useMutation<void, LogoutError, void, unknown>({
    mutationFn: logoutRequest,
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ["currentUser"] });
      //navigate("/login");
    },
    onError: (error) => {
      console.error("Logout error:", error.message);
    },
  });
}
