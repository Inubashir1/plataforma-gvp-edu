// src/App.jsx

import React, { useState, Suspense, lazy } from 'react';
import { Routes, Route } from "react-router-dom";

// Componentes comunes
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import LoginModal from "./components/ui/LoginModal";
import LoginCard from "./components/ui/LoginCard";

// Pantalla de carga
import LoadingScreen from "./components/common/LoadingScreen";
import { ThemeProvider } from "./contexts/ThemeProvider";

// Lazy loading para todas las páginas
const Home = lazy(() => import("./pages/Home"));
const GradesAndAttendance = lazy(() => import("./pages/GradesAndAttendance"));
const Announcements = lazy(() => import("./pages/Announcements"));
const HelpAndGuide = lazy(() => import("./pages/HelpAndGuide"));
const Contact = lazy(() => import("./pages/Contact"));

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogin = () => {
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
              <Route path="/grades" element={<GradesAndAttendance />} />
              <Route path="/announcements" element={<Announcements />} />
              <Route path="/help" element={<HelpAndGuide />} />
              <Route path="/contact" element={<Contact />} />
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