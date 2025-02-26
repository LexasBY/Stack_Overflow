import { useQuery } from "@tanstack/react-query";
import { instance } from "../../../App/providers/config";

export interface UserStatistic {
  rating: number;
  snippets: number;
  comments: number;
  likes: number;
  dislikes: number;
  questions: number;
  correctAnswers: number;
  regularAnswers: number;
}

interface StatisticApiResponse {
  data: {
    id: string;
    username: string;
    role: string;
    statistic: {
      rating: number;
      snippetsCount: number;
      commentsCount: number;
      likesCount: number;
      dislikesCount: number;
      questionsCount: number;
      correctAnswersCount: number;
      regularAnswersCount: number;
    };
  };
}

async function fetchUserStatistic(userId: number): Promise<UserStatistic> {
  const res = await instance.get<StatisticApiResponse>(
    `/users/${userId}/statistic`
  );

  const s = res.data.data.statistic;
  return {
    rating: s.rating,
    snippets: s.snippetsCount,
    comments: s.commentsCount,
    likes: s.likesCount,
    dislikes: s.dislikesCount,
    questions: s.questionsCount,
    correctAnswers: s.correctAnswersCount,
    regularAnswers: s.regularAnswersCount,
  };
}

export function useUserStatistic(userId?: number) {
  return useQuery({
    queryKey: ["userStatistic", userId],
    queryFn: () => fetchUserStatistic(userId!),
    enabled: !!userId,
  });
}
