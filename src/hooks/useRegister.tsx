import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { instance } from "../api/config";
import { useNavigate } from "react-router";

export type RegisterInput = {
  username: string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  id: string;
  username: string;
  role: string;
  token?: string;
};

async function registerUser(data: RegisterInput): Promise<RegisterResponse> {
  const response = await instance.post<RegisterResponse>("/register", data);
  return response.data;
}

export function useRegister() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<RegisterResponse, AxiosError, RegisterInput>({
    mutationFn: registerUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      navigate("/login");
    },
    onError: (error) => {
      console.error("Registration error:", error.message);
    },
  });
}
