import { Mark } from "../mark/mark.types";
import { Comment } from "../comment/comment.types";

export interface Snippet {
  id: string;
  code: string;
  language: string;
  marks: Mark[];
  user: {
    id: string;
    username: string;
    role: string;
  };
  comments: Comment[];
}

export interface SnippetsApiResponse {
  data: {
    data: Snippet[];
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

export interface FetchSnippetsParams {
  pageParam?: number;
  limit?: number;
}
