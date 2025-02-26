export interface Comment {
  id: string;
  content: string;
  user?: {
    id: string;
    username: string;
    role: string;
  };
}
