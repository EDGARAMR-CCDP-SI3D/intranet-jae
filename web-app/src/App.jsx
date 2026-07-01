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
      <div className="relative z-20 animate-scale-up">
        <div className="glassmorphism-dark rounded-3xl p-10 max-w-lg w-full text-center shadow-2xl border border-slate-700/50 backdrop-blur-xl relative overflow-hidden group">
          
          {/* Subtle animated background glow */}
          <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:animate-slide-in-right opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          
          {/* Logo Placeholder */}
          <div className="mb-8 flex justify-center animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
             <img src="/assets/logo_jae_blanco.png" alt="Grupo JAE" className="h-16 w-auto opacity-80" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight animate-toast-in" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
            Servicio Suspendido
          </h1>
          
          <div className="space-y-6 text-slate-300 text-lg leading-relaxed font-light animate-toast-in" style={{ animationDelay: '0.7s', animationFillMode: 'both' }}>
            <p>
              Agradecemos profundamente su interés y el tiempo compartido.
            </p>
            <p className="text-slate-400/90 text-base">
              Esperamos tener la oportunidad de volver a colaborar con ustedes en un futuro brillante.
            </p>
          </div>
          
          <div className="mt-10 pt-6 border-t border-slate-700/50 animate-toast-in" style={{ animationDelay: '0.9s', animationFillMode: 'both' }}>
            <p className="text-slate-400 text-sm tracking-widest uppercase font-semibold">
              Atte: Edgar
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
