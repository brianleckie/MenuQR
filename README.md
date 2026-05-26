# MenuQR — Handoff de Diseño

Paquete de entregables para integración en el repo de menuqr.lat.

## 📁 Archivos

| Archivo | Qué es |
|---|---|
| **Landing.html** | Página principal. Hero con celular, marquee, cómo funciona, funciones, precio (ticket), shoutout, footer. |
| **Login.html** | Página de login del admin. Layout split-screen: brand panel izquierdo + form derecho. |
| **MenuQR.html** | Demo del menú público y panel admin (referencia visual). |
| **PublicMenu.jsx** | Componente React del menú público (lo que ve el cliente al escanear el QR). |
| **AdminPanel.jsx** | Componente React del dashboard del dueño del restaurante. |
| **data.jsx** | Datos demo (restaurante, categorías, platos). |
| **assets/** | Logos y otros assets. *(El logo nuevo es SVG inline en cada HTML — ver sección abajo.)* |

---

## 🎨 Sistema de diseño

### Paleta — "Mercado"

```css
--butter:      #FBF4E2;  /* fondo principal: manteca cálida */
--butter-deep: #F2E8CE;  /* tarjetas sobre manteca */
--paprika:     #E54A24;  /* paprika — el color que vende (CTAs, acentos) */
--paprika-deep:#B43417;  /* hover de paprika */
--forest:      #1A3329;  /* verde monte: secciones oscuras */
--forest-soft: #2A4F3E;
--dijon:       #E8B23A;  /* mostaza: highlights */
--clay:        #D89B6E;  /* terracota suave */
--ink:         #161310;  /* tinta: texto y bordes */
--ink-soft:    #5A4E40;  /* texto secundario */
--line:        #D8C9A1;  /* líneas (dotted leader, divisores) */
--paper:       #FFFCF4;  /* blanco crema (inputs, cards) */
```

### Tipografía

- **Display / títulos**: `"Bricolage Grotesque"`, weights 400/500/600/700/800. `letter-spacing: -0.04em`.
- **Cuerpo / UI**: `"Hanken Grotesk"`, weights 400/500/600/700.
- **Mono / detalles**: `"JetBrains Mono"`, weights 400/500. Para precios, tags, fineprint, sellos.

Cargar con:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Hanken+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet"/>
```

### Vocabulario visual

- **Hard shadows** (no blur): `box-shadow: 5px 5px 0 var(--ink)`. Estilo "menú impreso".
- **Bordes**: `1.5px solid var(--ink)`.
- **Sin border-radius en botones/cards principales** — todo es rectangular y rotundo (vibe ticket de papel).
- **Dotted leaders** entre nombre/precio en listas (como menús reales):
  ```css
  .leader { flex:1; border-bottom:2px dotted var(--line); margin:0 12px; align-self:flex-end; height:14px; }
  ```
- **Ticker / marquee** con animación CSS `tick 32s linear infinite`.
- **Sellos rotados** (rotate -2deg a -5deg) con sombra dura para acentos tipo "14 días gratis".
- **Tipografía italic + paprika** en palabras clave dentro de títulos.

### Logo

Es un **SVG inline** (no PNG). Combinación de:
- Icono: 3 esquinas estilo finder pattern de QR (2 ink + 1 paprika) + bits sueltos a la derecha.
- Wordmark: `menu` ink + `qr` en paprika, Bricolage Grotesque weight 800.

Variante invertida para fondos oscuros: ink→butter, paprika→dijon (ver `Login.html` brand panel).

El SVG está copiado tal cual en `Landing.html` (nav y footer) y `Login.html` (brand panel). Para integrar al repo, sugerencia: extraer a un componente `<Logo />` / `<LogoInverted />`.

---

## 🔧 Notas para integración

1. **Login.html** asume rutas `Landing.html` y `MenuQR.html` — ajustar a las rutas reales del SPA (e.g. `/`, `/admin/dashboard`).
2. El form de login es **estático** — falta conectarlo al backend (POST a `/api/auth/login` o lo que uses).
3. El botón "Continuar con Google" tampoco está conectado (OAuth flow).
4. Las imágenes del celular en el hero son de Unsplash (verificadas que correspondan al plato). Considerar mover a CDN propio.
5. El restaurante demo se llama "TuMenú" (logo "TM") — fácil de cambiar buscando esos strings.

---

## 📐 Breakpoints

- `980px` — el grid del hero pasa a 1 columna, el split del login también, los pasos pasan a stack.
- `640px` / `520px` — ajustes mobile (paddings reducidos, logo más chico, etc.).

---

Cualquier duda, los estilos están todos inline en cada HTML — no hay CSS externo. Suerte 🧉
