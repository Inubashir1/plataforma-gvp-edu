// src/components/common/Header.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  IconSun,
  IconMoon,
  IconHome,
  IconBooks,
  IconPhone,
  IconSettings,
  IconBrush,
  IconMenu2,
  IconX,
  IconKey,
  IconLogout,
  IconUserCircle,
  IconChevronDown,
} from "@tabler/icons-react";
import { useTheme } from "../../contexts/useTheme";

// El componente ahora recibe props para manejar el modal
function Header({ onLoginClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  // Estado para simular si el usuario está logueado
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Usuario Ejemplo");
  const [userProfilePic, setUserProfilePic] = useState("https://via.placeholder.com/40");
  // Usamos el hook del tema
  const { theme, setTheme } = useTheme();
  const menuItems = [
    { label: "Inicio", href: "/", icon: <IconHome size={18} /> },
    { label: "Cursos", href: "/courses", icon: <IconBooks size={18} /> },
    { label: "Contacto", href: "/contact", icon: <IconPhone size={18} /> },
  ];
  const handleLogin = () => { setIsLoggedIn(true); };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setProfileMenuOpen(false);
  };
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    setThemeMenuOpen(false);
  };

  return (
    <header className="bg-red-600 dark:bg-gray-900 text-white shadow-md p-4 flex justify-between items-center relative z-20">
      {/* Izquierda: Menú hamburguesa (móvil) + logo */}
      <div className="flex items-center space-x-3">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white focus:outline-none md:hidden">
          {menuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </button>
        <span className="font-bold text-lg">I.E. 88336 GVP</span>
      </div>
      {/* Menú de escritorio (visible en md y superior) */}
      <nav className="hidden md:flex items-center space-x-2">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.href}
            // Clases para que parezca un botón
            className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
        {/* Selector de temas de escritorio */}
        <div className="relative">
          <button
            onClick={() => setThemeMenuOpen(!themeMenuOpen)}
            // Clases para que parezca un botón
            className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-red-700 focus:outline-none transition-colors duration-200"
          >
            <IconBrush size={18} />
            <span className="text-sm">
              {theme === "light" && "Claro"}
              {theme === "dark" && "Oscuro"}
              {theme === "system" && "Sistema"}
            </span>
            <IconChevronDown size={16} className="transition-transform duration-200" style={{ transform: themeMenuOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
          </button>
          {themeMenuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-30 text-gray-800 dark:text-gray-100">
              <button onClick={() => handleThemeChange("light")} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center space-x-2">
                <IconSun size={14} />
                <span>Claro</span>
              </button>
              <button onClick={() => handleThemeChange("dark")} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center space-x-2">
                <IconMoon size={14} />
                <span>Oscuro</span>
              </button>
              <button onClick={() => handleThemeChange("system")} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center space-x-2">
                <IconSettings size={14} />
                <span>Sistema</span>
              </button>
            </div>
          )}
        </div>
        {/* Sección de usuario (login o perfil) */}
        {!isLoggedIn ? (
          <button onClick={onLoginClick} className="flex items-center space-x-1 bg-red-700 hover:bg-red-800 py-2 px-4 rounded-lg transition-colors">
            <IconKey size={18} />
            <span>Iniciar Sesión</span>
          </button>
        ) : (
          <div className="relative">
            <button onClick={() => setProfileMenuOpen(!profileMenuOpen)} className="flex items-center space-x-2 p-2 rounded-full hover:bg-red-700 transition-colors">
              <img src={userProfilePic} alt="Perfil" className="w-8 h-8 rounded-full border-2 border-white" />
              <span className="font-medium">{userName.split(" ")[0]}</span>
              <IconChevronDown size={16} className="transition-transform duration-200" style={{ transform: profileMenuOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
            </button>
            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-md shadow-lg py-2 z-30">
                <div className="flex items-center p-3 border-b border-gray-200 dark:border-gray-600">
                  <img src={userProfilePic} alt="Perfil" className="w-12 h-12 rounded-full mr-3" />
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm">{userName}</span>
                    <Link to="/profile" className="text-xs text-red-600 dark:text-red-500 hover:underline">Ver Perfil</Link>
                  </div>
                </div>
                <Link to="/settings" className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <IconSettings size={18} />
                  <span>Configuraciones</span>
                </Link>
                <button onClick={handleLogout} className="w-full text-left flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <IconLogout size={18} />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
      {/* Menú lateral (móvil) */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 z-50 md:hidden flex flex-col ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-4 flex flex-col space-y-4 text-gray-800 dark:text-gray-100 flex-grow">
          <h2 className="text-lg font-bold">Menú de Navegación</h2>
          <hr className="border-gray-300 dark:border-gray-700" />
          {menuItems.map((item, index) => (
            <Link key={index} to={item.href} onClick={() => setMenuOpen(false)} className="flex items-center space-x-2 text-gray-800 dark:text-gray-100 hover:text-red-600 dark:hover:text-red-500 transition-colors">
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
          {/* Selector de temas en menú móvil */}
          <div className="flex flex-col space-y-2">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">Tema de la aplicación</h3>
            <div className="relative">
              <button onClick={() => setThemeMenuOpen(!themeMenuOpen)} className="w-full flex justify-between items-center text-left text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3">
                <div className="flex items-center space-x-2">
                  <IconBrush size={16} />
                  <span>{theme === "light" && "Claro"}{theme === "dark" && "Oscuro"}{theme === "system" && "Sistema"}</span>
                </div>
                <span>▼</span>
              </button>
              {themeMenuOpen && (
                <div className="absolute left-0 mt-1 w-full bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-30">
                  <button onClick={() => handleThemeChange("light")} className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center space-x-2">
                    <IconSun size={14} />
                    <span>Claro</span>
                  </button>
                  <button onClick={() => handleThemeChange("dark")} className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center space-x-2">
                    <IconMoon size={14} />
                    <span>Oscuro</span>
                  </button>
                  <button onClick={() => handleThemeChange("system")} className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center space-x-2">
                    <IconSettings size={14} />
                    <span>Sistema</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Sección de usuario (login o perfil) en la parte inferior */}
        <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700">
          {!isLoggedIn ? (
            <button onClick={onLoginClick} className="w-full text-left flex items-center space-x-2 p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              <IconKey size={24} />
              <span>Iniciar Sesión</span>
            </button>
          ) : (
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-3 p-2">
                <img src={userProfilePic} alt="Perfil" className="w-10 h-10 rounded-full" />
                <span className="font-semibold text-gray-800 dark:text-gray-100">{userName}</span>
              </div>
              <Link to="/profile" onClick={() => setMenuOpen(false)} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100">
                <IconUserCircle size={18} />
                <span>Ver Perfil</span>
              </Link>
              <Link to="/settings" onClick={() => setMenuOpen(false)} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100">
                <IconSettings size={18} />
                <span>Configuraciones</span>
              </Link>
              <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="w-full text-left flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100">
                <IconLogout size={18} />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Overlay (oscurece el fondo) */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black opacity-50 z-40 md:hidden" onClick={() => setMenuOpen(false)}></div>
      )}
    </header>
  );
}

export default Header;