// Catálogo de canje de puntos - Optimizado UX
import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Search, Menu, ChevronDown, ChevronLeft, ChevronRight, X, Sparkles, Tag, Baby, Home, Sofa, ShoppingBag, Heart, Laptop, Bike, Wine, Zap, Package, Watch, Eye } from 'lucide-react';
import { useNavigate } from 'react-router';
import { ProductDetail } from './ProductDetail';
import { AllCatalogView } from './AllCatalogView';
import bannerImage from 'figma:asset/dc2114359e73acb6fbb177df80872e0d6289e15a.png';
import bannerImage2 from 'figma:asset/01f923bd277147d3e81cde4bd3bc5e9acfbb2e9a.png';
import bannerImage3 from 'figma:asset/bb50767d49e6150d19f04b641a062c69494b4a1e.png';
import bannerImage4 from 'figma:asset/6f248201efdb509cc8deec8ef37cf237650483e6.png';
import logoDesafioSawa from 'figma:asset/90d0b6e7e40ee202a8c067619d31d9c79731c384.png';
import profileImage from 'figma:asset/9f5aa0e583374b6893d8921a6183b99d788006eb.png';
import coinIcon from 'figma:asset/db29ff4dc98462b3539ca31d029b8918fad5d4e6.png';
import riccadonnaImage from 'figma:asset/e326815743f65c4fffda6ad25647ca82a0de59d8.png';
import davidoffImage from 'figma:asset/b4381e97df547c8c32599c21f1dccd8747b274df.png';
import errazurizImage1 from 'figma:asset/b7933288d7a3165d7ec05f2be47443bab6f10d96.png';
import errazurizImage2 from 'figma:asset/7cae0b9af4a51e508ecbda1dfe097b586d1eb957.png';
import errazurizImage3 from 'figma:asset/ad9eae760817a021b31d9744f489ac949795362a.png';
import bubbaImage1 from 'figma:asset/600fbb24be83259626e25ffcff95ce8c0f5e2c38.png';
import bubbaImage2 from 'figma:asset/abc526a7aef15aede0dedb5fd49ee4e9966e402f.png';
import bubbaImage3 from 'figma:asset/2831dad003079fb0d23ed80e234d8c847e385a77.png';
import bubbaImage4 from 'figma:asset/dee1640f1d69baaa597696579df139a33ea8cd95.png';
import lgTvImage1 from 'figma:asset/0f180057888c5c0987f4266d178acdaf9d7ccfb0.png';
import lgTvImage2 from 'figma:asset/19f30675ddeb3768eb1a2f3ea4879d62b28ff95a.png';
import lgTvImage3 from 'figma:asset/a748687754c00ebb82335939b33b77dd6609e434.png';
import lgTvImage4 from 'figma:asset/21478675322a03d4bb90c8e429aa02bf2047a3e3.png';
import nintendoSwitchImage from 'figma:asset/6cd1cb024a14da331ced1255244ad60959ede15f.png';
import samsungBudsImage from 'figma:asset/56adf19129b163593fd6d6be0b0dc99ec31e7075.png';
import ps5Image from 'figma:asset/1a1165518333401c7eef14aa9da9da52b7796095.png';
import ipadImage from 'figma:asset/bad02856ba53d08c9b7593afecc5eea29a666876.png';
import infantilImage from 'figma:asset/bca15564c6b0abeeaf7c0a045f67ebca2f1569cf.png';
import electrohogarImage from 'figma:asset/0aec41c4eac2a249358839e81af8d8220b106f38.png';
import hogarImage from 'figma:asset/7e167de7497143a4e9852907d84f5a1912114b61.png';
import accesoriosModaImage from 'figma:asset/3c3ee1b70395f56240b0fa0a7c62514c48a72f3b.png';
import bellezaImage from 'figma:asset/18caa070cc480aa2a0eb5d23b6ab31be59785609.png';
import tecnologiaImage from 'figma:asset/5a9dddb9f270e307ac78896cbd179bbbc35ae645.png';
import tiempoLibreImage from 'figma:asset/8ab4b69873f42ebcbfde56c403414a822c191477.png';
import barGourmetImage from 'figma:asset/9a09fa38255632c066e079c7b8858b81ad978666.png';
import sawaFullImage from 'figma:asset/20a0075f46fa15aaaa8302ad8c352c7cfe7d295b.png';

export function Catalog() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(1);
  const [direction, setDirection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [profileDrawerOpen, setProfileDrawerOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [fromAllCatalog, setFromAllCatalog] = useState(false);
  const [productQuantity, setProductQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showAllCatalog, setShowAllCatalog] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const userPoints = 15000;
  const productsScrollRef = useRef<HTMLDivElement>(null);
  const categoriesScrollRef = useRef<HTMLDivElement>(null);
  const categoriesButtonRef = useRef<HTMLButtonElement>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [hasPlayedInitialBounce, setHasPlayedInitialBounce] = useState(false);

  const bannerSlides = [bannerImage, bannerImage2, bannerImage3, bannerImage4];
  const infiniteSlides = [bannerSlides[bannerSlides.length - 1], ...bannerSlides, bannerSlides[0]];

  // Detectar si es mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Activar animación bounce inicial solo en mobile después de un breve delay
  useEffect(() => {
    if (isMobile) {
      const timer = setTimeout(() => {
        setHasPlayedInitialBounce(true);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [isMobile]);

  // Auto-play del carrusel cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentSlide === 0) {
      const timer = setTimeout(() => {
        setIsTransitioning(true);
        setCurrentSlide(bannerSlides.length);
        setTimeout(() => setIsTransitioning(false), 50);
      }, 500);
      return () => clearTimeout(timer);
    } else if (currentSlide === infiniteSlides.length - 1) {
      const timer = setTimeout(() => {
        setIsTransitioning(true);
        setCurrentSlide(1);
        setTimeout(() => setIsTransitioning(false), 50);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentSlide, bannerSlides.length, infiniteSlides.length]);

  const nextSlide = () => {
    if (!isTransitioning) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const goToSlide = (index: number) => {
    if (!isTransitioning) {
      setCurrentSlide(index + 1);
    }
  };

  // Handlers para touch/swipe en el carrusel
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(0);
    setTouchEnd(0);
    setIsSwiping(false);
  };

  // Funciones de scroll para productos
  const scrollProducts = (direction: 'left' | 'right') => {
    if (productsScrollRef.current) {
      const scrollAmount = 400;
      const newScrollPosition = direction === 'left' 
        ? productsScrollRef.current.scrollLeft - scrollAmount
        : productsScrollRef.current.scrollLeft + scrollAmount;
      
      productsScrollRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  // Funciones de scroll para categorías
  const scrollCategories = (direction: 'left' | 'right') => {
    if (categoriesScrollRef.current) {
      const scrollAmount = 400;
      const newScrollPosition = direction === 'left' 
        ? categoriesScrollRef.current.scrollLeft - scrollAmount
        : categoriesScrollRef.current.scrollLeft + scrollAmount;
      
      categoriesScrollRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  const featuredProducts = [
    {
      id: 1,
      name: '6 Unidades de Espumante Riccadonna Prosecco 750cc',
      brand: 'RICCADONNA',
      points: 2500,
      image: riccadonnaImage,
      images: [riccadonnaImage, riccadonnaImage, riccadonnaImage, riccadonnaImage, riccadonnaImage, riccadonnaImage],
      available: true,
      stock: 15,
      description: '6 Unidades de Espumante Riccadonna Prosecco 750cc: Producto nuevo. Fresco y crujiente, Riccadonna Proseco ofrece un gran equilibrio entre los sabores afrutados de la manzana verde, el melón dulce, la pera y la madreselva de las uvas glera semi aromáticas. Un complemento perfecto para el aperitivo, además de combinarse con Aperol en Aperol Spritz, mientras se comparte buenos momentos con amigos. El brillo y el aroma son un maridaje refrescante con canapés de verduras, focaccia, bocadillos pequeños con jamón y queso. Su suntuosidad también hace que acompañe fácilmente pescados ligeramente picantes o carnes blancas. Color: Amarillo brillante Aroma: Afrutado y floral, con notas cítricas y de piel de manzana. Sabor: Seco y crujiente, como morder una manzana fresca, final efervescente con un toque de bocado.',
      features: [
        'Cancelación activa de ruido mejorada hasta 2x',
        'Audio espacial personalizado con seguimiento dinámico de la cabeza',
        'Modo Ambiente adaptativo',
        'Hasta 6 horas de reproducción con una sola carga',
        'Estuche de carga MagSafe con altavoz integrado',
        'Resistencia al agua y al sudor (IPX4)'
      ],
      specs: [
        { label: 'Conectividad', value: 'Bluetooth 5.3' },
        { label: 'Chip', value: 'Apple H2' },
        { label: 'Batería', value: 'Hasta 30h con estuche' },
        { label: 'Puerto', value: 'USB-C' },
        { label: 'Peso', value: '5.3g por auricular' }
      ]
    },
    {
      id: 2,
      name: 'Perfume Mujer Davidoff Cool Water 100Ml',
      brand: 'DAVIDOFF',
      points: 1500,
      image: davidoffImage,
      images: [davidoffImage, davidoffImage, davidoffImage, davidoffImage, davidoffImage],
      available: true,
      stock: 23,
      description: 'Perfume Mujer Davidoff Cool Water 100Ml: Cool Water de Davidoff es una fragancia de la familia olfativa Floral Acuática para Mujeres. Cool Water se lanzó en 1996. La Nariz detrás de esta fragancia es Pierre Bourdon. Las Notas de Salida son piña, membrillo, grosellas negras, azucena, melón, limón (lima ácida), flor de loto y calone; las Notas de Corazón son miel, flor del espino, jazmín, nenúfar (lirio de agua), lirio de los valles (muguete), flor de loto y rosa; las Notas de Fondo son zarzamora (frambuesa negra), raíz de la violeta, sándalo, almizcle, frambuesa, vainilla, durazno (melocotón) y vetiver.',
      features: [
        'Cancelación activa de ruido',
        'Audio espacial personalizado',
        'Hasta 5 horas de reproducción',
        'Estuche de carga USB-C',
        'Chip H2 de Apple',
        'Control táctil mejorado'
      ],
      specs: [
        { label: 'Conectividad', value: 'Bluetooth 5.3' },
        { label: 'Chip', value: 'Apple H2' },
        { label: 'Batería', value: 'Hasta 30h con estuche' },
        { label: 'Puerto', value: 'USB-C' }
      ]
    },
    {
      id: 3,
      name: 'Pack de 2 Vinos Errázuriz Max Cabernet Sauvignon + Carmenere 750cc',
      brand: 'ERRÁZURIZ',
      points: 3000,
      image: errazurizImage1,
      images: [errazurizImage1, errazurizImage2, errazurizImage3],
      available: true,
      stock: 8,
      description: 'Pack de 2 Vinos Errázuriz Max Cabernet Sauvignon + Carmenere 750cc: Sorprende con lo mejor de Errázuriz Max. Contenido: 1x Errazuriz Cabernet Sauvignon 1x Errazuriz Carmenere *Este producto no es aplicable a devolución por no cumplimiento de expectativas*',
      features: [
        'Pantalla OLED de 7 pulgadas',
        'Resolución 1280x720 en modo portátil',
        '64GB de almacenamiento interno',
        'Audio mejorado',
        'Soporte ajustable trasero',
        'Incluye Mario Kart 8 Deluxe'
      ],
      specs: [
        { label: 'Pantalla', value: '7" OLED' },
        { label: 'Resolución', value: '1280x720' },
        { label: 'Almacenamiento', value: '64GB' },
        { label: 'Batera', value: '4.5-9 horas' }
      ]
    },
    {
      id: 4,
      name: 'Audifonos TWS Noise Cancelling Liberty 4 NC Soundcore Blanco',
      brand: 'SOUNDCORE',
      points: 1800,
      image: riccadonnaImage,
      images: [riccadonnaImage, riccadonnaImage, riccadonnaImage],
      available: true,
      stock: 20,
      description: 'Audifonos TWS Noise Cancelling Liberty 4 NC Soundcore Blanco: Audífonos Inalámbricos soundcore Liberty 4NC Los nuevos auriculares verdaderamente inalámbricos reducen el ruido hasta en un 98,5% Reduce el ruido hasta en un 98,5% con nuestro avanzado sistema de cancelación de ruido Adaptive ANC 2.0 se adapta a tus oídos y al entorno en tiempo real Controladores de 11 mm, tecnología inalámbrica de alta resolución y LDAC para un sonido nítido EQ totalmente ajustable con Hear ID 2.0 para un perfil de sonido personalizado 10/50 horas de batería para un silencio duradero Conexión multipunto Fast Pair y Bluetooth 5.3 Resistencia al agua IPX4 contra derrames de agua y lluvia 6 micrófonos y un algoritmo de IA permiten llamadas más nítidas',
      features: [
        'Cancelación activa de ruido inteligente',
        'Audio Hi-Fi de 24 bits',
        'Resistencia al agua IPX7',
        'Hasta 8 horas de reproducción',
        'Carga inalámbrica',
        'Detección de uso automática'
      ],
      specs: [
        { label: 'Conectividad', value: 'Bluetooth 5.3' },
        { label: 'Audio', value: 'Hi-Fi 24-bit' },
        { label: 'Batería', value: 'Hasta 29h con estuche' },
        { label: 'Resistencia', value: 'IPX7' }
      ]
    },
    {
      id: 5,
      name: 'Crossbag Vefree Black Bubba',
      brand: 'BUBBA',
      points: 4500,
      image: bubbaImage1,
      images: [bubbaImage1, bubbaImage2, bubbaImage3, bubbaImage4],
      available: true,
      stock: 5,
      description: 'Crossbag Vefree Black Bubba: Descubre el Crossbag de la colección VeFree: un bolso de cuero vegano con diseño cruzado y correa ajustable. Equipado con cierres metálicos, ofrece un amplio compartimento principal y uno adicional en la parte posterior. Incluye un práctico tarjetero interior con espacio para hasta tres tarjetas. Ideal para quienes buscan funcionalidad y estilo en un solo accesorio!',
      features: [
        'Material de cuero vegano',
        'Diseño cruzado',
        'Correa ajustable',
        'Cierres metálicos',
        'Compartimento principal amplio',
        'Compartimento adicional en la parte posterior',
        'Tarjetero interior con espacio para hasta tres tarjetas'
      ],
      specs: [
        { label: 'Material', value: 'Cuero vegano' },
        { label: 'Diseño', value: 'Cruzado' },
        { label: 'Correa', value: 'Ajustable' },
        { label: 'Cierres', value: 'Metálicos' },
        { label: 'Compartimentos', value: 'Principal y adicional en la parte posterior' },
        { label: 'Tarjetero interior', value: 'Espacio para hasta tres tarjetas' }
      ]
    },
    {
      id: 6,
      name: 'LED Smart TV 55\'\' UHD 4K 55UT7300PSA 2024',
      brand: 'LG',
      points: 3800,
      image: lgTvImage1,
      images: [lgTvImage1, lgTvImage2, lgTvImage3, lgTvImage4],
      available: true,
      stock: 12,
      description: `LED Smart TV 55'' UHD 4K 55UT7300PSA 2024: Pantalla LED UHD 4K de 55 pulgadas con resolución 3840 x 2160. Sintonizador digital integrado. Conectividad WiFi y Bluetooth. Incluye 3 entradas HDMI y 2 entradas USB. Compatible con Magic Remote. Dimensiones con base: 77.7 x 122.6 x 28.7 cm. Peso con base: 14.8 kg. Eficiencia energética clase A. Incluye control remoto estándar, manual, cable de alimentación y pilas. Garantía de 12 meses.`,
      features: [
        'Pantalla LED UHD 4K 55 pulgadas',
        'Sintonizador digital',
        'Conectividad WiFi + Bluetooth',
        '3 entradas HDMI, 2 entradas USB',
        'Compatible con Magic Remote',
        'Eficiencia energética clase A'
      ],
      specs: [
        { label: 'Modelo', value: '55UT7300PSA' },
        { label: 'Resolución', value: '3840 x 2160' },
        { label: 'Dimensiones con base', value: '77.7 x 122.6 x 28.7 cm' },
        { label: 'Peso con base', value: '14.8 kg' }
      ]
    }
  ];

  const categories = [
    { 
      id: 1, 
      name: 'Infantil', 
      image: infantilImage,
      subcategories: [
        {
          title: 'Mundo bebé',
          items: ['Coches', 'Sillas de auto', 'Sillas de comer', 'Cunas', 'Andadores', 'Seguridad', 'Lactancia y alimentación', 'Estimulación', 'Higiene y baño', 'Sillas nido', 'Bolsos maternales', 'Juguetería']
        },
        {
          title: 'Juguetería',
          items: ['Puzzles y juegos de mesa', 'Juguetería', 'Autos y pistas de juguete', 'Figuras de acción y coleccionables', 'Muñecas y accesorios', 'Juegos de exterior', 'Bloques de construcción', 'Arte y manualidades', 'Juegos de rol', 'Peluches', 'Juguetes didácticos', 'Instrumentos musicales', 'Clásicos']
        },
        {
          title: 'Rodados',
          items: ['Rodados', 'Bicicletas', 'Scooters y patines', 'Vehículos eléctricos', 'Equipamiento deportivo infantil']
        },
        {
          title: 'Escolares',
          items: ['Escolares']
        }
      ]
    },
    { 
      id: 2, 
      name: 'Electrohogar', 
      image: electrohogarImage,
      subcategories: [
        {
          title: 'Electrodomésticos',
          items: ['Hornos y microondas', 'Cocina entretenida', 'Batidoras', 'Cocina inteligente', 'Exprimidores y sacajugos', 'Freidoras de aire', 'Licuadoras', 'Parrillas eléctricas', 'Picadoras', 'Tostadoras y sandwicheras', 'Cafeteras eléctricas', 'Hervidores']
        },
        {
          title: 'Electrohogar',
          items: ['Climatización', 'Smart Home', 'Limpieza y planchado', 'Calientacamas', 'Aspiradoras', 'Planchas de ropa', 'Línea blanca']
        }
      ]
    },
    { 
      id: 3, 
      name: 'Hogar', 
      image: hogarImage,
      subcategories: [
        {
          title: 'Mascotas',
          items: ['Mascotas']
        },
        {
          title: 'Menaje comedor',
          items: ['Vasos y copas', 'Cuchillería', 'Loza y vajilla']
        },
        {
          title: 'Menaje cocina',
          items: ['Cuchillos y tablas', 'Accesorios de cocina', 'Sartenes', 'Cafeteras', 'Botellas y termos', 'Organizadores', 'Ollas', 'Baterías']
        },
        {
          title: 'Otros hogar',
          items: ['Garage', 'Patio y jardín', 'Parrillas']
        },
        {
          title: 'Decohogar',
          items: ['Iluminación', 'Muebles', 'Sillas y sillones']
        },
        {
          title: 'Baño y dormitorio',
          items: ['Ropa de cama', 'Toallas', 'Accesorios de baño', 'Sábanas', 'Almohadas', 'Plumones', 'Calientacamas']
        }
      ]
    },
    { 
      id: 4, 
      name: 'Accesorios Moda', 
      image: accesoriosModaImage,
      subcategories: [
        {
          title: 'Accesorios',
          items: ['Anteojos de sol', 'Carteras']
        },
        {
          title: 'Relojes',
          items: ['Relojes mujer', 'Relojes hombre']
        },
        {
          title: 'Joyas',
          items: ['Collares', 'Pulseras', 'Aros']
        },
        {
          title: 'Bolsos y mochilas',
          items: ['Estuches', 'Maletas y bolsos', 'Bananos y billeteras', 'Mochilas', 'Loncheras']
        }
      ]
    },
    { 
      id: 5, 
      name: 'Belleza', 
      image: bellezaImage,
      subcategories: [
        {
          title: 'Cuidado personal',
          items: ['Cuidado de la piel', 'Afeitadoras y cortapelos', 'Depiladoras', 'Salud y bienestar', 'Secadores de pelo', 'Alisadoras']
        },
        {
          title: 'Perfumes',
          items: ['Perfumes mujer', 'Perfumes hombre']
        }
      ]
    },
    { 
      id: 6, 
      name: 'Tecnología', 
      image: tecnologiaImage,
      subcategories: [
        {
          title: 'Computación',
          items: ['Notebooks y tablets', 'Accesorios computación', 'Monitores']
        },
        {
          title: 'Fotografía y video',
          items: ['Fotografía y video']
        },
        {
          title: 'Telefonía y accesorios',
          items: ['Smartwatch y wearables', 'Celulares', 'Accesorios telefonía']
        },
        {
          title: 'Audio y TV',
          items: ['Audífonos', 'Televisores', 'Accesorios audio y TV', 'Parlantes', 'Audio profesional']
        },
        {
          title: 'Central gamer',
          items: ['Consolas y juegos']
        }
      ]
    },
    { 
      id: 7, 
      name: 'Tiempo Libre', 
      image: tiempoLibreImage,
      subcategories: [
        {
          title: 'Viajes',
          items: ['Vouchers', 'Maletas']
        },
        {
          title: 'Panoramas',
          items: ['Panoramas outdoor', 'Panoramas gastronomía', 'Panoramas mixes']
        },
        {
          title: 'Deportes y outdoor',
          items: ['Outdoor', 'Fitness', 'Deportes acuáticos', 'Bolsos y mochilas', 'Botellas y termos', 'Flotadores']
        }
      ]
    },
    { 
      id: 8, 
      name: 'Bar Gourmet', 
      image: barGourmetImage,
      subcategories: [
        {
          title: 'Licores',
          items: ['Vinos', 'Cervezas', 'Espumantes']
        },
        {
          title: 'Chocolates',
          items: ['Vouchers']
        }
      ]
    },
    { 
      id: 9, 
      name: 'Sawa Full', 
      image: sawaFullImage,
      subcategories: [
        {
          title: 'Sawa Full',
          items: ['Sawa Full', 'Licores', 'Perfumes', 'Electrodomésticos', 'Tecnología']
        }
      ]
    }
  ];

  const getCategoryIcon = (categoryId: number) => {
    const iconProps = { className: "w-4 h-4" };
    switch(categoryId) {
      case 1: return <Baby {...iconProps} />;
      case 2: return <Home {...iconProps} />;
      case 3: return <Sofa {...iconProps} />;
      case 4: return <Watch {...iconProps} />;
      case 5: return <Eye {...iconProps} />;
      case 6: return <Laptop {...iconProps} />;
      case 7: return <Bike {...iconProps} />;
      case 8: return <Wine {...iconProps} />;
      case 9: return <Zap {...iconProps} />;
      default: return <Package {...iconProps} />;
    }
  };

  return (
    <>
      {/* Categories Drawer (Mobile) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 md:hidden"
            />
            
            {/* Bottom Sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-white/55 backdrop-blur-2xl rounded-t-3xl shadow-2xl shadow-[#FF8000]/10 border border-white/40 z-50 md:hidden max-h-[85vh] flex flex-col"
            >
              {/* Header del drawer */}
              <div className="p-4 border-b border-white/40 flex items-center justify-between backdrop-blur-xl bg-white/55">
                <h3 className="text-lg font-semibold text-slate-900">Categorías</h3>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/55 backdrop-blur-md hover:bg-white/75 text-slate-600 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Contenido del menú - estilo desktop adaptado */}
              <div className="flex-1 overflow-hidden flex">
                {/* Lista de categorías - lado izquierdo */}
                <div className="w-36 bg-slate-50/55 backdrop-blur-lg border-r border-white/40 overflow-y-auto">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex flex-col items-center gap-2 px-3 py-4 text-left transition-colors border-l-2 ${
                        selectedCategory === category.id
                          ? 'bg-white/55 backdrop-blur-md text-slate-900 font-semibold border-[#FF8000] shadow-sm'
                          : 'text-slate-600 border-transparent active:bg-white/30'
                      }`}
                    >
                      {getCategoryIcon(category.id)}
                      <span className="text-[10px] text-center leading-tight uppercase tracking-wide font-bold">
                        {category.name}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Subcategorías - lado derecho */}
                <div className="flex-1 overflow-y-auto p-4 bg-white/55 backdrop-blur-xl">
                  {categories
                    .filter(cat => cat.id === selectedCategory)
                    .map((category) => (
                      <div key={category.id}>
                        <div className="mb-4">
                          <h3 className="text-base font-bold text-slate-900 mb-1 cursor-pointer">{category.name}</h3>
                          <div className="w-10 h-0.5 bg-gradient-to-r from-[#FF8000] to-[#FFAD5B] rounded-full"></div>
                        </div>
                        <div className="space-y-5">
                          {category.subcategories.map((subcategory, idx) => (
                            <div key={idx}>
                              <h4 className="text-xs font-semibold text-slate-900 mb-2 uppercase tracking-wide cursor-pointer hover:text-[#FF8000] active:text-[#FF8000] transition-colors">
                                {subcategory.title}
                              </h4>
                              <ul className="space-y-2">
                                {subcategory.items.map((item, itemIdx) => (
                                  <li key={itemIdx}>
                                    <button className="text-sm text-slate-600 active:text-[#FF8000] transition-colors text-left cursor-pointer w-full">
                                      {item}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content - Conditional: All Catalog, Product Detail or Catalog */}
      {showAllCatalog ? (
        <AllCatalogView 
          products={featuredProducts}
          userPoints={userPoints}
          onProductClick={(productId) => {
            setSelectedProduct(productId);
            setProductQuantity(1);
            setCurrentImageIndex(0);
            setFromAllCatalog(true);
            setShowAllCatalog(false);
          }}
          onBack={() => setShowAllCatalog(false)}
        />
      ) : selectedProduct !== null ? (
        (() => {
          const product = featuredProducts.find(p => p.id === selectedProduct);
          if (!product) return null;

          return (
            <ProductDetail
              product={product}
              quantity={productQuantity}
              setQuantity={setProductQuantity}
              currentImageIndex={currentImageIndex}
              setCurrentImageIndex={setCurrentImageIndex}
              userPoints={userPoints}
              onBack={() => {
                if (fromAllCatalog) {
                  setShowAllCatalog(true);
                  setFromAllCatalog(false);
                }
                setSelectedProduct(null);
              }}
              categoriesOpen={categoriesOpen}
              setCategoriesOpen={setCategoriesOpen}
              setSelectedCategory={setSelectedCategory}
              setProfileDrawerOpen={setProfileDrawerOpen}
              setMobileMenuOpen={setMobileMenuOpen}
              categoriesButtonRef={categoriesButtonRef}
              setMenuPosition={setMenuPosition}
              categories={categories}
              fromAllCatalog={fromAllCatalog}
            />
          );
        })()
      ) : (
        <div className="flex-1 flex flex-col min-w-0 w-full max-w-full md:h-[calc(100vh-1rem)] md:overflow-y-auto md:m-2 overflow-y-auto overflow-x-hidden pb-[88px] md:pb-0">
          {/* Header */}
          <header 
            className={`bg-white md:bg-white/95 md:backdrop-blur-md transition-all duration-300 md:rounded-2xl md:sticky md:top-0 md:z-30 flex-shrink-0`}
            style={window.innerWidth >= 768 ? { boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03), 0 1px 3px rgba(0, 0, 0, 0.02)' } : {}}
          >
            {/* Desktop Header */}
            <div className="hidden md:block py-[25px] px-6">
              <div className="flex items-center justify-between gap-8">
                {/* Navegación horizontal izquierda */}
                <div className="flex items-center gap-1">
                  {/* Mega-menú de Categorías */}
                  <div className="relative">
                    <button
                      ref={categoriesButtonRef}
                      onClick={() => {
                        setCategoriesOpen(!categoriesOpen);
                        if (!categoriesOpen) {
                          setSelectedCategory(categories[0].id);
                          if (categoriesButtonRef.current) {
                            const rect = categoriesButtonRef.current.getBoundingClientRect();
                            setMenuPosition({ 
                              top: rect.bottom + window.scrollY, 
                              left: rect.left + window.scrollX 
                            });
                          }
                        }
                      }}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold bg-[#F1F5F9] text-slate-700 hover:bg-[#E1E5E9] transition-all"
                      style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}
                    >
                      <Menu className="w-4 h-4" />
                      <span>Categorías</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${categoriesOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Mega-menú Dropdown - Renderizado fuera del header con Portal */}
                  </div>
                  
                  {/* Links directos */}
                  <button className="px-3 py-2 text-sm font-semibold text-[#00BF29] hover:text-[#00A024] transition-colors flex items-center gap-1.5 cursor-pointer" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
                    <Sparkles className="w-4 h-4" />
                    Novedades
                  </button>
                  <button className="px-3 py-2 text-sm font-semibold text-[#FF8000] hover:text-[#FF8000] transition-colors flex items-center gap-1.5 cursor-pointer" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
                    <Tag className="w-4 h-4" />
                    Ofertas
                  </button>
                </div>
                
                <div className="flex items-center gap-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="¿Qué quieres canjear hoy?"
                      className="w-[260px] pl-12 pr-4 py-2.5 rounded-full bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all text-sm"
                    />
                  </div>
                  
                  {/* Points Badge */}
                  <div className="min-w-[140px] h-[52px] w-fit rounded-xl bg-gradient-to-b from-[#FFAD5B] to-[#FF8000] shadow-md shadow-[#FF8000]/20 hover:shadow-lg hover:shadow-[#FF8000]/30 transition-all duration-300 px-3 flex items-center gap-3 cursor-pointer flex-shrink-0">
                    {/* Icono de moneda */}
                    <img src={coinIcon} alt="Coin" className="w-8 h-8 flex-shrink-0" />
                    {/* Texto de puntos */}
                    <div className="flex flex-col pr-2">
                      <div className="text-[10px] text-white font-medium opacity-90" style={{ fontFamily: "'Nunito', sans-serif" }}>Tus puntos</div>
                      <div className="text-[20px] font-bold text-white leading-none" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800 }}>{userPoints.toLocaleString('es-CL')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Header */}
            <div className="md:hidden px-4 py-3">
              <div className="flex items-center gap-3">
                {/* Logo */}
                <img src={logoDesafioSawa} alt="Desafío Sawa" className="h-10 object-contain" />
                
                {/* Spacer */}
                <div className="flex-1" />

                {/* Points Badge */}
                <div className="px-3 py-2 rounded-full bg-gradient-to-b from-[#FFAD5B] to-[#FF8000] shadow-md shadow-[#FF8000]/20 flex items-center gap-2 flex-shrink-0">
                  <img src={coinIcon} alt="Coin" className="w-6 h-6 flex-shrink-0" />
                  <div className="flex flex-col">
                    <div className="text-[9px] text-white opacity-90 tracking-wide leading-none" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 500 }}>Tus puntos</div>
                    <div className="text-base font-bold text-white leading-none mt-0.5" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800 }}>{userPoints.toLocaleString('es-CL')}</div>
                  </div>
                </div>

                {/* Profile Photo */}
                <button
                  onClick={() => navigate('/perfil')}
                  className="profile-photo-button w-9 h-9 min-w-[36px] aspect-square rounded-full overflow-hidden transition-all active:scale-95"
                  onMouseDown={(e) => e.preventDefault()}
                  onTouchStart={(e) => e.preventDefault()}
                >
                  <img 
                    src={profileImage} 
                    alt="Carlos Toledo" 
                    className="w-full h-full object-cover pointer-events-none"
                  />
                </button>
              </div>
            </div>

            {/* Mobile Toolbar - Debajo del header */}
            <div className="md:hidden px-4 py-3 bg-[#F5F8FB]">
              {/* Search Bar - Ancho completo */}
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="¿Qué quieres canjear?"
                  className="w-full pl-10 pr-3 py-2 rounded-full bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FF8000]/20 focus:border-[#FF8000] transition-all text-sm shadow-sm"
                />
              </div>
            </div>

            {/* Mobile Section Links - Accesos a secciones */}
            <div className="md:hidden px-4 pb-3 bg-[#F5F8FB]">
              <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
                {/* Botón Categorías */}
                <button
                  onClick={() => {
                    setSelectedCategory(categories[0].id);
                    setMobileMenuOpen(true);
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-[#E8EFF5] text-slate-700 active:bg-[#D8DFE5] transition-all flex-shrink-0"
                  style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900 }}
                >
                  <Menu className="w-4 h-4" />
                  <span>Categorías</span>
                </button>

                {/* Link: Novedades */}
                <button className="px-4 py-2 text-sm font-semibold text-[#00BF29] active:text-[#00A024] transition-colors flex items-center gap-1.5 flex-shrink-0 cursor-pointer" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
                  <Sparkles className="w-4 h-4" />
                  <span>Novedades</span>
                </button>

                {/* Link: Ofertas */}
                <button className="px-4 py-2 text-sm font-semibold text-[#FF8000] active:text-[#FF8000] transition-colors flex items-center gap-1.5 flex-shrink-0 cursor-pointer" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
                  <Tag className="w-4 h-4" />
                  <span>Ofertas</span>
                </button>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="flex-1">
            <div className="pt-4 md:pt-12">
              {/* Título encima del carrusel */}
              <div className="mb-4 md:mb-6 px-4 md:px-6">
                <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-1">Explora y canjea tus puntos</h2>
              </div>

              {/* Hero Banner */}
              <div 
                className="relative rounded-2xl md:rounded-3xl overflow-hidden mb-4 md:mb-6 group shadow-md shadow-[#FF8000]/10 hover:shadow-xl hover:shadow-[#FF8000]/20 transition-all duration-300 mx-4 md:mx-6"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <motion.div
                  animate={{ x: `-${currentSlide * 100}%` }}
                  transition={isTransitioning ? { duration: 0 } : {
                    type: "tween",
                    duration: 0.5,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  className="flex"
                >
                  {infiniteSlides.map((slide, index) => (
                    <img 
                      key={index}
                      src={slide} 
                      alt={`Banner ${(index % bannerSlides.length) + 1}`} 
                      className="w-full h-auto object-cover flex-shrink-0 pointer-events-none"
                    />
                  ))}
                </motion.div>
              </div>
              
              {/* Indicadores */}
              <div className="flex justify-center gap-2 mb-4 md:mb-6 px-4 md:px-6">
                {bannerSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      (currentSlide === index + 1) || 
                      (currentSlide === 0 && index === bannerSlides.length - 1) ||
                      (currentSlide === infiniteSlides.length - 1 && index === 0)
                        ? 'bg-[#FF8000] w-6' 
                        : 'bg-slate-300 hover:bg-[#FF8000]/50 w-2'
                    }`}
                  />
                ))}
              </div>

              {/* Categories Section */}
              <div className="mb-1 md:mb-2 mt-6 md:mt-8">
                <div className="flex items-center justify-between mb-1 md:mb-2 px-4 md:px-6">
                  <div>
                    <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-1">Encuentra lo que estás buscando</h2>
                    <p className="text-xs md:text-sm text-slate-600">Explora por categoría y descubre miles de productos</p>
                  </div>
                  {/* Mobile: Compact icon button */}
                  <button 
                    onClick={() => setShowAllCatalog(true)}
                    className="md:hidden w-9 h-9 rounded-full bg-[#FF8000] hover:bg-[#FF8000]/90 active:bg-[#FF8000]/80 text-white flex items-center justify-center shadow-md shadow-[#FF8000]/25 transition-all active:scale-95 flex-shrink-0 ml-3"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  {/* Desktop: Full button */}
                  <button 
                    onClick={() => setShowAllCatalog(true)}
                    className="hidden md:block px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-full font-medium transition-colors text-sm border border-slate-300"
                  >
                    Ver todo
                  </button>
                </div>
                
                <div className="relative">
                  {/* Botones de navegación - Solo desktop */}
                  <button 
                    onClick={() => scrollCategories('left')}
                    className="hidden md:flex absolute left-0 top-[88px] -translate-y-1/2 translate-x-2 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg items-center justify-center transition-all duration-200 z-10"
                  >
                    <ChevronLeft className="w-5 h-5 text-slate-700" />
                  </button>
                  
                  <button 
                    onClick={() => scrollCategories('right')}
                    className="hidden md:flex absolute right-0 top-[88px] -translate-y-1/2 -translate-x-2 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg items-center justify-center transition-all duration-200 z-10"
                  >
                    <ChevronRight className="w-5 h-5 text-slate-700" />
                  </button>

                  {/* Grid con scroll horizontal */}
                  <div className="relative -mx-4 px-4 md:mx-0 md:px-0">
                    <div ref={categoriesScrollRef} className="overflow-x-auto pb-1 md:pb-6 scrollbar-hide pl-4 md:pl-6">
                      <div className="flex gap-3 md:gap-8 lg:gap-12 xl:gap-16 py-4 md:py-8">
                        {categories.filter(cat => cat.id !== 8 && cat.id !== 9).map((category, index) => (
                          <motion.div
                            key={category.id}
                            className="flex-shrink-0 flex flex-col items-center cursor-pointer group"
                            animate={isMobile && hasPlayedInitialBounce ? {
                              x: [0, 6, -3, 6, 0],
                            } : {}}
                            transition={{
                              duration: 1.4,
                              ease: "easeInOut",
                              times: [0, 0.3, 0.5, 0.7, 1],
                              delay: index * 0.08
                            }}
                          >
                            {/* Círculo con imagen */}
                            <div className="w-[88px] h-[88px] md:w-28 md:h-28 rounded-full overflow-hidden shadow-lg shadow-[#FF8000]/15 hover:shadow-xl hover:shadow-[#FF8000]/25 transition-all duration-300 active:scale-95 md:hover:scale-105">
                              <img 
                                src={category.image} 
                                alt={category.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            
                            {/* Nombre debajo */}
                            <div className="mt-2 md:mt-3 max-w-[88px] md:max-w-[112px]">
                              <div 
                                className="text-slate-700 group-hover:text-[#FF8000] font-bold text-[12px] md:text-xs lg:text-sm text-center tracking-[0.02em] leading-tight transition-colors"
                                style={{ fontFamily: "'Nunito', sans-serif" }}
                              >
                                {category.name}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Featured Products */}
              <div>
                <div className="flex items-center justify-between mb-1 md:mb-2 px-4 md:px-6">
                  <div>
                    <h2 className="text-xl md:text-2xl font-semibold text-slate-900 mb-1">Selección recomendada para ti</h2>
                    <p className="text-xs md:text-sm text-slate-600">Elegidos para que aproveches al máximo tus puntos</p>
                  </div>
                  {/* Mobile: Compact icon button */}
                  <button 
                    onClick={() => setShowAllCatalog(true)}
                    className="md:hidden w-9 h-9 rounded-full bg-[#FF8000] hover:bg-[#FF8000]/90 active:bg-[#FF8000]/80 text-white flex items-center justify-center shadow-md shadow-[#FF8000]/25 transition-all active:scale-95 flex-shrink-0 ml-3"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  {/* Desktop: Full button */}
                  <button 
                    onClick={() => setShowAllCatalog(true)}
                    className="hidden md:block px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-full font-medium transition-colors text-sm border border-slate-300"
                  >
                    Ver todo
                  </button>
                </div>
                
                {/* Contenedor con navegación para desktop */}
                <div className="relative">
                  {/* Botones de navegación - Solo desktop */}
                  <button 
                    onClick={() => scrollProducts('left')}
                    className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 translate-x-2 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg items-center justify-center transition-all duration-200 z-10"
                  >
                    <ChevronLeft className="w-5 h-5 text-slate-700" />
                  </button>
                  
                  <button 
                    onClick={() => scrollProducts('right')}
                    className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 -translate-x-2 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg items-center justify-center transition-all duration-200 z-10"
                  >
                    <ChevronRight className="w-5 h-5 text-slate-700" />
                  </button>

                  {/* Grid con scroll horizontal */}
                  <div className="relative -mx-4 px-4 md:mx-0 md:px-0">
                    <div ref={productsScrollRef} className="overflow-x-auto md:overflow-hidden pb-8 scrollbar-hide pl-4 md:pl-6">
                      <div className="flex gap-2 md:gap-5 py-4 md:py-8">
                        {featuredProducts.map((product, index) => {
                          return (
                            <motion.div 
                              key={product.id} 
                              className="w-[45%] flex-shrink-0 md:w-[calc(100%/3.5-15px)]"
                              animate={isMobile && hasPlayedInitialBounce ? {
                                x: [0, 6, -3, 6, 0],
                              } : {}}
                              transition={{
                                duration: 1.4,
                                ease: "easeInOut",
                                times: [0, 0.3, 0.5, 0.7, 1],
                                delay: index * 0.08
                              }}
                            >
                              <div 
                                onClick={() => {
                                  setSelectedProduct(product.id);
                                  setProductQuantity(1);
                                  setCurrentImageIndex(0);
                                }}
                                className="group bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-md shadow-[#FF8000]/10 hover:shadow-xl hover:shadow-[#FF8000]/20 transition-all duration-300 cursor-pointer"
                              >
                                <div className="aspect-square bg-white flex items-center justify-center overflow-hidden p-2 md:p-6">
                                  <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                  />
                                </div>
                                <div className="p-3 md:p-5">
                                  <div className="text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">
                                    {product.brand}
                                  </div>
                                  <h3 className="text-xs font-semibold text-slate-900 mb-3 line-clamp-3 leading-tight h-[3rem]">
                                    {product.name}
                                  </h3>
                                  
                                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                                    <div className="flex items-center gap-1.5 md:gap-2">
                                      <img src={coinIcon} alt="Coin" className="w-6 h-6 md:w-7 md:h-7" />
                                      <div>
                                        <div className="text-lg md:text-xl font-bold text-[#FF8000]">{product.points.toLocaleString('es-CL')}</div>
                                        <div className="text-xs text-slate-500 -mt-1">puntos</div>
                                      </div>
                                    </div>
                                    {/* Mobile: solo flecha */}
                                    <div className="md:hidden w-8 h-8 rounded-full bg-[#FF8000] flex items-center justify-center shadow-[0_0_8px_rgba(255,128,0,0.25)] group-hover:shadow-[0_0_12px_rgba(255,128,0,0.4)] transition-all group-active:scale-95">
                                      <ChevronRight className="w-4 h-4 text-white" />
                                    </div>
                                    {/* Desktop: botón con texto */}
                                    <button className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FF8000] text-white text-sm font-semibold shadow-[0_0_8px_rgba(255,128,0,0.25)] group-hover:shadow-[0_0_12px_rgba(255,128,0,0.4)] transition-all group-active:scale-95">
                                      Ver detalle
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End overflow wrapper */}
          </div>
        </div>
      )}
      
      {/* Mega-menú Portal - Renderizado fuera del header para que funcione el backdrop-filter */}
      {categoriesOpen && createPortal(
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            onMouseLeave={() => setCategoriesOpen(false)}
            className="w-[1000px] max-w-[calc(100vw-2rem)] shadow-[0_0_40px_rgba(255,128,0,0.15)] z-[9999]"
            style={{
              position: 'fixed',
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left}px`,
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '15px',
            }}
          >
            <div className="flex rounded-2xl overflow-hidden">
              {/* Lista de categorías - lado izquierdo */}
              <div className="w-64 border-r border-white/40 py-2" style={{
                background: 'rgba(248, 250, 252, 0.5)',
              }}>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onMouseEnter={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                      selectedCategory === category.id
                        ? 'text-slate-900 font-semibold shadow-sm'
                        : 'text-slate-600 hover:bg-white/20'
                    }`}
                    style={selectedCategory === category.id ? {
                      background: 'rgba(255, 255, 255, 0.6)',
                    } : undefined}
                  >
                    {getCategoryIcon(category.id)}
                    <span className="text-sm">{category.name}</span>
                  </button>
                ))}
              </div>

              {/* Subcategorías - lado derecho */}
              <div className="flex-1 p-6 overflow-y-auto max-h-[600px]">
                {categories
                  .filter(cat => cat.id === selectedCategory)
                  .map((category) => (
                    <div key={category.id}>
                      <div className="mb-4">
                        <h3 className="text-lg font-bold text-slate-900 mb-2 cursor-pointer">{category.name}</h3>
                        <div className="w-12 h-1 bg-gradient-to-r from-[#FF8000] to-[#FFAD5B] rounded-full"></div>
                      </div>
                      <div className="grid grid-cols-4 gap-6">
                        {category.subcategories.map((subcategory, idx) => (
                          <div key={idx}>
                            <h4 className="text-sm font-semibold text-slate-900 mb-2 cursor-pointer hover:text-[#FF8000] transition-colors">
                              {subcategory.title}
                            </h4>
                            <ul className="space-y-1.5">
                              {subcategory.items.map((item, itemIdx) => (
                                <li key={itemIdx}>
                                  <button className="text-sm text-slate-600 hover:text-[#FF8000] transition-colors text-left cursor-pointer w-full">
                                    {item}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}