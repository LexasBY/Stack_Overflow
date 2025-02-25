import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { instance } from "../api/config";

export interface CreateQuestionPayload {
  title: string;
  description: string;
  attachedCode: string;
}

export interface CreateQuestionSuccessResponse {
  data: {
    id: string;
    title: string;
    description: string;
    attachedCode?: string;
  };
  message: string;
}

export interface CreateQuestionErrorResponse {
  statusCode: number;
  endpoint: string;
  message: string;
}

async function createQuestion(
  payload: CreateQuestionPayload
): Promise<CreateQuestionSuccessResponse> {
  const res = await instance.post<CreateQuestionSuccessResponse>(
    "/questions",
    payload
  );
  return res.data;
}

export function useCreateQuestion(): UseMutationResult<
  CreateQuestionSuccessResponse,
  AxiosError<CreateQuestionErrorResponse>,
  CreateQuestionPayload
> {
  return useMutation<
    CreateQuestionSuccessResponse,
    AxiosError<CreateQuestionErrorResponse>,
    CreateQuestionPayload
  >({
    mutationFn: createQuestion,
  });
}
