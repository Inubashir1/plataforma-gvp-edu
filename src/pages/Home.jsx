// src/pages/Home.jsx
import React, { useEffect, useRef, useState } from 'react';
import {
  IconArrowRight,
  IconUserPlus,
  IconPencil,
  IconBroadcast,
  IconBook,
  IconFolder,
  IconLock,
} from '@tabler/icons-react';
import { useTheme } from '../contexts/useTheme';

const features = [
  {
    id: 1,
    title: "Notas y Seguimiento Académico",
    description: "Revisa tus calificaciones en tiempo real, interactúa con tus profesores y mantén un seguimiento detallado de tareas, exámenes y asistencias. Nunca más te perderás una entrega o un evento importante.",
    icon: <IconPencil size={48} className="text-red-600 dark:text-red-500" />
  },
  {
    id: 2,
    title: "Comunicación Directa",
    description: "Recibe comunicados oficiales de la institución, anuncios sobre eventos, horarios y recordatorios de tareas directamente en tu portal. Estarás siempre conectado con la comunidad educativa.",
    icon: <IconBroadcast size={48} className="text-red-600 dark:text-red-500" />
  },
  {
    id: 3,
    title: "Recursos Académicos",
    description: "Accede a una biblioteca de recursos, material de estudio y guías interactivas. Todo lo que necesitas para tu aprendizaje está organizado y disponible en cualquier momento y lugar.",
    icon: <IconBook size={48} className="text-red-600 dark:text-red-500" />
  },
  {
    id: 4,
    title: "Clases y Grupos por Bimestres",
    description: "Tus clases están organizadas de forma intuitiva por bimestres. Cada curso tiene carpetas, materiales, tareas y exámenes separados para una mejor organización y un acceso rápido a lo que necesitas.",
    icon: <IconFolder size={48} className="text-red-600 dark:text-red-500" />
  },
  {
    id: 5,
    title: "Inicio y Cierre de Sesión Automatizado",
    description: "Inicia sesión de forma segura con tu correo institucional. Además, para tu seguridad, la sesión se cerrará automáticamente después de 15 minutos de inactividad, con un mensaje de aviso 5 minutos antes.",
    icon: <IconLock size={48} className="text-red-600 dark:text-red-500" />
  }
];

function FeatureBlock({ title, description, icon }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setIsVisible(entry.isIntersecting));
    }, { threshold: 0.5 }); 

    if (domRef.current) {
        observer.observe(domRef.current);
    }
    
    return () => {
        if (domRef.current) {
            observer.unobserve(domRef.current);
        }
    };
  }, []);

  return (
    <div
      className={`transform transition-all duration-700 ease-in-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}
      ref={domRef}
    >
      <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg transition-colors duration-300 h-full">
        <div className="p-4 rounded-full bg-red-100 dark:bg-gray-700 mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </div>
  );
}

export default function Home({ onLoginClick }) {
  const { theme } = useTheme();

  return (
    <main className="min-h-screen p-4 md:p-8 bg-gray-100 dark:bg-gray-700 transition-colors duration-300 scroll-smooth">
      <div className="max-w-7xl mx-auto">
        {/* Sección de Bienvenida */}
        <section className="text-center py-16 md:py-24 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-extrabold text-red-600 dark:text-red-500 mb-4">
            Bienvenido a la Plataforma Educativa
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Accede a un mundo de conocimiento y herramientas diseñadas para tu crecimiento académico.
          </p>
          <a
            href="#features"
            className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-200 transform hover:scale-105 shadow-md"
          >
            <span>Explorar más</span>
            <IconArrowRight size={20} />
          </a>
        </section>

        {/* Sección de Bloques de Características expandida */}
        <section id="features" className="py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">
              ¿Qué puedes hacer en nuestra plataforma?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
              Te presentamos las herramientas que potenciarán tu experiencia educativa.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {features.map(feature => (
              <div key={feature.id} className="w-full sm:w-1/2 lg:w-1/3">
                <FeatureBlock {...feature} />
              </div>
            ))}
          </div>
        </section>

        {/* Sección de Llamada a la Acción para Iniciar Sesión */}
        <section className="text-center py-16 md:py-24">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            ¡Todo lo que necesitas en un solo lugar!
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto">
            Únete a nuestra comunidad educativa e inicia sesión para empezar a explorar.
          </p>
          <button
            onClick={onLoginClick}
            className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-200 transform hover:scale-105 shadow-md"
          >
            <IconUserPlus size={20} />
            <span>Iniciar sesión</span>
          </button>
        </section>
      </div>
    </main>
  );
}