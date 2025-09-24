// src/pages/GradesAndAttendance.jsx
import React, { useState, useEffect } from "react";
import { IconSearch, IconCaretDown, IconChevronDown } from "@tabler/icons-react";
import AttendanceModule from "../components/grades/AttendanceModule";

// Datos de ejemplo para la tabla (reemplazar con datos reales del backend)
const students = [
  {
    nroMesa: 1,
    dni: "12345678",
    name: "Juan Pérez García",
    level: "Primaria",
    grade: "5to",
    section: "A",
    tutor: "Prof. Ana López",
    turn: "Mañana",
    promedio: { b1: 18, b2: 15, b3: 19, b4: 16 },
    exonerated: ["Educación Física", "Religión"], // Cursos exonerados
    details: {
      courses: [
        {
          name: "Matemáticas",
          tareas: [{ nota: 18 }, { nota: 12 }, { nota: 8 }, { nota: null }, { nota: 19 }, { nota: 11 }, { nota: 15 }, { nota: 20 }],
        },
        {
          name: "Lenguaje",
          tareas: [{ nota: 16 }, { nota: 19 }, { nota: 14 }, { nota: null }, { nota: 17 }, { nota: 13 }, { nota: 9 }, { nota: 18 }],
        }
      ],
      asistencias: [
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
      ]
    },
  },
];

const colors = {
  // Calificaciones
  green: "bg-green-500",
  yellow: "bg-yellow-500",
  red: "bg-red-500",
  gray: "bg-gray-400 dark:bg-gray-600",
  purple: "bg-purple-500"
};

function getNotaColor(nota) {
  if (nota === null) return colors.gray;
  if (nota >= 14) return colors.green;
  if (nota >= 10) return colors.yellow;
  return colors.red;
}

function GradesAndAttendance() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("Nombres y Apellidos");
  const [isClosing, setIsClosing] = useState(false);
  const [displayStudentData, setDisplayStudentData] = useState(null);

  useEffect(() => {
    if (selectedStudent) {
      const student = students.find(s => s.dni === selectedStudent);
      setDisplayStudentData(student);
      setIsClosing(false);
    } else {
      if (displayStudentData) {
        setIsClosing(true);
        const timer = setTimeout(() => {
          setDisplayStudentData(null);
          setIsClosing(false);
        }, 500); // Duración de la animación en milisegundos
        return () => clearTimeout(timer);
      }
    }
  }, [selectedStudent]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const bimestresRomanos = { b1: "I", b2: "II", b3: "III", b4: "IV" };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-700 p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
          Calificaciones y Asistencias
        </h1>

        {/* Barra de Búsqueda */}
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 mb-8 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <IconSearch size={20} />
            </span>
            <input
              type="text"
              placeholder={`Buscar por ${searchType.toLowerCase()}...`}
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
            />
          </div>
          <div className="relative w-full md:w-52">
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="block w-full px-4 py-2 pr-8 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none transition-colors"
            >
              <option>Nombres y Apellidos</option>
              <option>DNI</option>
              <option>Código de Estudiante</option>
              <option>Pasaporte</option>
            </select>
            <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 pointer-events-none">
              <IconCaretDown size={18} />
            </span>
          </div>
        </div>

        {/* Tabla de Resumen */}
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-8">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-r dark:border-gray-700">N° Mesa</th>
                <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-r dark:border-gray-700">DNI</th>
                <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-r dark:border-gray-700">Apellidos y Nombres</th>
                <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-r dark:border-gray-700">Nivel</th>
                <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-r dark:border-gray-700">Grado</th>
                <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-r dark:border-gray-700">Sección</th>
                <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-r dark:border-gray-700">Tutor a Cargo</th>
                <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-r dark:border-gray-700">Turno</th>
                <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-r dark:border-gray-700">Promedio Bimestral</th>
                <th className="px-3 py-3"></th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {students.map((student) => (
                <tr
                  key={student.dni}
                  className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer"
                  onClick={() => setSelectedStudent(student.dni === selectedStudent ? null : student.dni)}
                >
                  <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200 text-center border-r dark:border-gray-700">{student.nroMesa}</td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300 text-center border-r dark:border-gray-700">{student.dni}</td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300 text-center border-r dark:border-gray-700">{student.name}</td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300 text-center border-r dark:border-gray-700">{student.level}</td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300 text-center border-r dark:border-gray-700">{student.grade}</td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300 text-center border-r dark:border-gray-700">{student.section}</td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300 text-center border-r dark:border-gray-700">{student.tutor}</td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300 text-center border-r dark:border-gray-700">{student.turn}</td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm flex justify-center space-x-2 border-r dark:border-gray-700">
                    {Object.entries(student.promedio).map(([bimestre, nota]) => (
                      <div
                        key={bimestre}
                        className={`flex flex-col items-center justify-center p-2 rounded-lg font-bold text-white text-xs ${nota >= 14 ? 'bg-green-600' : nota >= 10 ? 'bg-yellow-600' : 'bg-red-600'}`}
                        title={`Bimestre ${bimestresRomanos[bimestre]}: ${nota}`}
                      >
                        <span className="text-[10px]">BIM {bimestresRomanos[bimestre]}</span>
                        <span>{nota}</span>
                      </div>
                    ))}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium text-center">
                    <button onClick={() => setSelectedStudent(student.dni === selectedStudent ? null : student.dni)} className="text-red-600 hover:text-red-900 dark:text-red-500 dark:hover:text-red-400 transition-colors">
                      <IconChevronDown size={20} className={`transform transition-transform ${selectedStudent === student.dni ? 'rotate-180' : ''}`} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Informe Detallado (Condicional con Transición) */}
        {displayStudentData && (
          <div className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`}>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Informe Completo de {displayStudentData.name}
            </h2>

            {/* Sección de Cursos Exonerados */}
            {displayStudentData.exonerated.length > 0 && (
              <div className="mb-8 p-4 rounded-xl border-2 border-purple-500 bg-purple-50 dark:bg-purple-900">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-200">
                    Cursos Exonerados ({displayStudentData.exonerated.length})
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {displayStudentData.exonerated.map((course) => (
                    <span key={course} className="bg-purple-200 dark:bg-purple-700 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm font-medium">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Informe Detallado de Calificaciones */}
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-3">Informe Detallado de Calificaciones</h3>
            <div className="mb-6 flex flex-wrap items-center gap-4 text-sm">
              <span className="font-semibold text-gray-500 dark:text-gray-400">Leyenda:</span>
              <div className="flex items-center space-x-1">
                <div className="w-4 h-4 rounded-sm bg-green-500"></div>
                <span className="text-gray-700 dark:text-gray-200">Aprobado (≥ 14)</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-4 h-4 rounded-sm bg-yellow-500"></div>
                <span className="text-gray-700 dark:text-gray-200">Regular (10-13)</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-4 h-4 rounded-sm bg-red-500"></div>
                <span className="text-gray-700 dark:text-gray-200">Desaprobado (&lt; 10)</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-4 h-4 rounded-sm bg-gray-400 dark:bg-gray-600"></div>
                <span className="text-gray-700 dark:text-gray-200">No Entregada</span>
              </div>
            </div>
            <div className="space-y-6 mb-8">
              {displayStudentData.details.courses.map(course => (
                <div key={course.name} className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-800 dark:text-gray-100">{course.name}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {course.tareas.map((tarea, index) => (
                      <div key={index} className={`w-12 h-12 flex flex-col items-center justify-center font-bold text-sm text-white rounded-lg p-1 ${getNotaColor(tarea.nota)}`}>
                        <span className="text-[10px] font-normal">T{index + 1}</span>
                        <span>{tarea.nota !== null ? tarea.nota : "X"}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <AttendanceModule studentName={displayStudentData.name} data={displayStudentData.details.asistencias} />
          </div>
        )}
      </div>
    </div>
  );
}

export default GradesAndAttendance;