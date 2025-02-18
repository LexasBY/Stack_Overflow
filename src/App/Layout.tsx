//import Header from "@/widgets/Header/ui/Header";
//import Menu from "@/widgets/Menu/ui/Menu";
import { Router } from "./Router";

export const Layout = () => {
  return (
    <div id="layout" className="layout">
      {/* <Header /> */}
      <div className="outer-wrapper">
        {/* <Menu /> */}
        <div className="container section section__container">
          <Router />
        </div>
      </div>
    </div>
  );
};
