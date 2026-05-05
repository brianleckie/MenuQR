# MenuQR — CLAUDE.md

> Leé esto antes de tocar cualquier archivo. Es la memoria del proyecto.

## Stack

| Capa | Tech |
|---|---|
| Frontend | React 18 + Vite + TypeScript (strict) |
| Estilos | Tailwind CSS v3 — sin CSS modules |
| Routing | React Router v6 |
| Data fetching | TanStack Query v5 |
| Backend / DB | Supabase (Auth + PostgreSQL + RLS) |
| Imágenes | Cloudinary (upload unsigned preset) |
| QR | qrcode.react |
| Deploy | Vercel |

## Estructura de carpetas

```
src/
  components/
    admin/      # Componentes del panel admin (tablas, forms, cards)
    menu/       # Componentes de la vista pública (DishCard, Modal, etc.)
    ui/         # Átomos reutilizables (Button, Input, Toggle, Badge)
  contexts/
    AuthContext.tsx
  hooks/        # Hooks de dominio si son muy grandes para queries.ts
  lib/
    supabase.ts        # Singleton cliente Supabase
    database.types.ts  # Generado por Supabase CLI
    queries.ts         # Todos los hooks de TanStack Query
  pages/
    admin/
      AdminLayout.tsx
      LoginPage.tsx
      DashboardPage.tsx
      MenuPage.tsx       # Gestión de platos (admin)
      CategoriesPage.tsx
      QRPage.tsx
      SettingsPage.tsx
    menu/
      MenuPage.tsx       # Vista pública del cliente
  routes/
    ProtectedRoute.tsx
  types/
    index.ts
  App.tsx
  main.tsx
  index.css
supabase/
  schema.sql     # Schema + RLS completo — ejecutar en dashboard
.env.example
```

## Convenciones de código

### TypeScript
- `strict: true` siempre. Cero `any`.
- Tipos globales en `src/types/index.ts`. No duplicar en otros archivos.
- Para tipos de Supabase: usar `Database['public']['Tables']['x']['Row']`.

### Componentes
- Un componente = un archivo. Named exports (no default en componentes).
- Props tipadas con `interface`, no `type`.
- Ningún componente hace fetch directamente — siempre via hooks de `queries.ts`.

### Styling
- Tailwind para todo. Sin `style={{}}` salvo para CSS variables dinámicas
  (ej: `style={{ background: 'var(--brand-color)' }}`).
- Color de marca: siempre `var(--brand-color)` — nunca hardcodear el hex.

### Data fetching
- Un hook por entidad en `queries.ts`.
- Query keys centralizadas en el objeto `qk`.
- Mutations invalidan las queries afectadas en `onSuccess`.

### Imágenes
- **Siempre Cloudinary**. Nunca base64 ni URLs de Supabase Storage para imágenes.
- El componente de upload recibe `onUpload: (url: string) => void`.
- Usar el upload preset unsigned `VITE_CLOUDINARY_UPLOAD_PRESET`.

### Auth
- Sesión via `useAuth()`. Nunca acceder a `supabase.auth` directamente en componentes.
- `user === undefined` → cargando. `user === null` → sin sesión. `user` → logueado.

## Rutas

| Path | Componente | Auth |
|---|---|---|
| `/` | → redirect `/admin` | — |
| `/admin` | AdminLayout → DashboardPage | ✅ |
| `/admin/login` | LoginPage | ❌ |
| `/admin/menu` | MenuPage (admin) | ✅ |
| `/admin/categories` | CategoriesPage | ✅ |
| `/admin/qr` | QRPage | ✅ |
| `/admin/settings` | SettingsPage | ✅ |
| `/menu/:slug` | MenuPage (pública) | ❌ |

## Supabase

### Tablas
- `businesses` — un registro por restaurante, `owner_id` = auth.uid()
- `categories` — secciones del menú (Entradas, Platos, etc.)
- `items` — platos individuales

### RLS (Row Level Security)
- **SELECT**: público en las 3 tablas (necesario para vista pública)
- **INSERT/UPDATE/DELETE**: solo si `auth.uid() = businesses.owner_id`

### Generar tipos
Después de ejecutar el schema:
```bash
npx supabase gen types typescript --project-id <id> > src/lib/database.types.ts
```

## Variables de entorno
Ver `.env.example`. Las que empiezan con `VITE_` son accesibles en el frontend.

## Sprints

### ✅ Sprint 1 Día 1 — Setup
- Proyecto Vite + TS creado
- Router con rutas base
- AuthContext + ProtectedRoute
- Hooks TanStack Query (queries.ts)
- Schema SQL + RLS
- .env.example

### ✅ Sprint 1 Día 2 — Supabase live
- Ejecutar schema.sql en dashboard
- Generar database.types.ts con CLI
- Crear primer usuario en Supabase Auth
- Probar login → redirige a /admin
- Probar /menu/:slug con datos reales

### ✅ Sprint 2 Día 2 — Admin conectado a Supabase real

#### Qué funciona con Supabase real
- **DashboardPage**: stats (platos, categorías, agotados) calculadas de `useItems` + `useCategories`. Banner si no hay negocio.
- **SettingsPage**: INSERT (crear negocio) y UPDATE (editar) conectados a Supabase. Slug auto-generado y validado. Preview de URL en tiempo real. Feedback "✓ Guardado" por 2 segundos.
- **CategoriesPage**: CRUD real — listar, inline editing (click → input → Enter/blur), nueva categoría inline, eliminar con confirm.
- **MenuItemsPage**: lista real con `useItems`. Toggle disponible/agotado con optimistic update. Eliminar con confirm. Drawer `ItemForm` para crear/editar.
- **QRPage**: QR generado con el slug real del negocio.
- **MenuPage pública**: modo demo (`!VITE_SUPABASE_URL`) usa MOCK_MENU_DATA; modo real usa `useMenuData(slug)` con loading/404.

#### Patrón de optimistic updates
`useToggleItemAvailability` usa `onMutate` para actualizar la cache localmente antes de que el servidor responda, y `onError` para revertir si falla:
```ts
onMutate: async ({ id, available, businessId }) => {
  await qc.cancelQueries({ queryKey: qk.items(businessId) })
  const prev = qc.getQueryData(qk.items(businessId))
  qc.setQueryData(qk.items(businessId), (old) =>
    old?.map(item => item.id === id ? { ...item, available } : item)
  )
  return { prev }
},
onError: (_err, { businessId }, ctx) => {
  qc.setQueryData(qk.items(businessId), ctx?.prev)
},
```

#### Cómo funciona el upload a Cloudinary
`src/components/admin/ImageUpload.tsx` sube via fetch POST sin firma:
```
POST https://api.cloudinary.com/v1_1/${VITE_CLOUDINARY_CLOUD_NAME}/image/upload
FormData: { file, upload_preset: VITE_CLOUDINARY_UPLOAD_PRESET }
```
Valida tipo (JPG/PNG/WEBP) y tamaño (max 5MB) antes de subir. Retorna `secure_url`.

#### Nuevos componentes
- `src/components/admin/ImageUpload.tsx` — upload con drag & drop, preview, validación
- `src/components/admin/ItemForm.tsx` — drawer desde la derecha, 480px en desktop, 100% en mobile

#### Nuevos hooks en queries.ts
- `useCreateBusiness()` — INSERT en businesses
- `useUpdateCategory()` — UPDATE nombre de categoría

### 🔲 Sprint 3 — MenuPage pública pulida
- Categorías sticky scroll ✅ (ya implementado)
- DishCard con modal bottom-sheet ✅ (ya implementado)
- WhatsApp FAB ✅ (ya implementado)
- SEO meta tags por negocio

### 🔲 Sprint 4 — QR + Deploy
- QRPage con qrcode.react ✅ (ya implementado)
- Descargar PNG / PDF ✅ (ya implementado)
- Deploy en Vercel
- Dominio custom
