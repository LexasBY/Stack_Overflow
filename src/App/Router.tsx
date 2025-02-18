import { Route, Routes } from "react-router";

const Placeholder = ({ name }: { name: string }) => <h2>{name} Page</h2>;

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Placeholder name="Home" />} />
      <Route path="posts" element={<Placeholder name="Post" />} />
      <Route path="/my_snippet" element={<Placeholder name="My Snippets" />} />
      <Route
        path="/edit_snippet"
        element={<Placeholder name="Edit Snippet" />}
      />
      <Route path="/account" element={<Placeholder name="Account" />} />
      <Route path="/user" element={<Placeholder name="User" />} />
      <Route path="/all_users" element={<Placeholder name="All Users" />} />
      <Route
        path="/new_question"
        element={<Placeholder name="New Question" />}
      />
      <Route
        path="/edit_question"
        element={<Placeholder name="Edit Question" />}
      />
      <Route path="/new_snippet" element={<Placeholder name="New Snippet" />} />
      <Route path="/questions" element={<Placeholder name="Questions" />} />
      <Route
        path="/register"
        element={<Placeholder name="Register (Modal)" />}
      />
      <Route path="/login" element={<Placeholder name="Login (Modal)" />} />
    </Routes>
  );
};
