import React, { useEffect } from "react";
import useTheme from "src/hooks/useTheme";
import { BsSun, BsMoon } from "react-icons/bs";

export default function ThemeSwitch() {
  const [isDark, setDarkTheme] = React.useState(true);
  const { theme, setTheme } = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setTheme("dark");
    } else setTheme("garden");

    setDarkTheme(e.target.checked);
  };

  useEffect(() => {
    if (theme === "dark") setDarkTheme(true);
    else setDarkTheme(false);
  }, [theme]);

  return (
    <div className="flex items-center gap-2">
      <BsSun />
      <input
        type="checkbox"
        className="toggle"
        checked={isDark}
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <BsMoon />
    </div>
  );
}
