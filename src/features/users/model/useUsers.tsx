import { useQuery } from "@tanstack/react-query";
import { instance } from "../../../App/providers/config";

export interface User {
  id: string;
  username: string;
  role: string;
}

export interface UsersApiResponse {
  data: {
    data: User[];
    meta: {
      itemsPerPage: number;
      totalItems: number;
      currentPage: number;
      totalPages: number;
      sortBy: [string, string][];
    };
    links: {
      current: string;
    };
  };
}

async function fetchUsers(): Promise<User[]> {
  const res = await instance.get<UsersApiResponse>("/users");
  return res.data.data.data;
}

export function useUsers() {
  return useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
}
