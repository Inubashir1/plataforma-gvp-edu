// src/components/common/LoadingScreen.jsx
import React from "react";

function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300 z-50">
      <div className="flex space-x-2">
        <div className="loading-bar bg-red-600 dark:bg-red-500 rounded-full w-4 h-12"></div>
        <div className="loading-bar animation-delay-200 bg-red-600 dark:bg-red-500 rounded-full w-4 h-12"></div>
        <div className="loading-bar animation-delay-400 bg-red-600 dark:bg-red-500 rounded-full w-4 h-12"></div>
        <div className="loading-bar animation-delay-600 bg-red-600 dark:bg-red-500 rounded-full w-4 h-12"></div>
      </div>
      <p className="mt-8 text-xl font-semibold text-gray-800 dark:text-gray-100">Cargando...</p>
    </div>
  );
}

export default LoadingScreen;