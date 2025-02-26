import { useMutation } from "@tanstack/react-query";
import { instance } from "../App/providers/config";

export interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
}

async function changePassword(data: ChangePasswordData) {
  const res = await instance.patch("/me/password", data);
  return res.data;
}

export function useChangePassword() {
  return useMutation({
    mutationFn: changePassword,
  });
}
