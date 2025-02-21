import { useMutation } from "@tanstack/react-query";
import { instance } from "../api/config";

export interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
}

async function changePassword(data: ChangePasswordData) {
  // Используем instance.patch; путь указан относительно baseURL
  const res = await instance.patch("/users/change-password", data);
  return res.data;
}

export function useChangePassword() {
  return useMutation({
    mutationFn: changePassword,
  });
}
