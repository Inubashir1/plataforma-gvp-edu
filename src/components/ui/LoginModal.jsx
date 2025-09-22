// src/components/ui/LoginModal.jsx
import React from 'react';
import { motion as Motion } from "framer-motion";

export default function LoginModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <Motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2 }}
        // Agregamos bg-white y dark:bg-gray-800 para que el fondo del modal se adapte al tema
        className="relative bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl transition-colors duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </Motion.div>
    </div>
  );
}