import { useMutation, useQueryClient } from "@tanstack/react-query";
import { instance } from "../api/config";
import { AxiosError } from "axios";

export type MarkType = "like" | "dislike";

export interface MarkPayload {
  id: string;
  mark: MarkType;
}

export interface MarkSuccessResponse {
  data: {
    mark: MarkType;
  };
  message: string;
}

export interface MarkErrorResponse {
  statusCode: number;
  endpoint: string;
  message: string;
}

async function markSnippet(payload: MarkPayload): Promise<MarkSuccessResponse> {
  const res = await instance.post<MarkSuccessResponse>(
    `/snippets/${payload.id}/mark`,
    { mark: payload.mark }
  );
  return res.data;
}

export function useMarkSnippet() {
  const queryClient = useQueryClient();

  return useMutation<
    MarkSuccessResponse,
    AxiosError<MarkErrorResponse>,
    MarkPayload
  >({
    mutationFn: markSnippet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["snippets"] });
    },
  });
}
