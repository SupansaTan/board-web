import React, { ReactNode } from "react";
import MenuTabComponent from "./menu-tab";
import NavbarComponent from "./navbar";

interface LayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <React.Fragment>
      <NavbarComponent></NavbarComponent>

      <div className="row row-cols-2">
        <div className="col-3">
          <MenuTabComponent></MenuTabComponent>
        </div>

        <div className="col">{children}</div>
      </div>
    </React.Fragment>
  );
};

export default MainLayout;
