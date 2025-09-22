// src/components/common/Footer.jsx
import { useTheme } from "../../contexts/useTheme";

function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="w-full p-4 bg-gray-900 dark:bg-gray-800 text-white dark:text-gray-200 mt-auto text-center relative z-0">
      <p className="text-sm">
        © {new Date().getFullYear()} I.E. 88336 Gaston Vidal Porturas - Todos los derechos reservados.
      </p>
      {/* Grupo para enlaces */}
      <div className="flex justify-center mt-2 space-x-2">
        <a href="mailto:contacto@colegio.edu" className="text-red-400 dark:text-red-500 text-sm hover:underline">
          soporte@gmail.com
        </a>
        <span className="text-sm">-</span>
        <a href="#" className="text-red-400 dark:text-red-500 text-sm hover:underline">
          Política de privacidad
        </a>
      </div>
    </footer>
  );
}

export default Footer;