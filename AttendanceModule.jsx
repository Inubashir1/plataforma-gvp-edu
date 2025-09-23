// src/components/grades/AttendanceModule.jsx
import React, { useState, useEffect } from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

const months = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
  "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

// Datos de ejemplo para las asistencias (reemplazar con datos reales)
const attendanceData = [
  {
    mes: "Octubre",
    semanas: [
      {
        semana: "Semana 1",
        dias: ["Lun", "Mar", "Mié", "Jue", "Vie"],
        asistencia: ["V", "A", "R", "M", "V"]
      },
      {
        semana: "Semana 2",
        dias: ["Lun", "Mar", "Mié", "Jue", "Vie"],
        asistencia: ["V", "V", "A", "R", "G"]
      }
    ]
  },
  {
    mes: "Noviembre",
    semanas: [
      {
        semana: "Semana 1",
        dias: ["Lun", "Mar", "Mié", "Jue", "Vie"],
        asistencia: ["V", "A", "V", "M", "V"]
      },
      {
        semana: "Semana 2",
        dias: ["Lun", "Mar", "Mié", "Jue", "Vie"],
        asistencia: ["V", "V", "A", "V", "V"]
      }
    ]
  }
];

const colors = {
  V: "bg-green-500", // Asistencia a tiempo
  A: "bg-yellow-500", // Tardanza
  R: "bg-red-500", // Falta
  M: "bg-purple-500", // Falta justificada
  G: "bg-gray-400 dark:bg-gray-600", // No hubo clases
};

function AttendanceModule({ studentName, data }) {
  const [selectedMonth, setSelectedMonth] = useState("Octubre");
  const [displayMonth, setDisplayMonth] = useState("Octubre");
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    if (selectedMonth !== displayMonth) {
      setIsChanging(true);
      const timer = setTimeout(() => {
        setDisplayMonth(selectedMonth);
        setIsChanging(false);
      }, 300); // Duración de la animación de salida
      return () => clearTimeout(timer);
    }
  }, [selectedMonth, displayMonth]);

  const filteredData = data.filter(a => a.mes === displayMonth);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
      {/* Asistencias a la Institución */}
      <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-3">Asistencias a la Institución</h3>
      <div className="mb-6 flex flex-wrap items-center gap-4 text-sm">
        <span className="font-semibold text-gray-500 dark:text-gray-400">Leyenda:</span>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 rounded-full bg-green-500"></div>
          <span className="text-gray-700 dark:text-gray-200">Asistencia</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
          <span className="text-gray-700 dark:text-gray-200">Tardanza</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 rounded-full bg-red-500"></div>
          <span className="text-gray-700 dark:text-gray-200">Falta</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 rounded-full bg-purple-500"></div>
          <span className="text-gray-700 dark:text-gray-200">Falta Justificada</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 rounded-full bg-gray-400 dark:bg-gray-600"></div>
          <span className="text-gray-700 dark:text-gray-200">No Hubo Clases</span>
        </div>
      </div>

      {/* Selector de Meses para Asistencias */}
      <div className="flex items-center justify-center mb-6">
        <button
          onClick={() => {
            const currentIndex = months.indexOf(selectedMonth);
            if (currentIndex > 0) {
              setSelectedMonth(months[currentIndex - 1]);
            }
          }}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
          disabled={months.indexOf(selectedMonth) === 0}
        >
          <IconChevronLeft size={20} className="text-gray-700 dark:text-gray-200" />
        </button>
        <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100 mx-4 w-40 text-center">{selectedMonth}</h4>
        <button
          onClick={() => {
            const currentIndex = months.indexOf(selectedMonth);
            if (currentIndex < months.length - 1) {
              setSelectedMonth(months[currentIndex + 1]);
            }
          }}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
          disabled={months.indexOf(selectedMonth) === months.length - 1}
        >
          <IconChevronRight size={20} className="text-gray-700 dark:text-gray-200" />
        </button>
      </div>

      <div className={`flex flex-col space-y-4 ${isChanging ? 'animate-fade-out' : 'animate-fade-in'}`}>
        {filteredData.length > 0 ? (
          filteredData[0].semanas.map((semanaData, semanaIndex) => (
            <div key={semanaIndex} className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">{semanaData.semana}</p>
              <div className="flex space-x-2 items-center">
                {semanaData.dias.map((dia, diaIndex) => (
                  <div key={diaIndex} className="flex flex-col items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">{dia}</span>
                    <div className={`w-10 h-10 rounded-full ${colors[semanaData.asistencia[diaIndex]]}`}></div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">No hay datos de asistencia para este mes.</p>
        )}
      </div>
    </div>
  );
}

export default AttendanceModule;