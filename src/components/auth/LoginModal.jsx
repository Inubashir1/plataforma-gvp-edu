import React from 'react';
import { motion as Motion } from "framer-motion";

export default function LoginModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50"
      onClick={onClose}
    >
      <Motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2 }}
        className="relative bg-white p-8 rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()} // Evita que el modal se cierre al hacer clic dentro
      >
        {children}
      </Motion.div>
    </div>
  );
}