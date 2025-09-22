import { motion as Motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function LoginCard() {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-white shadow-lg border border-gray-200 rounded-xl p-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-red-600">
            Plataforma GVP
          </h2>
          <p className="text-sm text-gray-500">
            Bienvenido, inicia sesión
          </p>
        </div>
        <form>
          <div className="flex flex-col space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Correo institucional
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="ejemplo@institucion.edu"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="********"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-lg transition-colors duration-200"
            >
              Ingresar
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-gray-500 mt-4">
          ¿Olvidaste tu contraseña?{" "}
          <Link to="#" className="text-red-600 hover:underline">
            Recuperar
          </Link>
        </p>
      </div>
    </div>
  );
}