import { useInfiniteQuery } from "@tanstack/react-query";
import { instance } from "../api/config";

export interface QuestionUser {
  id: string;
  username: string;
  role: string;
}

export interface Answer {
  id: string;
  content: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  title: string;
  description: string;
  attachedCode?: string;
  answers: Answer[];
  user: QuestionUser;
  isResolved: boolean;
}

export interface QuestionsApiResponse {
  data: {
    data: Question[];
    meta: {
      itemsPerPage: number;
      totalItems: number;
      currentPage: number;
      totalPages: number;
      sortBy: [string, string][];
    };
    links: {
      current: string;
    };
  };
}

interface FetchQuestionsParams {
  pageParam?: number;
  limit?: number;
}

async function fetchQuestions({
  pageParam = 1,
  limit = 10,
}: FetchQuestionsParams) {
  const res = await instance.get<QuestionsApiResponse>(
    `/questions?page=${pageParam}&limit=${limit}`
  );
  return res.data.data;
}

export function useQuestionsInfinite() {
  return useInfiniteQuery<QuestionsApiResponse["data"], Error>({
    queryKey: ["questions", "infinite"],
    queryFn: ({ pageParam = 1 }) =>
      fetchQuestions({ pageParam: pageParam as number }),
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.meta;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
  });
}
