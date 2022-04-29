import { useEffect, useState } from "react";
import { parseCookies, setCookie, destroyCookie } from "nookies";

type Theme = "garden" | "dark";

const useTheme = (defaultTheme: Theme = "dark") => {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);

  useEffect(() => {
    if (document) {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  useEffect(() => {
    const cookies = parseCookies();
    if (cookies.theme) {
      setThemeState(cookies.theme as Theme);
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setCookie(null, "theme", newTheme, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
    setThemeState(newTheme);
  };

  return { theme, setTheme };
};

export default useTheme;
