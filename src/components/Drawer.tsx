import * as React from "react";
import Menu from "./Menu";

const Drawer: React.FC = ({ children }) => {
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

        {children}
      </div>
      <div className="drawer-side">
        <label htmlFor="appDrawer" className="drawer-overlay" onClick={toggleDrawer}></label>
        <Menu />
      </div>
    </div>
  );
};

export default Drawer;
