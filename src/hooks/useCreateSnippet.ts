// src/hooks/useCreateSnippet.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { instance } from "../api/config";
import { AxiosError } from "axios";

export interface CreateSnippetData {
  id: string;
  code: string;
  language: string;
  user: {
    id: string;
    username: string;
    role: string;
  };
}

export interface CreateSnippetSuccessResponse {
  data: CreateSnippetData;
}

export interface CreateSnippetErrorResponse {
  statusCode: number;
  endpoint: string;
  message: string;
}

export interface CreateSnippetPayload {
  code: string;
  language: string;
}

async function createSnippet(
  payload: CreateSnippetPayload
): Promise<CreateSnippetSuccessResponse> {
  const res = await instance.post<CreateSnippetSuccessResponse>(
    "/snippets",
    payload
  );
  return res.data; // { data: { id, code, language, user } }
}

export function useCreateSnippet() {
  const queryClient = useQueryClient();
  return useMutation<
    CreateSnippetSuccessResponse,
    AxiosError<CreateSnippetErrorResponse>,
    CreateSnippetPayload
  >({
    mutationFn: createSnippet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["snippets"] });
    },
  });
}
