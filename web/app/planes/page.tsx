// web/app/Planes/page.tsx
import { Icon } from "@iconify-icon/react";
import { Plus } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col md:ml-62.5  h-full bg-gray-50 p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Tus Planes</h1>
        <button className="bg-blue-100 text-blue-600 p-2 rounded-full">
          <Plus size={20} />
        </button>
      </div>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-3">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-gray-800">Aprender Python</h3>
            </div>
            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
              En curso
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: "30%" }}
            ></div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-3">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-gray-800">Entrenar Tae Kwon Do</h3>
            </div>
            <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full font-medium">
              Por iniciar
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: "0%" }}
            ></div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-3">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-gray-800">Llegar a B2 en Inglés</h3>
            </div>
            <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full font-medium">
              Finalizado
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: "100%" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
