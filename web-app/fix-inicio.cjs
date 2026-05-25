const fs = require('fs');
const content = fs.readFileSync('src/App.jsx', 'utf8');

const startStr = `            {(clientSection === 'inicio' || clientSection === 'rastrear') && (`;
const endStr = `            {/* APLICAR CONTENEDORES CENTRADOS A LAS DEMÁS SECCIONES */}`;

const startIndex = content.indexOf(startStr);
const endIndex = content.indexOf(endStr);

if (startIndex === -1 || endIndex === -1) {
  console.log("Could not find start or end bounds.");
  process.exit(1);
}

const replacement = `            {(clientSection === 'inicio' || clientSection === 'rastrear') && (
              <section id="inicio" className="w-full flex flex-col items-center">
                
                {/* Carrusel Superior (Banda Horizontal 1) */}
                <HeroCarousel />

                {/* Tracking Service (Banda Horizontal 2) */}
                <div className="w-full bg-[#f8fafc] border-b border-slate-200/60 py-16 px-6">
                  <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
                    <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
                      <span className="text-[#081225] font-bold tracking-widest text-[10px] uppercase px-4 py-1.5 rounded-full bg-[#081225]/5 border border-[#081225]/20 font-serif">
                        Grupo JAE • Jardín de los Ángeles • Aeternum
                      </span>
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-slate-900 leading-tight">
                        Acompañándole en cada paso con <span className="italic text-[#081225] font-semibold">respeto y dignidad</span>
                      </h2>
                      <p className="text-slate-500 text-sm max-w-lg leading-relaxed font-light">
                        Para su tranquilidad, consulte en tiempo real el progreso de los trámites y el homenaje logístico de su ser querido introduciendo su folio de servicio.
                      </p>
                    </div>
                    
                    <div className="w-full lg:w-[450px] bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/60 relative overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#1E3A8A] to-transparent"></div>
                      <ClientTrackingWidget services={services} />
                    </div>
                  </div>
                </div>

                {/* Directorio Rápido y Resumen (Banda Horizontal 3) */}
                <div className="w-full bg-white py-16 px-6">
                  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Conmutador Principal */}
                    <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col h-full relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-[#1E3A8A]/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2.5 bg-blue-50 text-[#1E3A8A] rounded-xl">
                          <Phone className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-serif font-bold text-xl text-[#081225]">Conmutador</h3>
                          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Menú de Opciones</p>
                        </div>
                      </div>
                      
                      <div className="space-y-5 flex-1">
                        <div className="text-center bg-white border border-slate-200 rounded-2xl py-4 shadow-sm">
                          <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Teléfono de la Funeraria</span>
                          <span className="text-2xl font-bold font-mono text-[#1E3A8A] tracking-tight">(442) 242 3230</span>
                        </div>
                        
                        <div className="space-y-3">
                          <p className="text-xs text-slate-600 font-medium italic border-l-2 border-[#1E3A8A] pl-3">Presione la opción deseada para el conmutador general de la sucursal:</p>
                          <div className="grid grid-cols-2 gap-3 text-xs">
                            <div className="flex items-center gap-2.5"><span className="w-6 h-6 flex items-center justify-center bg-slate-200/70 text-[#1E3A8A] font-bold rounded-lg text-xs shadow-sm">1</span><span className="text-slate-700 font-medium">Necesidad Inmediata</span></div>
                            <div className="flex items-center gap-2.5"><span className="w-6 h-6 flex items-center justify-center bg-slate-200/70 text-[#1E3A8A] font-bold rounded-lg text-xs shadow-sm">2</span><span className="text-slate-700 font-medium">Sucursal Sol</span></div>
                            <div className="flex items-center gap-2.5"><span className="w-6 h-6 flex items-center justify-center bg-slate-200/70 text-[#1E3A8A] font-bold rounded-lg text-xs shadow-sm">3</span><span className="text-slate-700 font-medium">Sucursal Parque</span></div>
                            <div className="flex items-center gap-2.5"><span className="w-6 h-6 flex items-center justify-center bg-slate-200/70 text-[#1E3A8A] font-bold rounded-lg text-xs shadow-sm">4</span><span className="text-slate-700 font-medium">Sucursal Centro</span></div>
                            <div className="flex items-center gap-2.5"><span className="w-6 h-6 flex items-center justify-center bg-slate-200/70 text-[#1E3A8A] font-bold rounded-lg text-xs shadow-sm">5</span><span className="text-slate-700 font-medium">Sucursal Juriquilla</span></div>
                            <div className="flex items-center gap-2.5"><span className="w-6 h-6 flex items-center justify-center bg-slate-200/70 text-[#1E3A8A] font-bold rounded-lg text-xs shadow-sm">6</span><span className="text-slate-700 font-medium">Sucursal SJR</span></div>
                            <div className="flex items-center gap-2.5 col-span-2 mt-1 bg-amber-50 p-2 rounded-xl border border-amber-100"><span className="w-6 h-6 flex items-center justify-center bg-amber-200 text-amber-800 font-bold rounded-lg text-xs shadow-sm">7</span><span className="text-amber-900 font-semibold tracking-wide">Asesor en Previsión</span></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Extensiones Directas */}
                    <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col h-full relative overflow-hidden group">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2.5 bg-blue-50 text-[#1E3A8A] rounded-xl">
                          <Users className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-serif font-bold text-xl text-[#081225]">Recepciones Directas</h3>
                          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Líneas Específicas</p>
                        </div>
                      </div>
                      
                      <div className="space-y-5 flex-1 flex flex-col">
                        <div className="bg-white p-4 rounded-2xl border border-blue-100 shadow-sm relative">
                          <div className="absolute top-0 left-0 w-1 h-full bg-[#1E3A8A] rounded-l-2xl"></div>
                          <p className="text-xs text-slate-600 leading-relaxed font-medium">
                            <strong className="text-[#1E3A8A]">Atención Personalizada:</strong> Las opciones del conmutador son generales, pero si conoce su extensión (aquellas terminadas en <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 font-bold">01</span>), puede marcarla directamente para contactar una recepción específica.
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-auto pt-4">
                          {['101', '201', '301', '401', '601', '701'].map(ext => (
                            <div key={ext} className="flex flex-col items-center justify-center bg-white border border-slate-200/80 rounded-xl py-4 shadow-sm hover:bg-[#1E3A8A] hover:text-white hover:border-[#1E3A8A] hover:-translate-y-1 transition-all group/ext">
                              <span className="text-xl font-black font-mono tracking-tighter">{ext}</span>
                              <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400 group-hover/ext:text-blue-200 mt-1">Recepción</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Nuestras Sucursales */}
                    <div className="bg-[#081225] border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col h-full relative overflow-hidden">
                      <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
                      
                      <div className="flex items-center gap-3 mb-6 relative z-10">
                        <div className="p-2.5 bg-white/10 text-white rounded-xl backdrop-blur-sm">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-serif font-bold text-xl text-white">Nuestra Presencia</h3>
                          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">En Querétaro</p>
                        </div>
                      </div>
                      
                      <div className="flex-1 flex flex-col items-center justify-center py-6 relative z-10 space-y-6">
                        <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-4">
                          <span className="text-white/90 font-serif text-lg md:text-xl font-light hover:text-white transition-colors">Sol</span>
                          <span className="text-[#3B82F6] opacity-50 text-xs">•</span>
                          <span className="text-white/90 font-serif text-lg md:text-xl font-light hover:text-white transition-colors">Parque</span>
                          <span className="text-[#3B82F6] opacity-50 text-xs">•</span>
                          <span className="text-white/90 font-serif text-lg md:text-xl font-light hover:text-white transition-colors">Centro</span>
                          <span className="text-[#3B82F6] opacity-50 text-xs">•</span>
                          <span className="text-white/90 font-serif text-lg md:text-xl font-light hover:text-white transition-colors">Juriquilla</span>
                          <span className="text-[#3B82F6] opacity-50 text-xs">•</span>
                          <span className="text-white/90 font-serif text-lg md:text-xl font-light hover:text-white transition-colors">San Juan del Río</span>
                          <span className="text-[#3B82F6] opacity-50 text-xs">•</span>
                          <span className="text-white/90 font-serif text-lg md:text-xl font-light hover:text-white transition-colors">Medievo</span>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => setClientSection('instalaciones')}
                        className="w-full bg-white/10 hover:bg-white text-white hover:text-[#081225] border border-white/20 py-3.5 rounded-xl text-sm font-bold transition-all mt-auto relative z-10 backdrop-blur-sm"
                      >
                        Ver Catálogo de Instalaciones
                      </button>
                    </div>

                  </div>
                </div>

              </section>
            )}

`;

const newContent = content.substring(0, startIndex) + replacement + content.substring(endIndex);
fs.writeFileSync('src/App.jsx', newContent);
console.log("Replaced successfully!");
