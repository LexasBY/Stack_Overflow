import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { instance } from "../../../App/providers/config";
import { useNavigate } from "react-router";

export type LoginInput = {
  username: string;
  password: string;
};

export type LoginResponse = {
  id: string;
  username: string;
  role: string;
  token?: string;
};

async function loginUser(data: LoginInput): Promise<LoginResponse> {
  const response = await instance.post<LoginResponse>("/auth/login", data);
  return response.data;
}

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<LoginResponse, AxiosError<unknown>, LoginInput>({
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      navigate("/");
    },
    onError: (error) => {
      console.error("Login error:", error.message);
    },
  });
}
