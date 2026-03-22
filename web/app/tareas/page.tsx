// web/app/Tareas/page.tsx
import { Icon } from "@iconify-icon/react";
import { CheckSquare } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col md:ml-62.5  h-full bg-gray-50 p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Tareas de Hoy</h1>
      <div className="space-y-3">
        {[
          { title: "Instalar Python en local", done: true },
          { title: "Completar lección de variables", done: false },
          { title: "Buscar el mejor Dojang", done: false },
          { title: "Estudiar gramática avanzada", done: true },
        ].map((task, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-200 shadow-sm"
          >
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${task.done ? "bg-blue-600 border-blue-600" : "border-gray-300"}`}
            >
              {task.done && <CheckSquare size={14} className="text-white" />}
            </div>
            <span
              className={`text-sm ${task.done ? "text-gray-400 line-through" : "text-gray-700 font-medium"}`}
            >
              {task.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
