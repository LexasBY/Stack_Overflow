import { Routes, Route } from "react-router";
import { Layout } from "./Layout";
import GuestOnly from "../shared/routeGuards/GuestOnly";
import Modal from "../widgets/Modal";
import AccountPage from "../pages/AccountPage/AccountPage";

const Placeholder = ({ name }: { name: string }) => (
  <h2 style={{ color: "red" }}>{name} Page</h2>
);
export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Placeholder name="Home" />} />
        <Route path="me" element={<AccountPage />} />
        <Route
          path="snippet/new"
          element={<Placeholder name="New Snippet" />}
        />
        <Route
          path="snippets/me"
          element={<Placeholder name="My Snippets" />}
        />
        <Route path="questions" element={<Placeholder name="Questions" />} />
        <Route path="users" element={<Placeholder name="All Users" />} />

        <Route element={<GuestOnly />}>
          <Route path="/login" element={<Modal />} />
          <Route path="/register" element={<Modal />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
