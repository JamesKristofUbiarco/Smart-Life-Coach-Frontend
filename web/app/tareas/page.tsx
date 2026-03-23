// web/app/tareas/page.tsx
import { WifiOff } from "lucide-react";
import { PlanItem } from "../planes/page"; // se importa el contrato ya hecho en planes/page
import BotonEstadoTarea from "@/components/ui/button-estado-tarea";

async function getTareas(): Promise<PlanItem[] | null> {
  const fastApiUrl = process.env.FASTAPI_BASE_URL || "http://localhost:8000";

  try {
    const res = await fetch(`${fastApiUrl}/api/planes?user_id=TU_USER_ID`, {
      cache: "no-store",
    });

    if (!res.ok) return [];

    const allItems = (await res.json()) as PlanItem[];

    // Se Filtra para quedarnos estrictamente con las Tareas
    return allItems.filter((item) => item.parent_id !== null);
  } catch (error) {
    console.error("Error conectando con el backend:", error);
    return null;
  }
}

export default async function TareasPage() {
  // Obtenemos los datos reales antes de renderizar la página
  const tareas = await getTareas();

  return (
    <div className="flex flex-col md:ml-62.5  h-full bg-gray-50 p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Tareas Pendientes</h1>
        <p className="text-gray-500 text-sm">
          El desglose de tus planes de acción
        </p>
      </div>
      {/*<h1 className="text-2xl font-bold text-gray-800 mb-6">Tareas de Hoy</h1>*/}
      <div className="space-y-3">
        {tareas === null ? (
          <div className="bg-red-50 border border-red-200 p-6 rounded-xl flex flex-col items-center justify-center text-center gap-3">
            <WifiOff className="text-red-400" size={40} />
            <h3 className="font-bold text-red-800">
              Sin conexión con el Servidor
            </h3>
            <p className="text-red-600 text-sm">
              No pudimos conectar con el servidor. Verifica tu conexión a
              internet o intenta de nuevo más tarde.
            </p>
          </div>
        ) : tareas.length === 0 ? (
          <p className="text-gray-500">
            {" "}
            No hay tareas asignadas en este momento.
          </p>
        ) : (
          tareas.map((tarea) => (
            <div
              key={tarea.id}
              className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 hover:border-blue-300 transition-colors"
            >
              <BotonEstadoTarea id={tarea.id} status={tarea.status}/>
              {/* <button className="text-gray-400 hover:text-blue-600 transition">
                {tarea.status === "completed" ? (
                  <CheckCircle2 className="text-green-500" size={24} />
                ) : (
                  <Circle size={24} />
                )}
              </button> */}
              <div className="flex-1">
                <h3
                  className={`font-bold ${tarea.status === "completed" ? "text-gray-400 line-through" : "text-gray-800"}`}
                >
                  {tarea.title}
                </h3>
                {tarea.description && (
                  <p className="text-sm text-gray-500 mt-1">
                    {tarea.description}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
