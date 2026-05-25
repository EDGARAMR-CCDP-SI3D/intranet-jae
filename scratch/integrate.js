const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'web-app', 'src', 'App.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Declare SLIDE_IMAGES right before the App component definition
const slideImagesConst = `// ==========================================
// DECORACIONES DE FONDO DINÁMICO (SLIDESHOW)
// ==========================================
const SLIDE_IMAGES = [
  '/assets/recursos/IMG_6631.jpg',
  '/assets/recursos/IMG_6645.jpg',
  '/assets/recursos/IMG_6655.jpg',
  '/assets/recursos/IMG_6682.jpg',
  '/assets/recursos/IMG_6685.jpg',
  '/assets/recursos/IMG_6693.jpg',
  '/assets/recursos/IMG_6717.jpg',
  '/assets/recursos/IMG_6720.jpg',
  '/assets/recursos/IMG_6808.jpg',
  '/assets/recursos/IMG_6820.jpg'
];

export default function App() {`;

content = content.replace('export default function App() {', slideImagesConst);

// 2. Inject states into App component
const stateInjections = `  // ==========================================
  // ESTADOS DE FONDO DINÁMICO Y TARJETAS INICIO
  // ==========================================
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    if (currentModule === 'CLIENT_VIEW') {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % SLIDE_IMAGES.length);
      }, 5500);
      return () => clearInterval(timer);
    }
  }, [currentModule]);

  const [landingCards, setLandingCards] = useState(() => {
    const saved = localStorage.getItem('jae_landing_cards');
    return saved ? JSON.parse(saved) : [
      { id: 'c1', title: 'Duelo y Aceptación Grupal', desc: 'Sesión tanatológica grupal y presencial para brindar paz y apoyo emocional a las familias.', img: '/assets/recursos/Imagen13.jpg' },
      { id: 'c2', title: 'Plática: Recordar con Amor', desc: 'Conferencias virtuales dedicadas a honrar la memoria de nuestros seres queridos en un entorno seguro.', img: '/assets/recursos/IMG_6717.jpg' },
      { id: 'c3', title: 'Ceremonia de Homenaje de la Luz', desc: 'Celebración litúrgica solemne y encendido de velas por la paz eterna de las almas que amamos.', img: '/assets/recursos/IMG_6682.jpg' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('jae_landing_cards', JSON.stringify(landingCards));
  }, [landingCards]);

  // ==========================================
  // ESTADOS DE SESIÓN Y VISTAS`;

content = content.replace('  // ==========================================\n  // ESTADOS DE SESIÓN Y VISTAS', stateInjections);

// 3. Inject full screen background in the return statement
const rootBgInject = `  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans selection:bg-[#1E3A8A]/30 selection:text-white relative">
      
      {/* Full screen slideshow background when on Client View */}
      {currentModule === 'CLIENT_VIEW' && (
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          {SLIDE_IMAGES.map((img, idx) => (
            <div
              key={img}
              className={\`absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-[2000ms] ease-in-out \${
                idx === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }\`}
              style={{ backgroundImage: \`url(\${img})\` }}
            />
          ))}
          {/* Beautiful dark/blue glass tint overlay to ensure premium feel and readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A1728]/85 via-[#0F2942]/75 to-[#134074]/90 mix-blend-multiply" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400/10 via-transparent to-transparent" />
        </div>
      )}`;

content = content.replace('  return (\n    <div className="min-h-screen bg-[#FCFCFC] text-slate-800 flex flex-col font-sans selection:bg-[#1E3A8A]/30 selection:text-white">', rootBgInject);

// 4. Update Header Styling for immersive slideshow
const oldHeader = `<header className="bg-white border-b border-slate-200/80 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="border border-[#1E3A8A] text-[#1E3A8A] w-10 h-10 rounded-full flex items-center justify-center font-serif text-xl font-semibold shadow-inner bg-[#FAFAFA]">
            Æ
          </div>
          <div>
            <h1 className="font-serif font-bold text-lg leading-none tracking-wide text-slate-900">Grupo JAE</h1>
            <span className="text-[10px] text-[#1E3A8A] font-bold tracking-widest uppercase">Aeternum Corporativo</span>
          </div>
        </div>`;

const newHeader = `<header className={\`px-6 py-4 flex items-center justify-between sticky top-0 z-50 transition-all \${
        currentModule === 'CLIENT_VIEW'
          ? 'bg-[#0A1728]/40 backdrop-blur-md border-b border-white/10 text-white shadow-sm'
          : 'bg-white border-b border-slate-200/80 text-slate-800 shadow-sm'
      }\`}>
        <div className="flex items-center gap-3">
          <div className={\`w-10 h-10 rounded-full flex items-center justify-center font-serif text-xl font-semibold shadow-inner transition-all \${
            currentModule === 'CLIENT_VIEW'
              ? 'border border-sky-400/40 text-sky-300 bg-white/5 shadow-inner'
              : 'border border-[#1E3A8A] text-[#1E3A8A] bg-[#F1F5F9]'
          }\`}>
            Æ
          </div>
          <div>
            <h1 className={\`font-serif font-bold text-lg leading-none tracking-wide transition-colors \${
              currentModule === 'CLIENT_VIEW' ? 'text-white' : 'text-slate-900'
            }\`}>Grupo JAE</h1>
            <span className={\`text-[10px] font-bold tracking-widest uppercase transition-colors \${
              currentModule === 'CLIENT_VIEW' ? 'text-sky-300' : 'text-[#2563EB]'
            }\`}>Aeternum Corporativo</span>
          </div>
        </div>`;

content = content.replace(oldHeader, newHeader);

// 5. Update Login Button Style in Header
const oldLoginBtn = `<button
              onClick={() => setShowLoginModal(true)}
              className="bg-[#1E3A8A] hover:bg-[#1E40AF] text-white font-semibold text-xs px-4 py-2 rounded-full shadow-md shadow-[#1E3A8A]/20 flex items-center gap-1.5 transition-all"
            >
              <LogIn className="w-3.5 h-3.5" />
              Iniciar Sesión
            </button>`;

const newLoginBtn = `<button
              onClick={() => setShowLoginModal(true)}
              className={\`font-semibold text-xs px-4 py-2 rounded-full shadow-md flex items-center gap-1.5 transition-all \${
                currentModule === 'CLIENT_VIEW'
                  ? 'bg-white/10 hover:bg-white/20 border border-white/20 text-white shadow-white/5'
                  : 'bg-[#1E3A8A] hover:bg-[#1E40AF] text-white shadow-[#1E3A8A]/20'
              }\`}
            >
              <LogIn className="w-3.5 h-3.5" />
              Iniciar Sesión
            </button>`;

content = content.replace(oldLoginBtn, newLoginBtn);

// 6. Update CLIENT_VIEW section completely to match premium glassmorphic slide styling
const clientViewBlock = `{currentModule === 'CLIENT_VIEW' && (
          <div className="flex-1 flex flex-col items-center py-6 space-y-12">
            {/* Hero Section - Split Layout with real funeral home photo */}
            <div className="w-full max-w-5xl bg-white border border-slate-200/80 rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-100/50 flex flex-col lg:flex-row gap-8 items-center relative overflow-hidden">
              
              {/* Elegant Decorative Lines */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#1E3A8A] to-transparent"></div>
              
              {/* Left Side: Title and Search tracking */}
              <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
                <span className="text-[#2563EB] font-bold tracking-widest text-[10px] uppercase px-4 py-1.5 rounded-full bg-[#1E3A8A]/5 border border-[#1E3A8A]/20 font-serif">
                  Aeternum • Grupo JAE
                </span>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-slate-900 leading-tight">
                  Acompañándole en cada paso con <span className="italic text-[#2563EB] font-medium">respeto y dignidad</span>
                </h2>
                
                <p className="text-slate-500 text-xs sm:text-sm max-w-lg leading-relaxed font-light">
                  Para su tranquilidad, consulte en tiempo real el progreso de los trámites y el homenaje logístico de su ser querido introduciendo su folio de servicio.
                </p>

                {/* Rastrear Input Container */}
                <div className="w-full pt-2">
                  <ClientTrackingWidget services={services} />
                </div>
              </div>

              {/* Right Side: Elegant real image of Capilla Cruz */}
              <div className="w-full lg:w-[380px] flex-shrink-0 relative group">
                <div className="absolute inset-0 bg-[#1E3A8A]/10 rounded-2xl -rotate-2 scale-102 group-hover:rotate-0 transition-transform duration-500"></div>
                <div className="relative bg-white p-2 rounded-2xl border border-slate-200 shadow-md">
                  <div className="relative overflow-hidden rounded-xl h-72 md:h-80 bg-slate-100">
                    <img 
                      src="/assets/fune_cruz.jpg" 
                      alt="Cruz de Consagración JAE" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/60 via-slate-950/20 to-transparent p-4 text-white">
                      <p className="font-serif text-xs font-semibold text-white tracking-wide">Cruz de Consagración</p>
                      <p className="text-[10px] text-slate-200 font-light mt-0.5">Capilla Ecuménica de Homenaje Mayor</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Información Corporativa Complementaria con Fotos Reales */}
            <div className="w-full max-w-5xl space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-[1px] bg-[#1E3A8A]"></div>
                <h3 className="font-serif text-xs font-bold text-slate-400 uppercase tracking-widest">Nuestras Instalaciones Corporativas</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: 'Cruz Monumental', desc: 'Escultura sagrada y punto central de nuestras capillas.', img: '/assets/fune_cruz.jpg' },
                  { title: 'Lobby & Recepción JAE', desc: 'Espacios cómodos y de paz diseñados para el confort.', img: '/assets/fune_interior.jpg' },
                  { title: 'Acompañamiento Floral', desc: 'Detalles ornamentales que expresan respeto y condolencias.', img: '/assets/fune_flores.jpg' },
                  { title: 'Jardín de los Ángeles', desc: 'Placa de consagración y accesos exclusivos al complejo.', img: '/assets/fune_logo.jpg' }
                ].map((item, idx) => (
                  <div key={idx} className="group bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
                    <div className="relative overflow-hidden h-44 bg-slate-55">
                      <img 
                        src={item.img} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent"></div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-1">
                      <h4 className="font-serif font-bold text-[#2563EB] text-xs uppercase tracking-wider">{item.title}</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}`;

const newClientViewBlock = `{currentModule === 'CLIENT_VIEW' && (
          <div className="flex-1 flex flex-col items-center py-6 space-y-12 relative z-10">
            {/* Hero Section - Split Layout with real glassmorphism blur */}
            <div className="w-full max-w-5xl backdrop-blur-2xl bg-[#0A1728]/35 border border-white/15 rounded-[2.5rem] p-8 md:p-14 shadow-2xl flex flex-col lg:flex-row gap-10 items-center relative overflow-hidden text-white">
              
              {/* Elegant Decorative Glowing Border */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sky-300/35 to-transparent"></div>
              
              {/* Left Side: Title and Search tracking */}
              <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
                <span className="text-sky-300 font-bold tracking-widest text-[10px] uppercase px-4 py-1.5 rounded-full bg-white/10 border border-white/15 font-serif shadow-sm">
                  Aeternum • Grupo JAE
                </span>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-white leading-tight">
                  Acompañándole en cada paso con <span className="italic text-sky-300 font-semibold drop-shadow-sm">respeto y dignidad</span>
                </h2>
                
                <p className="text-slate-200 text-xs sm:text-sm max-w-lg leading-relaxed font-light">
                  Para su tranquilidad, consulte en tiempo real el progreso de los trámites y el homenaje logístico de su ser querido introduciendo su folio de servicio.
                </p>

                {/* Rastrear Input Container */}
                <div className="w-full pt-2">
                  <ClientTrackingWidget services={services} isDarkBg={true} />
                </div>
              </div>

              {/* Right Side: Elegant real image of Capilla Cruz with Glass frame */}
              <div className="w-full lg:w-[380px] flex-shrink-0 relative group">
                <div className="absolute inset-0 bg-sky-400/10 rounded-2xl -rotate-2 scale-102 group-hover:rotate-0 transition-transform duration-500"></div>
                <div className="relative bg-white/10 p-2.5 rounded-3xl border border-white/15 shadow-2xl backdrop-blur-md">
                  <div className="relative overflow-hidden rounded-2xl h-72 md:h-80 bg-slate-950/40">
                    <img 
                      src="/assets/recursos/IMG_6631.jpg" 
                      alt="Cruz de Consagración JAE" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent p-5 text-white">
                      <p className="font-serif text-xs font-semibold text-white tracking-wide">Cruz de Consagración</p>
                      <p className="text-[10px] text-sky-200 font-light mt-0.5">Capilla Ecuménica de Homenaje Mayor</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Información Corporativa Complementaria con Tanatología Dinámica */}
            <div className="w-full max-w-5xl space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-[1.5px] bg-sky-400/40"></div>
                <h3 className="font-serif text-xs font-bold text-sky-200 uppercase tracking-widest">Homenajes, Eventos y Tanatología</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {landingCards.map((item) => (
                  <div 
                    key={item.id} 
                    className="group backdrop-blur-xl bg-[#0A1728]/35 border border-white/10 hover:border-white/20 rounded-[1.75rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col hover:-translate-y-1.5"
                  >
                    <div className="relative overflow-hidden h-48 bg-slate-950/50">
                      <img 
                        src={item.img} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-75 group-hover:opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-transparent"></div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4 text-white">
                      <div>
                        <h4 className="font-serif font-bold text-sky-300 text-sm tracking-wide transition-colors group-hover:text-sky-200">{item.title}</h4>
                        <p className="text-[11px] text-slate-300 leading-relaxed font-light mt-2">{item.desc}</p>
                      </div>
                      <div className="pt-2 flex items-center justify-between text-[10px] text-sky-200 font-semibold tracking-wider uppercase">
                        <span>Servicio JAE</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-sky-300" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}`;

content = content.replace(clientViewBlock, newClientViewBlock);

// 7. Update ClientTrackingWidget definition to support isDarkBg
const oldWidget = `function ClientTrackingWidget({ services }) {
  const [folio, setFolio] = useState('');
  const [searchedService, setSearchedService] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (!folio.trim()) return;
    const found = services.find(s => s.folio.toUpperCase() === folio.trim().toUpperCase());
    if (found) {
      setSearchedService(found);
      setErrorMsg('');
    } else {
      setSearchedService(null);
      setErrorMsg('No se encontró ningún servicio activo o concluido con ese Folio.');
    }
  };

  const getStageIndex = (currentStatus) => {
    if (currentStatus === 'CONCLUIDO') return STAGES.length;
    return STAGES.findIndex((stage) => stage.id === currentStatus);
  };

  const currentIndex = searchedService ? getStageIndex(searchedService.status) : -1;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2">
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Ingrese Folio (Ej. SDNI-0001)"
            value={folio}
            onChange={(e) => setFolio(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-full pl-12 pr-4 py-3 text-xs focus:outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/15 transition-all font-semibold uppercase tracking-wider"
          />
        </div>
        <button
          type="submit"
          className="bg-[#1E3A8A] hover:bg-[#1E40AF] text-white font-semibold text-xs px-6 rounded-full shadow-md transition-all whitespace-nowrap"
        >
          Rastrear
        </button>
      </form>

      {errorMsg && (
        <div className="bg-red-50 border border-red-100 text-red-500 px-4 py-2.5 rounded-full text-xs max-w-sm mx-auto text-center flex items-center justify-center gap-2">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      {searchedService && (
        <div className="bg-[#FAFAFA] rounded-2xl border border-slate-200/80 p-6 md:p-8 space-y-8 text-left shadow-sm">`;

const newWidget = `function ClientTrackingWidget({ services, isDarkBg }) {
  const [folio, setFolio] = useState('');
  const [searchedService, setSearchedService] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (!folio.trim()) return;
    const found = services.find(s => s.folio.toUpperCase() === folio.trim().toUpperCase());
    if (found) {
      setSearchedService(found);
      setErrorMsg('');
    } else {
      setSearchedService(null);
      setErrorMsg('No se encontró ningún servicio activo o concluido con ese Folio.');
    }
  };

  const getStageIndex = (currentStatus) => {
    if (currentStatus === 'CONCLUIDO') return STAGES.length;
    return STAGES.findIndex((stage) => stage.id === currentStatus);
  };

  const currentIndex = searchedService ? getStageIndex(searchedService.status) : -1;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2">
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-slate-450 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Ingrese Folio (Ej. SDNI-0001)"
            value={folio}
            onChange={(e) => setFolio(e.target.value)}
            className={\`w-full rounded-full pl-12 pr-4 py-3 text-xs focus:outline-none focus:ring-2 transition-all font-semibold uppercase tracking-wider \${
              isDarkBg
                ? 'bg-white/10 border border-white/20 text-white placeholder-slate-300 focus:border-sky-400 focus:ring-sky-500/20'
                : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-[#1E3A8A] focus:ring-[#1E3A8A]/15'
            }\`}
          />
        </div>
        <button
          type="submit"
          className={\`font-semibold text-xs px-6 rounded-full shadow-md transition-all whitespace-nowrap \${
            isDarkBg
              ? 'bg-white hover:bg-slate-100 text-[#0A1728] shadow-white/5 hover:shadow-lg'
              : 'bg-[#1E3A8A] hover:bg-[#1E40AF] text-white'
          }\`}
        >
          Rastrear
        </button>
      </form>

      {errorMsg && (
        <div className={\`px-4 py-2.5 rounded-full text-xs max-w-sm mx-auto text-center flex items-center justify-center gap-2 \${
          isDarkBg 
            ? 'bg-red-500/20 border border-red-500/30 text-red-200' 
            : 'bg-red-55 border border-red-100 text-red-500'
        }\`}>
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      {searchedService && (
        <div className={\`rounded-2xl p-6 md:p-8 space-y-8 text-left shadow-2xl transition-all duration-500 border \${
          isDarkBg
            ? 'bg-[#0A1728]/70 backdrop-blur-xl border-white/15 text-white'
            : 'bg-[#FAFAFA] border border-slate-200/80 text-slate-800 shadow-sm'
        }\`}>`;

content = content.replace(oldWidget, newWidget);

// 8. Update timeline inside searchedService to support isDarkBg
const oldTimeline = `          {/* Timeline interactivo */}
          <div className="relative py-4">
            {/* Barra de progreso de fondo */}
            <div className="absolute top-[1.6rem] left-[1.5rem] right-[1.5rem] h-[3px] bg-slate-200 rounded-full"></div>
            
            {/* Barra activa */}
            <div 
              className="absolute top-[1.6rem] left-[1.5rem] h-[3px] bg-[#1E3A8A] rounded-full transition-all duration-1000 ease-out"
              style={{ width: \`\${(Math.min(currentIndex, STAGES.length - 1) / (STAGES.length - 1)) * 92 + 2}%\` }}
            ></div>

            <div className="flex justify-between relative">
              {STAGES.map((stage, index) => {
                const isCompleted = index <= currentIndex;
                const isCurrent = index === currentIndex;

                return (
                  <div key={stage.id} className="flex flex-col items-center w-1/5 relative">
                    {/* Círculo indicador */}
                    <div className={\`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-xs transition-all duration-500 z-10 \${
                      isCompleted 
                        ? 'bg-white border-[#1E3A8A] text-[#1E3A8A] shadow-sm' 
                        : 'bg-white border-slate-200 text-slate-350'
                    } \${isCurrent ? 'ring-4 ring-[#1E3A8A]/15 border-[#2563EB] text-[#2563EB] scale-110' : ''}\`}>
                      {isCompleted && index < currentIndex ? (
                        <CheckCircle className="w-4 h-4 text-[#1E3A8A]" />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>

                    {/* Texto debajo */}
                    <div className="mt-3 text-center">
                      <p className={\`text-[10px] font-semibold tracking-wide \${
                        isCompleted ? 'text-slate-800 font-bold' : 'text-slate-450'
                      }\`}>
                        {stage.label.split('. ')[1]}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Estado de conclusión */}
          {searchedService.status === 'CONCLUIDO' && (
            <div className="bg-emerald-50/50 border border-emerald-100/80 p-5 rounded-2xl text-center space-y-1">
              <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto" />
              <h4 className="font-serif font-bold text-slate-850 text-sm">El Homenaje ha Concluido</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Hemos culminado todas las etapas de atención acordadas para con su familia.
              </p>
            </div>
          )}`;

const newTimeline = `          {/* Timeline interactivo */}
          <div className="relative py-4">
            {/* Barra de progreso de fondo */}
            <div className={\`absolute top-[1.6rem] left-[1.5rem] right-[1.5rem] h-[3px] rounded-full \${
              isDarkBg ? 'bg-white/10' : 'bg-slate-200'
            }\`}></div>
            
            {/* Barra activa */}
            <div 
              className={\`absolute top-[1.6rem] left-[1.5rem] h-[3px] rounded-full transition-all duration-1000 ease-out \${
                isDarkBg ? 'bg-sky-400' : 'bg-[#1E3A8A]'
              }\`}
              style={{ width: \`\${(Math.min(currentIndex, STAGES.length - 1) / (STAGES.length - 1)) * 92 + 2}%\` }}
            ></div>

            <div className="flex justify-between relative">
              {STAGES.map((stage, index) => {
                const isCompleted = index <= currentIndex;
                const isCurrent = index === currentIndex;

                return (
                  <div key={stage.id} className="flex flex-col items-center w-1/5 relative">
                    {/* Círculo indicador */}
                    <div className={\`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-xs transition-all duration-500 z-10 \${
                      isCompleted 
                        ? (isDarkBg ? 'bg-[#0A1728] border-sky-400 text-sky-300 shadow-md' : 'bg-white border-[#1E3A8A] text-[#1E3A8A] shadow-sm') 
                        : (isDarkBg ? 'bg-[#0A1728]/80 border-white/10 text-slate-500' : 'bg-white border-slate-200 text-slate-350')
                    } \${isCurrent ? (isDarkBg ? 'ring-4 ring-sky-400/25 border-sky-300 text-white scale-110' : 'ring-4 ring-[#1E3A8A]/15 border-[#2563EB] text-[#2563EB] scale-110') : ''}\`}>
                      {isCompleted && index < currentIndex ? (
                        <CheckCircle className={\`w-4 h-4 \${isDarkBg ? 'text-sky-400' : 'text-[#1E3A8A]'}\`} />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>

                    {/* Texto debajo */}
                    <div className="mt-3 text-center">
                      <p className={\`text-[10px] font-semibold tracking-wide \${
                        isCompleted 
                          ? (isDarkBg ? 'text-slate-100 font-bold' : 'text-slate-800 font-bold') 
                          : (isDarkBg ? 'text-slate-500' : 'text-slate-450')
                      }\`}>
                        {stage.label.split('. ')[1]}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Estado de conclusión */}
          {searchedService.status === 'CONCLUIDO' && (
            <div className={\`p-5 rounded-2xl text-center space-y-1 border \${
              isDarkBg 
                ? 'bg-emerald-500/10 border-emerald-500/25' 
                : 'bg-emerald-50/50 border-emerald-100/80'
            }\`}>
              <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto" />
              <h4 className={\`font-serif font-bold text-sm \${isDarkBg ? 'text-emerald-300' : 'text-slate-850'}\`}>El Homenaje ha Concluido</h4>
              <p className={\`text-xs max-w-sm mx-auto \${isDarkBg ? 'text-slate-350' : 'text-slate-500'}\`}>
                Hemos culminado todas las etapas de atención acordadas para con su familia.
              </p>
            </div>
          )}`

content = content.replace(oldTimeline, newTimeline);

// 9. Update SuperAdminModule parameters and invocation
content = content.replace(
  'employeePermissions={employeePermissions}\n            setEmployeePermissions={setEmployeePermissions}\n          />',
  'employeePermissions={employeePermissions}\n            setEmployeePermissions={setEmployeePermissions}\n            landingCards={landingCards}\n            setLandingCards={setLandingCards}\n          />'
);

content = content.replace(
  'function SuperAdminModule({ \n  auditLogs, setAuditLogs,\n  services, setServices,\n  leads, setLeads,\n  crmColumns, setCrmColumns,\n  customFormFields, setCustomFormFields,\n  activeUsers, setActiveUsers,\n  addAuditLog,\n  employeePermissions,\n  setEmployeePermissions\n}) {',
  'function SuperAdminModule({ \n  auditLogs, setAuditLogs,\n  services, setServices,\n  leads, setLeads,\n  crmColumns, setCrmColumns,\n  customFormFields, setCustomFormFields,\n  activeUsers, setActiveUsers,\n  addAuditLog,\n  employeePermissions,\n  setEmployeePermissions,\n  landingCards,\n  setLandingCards\n}) {'
);

// 10. Update subtab list in SuperAdminModule to add LANDING_CONTENT
const oldAdminSubTabs = `      <div className="flex gap-4 border-b border-slate-200 pb-3">
        {[
          { id: 'ROLES_PERMISSIONS', label: 'Gestión de Menús y Empleados' },
          { id: 'AUDIT', label: 'Historial de Auditoría (DB)' },
          { id: 'FORM_BUILDER', label: 'Constructor de Formularios' }
        ].map(sub => (`;

const newAdminSubTabs = `      <div className="flex gap-4 border-b border-slate-200 pb-3">
        {[
          { id: 'ROLES_PERMISSIONS', label: 'Gestión de Menús y Empleados' },
          { id: 'AUDIT', label: 'Historial de Auditoría (DB)' },
          { id: 'FORM_BUILDER', label: 'Constructor de Formularios' },
          { id: 'LANDING_CONTENT', label: 'Gestión de Contenido de Inicio' }
        ].map(sub => (`;

content = content.replace(oldAdminSubTabs, newAdminSubTabs);

// 11. Add Content tab rendering in SuperAdminModule
const adminSubTabCheck = `      {/* 3. Constructor dinámico */}
      {activeSubTab === 'FORM_BUILDER' && (`;

const contentSubTabRender = `      {/* 4. Gestión de Contenido de Inicio */}
      {activeSubTab === 'LANDING_CONTENT' && (
        <LandingContentPanel 
          landingCards={landingCards}
          setLandingCards={setLandingCards}
          addAuditLog={addAuditLog}
        />
      )}

      {/* 3. Constructor dinámico */}`;

content = content.replace('      {/* 3. Constructor dinámico */}', '      {/* 4. Gestión de Contenido de Inicio %%% LANDING_CONTENT %%% */}');
content = content.replace('      {/* 4. Gestión de Contenido de Inicio %%% LANDING_CONTENT %%% */}', contentSubTabRender);

// 12. Append LandingContentPanel component definition at the very bottom
const componentDefinition = `
// ====================================================================================
// PANEL DE ADMINISTRACIÓN DE CONTENIDO DE LA LANDING (TANATOLOGÍA & HOMENAJES)
// ====================================================================================
function LandingContentPanel({ landingCards, setLandingCards, addAuditLog }) {
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [img, setImg] = useState('/assets/recursos/Imagen13.jpg');

  const IMAGES_LIST = [
    { label: 'Imagen 13 - Lobby', path: '/assets/recursos/Imagen13.jpg' },
    { label: 'IMG_6549 - Fachada Capillas', path: '/assets/recursos/IMG_6549.jpg' },
    { label: 'IMG_6631 - Interior Capilla Cruz', path: '/assets/recursos/IMG_6631.jpg' },
    { label: 'IMG_6645 - Capilla y Altar', path: '/assets/recursos/IMG_6645.jpg' },
    { label: 'IMG_6655 - Detalles Vitrales', path: '/assets/recursos/IMG_6655.jpg' },
    { label: 'IMG_6682 - Cruz e Iluminación', path: '/assets/recursos/IMG_6682.jpg' },
    { label: 'IMG_6685 - Pasillos Confort JAE', path: '/assets/recursos/IMG_6685.jpg' },
    { label: 'IMG_6693 - Sala de Espera Familiar', path: '/assets/recursos/IMG_6693.jpg' },
    { label: 'IMG_6707A - Vista Exterior Cruz', path: '/assets/recursos/IMG_6707A.jpg' },
    { label: 'IMG_6717 - Jardín de los Ángeles', path: '/assets/recursos/IMG_6717.jpg' },
    { label: 'IMG_6720 - Oratorio Principal', path: '/assets/recursos/IMG_6720.jpg' },
    { label: 'IMG_6808 - Recepción Principal', path: '/assets/recursos/IMG_6808.jpg' },
    { label: 'IMG_6815 - Homenaje Floral', path: '/assets/recursos/IMG_6815.jpg' },
    { label: 'IMG_6820 - Capilla Mayor Monumental', path: '/assets/recursos/IMG_6820.jpg' }
  ];

  const handleOpenCreate = () => {
    setEditingCard(null);
    setTitle('');
    setDesc('');
    setImg('/assets/recursos/Imagen13.jpg');
    setShowFormModal(true);
  };

  const handleOpenEdit = (card) => {
    setEditingCard(card);
    setTitle(card.title);
    setDesc(card.desc);
    setImg(card.img);
    setShowFormModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !desc.trim()) return;

    if (editingCard) {
      const oldVal = { ...editingCard };
      const newVal = { ...editingCard, title: title.trim(), desc: desc.trim(), img };
      const updated = landingCards.map(c => c.id === editingCard.id ? newVal : c);
      setLandingCards(updated);
      addAuditLog('landing_cards', editingCard.id, 'UPDATE', oldVal, newVal);
    } else {
      const newCard = {
        id: 'card_' + Date.now(),
        title: title.trim(),
        desc: desc.trim(),
        img
      };
      const updated = [...landingCards, newCard];
      setLandingCards(updated);
      addAuditLog('landing_cards', newCard.id, 'INSERT', null, newCard);
    }

    setShowFormModal(false);
  };

  const handleDelete = (cardId) => {
    if (!window.confirm('¿Está seguro de que desea eliminar este evento de Tanatología?')) return;
    const cardToDelete = landingCards.find(c => c.id === cardId);
    const updated = landingCards.filter(c => c.id !== cardId);
    setLandingCards(updated);
    addAuditLog('landing_cards', cardId, 'DELETE', cardToDelete, null);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-serif font-bold text-slate-900 text-base">Gestión de Eventos y Tanatología (Inicio)</h4>
          <p className="text-xs text-slate-400 mt-1">Administre las tarjetas informativas y los eventos públicos que se visualizan en la Landing Page.</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="bg-[#1E3A8A] hover:bg-[#1E40AF] text-white font-semibold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-md"
        >
          <Plus className="w-3.5 h-3.5" />
          Añadir Tarjeta / Evento
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {landingCards.map(card => (
          <div key={card.id} className="bg-slate-50 border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
            <div className="relative overflow-hidden h-32 bg-slate-200">
              <img src={card.img} alt={card.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h5 className="font-bold text-xs text-slate-800">{card.title}</h5>
                <p className="text-[10px] text-slate-500 leading-normal mt-1">{card.desc}</p>
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200/40">
                <button
                  onClick={() => handleOpenEdit(card)}
                  className="bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-[10px] font-semibold transition-all flex items-center gap-1"
                >
                  <Edit3 className="w-3 h-3 text-[#1E3A8A]" />
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(card.id)}
                  className="bg-red-50 hover:bg-red-100 border border-red-100 text-red-650 px-3 py-1.5 rounded-lg text-[10px] font-semibold transition-all flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}

        {landingCards.length === 0 && (
          <div className="col-span-full py-12 flex flex-col items-center justify-center text-slate-400 text-xs italic border border-dashed border-slate-200 rounded-2xl">
            No hay tarjetas públicas. Presione "Añadir Tarjeta" para registrar la primera.
          </div>
        )}
      </div>

      {showFormModal && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-md w-full space-y-6">
            <h3 className="font-serif font-bold text-slate-900 text-lg">
              {editingCard ? 'Editar Evento / Homenaje' : 'Crear Evento / Homenaje'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs text-slate-500 font-semibold block">Título del Evento / Plática</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Taller de Tanatología Infantil"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-500 font-semibold block">Descripción o Detalles</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Ej. Sesiones grupales de ayuda tanatológica dirigidas por profesionales..."
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-[#1E3A8A] rounded-xl px-4 py-2 text-xs text-slate-800 focus:outline-none resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-500 font-semibold block">Seleccionar Imagen Real Corporativa</label>
                <select
                  value={img}
                  onChange={(e) => setImg(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-[#1E3A8A] rounded-xl px-3 py-2 text-xs text-slate-600 focus:outline-none"
                >
                  {IMAGES_LIST.map((imgOpt) => (
                    <option key={imgOpt.path} value={imgOpt.path}>{imgOpt.label}</option>
                  ))}
                </select>
                <div className="relative overflow-hidden h-20 bg-slate-100 rounded-xl border border-slate-200 mt-2">
                  <img src={img} alt="Vista previa" className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setShowFormModal(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2 rounded-xl text-xs font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#1E3A8A] hover:bg-[#1E40AF] text-white px-5 py-2 rounded-xl text-xs font-semibold shadow-md"
                >
                  {editingCard ? 'Guardar Cambios' : 'Crear Tarjeta'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
`;

content = content + componentDefinition;

fs.writeFileSync(filePath, content, 'utf8');
console.log('App.jsx fully integrated with background slideshow, glassmorphic layout, and dynamic card editor CRUD!');
