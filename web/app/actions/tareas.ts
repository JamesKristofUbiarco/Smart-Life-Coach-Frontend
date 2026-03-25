// web/app/actions/tareas.ts
'use server';

import { revalidatePath } from 'next/cache';

export async function toggleStatusTarea(id: string, currentStatus: string) {
  // 1. Invertimos el estado actual
  const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
  const fastApiUrl = process.env.FASTAPI_BASE_URL || "http://localhost:8000";

  try {
    // Con await fetch enviamos la petición a FastAPI
    await fetch(`${fastApiUrl}/api/planes/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    
    // Le decimos a Next.js que limpie el caché y recargue las páginas
    // Esto hará que getTareas() se vuelva a ejecutar automáticamente y el UI se actualice.
    revalidatePath('/tareas');
    revalidatePath('/planes');
    
  } catch (error) {
    console.error("Error actualizando tarea:", error);
  }
}