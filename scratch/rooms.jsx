// ====================================================================================
// PANEL DE ADMINISTRACIÓN DE SALAS
// ====================================================================================
function RoomsAdminPanel({ rooms, setRooms, branches, addAuditLog, triggerNotification, triggerConfirm }) {
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  
  const [branchId, setBranchId] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [capacity, setCapacity] = useState('');
  const [observations, setObservations] = useState('');
  const [img, setImg] = useState('/assets/recursos/IMG_6693.jpg');

  const IMAGES_LIST = [
    { label: 'IMG_6693 - Sala de Espera Familiar', path: '/assets/recursos/IMG_6693.jpg' },
    { label: 'IMG_6685 - Pasillos Confort JAE', path: '/assets/recursos/IMG_6685.jpg' },
    { label: 'IMG_6631 - Interior Capilla Cruz', path: '/assets/recursos/IMG_6631.jpg' },
    { label: 'IMG_6645 - Capilla y Altar', path: '/assets/recursos/IMG_6645.jpg' },
    { label: 'Imagen 13 - Lobby', path: '/assets/recursos/Imagen13.jpg' },
    { label: 'IMG_6717 - Jardín de los Ángeles', path: '/assets/recursos/IMG_6717.jpg' }
  ];

  const handleOpenCreate = () => {
    setEditingRoom(null);
    setBranchId(branches.length > 0 ? branches[0].id : '');
    setName('');
    setType('');
    setCapacity('');
    setObservations('');
    setImg('/assets/recursos/IMG_6693.jpg');
    setShowFormModal(true);
  };

  const handleOpenEdit = (room) => {
    setEditingRoom(room);
    setBranchId(room.branchId || '');
    setName(room.name || '');
    setType(room.type || '');
    setCapacity(room.capacity || '');
    setObservations(room.observations || '');
    setImg(room.img || '/assets/recursos/IMG_6693.jpg');
    setShowFormModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !branchId) return;

    if (editingRoom) {
      const oldVal = { ...editingRoom };
      const newVal = { ...editingRoom, branchId, name: name.trim(), type: type.trim(), capacity: Number(capacity), observations: observations.trim(), img };
      const updated = rooms.map(r => r.id === editingRoom.id ? newVal : r);
      setRooms(updated);
      addAuditLog('rooms', editingRoom.id, 'UPDATE', oldVal, newVal);
      triggerNotification('Sala actualizada exitosamente.');
    } else {
      const newRoom = {
        id: 'room_' + Date.now(),
        branchId,
        name: name.trim(),
        type: type.trim(),
        capacity: Number(capacity),
        observations: observations.trim(),
        img
      };
      const updated = [...rooms, newRoom];
      setRooms(updated);
      addAuditLog('rooms', newRoom.id, 'INSERT', null, newRoom);
      triggerNotification('Sala creada exitosamente.');
    }

    setShowFormModal(false);
  };

  const handleDelete = (roomId) => {
    const roomToDelete = rooms.find(r => r.id === roomId);
    triggerConfirm(`¿Está seguro de eliminar la sala "${roomToDelete?.name || ''}"?`, () => {
      const updated = rooms.filter(r => r.id !== roomId);
      setRooms(updated);
      addAuditLog('rooms', roomId, 'DELETE', roomToDelete, null);
      triggerNotification('Sala eliminada exitosamente.', 'success');
    });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div>
          <h4 className="font-serif font-bold text-slate-900 text-base">Gestión de Salas Disponibles</h4>
          <p className="text-xs text-slate-400 mt-1">Configure las salas de velación para cada una de sus sucursales.</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="bg-[#1E3A8A] hover:bg-[#1E40AF] text-white font-semibold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-md"
        >
          <Plus className="w-3.5 h-3.5" />
          Añadir Sala
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {rooms.map(room => {
          const parentBranch = branches.find(b => b.id === room.branchId);
          return (
            <div key={room.id} className="bg-slate-50 border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
              <div className="relative overflow-hidden h-32 bg-slate-200">
                {room.img ? (
                  <img src={room.img} alt={room.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 font-serif text-[11px]">Imagen de Sala</div>
                )}
                <div className="absolute top-2 right-2 bg-white/90 text-[#081225] text-[9px] font-bold px-2 py-0.5 rounded shadow-sm">
                  Aforo: {room.capacity}
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h5 className="font-bold text-xs text-[#1E3A8A]">{room.name}</h5>
                  <p className="text-[10px] text-slate-500 font-semibold mt-1">Sucursal: {parentBranch?.name || 'Desconocida'}</p>
                  <p className="text-[10px] text-slate-600 mt-1 line-clamp-2 italic">{room.observations}</p>
                </div>
                <div className="flex justify-end gap-2 pt-2 border-t border-slate-200/40">
                  <button
                    onClick={() => handleOpenEdit(room)}
                    className="bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 px-2 py-1 rounded-lg text-[10px] font-semibold transition-all flex items-center gap-1"
                  >
                    <Edit3 className="w-3 h-3 text-[#1E3A8A]" />
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(room.id)}
                    className="bg-red-50 hover:bg-red-100 border border-red-100 text-red-550 px-2 py-1 rounded-lg text-[10px] font-semibold transition-all flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {rooms.length === 0 && (
          <div className="col-span-full py-12 flex flex-col items-center justify-center text-slate-400 text-xs italic border border-dashed border-slate-200 rounded-2xl">
            No hay salas registradas. Presione "Añadir Sala" para crear la primera.
          </div>
        )}
      </div>

      {showFormModal && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center z-[200] p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full space-y-6">
            <h3 className="font-serif font-bold text-slate-900 text-lg">
              {editingRoom ? 'Editar Sala' : 'Nueva Sala'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs text-slate-600 font-bold block">Sucursal Perteneciente</label>
                <select
                  required
                  value={branchId}
                  onChange={(e) => setBranchId(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1E3A8A]"
                >
                  <option value="">Seleccione una sucursal</option>
                  {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-600 font-bold block">Nombre de la Sala</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Sala 21"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1E3A8A]"
                />
              </div>

              <div className="flex gap-4">
                <div className="space-y-1.5 flex-1">
                  <label className="text-xs text-slate-600 font-bold block">Tipo / Categoría</label>
                  <input
                    type="text"
                    placeholder="Ej. PREMIER/PLATINO"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1E3A8A]"
                  />
                </div>
                <div className="space-y-1.5 w-24">
                  <label className="text-xs text-slate-600 font-bold block">Aforo</label>
                  <input
                    type="number"
                    placeholder="Ej. 50"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1E3A8A]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-600 font-bold block">En qué caso aplica / Observaciones</label>
                <input
                  type="text"
                  placeholder="Ej. ORO/BRONCE / CLASICO/BASICO PÓLIZA"
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1E3A8A]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-600 font-bold block">Fotografía</label>
                <select
                  value={img}
                  onChange={(e) => setImg(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-600 focus:outline-none focus:border-[#1E3A8A]"
                >
                  {IMAGES_LIST.map((imgOpt) => (
                    <option key={imgOpt.path} value={imgOpt.path}>{imgOpt.label}</option>
                  ))}
                </select>
                <div className="relative overflow-hidden h-24 bg-slate-100 rounded-xl border border-slate-200 mt-2">
                  <img src={img} alt="Vista previa" className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setShowFormModal(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-650 px-4 py-2 rounded-xl text-xs font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#1E3A8A] hover:bg-[#1E40AF] text-white px-5 py-2 rounded-xl text-xs font-semibold shadow-md"
                >
                  {editingRoom ? 'Guardar Cambios' : 'Crear Sala'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
