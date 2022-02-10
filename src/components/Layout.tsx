import * as React from "react";
import Drawer from "./Drawer";
import Header from "./Header";

const Layout: React.FC = ({ children }) => {
  return (
    <Drawer>
      {/* On Desktop */}
      <div className="hidden lg:block w-full px-5">
        <Header />
        {children}
      </div>
      {/* On Mobile */}
      <div className="text-xs text-center lg:hidden w-full px-2">{children}</div>
    </Drawer>
  );
};

export default Layout;
