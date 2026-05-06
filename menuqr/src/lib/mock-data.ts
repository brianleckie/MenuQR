import type { Business, Category, Item, MenuData } from '../types'

const NOW = '2026-04-21T00:00:00.000Z'

export const MOCK_BUSINESS: Business = {
  id: 'biz-la-estancia-1',
  owner_id: 'demo-user-1',
  slug: 'la-estancia',
  name: 'La Estancia',
  tagline: 'Cocina paraguaya con alma',
  logo_url: null,
  cover_url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
  primary_color: '#D4622A',
  whatsapp: '595981234567',
  address: 'Mcal. López 1250, Asunción',
  hours: 'Lun–Sáb 11:00–23:00 · Dom 11:00–16:00',
  created_at: NOW,
  updated_at: NOW,
}

export const MOCK_CATEGORIES: Category[] = [
  { id: 'entradas',    business_id: 'biz-la-estancia-1', name: 'Entradas',        sort_order: 1, created_at: NOW },
  { id: 'principales', business_id: 'biz-la-estancia-1', name: 'Platos Principales', sort_order: 2, created_at: NOW },
  { id: 'postres',    business_id: 'biz-la-estancia-1', name: 'Postres',          sort_order: 3, created_at: NOW },
  { id: 'bebidas',    business_id: 'biz-la-estancia-1', name: 'Bebidas',          sort_order: 4, created_at: NOW },
]

export const MOCK_ITEMS: Item[] = [
  // Entradas
  {
    id: 'item-1', business_id: 'biz-la-estancia-1', category_id: 'entradas',
    name: 'Empanadas de Carne', sort_order: 1, available: true, price: 18000,
    short_desc: 'Masa casera, carne con cebolla y huevo duro',
    description: 'Masa artesanal horneada al momento, rellena con carne picada especiada, cebolla, morrón verde y huevo duro. Se sirven de a tres unidades, con chimichurri de la casa.',
    image_url: 'https://images.unsplash.com/photo-1604467794349-0b74285de7e7?w=600&q=80',
    image_gravity: null, created_at: NOW, updated_at: NOW,
  },
  {
    id: 'item-2', business_id: 'biz-la-estancia-1', category_id: 'entradas',
    name: 'Sopa Paraguaya', sort_order: 2, available: true, price: 12000,
    short_desc: 'El clásico de clásicos. Maíz, queso Paraguay, cebolla',
    description: 'Nuestra versión de la sopa paraguaya tradicional: harina de maíz, queso Paraguay derretido, cebolla tierna y leche fresca. Horneada diariamente, servida tibia.',
    image_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80',
    image_gravity: null, created_at: NOW, updated_at: NOW,
  },
  {
    id: 'item-3', business_id: 'biz-la-estancia-1', category_id: 'entradas',
    name: 'Mandioca Frita', sort_order: 3, available: true, price: 15000,
    short_desc: 'Con mojo de ajo y perejil fresco',
    description: 'Mandioca fresca seleccionada, hervida y frita hasta dorar. Se sirve con mojo de ajo, limón y perejil. El acompañamiento perfecto para comenzar.',
    image_url: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&q=80',
    image_gravity: null, created_at: NOW, updated_at: NOW,
  },
  {
    id: 'item-4', business_id: 'biz-la-estancia-1', category_id: 'entradas',
    name: 'Tabla de Fiambres', sort_order: 4, available: false, price: 42000,
    short_desc: 'Jamón crudo, salame, queso Paraguay, aceitunas',
    description: 'Selección de fiambres y quesos locales: jamón serrano, salame artesanal, queso Paraguay curado y aceitunas marinadas. Para compartir entre dos.',
    image_url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80',
    image_gravity: null, created_at: NOW, updated_at: NOW,
  },

  // Platos Principales
  {
    id: 'item-5', business_id: 'biz-la-estancia-1', category_id: 'principales',
    name: 'Asado de Tira', sort_order: 1, available: true, price: 85000,
    short_desc: '500g de costilla a las brasas, mandioca y ensalada',
    description: 'Costilla de novillo a las brasas durante tres horas, con sal parrillera y limón. Se sirve con mandioca hervida, ensalada criolla y chimichurri de la casa. El plato insignia de La Estancia.',
    image_url: 'https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80',
    image_gravity: null, created_at: NOW, updated_at: NOW,
  },
  {
    id: 'item-6', business_id: 'biz-la-estancia-1', category_id: 'principales',
    name: 'Milanesa de Lomo', sort_order: 2, available: true, price: 65000,
    short_desc: 'Lomo fino apanado, papas fritas y huevo frito',
    description: 'Filete de lomo fino apanado con pan rallado artesanal y huevo batido. Servida con papas fritas caseras y huevo frito a punto. Una milanesa que se corta con el tenedor.',
    image_url: 'https://images.unsplash.com/photo-1585325701956-60dd9c8553bc?w=600&q=80',
    image_gravity: null, created_at: NOW, updated_at: NOW,
  },
  {
    id: 'item-7', business_id: 'biz-la-estancia-1', category_id: 'principales',
    name: 'Bife de Chorizo', sort_order: 3, available: true, price: 92000,
    short_desc: '350g al punto, con manteca de hierbas',
    description: 'Bife de chorizo de novillo, madurado 21 días, sellado a fuego alto y terminado con manteca de hierbas aromáticas. Se sirve con puré rústico de mandioca.',
    image_url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
    image_gravity: null, created_at: NOW, updated_at: NOW,
  },
  {
    id: 'item-8', business_id: 'biz-la-estancia-1', category_id: 'principales',
    name: 'Pollo al Limón', sort_order: 4, available: true, price: 55000,
    short_desc: 'Pechuga grillada, arroz y vegetales salteados',
    description: 'Pechuga de pollo marinada en limón, ajo y hierbas, grillada al punto justo. Acompañada con arroz blanco y vegetales de temporada salteados en aceite de oliva.',
    image_url: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c3?w=600&q=80',
    image_gravity: null, created_at: NOW, updated_at: NOW,
  },

  // Postres
  {
    id: 'item-9', business_id: 'biz-la-estancia-1', category_id: 'postres',
    name: 'Torta de Dulce de Leche', sort_order: 1, available: true, price: 22000,
    short_desc: 'Bizcochuelo húmedo, dulce de leche artesanal',
    description: 'Tres capas de bizcochuelo húmedo con dulce de leche artesanal entre cada capa y crema chantilly. Hecho en casa cada mañana. Un pedazo nunca es suficiente.',
    image_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80',
    image_gravity: null, created_at: NOW, updated_at: NOW,
  },
  {
    id: 'item-10', business_id: 'biz-la-estancia-1', category_id: 'postres',
    name: 'Helado Artesanal', sort_order: 2, available: true, price: 18000,
    short_desc: '2 bochas: dulce de leche, frutilla o chocolate',
    description: 'Helado elaborado con leche de tambo local. Sabores del día: dulce de leche granizado, frutilla con semillas y chocolate amargo. Servido en copa con crema y wafer.',
    image_url: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80',
    image_gravity: null, created_at: NOW, updated_at: NOW,
  },
  {
    id: 'item-11', business_id: 'biz-la-estancia-1', category_id: 'postres',
    name: 'Chipa Guazú Dulce', sort_order: 3, available: false, price: 20000,
    short_desc: 'Versión postre del clásico paraguayo',
    description: 'Interpretación dulce de la chipa guazú tradicional: choclo tierno, leche, queso y miel de caña. Servida tibia con helado de crema.',
    image_url: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80',
    image_gravity: null, created_at: NOW, updated_at: NOW,
  },

  // Bebidas
  {
    id: 'item-12', business_id: 'biz-la-estancia-1', category_id: 'bebidas',
    name: 'Tereré de La Casa', sort_order: 1, available: true, price: 15000,
    short_desc: 'Con menta, burrito y limón. Jarra 1L',
    description: 'Tereré preparado con yerba seleccionada, menta fresca, burrito, limón y hielo. Servido en jarra de 1 litro para la mesa. El ritual paraguayo en su máxima expresión.',
    image_url: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80',
    image_gravity: null, created_at: NOW, updated_at: NOW,
  },
  {
    id: 'item-13', business_id: 'biz-la-estancia-1', category_id: 'bebidas',
    name: 'Limonada con Jengibre', sort_order: 2, available: true, price: 12000,
    short_desc: 'Limones frescos, jengibre y miel. Sin gas',
    description: 'Jugo de limón recién exprimido con jengibre fresco, miel de abeja y agua sin gas. Refrescante y energizante. El mejor maridaje para el asado.',
    image_url: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=600&q=80',
    image_gravity: null, created_at: NOW, updated_at: NOW,
  },
  {
    id: 'item-14', business_id: 'biz-la-estancia-1', category_id: 'bebidas',
    name: 'Cerveza Artesanal', sort_order: 3, available: true, price: 25000,
    short_desc: 'Rubia o negra, 500ml. Elaboración local',
    description: 'Cerveza artesanal de producción local. Rubia estilo lager, suave y refrescante; o negra estilo stout con notas de café y chocolate. Presentación en botella de 500ml.',
    image_url: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=600&q=80',
    image_gravity: null, created_at: NOW, updated_at: NOW,
  },
]

export const MOCK_MENU_DATA: MenuData = {
  business: MOCK_BUSINESS,
  categories: MOCK_CATEGORIES.map((cat) => ({
    ...cat,
    items: MOCK_ITEMS.filter((item) => item.category_id === cat.id),
  })),
}

export function formatPrice(price: number): string {
  return 'Gs. ' + price.toLocaleString('es-PY')
}
