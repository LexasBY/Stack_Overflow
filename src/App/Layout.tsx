import { Outlet } from "react-router";
import Header from "../widgets/Header";
import Menu from "../widgets/Menu";
import "./layout.css";
// Outlet, Protected route, styled components
export const Layout = () => {
  return (
    <div id="layout" className="layout">
      <Header />
      <div className="outer-wrapper">
        <Menu />
        <div className="container section section__container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
