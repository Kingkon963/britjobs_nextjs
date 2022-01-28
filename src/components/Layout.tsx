import * as React from "react";
import Header from "./Header";

const Layout: React.FC = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => setOpen(!open);

  return (
    <div className="rounded-none shadow bg-base-200 drawer drawer-mobile h-screen">
      <input id="appDrawer" type="checkbox" className="drawer-toggle" checked={open} readOnly />
      <div className="flex flex-col items-center justify-start drawer-content">
        <label
          htmlFor="appDrawer"
          className="mb-4 btn btn-primary drawer-button lg:hidden"
          onClick={toggleDrawer}
        >
          open menu
        </label>
        {/* On Desktop */}
        <div className="hidden lg:block w-full px-5">
          <Header />
          {children}
        </div>
        {/* On Mobile */}
        <div className="text-xs text-center lg:hidden w-full px-2">{children}</div>
      </div>
      <div className="drawer-side">
        <label htmlFor="appDrawer" className="drawer-overlay" onClick={toggleDrawer}></label>
        <ul className="menu p-4 overflow-y-auto w-72 bg-base-100 text-base-content">
          <li>
            <a>Dashboard</a>
          </li>
          <li>
            <a>Jobs</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Layout;
