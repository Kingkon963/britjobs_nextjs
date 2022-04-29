import React from "react";

const ThemeProvider: React.FC = ({ children }) => {
  return <div data-theme="dark">{children}</div>;
};

export default ThemeProvider;
