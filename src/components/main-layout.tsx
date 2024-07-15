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

      <div className="row row-cols-2 vh-100">
        <div className="col-2 h-100 bg-light-grey">
          <MenuTabComponent></MenuTabComponent>
        </div>

        <div className="col-10 h-100 p-0">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
