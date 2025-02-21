import { useMutation, useQueryClient } from "@tanstack/react-query";
import { instance } from "../api/config";

export interface ChangeUsernameData {
  username: string;
}

async function changeUsername(data: ChangeUsernameData) {
  const res = await instance.patch("/me", data);
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
