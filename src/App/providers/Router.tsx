import { Routes, Route } from "react-router";
import { Layout } from "../Layout";
import GuestOnly from "../../shared/routeGuards/GuestOnly";
import Modal from "../../widgets/Modal";
import AccountPage from "../../pages/AccountPage";
import ProtectedRoute from "../../shared/routeGuards/ProtectedRoute";
import HomePage from "../../pages/HomePage";
import CreateSnippetPage from "../../pages/CreateSnippetPage";
import MySnippetsPage from "../../pages/MySnippetPage";
import PostPage from "../../pages/PostPage";
import UsersPage from "../../pages/UsersPage";
import QuestionsPage from "../../pages/QuestionPage";
import CreateQuestionPage from "../../pages/CreateQuestionPage";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="me" element={<AccountPage />} />
          <Route path="snippets/:id" element={<PostPage />} />
          <Route path="/questions/new" element={<CreateQuestionPage />} />
        </Route>

        <Route path="snippet/new" element={<CreateSnippetPage />} />

        <Route path="snippets/me" element={<MySnippetsPage />} />

        <Route path="questions" element={<QuestionsPage />} />
        <Route path="users" element={<UsersPage />} />

        <Route element={<GuestOnly />}>
          <Route path="/login" element={<Modal />} />
          <Route path="/register" element={<Modal />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
