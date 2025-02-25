import { useQuery } from "@tanstack/react-query";
import { instance } from "../api/config";
import { Snippet, SnippetsApiResponse } from "./useSnippetsInfinite";

async function fetchMySnippets(userId: string): Promise<Snippet[]> {
  const res = await instance.get<SnippetsApiResponse>(
    `/snippets?userId=${userId}`
  );

  return res.data.data.data;
}

export function useMySnippets(userId: string) {
  return useQuery<Snippet[], Error>({
    queryKey: ["mySnippets", userId],
    queryFn: () => fetchMySnippets(userId),
    enabled: Boolean(userId),
  });
}
