import * as React from "react";
import Drawer from "./Drawer";
import Header from "./Header";

const Layout: React.FC = ({ children }) => {
  return (
    <Drawer>
      {/* On Desktop */}
      <div className="hidden w-full px-5 lg:block">
        <Header />
        {children}
      </div>
      {/* On Mobile */}
      <div className="w-full px-2 text-center text-xs lg:hidden">{children}</div>
    </Drawer>
  );
};

export default Layout;
