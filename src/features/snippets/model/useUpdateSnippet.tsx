import { useMutation, useQueryClient } from "@tanstack/react-query";
import { instance } from "../../../App/providers/config";
import { AxiosError } from "axios";
import { Snippet } from "../../../entities/snippet/snippet.types";

interface UpdateSnippetPayload {
  id: string; // ID сниппета
  code: string;
  language: string;
}

interface UpdateSnippetResponse {
  data: Snippet; // Обновлённый сниппет
  message: string;
}

async function updateSnippet(
  payload: UpdateSnippetPayload
): Promise<UpdateSnippetResponse> {
  const res = await instance.patch<UpdateSnippetResponse>(
    `/snippets/${payload.id}`,
    {
      code: payload.code,
      language: payload.language,
    }
  );
  return res.data;
}

export function useUpdateSnippet() {
  const queryClient = useQueryClient();
  return useMutation<UpdateSnippetResponse, AxiosError, UpdateSnippetPayload>({
    mutationFn: updateSnippet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["snippets"] });
    },
  });
}
