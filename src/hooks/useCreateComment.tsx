// src/hooks/useCreateComment.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { instance } from "../api/config";
import { AxiosError } from "axios";

export interface CreateCommentPayload {
  content: string;
  snippetId: string;
}

export interface CreateCommentSuccessResponse {
  data: {
    id: string;
    content: string;
  };
  message: string;
}

export interface CreateCommentErrorResponse {
  statusCode: number;
  endpoint: string;
  message: string;
}

async function createComment(
  payload: CreateCommentPayload
): Promise<CreateCommentSuccessResponse> {
  const res = await instance.post<CreateCommentSuccessResponse>(
    "/comments",
    payload
  );
  return res.data;
}

export function useCreateComment() {
  const queryClient = useQueryClient();
  return useMutation<
    CreateCommentSuccessResponse,
    AxiosError<CreateCommentErrorResponse>,
    CreateCommentPayload
  >({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["snippetDetail"] });
    },
  });
}
