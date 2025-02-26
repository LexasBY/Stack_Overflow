import { useQuery } from "@tanstack/react-query";
import { instance } from "../../../App/providers/config";
import { Snippet } from "../../../entities/snippet/snippet.types";

interface SnippetDetailResponse {
  data: Snippet;
}

async function fetchSnippetDetail(id: string): Promise<Snippet> {
  const res = await instance.get<SnippetDetailResponse>(`/snippets/${id}`);
  return res.data.data;
}

export function useSnippetDetail(id?: string) {
  return useQuery({
    queryKey: ["snippetDetail", id],
    queryFn: () => fetchSnippetDetail(id!),
    enabled: !!id,
  });
}
