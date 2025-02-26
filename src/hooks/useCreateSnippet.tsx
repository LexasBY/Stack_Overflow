import { useMutation, useQueryClient } from "@tanstack/react-query";
import { instance } from "../App/providers/config";
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
  return res.data;
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
