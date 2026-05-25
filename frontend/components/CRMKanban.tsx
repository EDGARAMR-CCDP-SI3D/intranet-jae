import React, { useState } from 'react';

// Tipos
type Lead = {
  id: string;
  name: string;
  phone: string;
  stage: 'FRIO' | 'CALIENTE' | 'CIERRE';
};

const INITIAL_LEADS: Lead[] = [
  { id: '1', name: 'Familia Ramírez', phone: '555-0101', stage: 'FRIO' },
  { id: '2', name: 'Juan Pérez', phone: '555-0102', stage: 'CALIENTE' },
  { id: '3', name: 'María Gómez', phone: '555-0103', stage: 'CIERRE' },
];

const COLUMNS = [
  { id: 'FRIO', title: 'Prospectos Fríos', color: 'bg-slate-500/10 border-slate-300/50 text-slate-700' },
  { id: 'CALIENTE', title: 'En Seguimiento', color: 'bg-orange-500/10 border-orange-300/50 text-orange-700' },
  { id: 'CIERRE', title: 'Cierre Próximo', color: 'bg-green-500/10 border-green-300/50 text-green-700' },
];

export default function CRMKanban() {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [draggedLead, setDraggedLead] = useState<Lead | null>(null);

  const handleDragStart = (lead: Lead) => {
    setDraggedLead(lead);
  };

  const handleDrop = (stage: Lead['stage']) => {
    if (draggedLead && draggedLead.stage !== stage) {
      setLeads((prev) =>
        prev.map((l) => (l.id === draggedLead.id ? { ...l, stage } : l))
      );
    }
    setDraggedLead(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-slate-800">CRM - Gestión de Prospectos</h1>
        <p className="text-slate-500 mt-2">Arrastra los prospectos para actualizar su estado de venta.</p>
      </header>

      <div className="flex gap-6 overflow-x-auto pb-4">
        {COLUMNS.map((col) => (
          <div
            key={col.id}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(col.id as Lead['stage'])}
            className={`flex-1 min-w-[300px] rounded-2xl border ${col.color} p-4 backdrop-blur-sm transition-colors`}
          >
            <div className="flex justify-between items-center mb-4 px-2">
              <h2 className="font-semibold text-lg">{col.title}</h2>
              <span className="text-xs font-bold px-2 py-1 bg-white/50 rounded-full">
                {leads.filter((l) => l.stage === col.id).length}
              </span>
            </div>

            <div className="space-y-3 min-h-[500px]">
              {leads
                .filter((lead) => lead.stage === col.id)
                .map((lead) => (
                  <div
                    key={lead.id}
                    draggable
                    onDragStart={() => handleDragStart(lead)}
                    className="bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-sm hover:shadow-md cursor-grab active:cursor-grabbing border border-white/50 transition-all hover:-translate-y-1"
                  >
                    <h3 className="font-medium text-slate-800">{lead.name}</h3>
                    <div className="flex items-center text-sm text-slate-500 mt-2">
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {lead.phone}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
