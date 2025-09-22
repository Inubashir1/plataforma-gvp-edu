// src/components/ui/LoginCard.jsx
import React from 'react';
import { motion as Motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IconBrandGoogle } from '@tabler/icons-react';

export default function LoginCard() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 rounded-2xl p-8 transition-colors duration-300">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-red-600">Inicio de Sesión</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Bienvenido, por favor inicia sesión para continuar.
          </p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Correo institucional
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white"
              placeholder="dni@gastonvidalporturas.edu.pe"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white"
              placeholder="Contraseña"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-lg transition-colors duration-200 shadow-sm"
          >
            Ingresar
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">
              O
            </span>
          </div>
        </div>

        {/* Botón de Google */}
        <button className="w-full flex items-center justify-center space-x-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 shadow-sm">
          <IconBrandGoogle size={20} />
          <span>Iniciar sesión con Google</span>
        </button>

        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-6">
          ¿Olvidaste tu contraseña?{" "}
          <Link to="#" className="text-red-600 hover:underline">
            Recuperar
          </Link>
        </p>
      </div>
    </div>
  );
}