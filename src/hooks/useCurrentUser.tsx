// src/hooks/useCurrentUser.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface User {
  id: string;
  username: string;
  role: string;
}

async function fetchCurrentUser(): Promise<User> {
  const response = await axios.get<User>("/api/auth", {
    withCredentials: true,
  });
  return response.data;
}

export function useCurrentUser() {
  return useQuery<User, Error>({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    retry: false,
  });
}
