import { useInfiniteQuery } from "@tanstack/react-query";
import { instance } from "../../App/providers/config";
import {
  FetchSnippetsParams,
  SnippetsApiResponse,
} from "../../entities/snippet/snippet.types";

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
