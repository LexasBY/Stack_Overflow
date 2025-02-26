export interface Mark {
  id: string;
  type: "like" | "dislike";
  user: {
    id: string;
    username: string;
    role: string;
  };
}
