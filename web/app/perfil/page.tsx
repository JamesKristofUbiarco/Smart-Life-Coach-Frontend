// web/app/Perfil/page.tsx
import { Icon } from "@iconify-icon/react";
import { User, ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col md:ml-62.5  h-full bg-gray-50 p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Mi Perfil</h1>
      <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col items-center justify-center mb-4">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <User size={40} className="text-blue-600" />
        </div>
        <h2 className="font-bold text-xl">Usuario</h2>
        <p className="text-gray-500 text-sm">Nivel: Aprendiz</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <button className="w-full p-4 flex justify-between items-center border-b border-gray-100 hover:bg-gray-50">
          <span className="text-sm font-medium text-gray-700">
            Ajustes de la IA
          </span>
          <ChevronRight size={18} className="text-gray-400" />
        </button>
        <button className="w-full p-4 flex justify-between items-center border-b border-gray-100 hover:bg-gray-50">
          <span className="text-sm font-medium text-gray-700">
            Ajustes Generales
          </span>
          <ChevronRight size={18} className="text-gray-400" />
        </button>
        <button className="w-full p-4 flex justify-between items-center hover:bg-gray-50">
          <span className="text-sm font-medium text-red-600">
            Cerrar Sesión
          </span>
          <ChevronRight size={18} className="text-gray-400" />
        </button>
      </div>
    </div>
  );
}
