// PublicMenu — what the customer sees after scanning QR

const { useState, useEffect, useRef } = React;

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.524 5.845L.057 23.571a.5.5 0 0 0 .609.61l5.801-1.525A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.37l-.36-.213-3.724.977.993-3.63-.233-.374A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}

// ── Dish Card ───────────────────────────────────────────────────────────────
function DishCard({ dish, onClick }) {
  const [imgErr, setImgErr] = useState(false);
  return (
    <div onClick={() => dish.available && onClick(dish)} style={{
      background: "#fff",
      borderRadius: 16,
      overflow: "hidden",
      boxShadow: "0 2px 12px rgba(28,20,16,0.08)",
      cursor: dish.available ? "pointer" : "default",
      transition: "transform 0.15s, box-shadow 0.15s",
      opacity: dish.available ? 1 : 0.72,
    }}
      onMouseEnter={e => { if (dish.available) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(28,20,16,0.13)"; }}}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 2px 12px rgba(28,20,16,0.08)"; }}
    >
      {/* Photo */}
      <div style={{ position: "relative", paddingBottom: "66.67%", background: "#EDE9E3", overflow: "hidden" }}>
        {!imgErr ? (
          <img src={dish.image} alt={dish.name}
            onError={() => setImgErr(true)}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
              filter: dish.available ? "none" : "grayscale(60%)" }} />
        ) : (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
            background: "repeating-linear-gradient(45deg,#EDE9E3,#EDE9E3 6px,#E4DED6 6px,#E4DED6 12px)" }}>
            <span style={{ fontFamily: "monospace", fontSize: 10, color: "#9E8E7E", textAlign: "center", padding: "0 8px" }}>foto del plato</span>
          </div>
        )}
        {!dish.available && (
          <div style={{ position: "absolute", top: 8, left: 8 }}>
            <span style={{ background: "rgba(30,20,10,0.65)", color: "#D6CFC6", fontSize: 10, fontWeight: 600,
              padding: "3px 8px", borderRadius: 20, letterSpacing: "0.04em", fontFamily: "DM Sans, sans-serif",
              textDecoration: "line-through", textDecorationColor: "rgba(255,255,255,0.5)" }}>
              AGOTADO
            </span>
          </div>
        )}
      </div>
      {/* Info */}
      <div style={{ padding: "12px 12px 14px" }}>
        <p style={{ margin: "0 0 3px", fontFamily: "Lora, serif", fontSize: 14, fontWeight: 600,
          color: "#1C1410", lineHeight: 1.3 }}>{dish.name}</p>
        <p style={{ margin: "0 0 8px", fontFamily: "DM Sans, sans-serif", fontSize: 11.5, color: "#8C7B6A",
          lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {dish.short}
        </p>
        <p style={{ margin: 0, fontFamily: "DM Sans, sans-serif", fontSize: 13.5, fontWeight: 700,
          color: dish.available ? "var(--brand-color)" : "#9E9E9E",
          textDecoration: dish.available ? "none" : "line-through" }}>
          {formatPrice(dish.price)}
        </p>
      </div>
    </div>
  );
}

// ── Detail Modal ────────────────────────────────────────────────────────────
function DishModal({ dish, onClose }) {
  const [imgErr, setImgErr] = useState(false);
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  if (!dish) return null;
  return (
    <div onClick={onClose} style={{
      position: "absolute", inset: 0, zIndex: 100,
      background: "rgba(28,20,16,0.55)", backdropFilter: "blur(4px)",
      display: "flex", alignItems: "flex-end",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#FAFAF8", borderRadius: "24px 24px 0 0", width: "100%",
        maxHeight: "88%", overflow: "auto",
        animation: "slideUp 0.28s cubic-bezier(0.32,0.72,0,1)",
      }}>
        {/* Handle */}
        <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 4px" }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: "#D4C9BC" }} />
        </div>
        {/* Photo */}
        <div style={{ position: "relative", paddingBottom: "56%", background: "#EDE9E3", overflow: "hidden", margin: "0 16px", borderRadius: 16 }}>
          {!imgErr ? (
            <img src={dish.image} alt={dish.name} onError={() => setImgErr(true)}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
              background: "repeating-linear-gradient(45deg,#EDE9E3,#EDE9E3 6px,#E4DED6 6px,#E4DED6 12px)" }}>
              <span style={{ fontFamily: "monospace", fontSize: 11, color: "#9E8E7E" }}>foto del plato</span>
            </div>
          )}
          {!dish.available && (
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(28,20,16,0.45)" }}>
              <span style={{ color: "#fff", fontFamily: "DM Sans, sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: "0.08em" }}>AGOTADO</span>
            </div>
          )}
          <button onClick={onClose} style={{
            position: "absolute", top: 10, right: 10,
            background: "rgba(28,20,16,0.5)", backdropFilter: "blur(8px)",
            border: "none", borderRadius: "50%", width: 36, height: 36,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "#fff",
          }}><CloseIcon /></button>
        </div>
        {/* Content */}
        <div style={{ padding: "20px 20px 36px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
            <h2 style={{ margin: 0, fontFamily: "Lora, serif", fontSize: 22, fontWeight: 700, color: "#1C1410", lineHeight: 1.25, flex: 1 }}>
              {dish.name}
            </h2>
            <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 18, fontWeight: 800,
              color: dish.available ? "var(--brand-color)" : "#9E9E9E", whiteSpace: "nowrap",
              textDecoration: dish.available ? "none" : "line-through" }}>
              {formatPrice(dish.price)}
            </span>
          </div>
          <p style={{ margin: "12px 0 0", fontFamily: "DM Sans, sans-serif", fontSize: 14.5, color: "#5A4A3A", lineHeight: 1.65 }}>
            {dish.desc}
          </p>
          {dish.available && (
            <a href={`https://wa.me/${RESTAURANT.whatsapp}?text=Hola! Quiero pedir: ${encodeURIComponent(dish.name)}`}
              target="_blank" rel="noopener"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                marginTop: 24, padding: "14px 20px", borderRadius: 14,
                background: "var(--brand-color)", color: "#fff", textDecoration: "none",
                fontFamily: "DM Sans, sans-serif", fontWeight: 700, fontSize: 15 }}>
              <WhatsAppIcon /> Pedir por WhatsApp
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Public Menu ─────────────────────────────────────────────────────────────
function PublicMenu() {
  const [activeCategory, setActiveCategory] = useState("entradas");
  const [selectedDish, setSelectedDish] = useState(null);
  const pillsRef = useRef(null);
  const sectionRefs = useRef({});

  const scrollToCategory = (id) => {
    setActiveCategory(id);
    const el = sectionRefs.current[id];
    if (el) {
      el.scrollIntoView({ block: "start" });
      // offset for sticky header (~130px)
      const container = el.closest("[data-scroll-container]");
      if (container) container.scrollTop -= 128;
    }
  };

  return (
    <div style={{ background: "#FAFAF8", height: "100%", display: "flex", flexDirection: "column", fontFamily: "DM Sans, sans-serif", position: "relative", overflow: "hidden" }}>
      <style>{`
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .pill-scroll::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Scrollable area */}
      <div data-scroll-container style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>

        {/* Cover + Header */}
        <div style={{ position: "relative" }}>
          <div style={{ height: 180, background: "#2A1810", overflow: "hidden" }}>
            <img src={RESTAURANT.cover} alt="restaurante"
              style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.65 }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 30%, rgba(28,16,8,0.7))" }} />
          </div>

          {/* Logo + info overlay */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 16px 16px", display: "flex", alignItems: "flex-end", gap: 12 }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: "var(--brand-color)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontFamily: "Lora, serif", fontWeight: 700, fontSize: 18,
              border: "2px solid rgba(255,255,255,0.3)", flexShrink: 0 }}>
              {RESTAURANT.logo}
            </div>
            <div style={{ flex: 1 }}>
              <h1 style={{ margin: 0, fontFamily: "Lora, serif", fontSize: 22, fontWeight: 700, color: "#fff", lineHeight: 1.1 }}>
                {RESTAURANT.name}
              </h1>
              <p style={{ margin: "2px 0 0", fontSize: 12, color: "rgba(255,255,255,0.75)", fontStyle: "italic" }}>
                {RESTAURANT.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* Info bar */}
        <div style={{ padding: "10px 16px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, color: "#7A6A5A", fontSize: 11.5 }}>
            <ClockIcon />
            <span>{RESTAURANT.hours}</span>
          </div>
          <a href={`https://wa.me/${RESTAURANT.whatsapp}`} target="_blank" rel="noopener"
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 20,
              background: "#25D366", color: "#fff", textDecoration: "none", fontWeight: 700, fontSize: 12 }}>
            <WhatsAppIcon /> WhatsApp
          </a>
        </div>

        {/* Sticky category pills */}
        <div style={{ position: "sticky", top: 0, zIndex: 10, background: "#FAFAF8",
          borderBottom: "1px solid #EDE9E3", paddingTop: 12, paddingBottom: 12 }}>
          <div ref={pillsRef} className="pill-scroll" style={{
            display: "flex", gap: 8, overflowX: "auto", padding: "0 16px",
            scrollbarWidth: "none", msOverflowStyle: "none",
          }}>
            {CATEGORIES.map(cat => (
              <button key={cat.id} onClick={() => scrollToCategory(cat.id)}
                style={{
                  flexShrink: 0, padding: "7px 16px", borderRadius: 100, border: "none",
                  cursor: "pointer", fontFamily: "DM Sans, sans-serif", fontWeight: 600, fontSize: 13,
                  transition: "all 0.18s",
                  background: activeCategory === cat.id ? "var(--brand-color)" : "#EDE9E3",
                  color: activeCategory === cat.id ? "#fff" : "#5A4A3A",
                }}>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category sections */}
        <div style={{ padding: "8px 16px 40px" }}>
          {CATEGORIES.map(cat => {
            const dishes = DISHES.filter(d => d.category === cat.id);
            return (
              <div key={cat.id} ref={el => sectionRefs.current[cat.id] = el} style={{ marginTop: 24 }}>
                <h2 style={{ margin: "0 0 14px", fontFamily: "Lora, serif", fontSize: 18, fontWeight: 700, color: "#1C1410",
                  display: "flex", alignItems: "center", gap: 10 }}>
                  {cat.label}
                  <span style={{ height: 1, flex: 1, background: "#E8E0D6" }} />
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {dishes.map(dish => (
                    <DishCard key={dish.id} dish={dish} onClick={setSelectedDish} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedDish && (
        <DishModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
      )}
    </div>
  );
}

window.PublicMenu = PublicMenu;
