// AdminPanel — restaurant owner dashboard

const { useState, useRef } = React;

// ── Icons ───────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 18, stroke = true }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={stroke ? "none" : "currentColor"}
    stroke={stroke ? "currentColor" : "none"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const icons = {
  grid:    "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z",
  dish:    "M3 11l19-9-9 19-2-8-8-2z",
  qr:      "M3 3h6v6H3zM15 3h6v6h-6zM3 15h6v6H3zM15 15h3v3h-3zM20 15v3M15 20h5M20 20v2",
  edit:    "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  trash:   "M3 6h18M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2",
  upload:  "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12",
  check:   "M20 6L9 17l-5-5",
  x:       "M18 6L6 18M6 6l12 12",
  tag:     "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01",
  download:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
  eye:     "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
};

// ── Fake QR SVG ─────────────────────────────────────────────────────────────
function QRCode({ size = 140 }) {
  // Simple deterministic pixel pattern to look like a QR code
  const cells = 21;
  const cell = size / cells;
  const fixed = new Set([
    // top-left finder
    ...[0,1,2,3,4,5,6].flatMap(r => [0,1,2,3,4,5,6].map(c => `${r},${c}`)),
    // top-right finder
    ...[0,1,2,3,4,5,6].flatMap(r => [14,15,16,17,18,19,20].map(c => `${r},${c}`)),
    // bottom-left finder
    ...[14,15,16,17,18,19,20].flatMap(r => [0,1,2,3,4,5,6].map(c => `${r},${c}`)),
  ]);
  const hollow = new Set([
    ...[1,2,3,4,5].flatMap(r => [1,2,3,4,5].map(c => `${r},${c}`)),
    ...[1,2,3,4,5].flatMap(r => [15,16,17,18,19].map(c => `${r},${c}`)),
    ...[15,16,17,18,19].flatMap(r => [1,2,3,4,5].map(c => `${r},${c}`)),
  ]);
  const inner = new Set([
    ...[2,3,4].flatMap(r => [2,3,4].map(c => `${r},${c}`)),
    ...[2,3,4].flatMap(r => [16,17,18].map(c => `${r},${c}`)),
    ...[16,17,18].flatMap(r => [2,3,4].map(c => `${r},${c}`)),
  ]);
  // seeded pseudo-random data cells
  const hash = (r, c) => ((r * 31 + c) * 17 + r * c * 7) % 3 !== 0;

  const rects = [];
  for (let r = 0; r < cells; r++) {
    for (let c = 0; c < cells; c++) {
      const key = `${r},${c}`;
      let fill = null;
      if (fixed.has(key) && !hollow.has(key)) fill = "#1C1410";
      else if (hollow.has(key) && !inner.has(key)) fill = null;
      else if (inner.has(key)) fill = "#1C1410";
      else if (!fixed.has(key) && hash(r, c)) fill = "#1C1410";
      if (fill) rects.push(<rect key={key} x={c * cell} y={r * cell} width={cell - 0.5} height={cell - 0.5} fill={fill} rx="0.5" />);
    }
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: "block" }}>
      <rect width={size} height={size} fill="#fff" />
      {rects}
    </svg>
  );
}

// ── Toggle ───────────────────────────────────────────────────────────────────
function Toggle({ checked, onChange }) {
  return (
    <div onClick={() => onChange(!checked)} style={{
      width: 44, height: 24, borderRadius: 12, cursor: "pointer",
      background: checked ? "var(--brand-color)" : "#D4C9BC",
      position: "relative", transition: "background 0.2s", flexShrink: 0,
    }}>
      <div style={{
        position: "absolute", top: 3, left: checked ? 23 : 3,
        width: 18, height: 18, borderRadius: "50%", background: "#fff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)", transition: "left 0.2s",
      }} />
    </div>
  );
}

// ── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub }) {
  return (
    <div style={{ background: "#fff", borderRadius: 14, padding: "16px 18px", boxShadow: "0 1px 8px rgba(28,20,16,0.07)" }}>
      <p style={{ margin: "0 0 4px", fontSize: 12, color: "#8C7B6A", fontWeight: 500 }}>{label}</p>
      <p style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#1C1410", fontFamily: "Lora, serif" }}>{value}</p>
      {sub && <p style={{ margin: "2px 0 0", fontSize: 11, color: "#B09A88" }}>{sub}</p>}
    </div>
  );
}

// ── Dashboard Tab ────────────────────────────────────────────────────────────
function DashboardTab({ dishes, onNavigate }) {
  const total = dishes.length;
  const available = dishes.filter(d => d.available).length;
  const cats = CATEGORIES.length;

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: "0 0 4px", fontFamily: "Lora, serif", fontSize: 22, color: "#1C1410" }}>Bienvenido, La Estancia 👋</h2>
        <p style={{ margin: 0, color: "#8C7B6A", fontSize: 14 }}>Tu menú digital está activo y visible para tus clientes.</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 24 }}>
        <StatCard label="Platos" value={total} sub={`${available} disponibles`} />
        <StatCard label="Categorías" value={cats} sub="activas" />
        <StatCard label="Estado" value="✓ Online" sub="QR activo" />
      </div>

      {/* QR Panel */}
      <div style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 1px 8px rgba(28,20,16,0.07)", marginBottom: 24 }}>
        <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: "#1C1410" }}>Tu código QR</h3>
        <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ padding: 12, border: "2px solid #EDE9E3", borderRadius: 12 }}>
            <QRCode size={130} />
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <p style={{ margin: "0 0 6px", fontSize: 13, color: "#5A4A3A", lineHeight: 1.6 }}>
              Compartí este QR en tus mesas, mostrador o redes. Tus clientes lo escanean y ven tu menú al instante, sin descargar nada.
            </p>
            <p style={{ margin: "0 0 14px", fontSize: 12, color: "#B09A88", fontFamily: "monospace",
              background: "#F5F1EC", padding: "6px 10px", borderRadius: 8, wordBreak: "break-all" }}>
              menuqr.py/la-estancia
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", borderRadius: 10,
                background: "var(--brand-color)", color: "#fff", border: "none", cursor: "pointer",
                fontFamily: "DM Sans, sans-serif", fontWeight: 700, fontSize: 13 }}>
                <Icon d={icons.download} size={15} /> Descargar QR
              </button>
              <button onClick={() => onNavigate("menu")} style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", borderRadius: 10,
                background: "#F5F1EC", color: "#5A4A3A", border: "none", cursor: "pointer",
                fontFamily: "DM Sans, sans-serif", fontWeight: 600, fontSize: 13 }}>
                <Icon d={icons.eye} size={15} /> Ver menú público
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Agotados alert */}
      {dishes.filter(d => !d.available).length > 0 && (
        <div style={{ background: "#FEF3EC", border: "1px solid #F5D0B5", borderRadius: 12, padding: "12px 16px",
          display: "flex", gap: 10, alignItems: "center" }}>
          <span style={{ fontSize: 18 }}>⚠️</span>
          <div>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#8A3A10" }}>
              {dishes.filter(d => !d.available).length} plato(s) marcados como agotados
            </p>
            <p style={{ margin: "2px 0 0", fontSize: 12, color: "#B05020" }}>
              {dishes.filter(d => !d.available).map(d => d.name).join(", ")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Dish List Tab ────────────────────────────────────────────────────────────
function DishListTab({ dishes, setDishes, onEdit }) {
  const [activeCat, setActiveCat] = useState("entradas");
  const filtered = dishes.filter(d => d.category === activeCat);

  const toggleAvail = (id) => {
    setDishes(prev => prev.map(d => d.id === id ? { ...d, available: !d.available } : d));
  };
  const deleteDish = (id) => {
    if (confirm("¿Eliminar este plato?")) setDishes(prev => prev.filter(d => d.id !== id));
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ margin: 0, fontFamily: "Lora, serif", fontSize: 22, color: "#1C1410" }}>Platos</h2>
        <button onClick={() => onEdit(null)} style={{ display: "flex", alignItems: "center", gap: 6,
          padding: "9px 16px", borderRadius: 10, background: "var(--brand-color)", color: "#fff",
          border: "none", cursor: "pointer", fontFamily: "DM Sans, sans-serif", fontWeight: 700, fontSize: 13 }}>
          + Nuevo plato
        </button>
      </div>

      {/* Category tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16, overflowX: "auto", paddingBottom: 2 }}>
        {CATEGORIES.map(cat => (
          <button key={cat.id} onClick={() => setActiveCat(cat.id)} style={{
            flexShrink: 0, padding: "6px 14px", borderRadius: 8, border: "none", cursor: "pointer",
            fontFamily: "DM Sans, sans-serif", fontWeight: 600, fontSize: 13,
            background: activeCat === cat.id ? "#F5F1EC" : "transparent",
            color: activeCat === cat.id ? "var(--brand-color)" : "#8C7B6A",
            borderBottom: activeCat === cat.id ? "2px solid var(--brand-color)" : "2px solid transparent",
          }}>{cat.label}</button>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: "#fff", borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 8px rgba(28,20,16,0.07)" }}>
        {filtered.length === 0 ? (
          <div style={{ padding: "40px 20px", textAlign: "center", color: "#B09A88", fontFamily: "DM Sans, sans-serif" }}>
            No hay platos en esta categoría aún.
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #EDE9E3" }}>
                {["Plato", "Precio", "Disponible", ""].map(h => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11.5, fontWeight: 600,
                    color: "#8C7B6A", letterSpacing: "0.06em", textTransform: "uppercase",
                    fontFamily: "DM Sans, sans-serif", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((dish, i) => (
                <tr key={dish.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid #F5F0EA" : "none",
                  transition: "background 0.12s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#FDFAF7"}
                  onMouseLeave={e => e.currentTarget.style.background = ""}>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 46, height: 34, borderRadius: 8, overflow: "hidden", flexShrink: 0, background: "#EDE9E3" }}>
                        <img src={dish.image} alt={dish.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover",
                            filter: dish.available ? "none" : "grayscale(70%)" }} />
                      </div>
                      <div>
                        <p style={{ margin: 0, fontFamily: "Lora, serif", fontSize: 14, fontWeight: 600, color: "#1C1410" }}>{dish.name}</p>
                        <p style={{ margin: "1px 0 0", fontSize: 12, color: "#8C7B6A" }}>{dish.short}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px", fontFamily: "DM Sans, sans-serif", fontSize: 14, fontWeight: 700,
                    color: "var(--brand-color)", whiteSpace: "nowrap" }}>{formatPrice(dish.price)}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Toggle checked={dish.available} onChange={() => toggleAvail(dish.id)} />
                      <span style={{ fontSize: 12, color: dish.available ? "#4A8A4A" : "#9E9E9E", fontWeight: 600 }}>
                        {dish.available ? "Disponible" : "Agotado"}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <div style={{ display: "flex", gap: 4 }}>
                      <button onClick={() => onEdit(dish)} style={{ width: 32, height: 32, borderRadius: 8, border: "none",
                        background: "#F5F1EC", color: "#5A4A3A", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon d={icons.edit} size={14} />
                      </button>
                      <button onClick={() => deleteDish(dish.id)} style={{ width: 32, height: 32, borderRadius: 8, border: "none",
                        background: "#FEF0EC", color: "#C0451A", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon d={icons.trash} size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ── Edit Form Tab ─────────────────────────────────────────────────────────────
function EditFormTab({ dish, onSave, onCancel }) {
  const isNew = !dish;
  const [form, setForm] = useState(dish || {
    name: "", short: "", desc: "", price: "", category: "entradas", available: true, image: "",
  });
  const [dragOver, setDragOver] = useState(false);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef();

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.name || !form.price) return alert("Completá al menos nombre y precio.");
    setSaved(true);
    setTimeout(() => { onSave({ ...form, id: dish?.id || Date.now(), price: Number(form.price) }); }, 600);
  };

  const inputStyle = {
    width: "100%", padding: "10px 12px", borderRadius: 10, fontSize: 14,
    border: "1.5px solid #E4DED6", background: "#FDFAF7", color: "#1C1410",
    fontFamily: "DM Sans, sans-serif", outline: "none", boxSizing: "border-box",
    transition: "border-color 0.15s",
  };
  const labelStyle = { display: "block", fontSize: 12, fontWeight: 600, color: "#7A6A5A",
    marginBottom: 5, letterSpacing: "0.04em", textTransform: "uppercase" };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <button onClick={onCancel} style={{ padding: "8px 14px", borderRadius: 9, border: "1.5px solid #E4DED6",
          background: "transparent", color: "#5A4A3A", cursor: "pointer", fontFamily: "DM Sans, sans-serif",
          fontWeight: 600, fontSize: 13 }}>← Volver</button>
        <h2 style={{ margin: 0, fontFamily: "Lora, serif", fontSize: 20, color: "#1C1410" }}>
          {isNew ? "Nuevo plato" : `Editar: ${dish.name}`}
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ background: "#fff", borderRadius: 14, padding: 20, boxShadow: "0 1px 8px rgba(28,20,16,0.07)" }}>
            <h3 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 700, color: "#1C1410" }}>Información del plato</h3>
            
            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Nombre *</label>
              <input value={form.name} onChange={e => set("name", e.target.value)}
                placeholder="Ej: Asado de Tira" style={inputStyle}
                onFocus={e => e.target.style.borderColor = "var(--brand-color)"}
                onBlur={e => e.target.style.borderColor = "#E4DED6"} />
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Descripción corta</label>
              <input value={form.short} onChange={e => set("short", e.target.value)}
                placeholder="Ej: 500g a las brasas con mandioca" style={inputStyle}
                onFocus={e => e.target.style.borderColor = "var(--brand-color)"}
                onBlur={e => e.target.style.borderColor = "#E4DED6"} />
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Descripción completa</label>
              <textarea value={form.desc} onChange={e => set("desc", e.target.value)}
                placeholder="Contá la historia del plato, ingredientes, cómo se prepara..."
                rows={4} style={{ ...inputStyle, resize: "vertical", lineHeight: 1.55 }}
                onFocus={e => e.target.style.borderColor = "var(--brand-color)"}
                onBlur={e => e.target.style.borderColor = "#E4DED6"} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={labelStyle}>Precio (Gs.) *</label>
                <input type="number" value={form.price} onChange={e => set("price", e.target.value)}
                  placeholder="35000" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = "var(--brand-color)"}
                  onBlur={e => e.target.style.borderColor = "#E4DED6"} />
              </div>
              <div>
                <label style={labelStyle}>Categoría</label>
                <select value={form.category} onChange={e => set("category", e.target.value)}
                  style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}>
                  {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div style={{ background: "#fff", borderRadius: 14, padding: 20, boxShadow: "0 1px 8px rgba(28,20,16,0.07)" }}>
            <label style={labelStyle}>Disponibilidad</label>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
              <Toggle checked={form.available} onChange={v => set("available", v)} />
              <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 14, color: form.available ? "#4A8A4A" : "#9E9E9E", fontWeight: 600 }}>
                {form.available ? "Disponible para ordenar" : "Marcado como agotado"}
              </span>
            </div>
          </div>
        </div>

        {/* Right column — photo upload */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ background: "#fff", borderRadius: 14, padding: 20, boxShadow: "0 1px 8px rgba(28,20,16,0.07)" }}>
            <h3 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 700, color: "#1C1410" }}>Foto del plato</h3>

            {/* Drop zone */}
            <div
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={e => { e.preventDefault(); setDragOver(false); }}
              onClick={() => fileRef.current.click()}
              style={{
                border: `2px dashed ${dragOver ? "var(--brand-color)" : "#D4C9BC"}`,
                borderRadius: 12, padding: "32px 20px", textAlign: "center",
                cursor: "pointer", transition: "all 0.18s",
                background: dragOver ? "#FEF3EC" : "#FDFAF7",
                marginBottom: 14,
              }}>
              <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }}
                onChange={e => {
                  const f = e.target.files[0];
                  if (f) { const url = URL.createObjectURL(f); set("image", url); }
                }} />
              <div style={{ fontSize: 28, marginBottom: 8 }}>📷</div>
              <p style={{ margin: "0 0 4px", fontWeight: 600, color: "#5A4A3A", fontSize: 14 }}>
                {dragOver ? "Soltá la imagen aquí" : "Arrastrá una foto aquí"}
              </p>
              <p style={{ margin: 0, fontSize: 12, color: "#B09A88" }}>o hacé clic para seleccionar · JPG, PNG, WEBP</p>
            </div>

            {/* Preview */}
            {form.image ? (
              <div style={{ position: "relative", paddingBottom: "66.67%", borderRadius: 10, overflow: "hidden", background: "#EDE9E3" }}>
                <img src={form.image} alt="preview"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                <button onClick={() => set("image", "")} style={{
                  position: "absolute", top: 8, right: 8, width: 28, height: 28, borderRadius: "50%",
                  background: "rgba(28,20,16,0.6)", border: "none", color: "#fff", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}><Icon d={icons.x} size={13} /></button>
              </div>
            ) : (
              <div style={{ background: "repeating-linear-gradient(45deg,#EDE9E3,#EDE9E3 6px,#E4DED6 6px,#E4DED6 12px)",
                borderRadius: 10, padding: "28px 16px", textAlign: "center" }}>
                <p style={{ margin: 0, fontSize: 11, color: "#9E8E7E", fontFamily: "monospace" }}>foto del plato — 3:2</p>
              </div>
            )}

            {/* URL input */}
            <div style={{ marginTop: 12 }}>
              <label style={{ ...labelStyle, fontSize: 11 }}>O pegá una URL de imagen</label>
              <input value={form.image} onChange={e => set("image", e.target.value)}
                placeholder="https://..." style={{ ...inputStyle, fontSize: 12 }}
                onFocus={e => e.target.style.borderColor = "var(--brand-color)"}
                onBlur={e => e.target.style.borderColor = "#E4DED6"} />
            </div>
          </div>

          {/* Save button */}
          <button onClick={handleSave} style={{
            padding: "14px 20px", borderRadius: 12, border: "none", cursor: "pointer",
            background: saved ? "#4A8A4A" : "var(--brand-color)", color: "#fff",
            fontFamily: "DM Sans, sans-serif", fontWeight: 700, fontSize: 15,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            transition: "background 0.3s",
          }}>
            {saved ? <><Icon d={icons.check} size={17} /> Guardado</> : `${isNew ? "Crear" : "Guardar"} plato`}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Admin Panel ───────────────────────────────────────────────────────────────
function AdminPanel({ onViewPublic }) {
  const [tab, setTab] = useState("dashboard");
  const [dishes, setDishes] = useState(DISHES);
  const [editingDish, setEditingDish] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const handleEdit = (dish) => { setEditingDish(dish); setTab("edit"); };
  const handleSave = (dish) => {
    setDishes(prev => {
      const exists = prev.find(d => d.id === dish.id);
      return exists ? prev.map(d => d.id === dish.id ? dish : d) : [...prev, dish];
    });
    setTab("dishes");
  };

  const navItems = [
    { id: "dashboard", label: "Inicio", icon: icons.grid },
    { id: "dishes", label: "Platos", icon: icons.dish },
    { id: "qr", label: "QR & Link", icon: icons.qr },
  ];

  return (
    <div style={{ display: "flex", height: "100%", fontFamily: "DM Sans, sans-serif", background: "#F5F0EA" }}>

      {/* Sidebar */}
      <div style={{ width: 220, background: "#1C1410", display: "flex", flexDirection: "column",
        padding: "0 0 20px", flexShrink: 0 }}>
        {/* Brand */}
        <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--brand-color)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "Lora, serif", fontWeight: 700, fontSize: 12, color: "#fff" }}>QR</div>
            <div>
              <p style={{ margin: 0, fontWeight: 700, fontSize: 13, color: "#fff" }}>MenuQR</p>
              <p style={{ margin: 0, fontSize: 11, color: "rgba(255,255,255,0.45)" }}>La Estancia</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "12px 12px 0" }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => setTab(item.id)} style={{
              width: "100%", display: "flex", alignItems: "center", gap: 10,
              padding: "9px 12px", borderRadius: 9, border: "none", cursor: "pointer",
              background: tab === item.id ? "rgba(212,98,42,0.18)" : "transparent",
              color: tab === item.id ? "var(--brand-color)" : "rgba(255,255,255,0.55)",
              fontFamily: "DM Sans, sans-serif", fontWeight: 600, fontSize: 13, marginBottom: 2,
              transition: "all 0.15s",
            }}>
              <Icon d={item.icon} size={16} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* View public */}
        <div style={{ padding: "0 12px" }}>
          <button onClick={onViewPublic} style={{
            width: "100%", display: "flex", alignItems: "center", gap: 8,
            padding: "9px 12px", borderRadius: 9, border: "1px solid rgba(255,255,255,0.12)",
            background: "transparent", color: "rgba(255,255,255,0.6)", cursor: "pointer",
            fontFamily: "DM Sans, sans-serif", fontWeight: 600, fontSize: 12,
          }}>
            <Icon d={icons.eye} size={14} /> Ver menú público
          </button>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, overflow: "auto" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "28px 28px 48px" }}>
          {tab === "dashboard" && <DashboardTab dishes={dishes} onNavigate={id => setTab(id)} />}
          {tab === "dishes" && !editMode && (
            <DishListTab dishes={dishes} setDishes={setDishes} onEdit={handleEdit} />
          )}
          {tab === "edit" && (
            <EditFormTab dish={editingDish} onSave={handleSave} onCancel={() => setTab("dishes")} />
          )}
          {tab === "qr" && (
            <div>
              <h2 style={{ margin: "0 0 20px", fontFamily: "Lora, serif", fontSize: 22, color: "#1C1410" }}>Tu QR y enlace</h2>
              <div style={{ background: "#fff", borderRadius: 16, padding: 32, boxShadow: "0 1px 8px rgba(28,20,16,0.07)",
                display: "flex", gap: 40, alignItems: "flex-start", flexWrap: "wrap" }}>
                <div style={{ padding: 16, border: "2px solid #EDE9E3", borderRadius: 16, display: "inline-block" }}>
                  <QRCode size={180} />
                </div>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <h3 style={{ margin: "0 0 8px", fontFamily: "Lora, serif", fontSize: 18, color: "#1C1410" }}>Descargá tu QR</h3>
                  <p style={{ margin: "0 0 16px", color: "#7A6A5A", fontSize: 14, lineHeight: 1.6 }}>
                    Imprimilo y pegalo en tus mesas, mostrador, o en el frente del local. Recomendamos tamaño mínimo 5×5 cm para buena lectura.
                  </p>
                  <div style={{ background: "#F5F1EC", borderRadius: 10, padding: "10px 14px", marginBottom: 16 }}>
                    <p style={{ margin: 0, fontSize: 11, color: "#8C7B6A", marginBottom: 3 }}>Enlace directo</p>
                    <p style={{ margin: 0, fontSize: 14, fontFamily: "monospace", color: "var(--brand-color)", wordBreak: "break-all" }}>
                      menuqr.py/la-estancia
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", borderRadius: 10,
                      background: "var(--brand-color)", color: "#fff", border: "none", cursor: "pointer",
                      fontFamily: "DM Sans, sans-serif", fontWeight: 700, fontSize: 13 }}>
                      <Icon d={icons.download} size={15} /> Descargar PNG
                    </button>
                    <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", borderRadius: 10,
                      background: "#F5F1EC", color: "#5A4A3A", border: "none", cursor: "pointer",
                      fontFamily: "DM Sans, sans-serif", fontWeight: 600, fontSize: 13 }}>
                      <Icon d={icons.download} size={15} /> Descargar PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

window.AdminPanel = AdminPanel;
