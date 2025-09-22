// src/contexts/ThemeProvider.jsx
import React, { useState, useEffect } from "react";
import { ThemeContext } from "./ThemeContext";

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Al inicializar el estado, lee directamente de localStorage.
    // Si no hay un tema guardado, usa "system" por defecto.
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "system";
  });

  const applyTheme = (newTheme) => {
    console.log(`Aplicando tema: ${newTheme}`);
    const root = document.documentElement;
    if (newTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  useEffect(() => {
    // Este useEffect se ejecuta cada vez que el tema cambia.
    // Llama a applyTheme para aplicar las clases al <html>
    // y guarda la preferencia en localStorage.
    console.log(`Estado del tema actualizado: ${theme}`);
    applyTheme(theme);
    localStorage.setItem("theme", theme);

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => applyTheme("system");
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}