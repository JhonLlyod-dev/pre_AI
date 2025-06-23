import { useEffect, useState } from "react";
import "../Css/ToggleTheme.css";

export default function Theme() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "sunset";
  });

  function ChangeTheme() {
    setTheme((prev) => (prev === "nord" ? "sunset" : "nord"));
  }

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="flex items-center justify-center">
      <label className="switch">
        <input
          type="checkbox"
          onChange={ChangeTheme}
          checked={theme === "nord"}
        />
        <span className="slider"></span>
      </label>
    </div>
  );
}
