import React, { useState } from 'react';

// Fases del servicio de funeraria
const STAGES = [
  { id: 'COTIZACION', label: 'Cotización y Trámites' },
  { id: 'PREPARACION', label: 'Tratamiento Estético' },
  { id: 'VELACION', label: 'Velación / Homenaje' },
  { id: 'EVENTOS_RELIGIOSOS', label: 'Eventos Religiosos' },
  { id: 'DESTINO_FINAL', label: 'Destino Final' },
];

export default function ClientTracking() {
  const [folio, setFolio] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulamos la llamada a la API
    if (folio === 'SDNI-0001') {
      setStatus('VELACION');
    } else {
      setStatus('CONCLUIDO');
    }
  };

  const getStageIndex = (currentStatus: string | null) => {
    if (currentStatus === 'CONCLUIDO') return STAGES.length;
    return STAGES.findIndex((stage) => stage.id === currentStatus);
  };

  const currentIndex = getStageIndex(status);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center p-4">
      {/* Container principal con Glassmorphism */}
      <div className="w-full max-w-2xl bg-white/40 backdrop-blur-md border border-white/50 shadow-xl rounded-3xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light text-slate-800 tracking-wide mb-2">Bienvenido a <span className="font-semibold">Grupo JAE</span></h1>
          <p className="text-slate-500">Ingrese su folio para consultar el estado del servicio.</p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-4 mb-12">
          <input
            type="text"
            placeholder="Ej. SDNI-000X"
            value={folio}
            onChange={(e) => setFolio(e.target.value.toUpperCase())}
            className="flex-1 bg-white/60 border border-white/50 rounded-xl px-4 py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all shadow-inner"
          />
          <button
            type="submit"
            className="bg-blue-600/90 hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-blue-500/30 transition-all backdrop-blur-sm"
          >
            Rastrear
          </button>
        </form>

        {/* Tracking Progress Bar */}
        {status && (
          <div className="relative">
            {/* Línea de fondo */}
            <div className="absolute top-5 left-0 w-full h-1 bg-slate-300/50 rounded-full"></div>
            
            <div className="flex justify-between relative">
              {STAGES.map((stage, index) => {
                const isCompleted = index <= currentIndex;
                const isCurrent = index === currentIndex;

                return (
                  <div key={stage.id} className="flex flex-col items-center w-1/5 relative">
                    {/* Indicador circular */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 z-10 transition-colors duration-500
                      ${isCompleted ? 'bg-blue-500 border-white' : 'bg-slate-200 border-white'}
                      ${isCurrent ? 'ring-4 ring-blue-300/50 scale-110' : ''}
                    `}>
                      {isCompleted && (
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    
                    {/* Etiqueta */}
                    <p className={`text-xs mt-3 text-center px-1 font-medium
                      ${isCompleted ? 'text-slate-800' : 'text-slate-400'}
                    `}>
                      {stage.label}
                    </p>
                  </div>
                );
              })}
            </div>
            
            {/* Línea de progreso dinámico */}
            <div 
              className="absolute top-5 left-0 h-1 bg-blue-500 rounded-full transition-all duration-1000 ease-in-out"
              style={{ width: `${(Math.min(currentIndex, STAGES.length - 1) / (STAGES.length - 1)) * 100}%` }}
            ></div>

            {status === 'CONCLUIDO' && (
              <div className="mt-12 text-center p-4 bg-green-500/10 border border-green-500/20 rounded-2xl">
                <p className="text-green-700 font-semibold text-lg flex items-center justify-center gap-2">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Servicio Concluido
                </p>
                <p className="text-green-600/80 text-sm mt-1">Agradecemos su confianza en Grupo JAE.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
