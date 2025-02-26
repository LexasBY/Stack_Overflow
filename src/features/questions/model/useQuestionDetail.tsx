import { useQuery } from "@tanstack/react-query";
import { instance } from "../../../App/providers/config";
import { Question } from "./useQuestionsInfinite";

async function fetchQuestionDetail(id: string): Promise<Question> {
  const res = await instance.get<{ data: Question }>(`/questions/${id}`);
  return res.data.data;
}

export function useQuestionDetail(id?: string) {
  return useQuery<Question, Error>({
    queryKey: ["questionDetail", id],
    queryFn: () => fetchQuestionDetail(id!),
    enabled: Boolean(id),
  });
}
