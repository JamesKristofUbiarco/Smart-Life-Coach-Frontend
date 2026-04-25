// web/components/ui/button-estado-tarea.tsx
'use client'; // es client porque usaremos onClick y hooks de React

import { Circle, Check  } from "lucide-react";
import { useTransition } from "react";
import { toggleStatusTarea } from "@/app/actions/tareas";

export default function BotonEstadoTarea({ id, status }: { id: string, status: string }) {
  // useTransition nos permite saber si la petición al servidor está en curso
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    // Ejecutamos el Server Action dentro de una transición
    startTransition(() => {
      toggleStatusTarea(id, status);
    });
  };

  return (
    <button 
      onClick={handleClick}
      disabled={isPending}
      className={`text-gray-400 hover:text-blue-600 transition-colors ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {status === 'completed' ? (
        <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center bg-blue-600 border-blue-600`}
        ><Check className="text-white" size={16} /></div>
        
      ) : (
        <Circle size={24} />
      )}
    </button>
  );
}
//  : "border-gray-300"}