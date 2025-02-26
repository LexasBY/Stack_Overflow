import { Outlet } from "react-router";
import Header from "../shared/ui/Header/index";
import Menu from "../shared/ui/Menu";
import "./layout.css";

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
