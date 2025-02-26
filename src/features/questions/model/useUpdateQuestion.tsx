import { useMutation, useQueryClient } from "@tanstack/react-query";
import { instance } from "../../../App/providers/config";
import { AxiosError } from "axios";
import { Question } from "./useQuestionsInfinite";

interface UpdateQuestionPayload {
  id: string;
  title: string;
  description: string;
  attachedCode: string;
}

interface UpdateQuestionResponse {
  data: Question;
  message: string;
}

async function updateQuestion(
  payload: UpdateQuestionPayload
): Promise<UpdateQuestionResponse> {
  const res = await instance.patch<UpdateQuestionResponse>(
    `/questions/${payload.id}`,
    {
      title: payload.title,
      description: payload.description,
      attachedCode: payload.attachedCode,
    }
  );
  return res.data;
}

export function useUpdateQuestion() {
  const queryClient = useQueryClient();
  return useMutation<UpdateQuestionResponse, AxiosError, UpdateQuestionPayload>(
    {
      mutationFn: updateQuestion,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["questions"] });
      },
    }
  );
}
