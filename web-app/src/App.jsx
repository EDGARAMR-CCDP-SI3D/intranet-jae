import React from 'react';

export default function App() {
  // Generate random confetti pieces
  const confettiPieces = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${3 + Math.random() * 4}s`,
    color: ['#0f172a', '#1e293b', '#334155', '#475569', '#cbd5e1'][Math.floor(Math.random() * 5)],
    size: `${6 + Math.random() * 10}px`
  }));

  return (
    <div className="relative min-h-screen bg-[#081225] flex items-center justify-center p-4 overflow-hidden">
      {/* Background Image of Funeral Home */}
      <div 
        className="absolute inset-0 z-0 opacity-40 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{ backgroundImage: "url('/assets/recursos/Imagen13.jpg')" }}
      />
      
      {/* Dark overlay gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#081225]/80 via-[#081225]/60 to-[#081225]/90" />

      {/* Confetti Animation Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {confettiPieces.map(piece => (
          <div
            key={piece.id}
            className="animate-confetti-fall absolute rounded-full"
            style={{
              left: piece.left,
              animationDelay: piece.animationDelay,
              animationDuration: piece.animationDuration,
              backgroundColor: piece.color,
              width: piece.size,
              height: piece.size,
            }}
          />
        ))}
      </div>

      {/* Main Content Glass Card */}
      <div className="relative z-20 w-full max-w-lg mx-auto px-4 sm:px-6 animate-scale-up">
        <div className="glassmorphism-dark rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-12 text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-700/50 backdrop-blur-xl relative overflow-hidden group flex flex-col items-center justify-center">
          
          {/* Subtle animated background glow */}
          <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:animate-slide-in-right opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8 tracking-tight animate-toast-in drop-shadow-md" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            Servicio Suspendido
          </h1>
          
          <div className="space-y-4 sm:space-y-6 text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed font-light animate-toast-in max-w-sm mx-auto" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
            <p className="drop-shadow-sm">
              Agradecemos profundamente su interés y el tiempo compartido.
            </p>
            <p className="text-slate-400/90 text-sm sm:text-base md:text-lg drop-shadow-sm">
              Esperamos tener la oportunidad de volver a colaborar con ustedes en un futuro brillante.
            </p>
          </div>
          
          <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-slate-700/50 w-full animate-toast-in" style={{ animationDelay: '0.7s', animationFillMode: 'both' }}>
            <p className="text-slate-400 text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase font-semibold">
              Atte: Edgar
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
