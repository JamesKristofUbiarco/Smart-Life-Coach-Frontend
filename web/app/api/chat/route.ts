// web/app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        
        // La URL del backend en FastAPI, recomendación a mi yo futuro (Usar variables de entorno en producción)
        const fastApiUrl = process.env.FASTAPI_BASE_URL || "http://localhost:8000";

        // Redirigimos la petición de Next.js hacia FastAPI
        const response = await fetch(`${fastApiUrl}/Chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${process.env.API_SECRET}` // Opcional: para seguridad entre servidores
            },
            // Enviamos el historial de mensajes que genera useChat automáticamente
            body: JSON.stringify({ messages: body.messages }), 
        });

        if (!response.ok) {
            throw new Error(`Error en el backend FastAPI: ${response.status}`);
        }

        // Devolvemos el stream directamente al cliente
        // Importante: el backend en FastAPI debe enviar la respuesta formateada para Vercel AI SDK
        return new Response(response.body, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache, no-transform",
                "X-Vercel-AI-Data-Stream": "v1", // Header clave para Vercel AI SDK 5
            },
        });

    } catch (error) {
        console.error("Error en el Proxy del Chat:", error);
        return NextResponse.json(
            { error: "Error de comunicación con el servidor de IA." },
            { status: 500 }
        );
    }
}