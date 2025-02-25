import { useInfiniteQuery } from "@tanstack/react-query";
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
  user?: {
    id: string;
    username: string;
    role: string;
  };
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

interface FetchSnippetsParams {
  pageParam?: number;
  limit?: number;
}

async function fetchSnippets({
  pageParam = 1,
  limit = 10,
}: FetchSnippetsParams) {
  const res = await instance.get<SnippetsApiResponse>(
    `/snippets?page=${pageParam}&limit=${limit}`
  );
  return res.data.data;
}

export function useSnippetsInfinite() {
  return useInfiniteQuery<SnippetsApiResponse["data"], Error>({
    queryKey: ["snippets", "infinite"],
    queryFn: ({ pageParam = 1 }) =>
      fetchSnippets({ pageParam: pageParam as number }),
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.meta;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
  });
}
