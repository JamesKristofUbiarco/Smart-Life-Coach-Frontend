// web/app/planes/page.tsx
import { Plus, WifiOff } from "lucide-react";

export interface PlanItem {
  id: string;
  user_id: string;
  parent_id: string | null;
  title: string;
  description: string;
  status: "pending" | "completed";
  due_date: string;
  created_at: string;
  updated_at: string;
}

// calculo de progreso
export interface PlanItemConProgreso extends PlanItem {
  progreso: number;
}

// Función para obtener los planes desde FastAPI
async function getPlanesConProgreso(): Promise<PlanItemConProgreso[] | null> {
  const fastApiUrl = process.env.FASTAPI_BASE_URL || "http://localhost:8000";
  try {
    // Suponiendo que se le pasa el user_id de alguna cookie o sesion

    const res = await fetch(`${fastApiUrl}/api/planes?user_id=TU_USER_ID`, {
      cache: "no-store", // 'no-store' fuerza a que siempre traiga datos frescos de la Db
    });

    if (!res.ok) return [];
    const allItems = (await res.json()) as PlanItem[];
    const planes = allItems.filter((item) => item.parent_id === null);
    const tareas = allItems.filter((item) => item.parent_id !== null);
    // return allItems.filter(item => item.parent_id === null);
    // return res.json() as Promise<PlanItem[]>;

    const planesCalculados = planes.map((plan) => {
      const tareasDelPlan = tareas.filter(
        (tarea) => tarea.parent_id === plan.id,
      );
      const totalTareas = tareasDelPlan.length;

      let porcentaje = 0;

      if (totalTareas > 0) {
        const tareasCompletadas = tareasDelPlan.filter(
          (t) => t.status === "completed",
        ).length;
        porcentaje = Math.round((tareasCompletadas / totalTareas) * 100);
      } else {
        porcentaje = plan.status === "completed" ? 100 : 0;
      }

      return { ...plan, progreso: porcentaje };
    });

    return planesCalculados;
  } catch (error) {
    console.error("Error conectando con el backend:", error);
    return null;
  }
}

export default async function PlanesPage() {
  // Obtenemos los datos reales antes de renderizar la página
  const planes = await getPlanesConProgreso();
  return (
    <div className="flex flex-col md:ml-62.5  h-full bg-gray-50 p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Tus Planes</h1>
        <button className="bg-blue-100 text-blue-600 p-2 rounded-full">
          <Plus size={20} />
        </button>
      </div>

      <div className="space-y-4">
        {/* Renderizamos dinámicamente desde la base de datos */}
        {planes === null ? (
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
        ) : planes.length === 0 ? (
          <p className="text-gray-500">
            Aún no tienes planes. ¡Pídele uno al Coach!
          </p>
        ) : (
          planes.map((plan) => (
            <div
              key={plan.id}
              className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-3 hover:border-blue-300 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-800">{plan.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {plan.progreso}% completado
                  </p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    plan.status === "completed" || plan.progreso === 100
                      ? "bg-blue-100 text-blue-600"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {plan.status === "completed" || plan.progreso === 100
                    ? "Finalizado"
                    : "En curso"}
                </span>
              </div>

              {/* Barra de progreso dinámica */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-in-out"
                  style={{
                    width: `${plan.progreso}%`,
                  }}
                ></div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
