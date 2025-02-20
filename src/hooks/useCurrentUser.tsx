import { useQuery } from "@tanstack/react-query";
import { instance } from "../api/config";

export interface User {
  id: string;
  username: string;
  role: string;
}

async function fetchCurrentUser(): Promise<User> {
  const response = await instance.get<User>("/auth");
  return response.data;
}

export function useCurrentUser() {
  return useQuery<User, Error>({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    retry: false,
  });
}
