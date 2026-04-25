// web/app/planes/error.tsx
'use client';

import { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error interceptado por el Boundary:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center md:ml-62.5">
      <AlertCircle className="text-red-500 mb-4" size={48} />
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Algo salió mal.</h2>
      <p className="text-gray-600 mb-6">No pudimos cargar tus planes. El servidor podría estar fuera de línea.</p>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        onClick={() => reset()} // Intenta volver a hacer el fetch
      >
        Intentar de nuevo
      </button>
    </div>
  );
}