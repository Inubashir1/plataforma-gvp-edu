// src/App.jsx

import React, { useState, Suspense, lazy } from 'react';
import { Routes, Route } from "react-router-dom";

// Importaciones de componentes comunes
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import LoginModal from "./components/ui/LoginModal";
import LoginCard from "./components/ui/LoginCard";

// Importamos la pantalla de carga
import LoadingScreen from "./components/common/LoadingScreen";
import { ThemeProvider } from "./contexts/ThemeProvider";

// Lazy loading para el componente Home
const Home = lazy(() => import("./pages/Home"));

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogin = () => {
    // Aquí iría la lógica para iniciar sesión
    setIsModalOpen(false);
  };

  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen">
        <Header onLoginClick={() => setIsModalOpen(true)} />
        <main className="flex-grow">
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<Home onLoginClick={() => setIsModalOpen(true)} />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <LoginCard onLogin={handleLogin} />
        </LoginModal>
      </div>
    </ThemeProvider>
  );
}

export default App;