// La Estancia — restaurant data
const RESTAURANT = {
  name: "La Estancia",
  tagline: "Cocina paraguaya con alma",
  logo: "LE",
  brandColor: "#D4622A",
  cover: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
  hours: "Lun–Sáb 11:00–23:00 · Dom 11:00–16:00",
  whatsapp: "595981234567",
  address: "Mcal. López 1250, Asunción",
};

const CATEGORIES = [
  { id: "entradas", label: "Entradas" },
  { id: "principales", label: "Platos Principales" },
  { id: "postres", label: "Postres" },
  { id: "bebidas", label: "Bebidas" },
];

const DISHES = [
  // Entradas
  {
    id: 1, category: "entradas",
    name: "Empanadas de Carne",
    short: "Masa casera, carne con cebolla y huevo duro",
    desc: "Masa artesanal horneada al momento, rellena con carne picada especiada, cebolla, morrón verde y huevo duro. Se sirven de a tres unidades, con chimichurri de la casa.",
    price: 18000, available: true,
    image: "https://images.unsplash.com/photo-1604467794349-0b74285de7e7?w=600&q=80",
  },
  {
    id: 2, category: "entradas",
    name: "Sopa Paraguaya",
    short: "El clásico de clásicos. Maíz, queso Paraguay, cebolla",
    desc: "Nuestra versión de la sopa paraguaya tradicional: harina de maíz, queso Paraguay derretido, cebolla tierna y leche fresca. Horneada diariamente, servida tibia.",
    price: 12000, available: true,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80",
  },
  {
    id: 3, category: "entradas",
    name: "Mandioca Frita",
    short: "Con mojo de ajo y perejil fresco",
    desc: "Mandioca fresca seleccionada, hervida y frita hasta dorar. Se sirve con mojo de ajo, limón y perejil. El acompañamiento perfecto para comenzar.",
    price: 15000, available: true,
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&q=80",
  },
  {
    id: 4, category: "entradas",
    name: "Tabla de Fiambres",
    short: "Jamón crudo, salame, queso Paraguay, aceitunas",
    desc: "Selección de fiambres y quesos locales: jamón serrano, salame artesanal, queso Paraguay curado y aceitunas marinadas. Para compartir entre dos.",
    price: 42000, available: false,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
  },

  // Platos Principales
  {
    id: 5, category: "principales",
    name: "Asado de Tira",
    short: "500g de costilla a las brasas, mandioca y ensalada",
    desc: "Costilla de novillo a las brasas durante tres horas, con sal parrillera y limón. Se sirve con mandioca hervida, ensalada criolla y chimichurri de la casa. El plato insignia de La Estancia.",
    price: 85000, available: true,
    image: "https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80",
  },
  {
    id: 6, category: "principales",
    name: "Milanesa de Lomo",
    short: "Lomo fino apanado, papas fritas y huevo frito",
    desc: "Filete de lomo fino apanado con pan rallado artesanal y huevo batido. Servida con papas fritas caseras y huevo frito a punto. Una milanesa que se corta con el tenedor.",
    price: 65000, available: true,
    image: "https://images.unsplash.com/photo-1585325701956-60dd9c8553bc?w=600&q=80",
  },
  {
    id: 7, category: "principales",
    name: "Bife de Chorizo",
    short: "350g al punto, con manteca de hierbas",
    desc: "Bife de chorizo de novillo, madurado 21 días, sellado a fuego alto y terminado con manteca de hierbas aromáticas. Se sirve con puré rústico de mandioca.",
    price: 92000, available: true,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
  },
  {
    id: 8, category: "principales",
    name: "Pollo al Limón",
    short: "Pechuga grillada, arroz y vegetales salteados",
    desc: "Pechuga de pollo marinada en limón, ajo y hierbas, grillada al punto justo. Acompañada con arroz blanco y vegetales de temporada salteados en aceite de oliva.",
    price: 55000, available: true,
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c3?w=600&q=80",
  },

  // Postres
  {
    id: 9, category: "postres",
    name: "Torta de Dulce de Leche",
    short: "Bizcochuelo húmedo, dulce de leche artesanal",
    desc: "Tres capas de bizcochuelo húmedo con dulce de leche artesanal entre cada capa y crema chantilly. Hecho en casa cada mañana. Un pedazo nunca es suficiente.",
    price: 22000, available: true,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80",
  },
  {
    id: 10, category: "postres",
    name: "Helado Artesanal",
    short: "2 bochas: dulce de leche, frutilla o chocolate",
    desc: "Helado elaborado con leche de tambo local. Sabores del día: dulce de leche granizado, frutilla con semillas y chocolate amargo. Servido en copa con crema y wafer.",
    price: 18000, available: true,
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80",
  },
  {
    id: 11, category: "postres",
    name: "Chipa Guazú Dulce",
    short: "Versión postre del clásico paraguayo",
    desc: "Interpretación dulce de la chipa guazú tradicional: choclo tierno, leche, queso y miel de caña. Servida tibia con helado de crema.",
    price: 20000, available: false,
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80",
  },

  // Bebidas
  {
    id: 12, category: "bebidas",
    name: "Tereré de La Casa",
    short: "Con menta, burrito y limón. Jarra 1L",
    desc: "Tereré preparado con yerba seleccionada, menta fresca, burrito, limón y hielo. Servido en jarra de 1 litro para la mesa. El ritual paraguayo en su máxima expresión.",
    price: 15000, available: true,
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80",
  },
  {
    id: 13, category: "bebidas",
    name: "Limonada con Jengibre",
    short: "Limones frescos, jengibre y miel. Sin gas",
    desc: "Jugo de limón recién exprimido con jengibre fresco, miel de abeja y agua sin gas. Refrescante y energizante. El mejor maridaje para el asado.",
    price: 12000, available: true,
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=600&q=80",
  },
  {
    id: 14, category: "bebidas",
    name: "Cerveza Artesanal",
    short: "Rubia o negra, 500ml. Elaboración local",
    desc: "Cerveza artesanal de producción local. Rubia estilo lager, suave y refrescante; o negra estilo stout con notas de café y chocolate. Presentación en botella de 500ml.",
    price: 25000, available: true,
    image: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=600&q=80",
  },
];

const formatPrice = (n) => "Gs. " + n.toLocaleString("es-PY");

Object.assign(window, { RESTAURANT, CATEGORIES, DISHES, formatPrice });
