import { useMutation, useQueryClient } from "@tanstack/react-query";
import { instance } from "../api/config";

export interface ChangeUsernameData {
  newUsername: string;
}

async function changeUsername(data: ChangeUsernameData) {
  // Используем instance.patch; путь указан относительно baseURL
  const res = await instance.patch("/users/change-username", data);
  return res.data;
}

export function useChangeUsername() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changeUsername,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accountInfo"] });
    },
  });
}
