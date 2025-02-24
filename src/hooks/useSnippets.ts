// src/hooks/useSnippets.ts
import { useQuery } from "@tanstack/react-query";
import { instance } from "../api/config";

export interface Mark {
  id: string;
  type: "like" | "dislike";
  user: {
    id: string;
    username: string;
    role: string;
  };
}

export interface Comment {
  id: string;
  content: string;
}

export interface Snippet {
  id: string;
  code: string;
  language: string;
  marks: Mark[];
  user: {
    id: string;
    username: string;
    role: string;
  };
  comments: Comment[];
}

export interface SnippetsApiResponse {
  data: {
    data: Snippet[];
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

async function fetchSnippets(): Promise<Snippet[]> {
  const res = await instance.get<SnippetsApiResponse>("/snippets");
  return res.data.data.data;
}

export function useSnippets() {
  return useQuery<Snippet[], Error>({
    queryKey: ["snippets"],
    queryFn: fetchSnippets,
  });
}
