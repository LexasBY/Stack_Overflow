// src/router/Router.tsx
import { Routes, Route } from "react-router";
import { Layout } from "./Layout";
import GuestOnly from "../shared/routeGuards/GuestOnly";
import Modal from "../widgets/Modal";

const Placeholder = ({ name }: { name: string }) => (
  <h2 style={{ color: "black" }}>{name} Page</h2>
);
export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Placeholder name="Home" />} />
        <Route path="posts" element={<Placeholder name="Post" />} />
        <Route path="my_snippet" element={<Placeholder name="My Snippets" />} />
        <Route
          path="edit_snippet"
          element={<Placeholder name="Edit Snippet" />}
        />
        <Route path="account" element={<Placeholder name="Account" />} />
        <Route path="user" element={<Placeholder name="User" />} />
        <Route path="all_users" element={<Placeholder name="All Users" />} />
        <Route
          path="new_question"
          element={<Placeholder name="New Question" />}
        />
        <Route
          path="edit_question"
          element={<Placeholder name="Edit Question" />}
        />
        <Route
          path="new_snippet"
          element={<Placeholder name="New Snippet" />}
        />
        <Route path="questions" element={<Placeholder name="Questions" />} />
      </Route>

      <Route element={<GuestOnly />}>
        <Route path="/login" element={<Modal />} />
        <Route path="/register" element={<Modal />} />
      </Route>
    </Routes>
  );
};

export default Router;
