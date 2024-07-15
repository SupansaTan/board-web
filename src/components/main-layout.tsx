import React, { ReactNode } from "react";
import MenuTabComponent from "./menu-tab";
import NavbarComponent from "./navbar";

interface LayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-100">
      <NavbarComponent></NavbarComponent>

      <div className="row row-cols-1 row-cols-lg-2 vh-100">
        <div className="d-none d-lg-block col-lg-2 pe-0 h-100 bg-light-grey">
          <MenuTabComponent></MenuTabComponent>
        </div>

        <div className="col-12 col-lg-10 h-100 p-0">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
