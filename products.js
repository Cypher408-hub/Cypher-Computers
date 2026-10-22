/* ============================================================
   Cypher IT Solutions — Product Catalog (products.js)
   Static demo catalog. Prices in Ghana Cedis (GHS).
   ============================================================ */

/* Default catalog — admin can override via localStorage */
window.CypherProductsDefaults = [
  /* ===================== PHONES ===================== */
  {
    id: "ph-001",
    name: "Samsung Galaxy A15",
    brand: "Samsung",
    category: "phones",
    price: 1450,
    oldPrice: 1700,
    image: "https://images.unsplash.com/photo-1592286927505-1def25115481?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1592286927505-1def25115481?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=900&q=80"
    ],
    badge: "Hot Deal",
    rating: 4.3,
    reviews: 128,
    stock: 14,
    specs: "6.5\" | 4GB/128GB | 5000mAh | 50MP",
    condition: "Brand New",
    description: "Reliable everyday Android phone with a large display, solid battery life and a capable 50MP camera. Ideal for calls, WhatsApp, social media and light gaming.",
    fullSpecs: {
      "Display": "6.5\" Super AMOLED, 90Hz",
      "Processor": "MediaTek Helio G99",
      "RAM / Storage": "4GB / 128GB (expandable)",
      "Camera": "50MP main + 5MP ultrawide + 2MP macro",
      "Front camera": "13MP",
      "Battery": "5000mAh, 25W charging",
      "OS": "Android 14, One UI Core",
      "SIM": "Dual SIM",
      "Colour": "Blue / Black"
    }
  },
  {
    id: "ph-002",
    name: "iPhone 11",
    brand: "Apple",
    category: "phones",
    price: 2900,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=900&q=80"
    ],
    badge: "UK Used",
    rating: 4.6,
    reviews: 89,
    stock: 7,
    specs: "6.1\" | 64GB | A13 Bionic | Dual Camera",
    condition: "UK-Used · Grade A",
    description: "Genuine UK-used iPhone 11 in excellent condition. Battery health verified, fully tested, unlocked and ready to use with any Ghana network.",
    fullSpecs: {
      "Display": "6.1\" Liquid Retina LCD",
      "Chip": "A13 Bionic",
      "Storage": "64GB",
      "Camera": "Dual 12MP (wide + ultrawide)",
      "Front camera": "12MP TrueDepth",
      "Battery": "Verified 85%+ health",
      "OS": "iOS 17 (updatable)",
      "SIM": "Nano-SIM + eSIM",
      "Condition": "Grade A — minimal signs of use"
    }
  },
  {
    id: "ph-003",
    name: "iPhone 12",
    brand: "Apple",
    category: "phones",
    price: 3950,
    oldPrice: 4400,
    image: "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1592286927505-1def25115481?auto=format&fit=crop&w=900&q=80"
    ],
    badge: "Flash Sale",
    rating: 4.7,
    reviews: 156,
    stock: 5,
    specs: "6.1\" | 128GB | A14 Bionic | Dual Camera",
    condition: "UK-Used · Grade A",
    description: "iPhone 12 with Super Retina XDR display and A14 Bionic. Ceramic Shield front, 5G ready, dual camera system. Grade A UK unit.",
    fullSpecs: {
      "Display": "6.1\" Super Retina XDR OLED",
      "Chip": "A14 Bionic",
      "Storage": "128GB",
      "Camera": "Dual 12MP (wide + ultrawide)",
      "Front camera": "12MP",
      "Battery": "Verified 85%+ health",
      "Connectivity": "5G, Wi-Fi 6",
      "SIM": "Nano-SIM + eSIM",
      "Condition": "Grade A"
    }
  },
  {
    id: "ph-004",
    name: "Tecno Spark 20",
    brand: "Tecno",
    category: "phones",
    price: 1350,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1592286927505-1def25115481?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=900&q=80"
    ],
    badge: null,
    rating: 4.1,
    reviews: 64,
    stock: 22,
    specs: "6.6\" | 8GB/128GB | 5000mAh | 50MP",
    condition: "Brand New",
    description: "Budget-friendly Tecno with generous RAM and a bright display. Great for students and first-time smartphone users.",
    fullSpecs: {
      "Display": "6.6\" HD+",
      "Processor": "MediaTek Helio G85",
      "RAM / Storage": "8GB (4+4) / 128GB",
      "Camera": "50MP main",
      "Front camera": "8MP",
      "Battery": "5000mAh",
      "OS": "Android 13, HiOS",
      "SIM": "Dual SIM"
    }
  },
  {
    id: "ph-005",
    name: "Infinix Note 30",
    brand: "Infinix",
    category: "phones",
    price: 1800,
    oldPrice: 2050,
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1592286927505-1def25115481?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80"
    ],
    badge: "Save 12%",
    rating: 4.2,
    reviews: 97,
    stock: 11,
    specs: "6.78\" | 8GB/256GB | 5000mAh | 64MP",
    condition: "Brand New",
    description: "Big screen, big storage. Infinix Note 30 is built for media, multitasking and all-day battery.",
    fullSpecs: {
      "Display": "6.78\" FHD+ 120Hz",
      "Processor": "Helio G99",
      "RAM / Storage": "8GB / 256GB",
      "Camera": "64MP main",
      "Front camera": "16MP",
      "Battery": "5000mAh, 45W charge",
      "OS": "Android 13, XOS",
      "SIM": "Dual SIM"
    }
  },
  {
    id: "ph-006",
    name: "Samsung Galaxy S21",
    brand: "Samsung",
    category: "phones",
    price: 3600,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1592286927505-1def25115481?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=900&q=80"
    ],
    badge: "Premium",
    rating: 4.5,
    reviews: 203,
    stock: 4,
    specs: "6.2\" | 8GB/128GB | 4000mAh | 64MP",
    condition: "UK-Used · Grade A",
    description: "Flagship Samsung experience at a fraction of the new price. Smooth 120Hz display, excellent cameras and One UI.",
    fullSpecs: {
      "Display": "6.2\" Dynamic AMOLED 2X, 120Hz",
      "Processor": "Exynos 2100 / Snapdragon 888",
      "RAM / Storage": "8GB / 128GB",
      "Camera": "64MP + 12MP ultrawide + 12MP tele",
      "Front camera": "10MP",
      "Battery": "4000mAh",
      "OS": "Android 14, One UI 6",
      "Condition": "Grade A UK-used"
    }
  },
  {
    id: "ph-007",
    name: "Redmi 13C",
    brand: "Xiaomi",
    category: "phones",
    price: 1150,
    oldPrice: 1350,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=900&q=80"
    ],
    badge: "Best Value",
    rating: 4.0,
    reviews: 178,
    stock: 30,
    specs: "6.74\" | 4GB/128GB | 5000mAh | 50MP",
    condition: "Brand New",
    description: "One of the best value phones in Ghana right now. Large screen, long battery, MIUI experience.",
    fullSpecs: {
      "Display": "6.74\" HD+ 90Hz",
      "Processor": "MediaTek Helio G85",
      "RAM / Storage": "4GB / 128GB",
      "Camera": "50MP main",
      "Front camera": "8MP",
      "Battery": "5000mAh, 18W",
      "OS": "Android 13, MIUI",
      "SIM": "Dual SIM"
    }
  },
  {
    id: "ph-008",
    name: "Nokia 106 Dual SIM",
    brand: "Nokia",
    category: "phones",
    price: 180,
    oldPrice: 220,
    image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=900&q=80"
    ],
    badge: "Flash Sale",
    rating: 3.9,
    reviews: 312,
    stock: 45,
    specs: "1.8\" | Dual SIM | Long battery",
    condition: "Brand New",
    description: "Classic Nokia feature phone. Long standby, dual SIM, torch, FM radio. Perfect backup or for parents.",
    fullSpecs: {
      "Display": "1.8\" QQVGA",
      "Network": "2G",
      "SIM": "Dual SIM",
      "Battery": "Up to 21 days standby",
      "Features": "Torch, FM radio, MP3",
      "Colour": "Black"
    }
  },
  {
    id: "ph-009",
    name: "Samsung Galaxy A05",
    brand: "Samsung",
    category: "phones",
    price: 980,
    oldPrice: 1150,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=900&q=80"
    ],
    badge: "New Arrival",
    rating: 4.0,
    reviews: 52,
    stock: 18,
    specs: "6.7\" | 4GB/64GB | 5000mAh | 50MP",
    condition: "Brand New",
    description: "Entry Samsung with a big 6.7\" display and 50MP camera. Simple, durable and backed by Samsung support.",
    fullSpecs: {
      "Display": "6.7\" PLS LCD",
      "Processor": "Helio G85",
      "RAM / Storage": "4GB / 64GB",
      "Camera": "50MP + 2MP",
      "Front camera": "8MP",
      "Battery": "5000mAh",
      "OS": "Android 14, One UI Core",
      "SIM": "Dual SIM"
    }
  },
  {
    id: "ph-010",
    name: "iPhone 13",
    brand: "Apple",
    category: "phones",
    price: 5200,
    oldPrice: 5800,
    image: "https://images.unsplash.com/photo-1632661674596-df8be882a2a8?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1632661674596-df8be882a2a8?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?auto=format&fit=crop&w=900&q=80"
    ],
    badge: "Premium",
    rating: 4.8,
    reviews: 94,
    stock: 3,
    specs: "6.1\" | 128GB | A15 Bionic | Dual Camera",
    condition: "UK-Used · Grade A",
    description: "iPhone 13 with brighter display, better battery and cinematic mode. Grade A UK unit, battery health checked.",
    fullSpecs: {
      "Display": "6.1\" Super Retina XDR",
      "Chip": "A15 Bionic",
      "Storage": "128GB",
      "Camera": "Dual 12MP",
      "Front camera": "12MP",
      "Battery": "Verified 85%+",
      "Connectivity": "5G",
      "Condition": "Grade A"
    }
  },
  {
    id: "ph-011",
    name: "Tecno Camon 20",
    brand: "Tecno",
    category: "phones",
    price: 1650,
    oldPrice: 1890,
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1592286927505-1def25115481?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=900&q=80"
    ],
    badge: null,
    rating: 4.2,
    reviews: 71,
    stock: 12,
    specs: "6.67\" | 8GB/256GB | 5000mAh | 64MP",
    condition: "Brand New",
    description: "Camera-focused Tecno with AMOLED display and large storage. Great for content creators on a budget.",
    fullSpecs: {
      "Display": "6.67\" AMOLED 120Hz",
      "Processor": "Helio G85",
      "RAM / Storage": "8GB / 256GB",
      "Camera": "64MP main",
      "Front camera": "32MP",
      "Battery": "5000mAh, 33W",
      "OS": "Android 13, HiOS"
    }
  },
  {
    id: "ph-012",
    name: "Infinix Hot 40",
    brand: "Infinix",
    category: "phones",
    price: 1420,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1592286927505-1def25115481?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80"
    ],
    badge: null,
    rating: 4.1,
    reviews: 58,
    stock: 16,
    specs: "6.78\" | 8GB/256GB | 5000mAh | 50MP",
    condition: "Brand New",
    description: "Hot series favourite with big storage and smooth 90Hz display. Solid all-rounder under GHS 1,500.",
    fullSpecs: {
      "Display": "6.78\" 90Hz",
      "Processor": "Helio G88",
      "RAM / Storage": "8GB / 256GB",
      "Camera": "50MP",
      "Front camera": "8MP",
      "Battery": "5000mAh, 18W",
      "OS": "Android 13, XOS"
    }
  },

  /* ===================== LAPTOPS ===================== */
  {
    id: "lp-001",
    name: "HP EliteBook 840 G5",
    brand: "HP",
    category: "laptops",
    price: 3200,
    oldPrice: 3800,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1525547717850-69c5e8b6b0b0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=900&q=80"
    ],
    badge: "UK-Used · Grade A",
    rating: 4.4,
    reviews: 67,
    stock: 6,
    specs: "Core i5 / 8GB RAM / 256GB SSD / 14\"",
    condition: "UK-Used · Grade A",
    description: "Business-class HP EliteBook. Lightweight, durable, excellent keyboard. Fully wiped, Windows activated, ready for work or school.",
    fullSpecs: {
      "Processor": "Intel Core i5-8250U",
      "RAM": "8GB DDR4",
      "Storage": "256GB SSD",
      "Display": "14\" FHD IPS",
      "Graphics": "Intel UHD 620",
      "Ports": "USB-C, USB-A, HDMI, SD",
      "Battery": "Good health, tested",
      "OS": "Windows 11 Pro",
      "Condition": "Grade A — light cosmetic wear only"
    }
  },
  {
    id: "lp-002",
    name: "Dell Latitude 5400",
    brand: "Dell",
    category: "laptops",
    price: 2850,
    oldPrice: 3200,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1525547717850-69c5e8b6b0b0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1484788984921-03950022c9ef?auto=format&fit=crop&w=900&q=80"
    ],
    badge: "Hot Deal",
    rating: 4.3,
    reviews: 54,
    stock: 8,
    specs: "Core i5 / 8GB RAM / 256GB SSD / 14\"",
    condition: "UK-Used · Grade A",
    description: "Reliable Dell Latitude for office and study. Fast SSD boot, solid build quality, Grade A UK unit.",
    fullSpecs: {
      "Processor": "Intel Core i5-8365U",
      "RAM": "8GB DDR4",
      "Storage": "256GB SSD",
      "Display": "14\" FHD",
      "Graphics": "Intel UHD 620",
      "Ports": "USB-C, USB-A, HDMI, RJ45",
      "OS": "Windows 11 Pro",
      "Condition": "Grade A"
    }
  },
  {
    id: "lp-003",
    name: "MacBook Air M1",
    brand: "Apple",
    category: "laptops",
    price: 6400,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1525547717850-69c5e8b6b0b0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1484788984921-03950022c9ef?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80"
    ],
    badge: "Premium",
    rating: 4.8,
    reviews: 112,
    stock: 3,
    specs: "M1 / 8GB / 256GB SSD / 13.3\"",
    condition: "UK-Used · Grade A",
    description: "Apple M1 MacBook Air — silent, fast, all-day battery. Perfect for design, coding, media and everyday work.",
    fullSpecs: {
      "Chip": "Apple M1",
      "RAM": "8GB unified",
      "Storage": "256GB SSD",
      "Display": "13.3\" Retina",
      "Battery": "Up to 18 hours (tested)",
      "Ports": "2× Thunderbolt / USB-C",
      "OS": "macOS Sonoma",
      "Condition": "Grade A"
    }
  },
  {
    id: "lp-004",
    name: "Lenovo ThinkPad T480",
    brand: "Lenovo",
    category: "laptops",
    price: 2750,
    oldPrice: 3100,
    image: "https://images.unsplash.com/photo-1525547717850-69c5e8b6b0b0?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1525547717850-69c5e8b6b0b0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1484788984921-03950022c9ef?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80"
    ],
    badge: null,
    rating: 4.5,
    reviews: 41,
    stock: 5,
    specs: "Core i5 / 16GB RAM / 512GB SSD / 14\"",
    condition: "UK-Used · Grade A",
    description: "Legendary ThinkPad keyboard and durability. Upgraded to 16GB RAM and 512GB SSD — ready for serious work.",
    fullSpecs: {
      "Processor": "Intel Core i5-8250U",
      "RAM": "16GB DDR4",
      "Storage": "512GB SSD",
      "Display": "14\" FHD",
      "Graphics": "Intel UHD 620",
      "Ports": "USB-C, USB-A, HDMI, RJ45, SD",
      "OS": "Windows 11 Pro",
      "Condition": "Grade A"
    }
  },
  {
    id: "lp-005",
    name: "HP ProBook 450 G7",
    brand: "HP",
    category: "laptops",
    price: 4100,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1484788984921-03950022c9ef?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80"
    ],
    badge: "Business",
    rating: 4.2,
    reviews: 29,
    stock: 4,
    specs: "Core i7 / 16GB / 512GB SSD / 15.6\"",
    condition: "UK-Used · Grade A",
    description: "Powerful 15.6\" ProBook with Core i7 and 16GB RAM. Great for multitasking, Excel, and light creative work.",
    fullSpecs: {
      "Processor": "Intel Core i7-10510U",
      "RAM": "16GB DDR4",
      "Storage": "512GB SSD",
      "Display": "15.6\" FHD",
      "Graphics": "Intel UHD",
      "Ports": "USB-C, USB-A, HDMI, RJ45",
      "OS": "Windows 11 Pro",
      "Condition": "Grade A"
    }
  },
  {
    id: "lp-006",
    name: "Dell XPS 13",
    brand: "Dell",
    category: "laptops",
    price: 5600,
    oldPrice: 6200,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80"
    ],
    badge: "Flash Sale",
    rating: 4.6,
    reviews: 38,
    stock: 2,
    specs: "Core i7 / 16GB / 512GB SSD / 13.3\"",
    condition: "UK-Used · Grade A",
    description: "Premium ultrabook with stunning InfinityEdge display. Compact, powerful and stylish.",
    fullSpecs: {
      "Processor": "Intel Core i7-1165G7",
      "RAM": "16GB LPDDR4x",
      "Storage": "512GB SSD",
      "Display": "13.3\" FHD InfinityEdge",
      "Graphics": "Intel Iris Xe",
      "Ports": "2× Thunderbolt 4",
      "OS": "Windows 11 Pro",
      "Condition": "Grade A"
    }
  },
  {
    id: "lp-007",
    name: "HP EliteBook 830 G6",
    brand: "HP",
    category: "laptops",
    price: 3450,
    oldPrice: 3900,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1525547717850-69c5e8b6b0b0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=900&q=80"
    ],
    badge: null,
    rating: 4.4,
    reviews: 33,
    stock: 5,
    specs: "Core i5 / 16GB / 256GB SSD / 13.3\"",
    condition: "UK-Used · Grade A",
    description: "Slim EliteBook with upgraded 16GB RAM. Quiet, portable and business-ready.",
    fullSpecs: {
      "Processor": "Intel Core i5-8365U",
      "RAM": "16GB DDR4",
      "Storage": "256GB SSD",
      "Display": "13.3\" FHD",
      "OS": "Windows 11 Pro",
      "Condition": "Grade A"
    }
  },
  {
    id: "lp-008",
    name: "Lenovo ThinkPad X1 Carbon Gen 6",
    brand: "Lenovo",
    category: "laptops",
    price: 4800,
    oldPrice: 5500,
    image: "https://images.unsplash.com/photo-1525547717850-69c5e8b6b0b0?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1525547717850-69c5e8b6b0b0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1484788984921-03950022c9ef?auto=format&fit=crop&w=900&q=80"
    ],
    badge: "Premium",
    rating: 4.7,
    reviews: 27,
    stock: 2,
    specs: "Core i7 / 16GB / 512GB SSD / 14\"",
    condition: "UK-Used · Grade A",
    description: "Ultra-light carbon fibre ThinkPad. Top-tier build, legendary keyboard, excellent for travel.",
    fullSpecs: {
      "Processor": "Intel Core i7-8550U",
      "RAM": "16GB LPDDR3",
      "Storage": "512GB SSD",
      "Display": "14\" FHD IPS",
      "Weight": "~1.13 kg",
      "OS": "Windows 11 Pro",
      "Condition": "Grade A"
    }
  },
  {
    id: "lp-009",
    name: "Dell Latitude 7410",
    brand: "Dell",
    category: "laptops",
    price: 4200,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1525547717850-69c5e8b6b0b0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1484788984921-03950022c9ef?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80"
    ],
    badge: "Business",
    rating: 4.3,
    reviews: 19,
    stock: 4,
    specs: "Core i5 / 16GB / 512GB SSD / 14\"",
    condition: "UK-Used · Grade A",
    description: "Modern Latitude with 10th-gen Intel, fast SSD and full business ports including RJ45.",
    fullSpecs: {
      "Processor": "Intel Core i5-10310U",
      "RAM": "16GB DDR4",
      "Storage": "512GB SSD",
      "Display": "14\" FHD",
      "OS": "Windows 11 Pro",
      "Condition": "Grade A"
    }
  },
  {
    id: "lp-010",
    name: "MacBook Pro 13\" 2019",
    brand: "Apple",
    category: "laptops",
    price: 4900,
    oldPrice: 5600,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1484788984921-03950022c9ef?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80"
    ],
    badge: null,
    rating: 4.5,
    reviews: 48,
    stock: 3,
    specs: "Core i5 / 8GB / 256GB SSD / 13.3\"",
    condition: "UK-Used · Grade A",
    description: "Intel MacBook Pro with Touch Bar. Still excellent for video, music and development workflows.",
    fullSpecs: {
      "Processor": "Intel Core i5 (8th gen)",
      "RAM": "8GB",
      "Storage": "256GB SSD",
      "Display": "13.3\" Retina",
      "Ports": "4× Thunderbolt 3",
      "OS": "macOS Sonoma",
      "Condition": "Grade A"
    }
  },
    {
    id: "lp-010",
    name: "MacBook Pro 13\" 2019",
    brand: "Apple",
    category: "laptops",
    price: 4900,
    oldPrice: 5600,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1484788984921-03950022c9ef?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80"
    ],
    badge: null,
    rating: 4.5,
    reviews: 48,
    stock: 3,
    specs: "Core i5 / 8GB / 256GB SSD / 13.3\"",
    condition: "UK-Used · Grade A",
    description: "Intel MacBook Pro with Touch Bar. Still excellent for video, music and development workflows.",
    fullSpecs: {
      "Processor": "Intel Core i5 (8th gen)",
      "RAM": "8GB",
      "Storage": "256GB SSD",
      "Display": "13.3\" Retina",
      "Ports": "4× Thunderbolt 3",
      "OS": "macOS Sonoma",
      "Condition": "Grade A"
    }
  },
    {
    id: "lp-010",
    name: "Toshiba 2130",
    brand: "Lenovo",
    category: "laptops",
    price: 2100,
    oldPrice: 2500,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1484788984921-03950022c9ef?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80"
    ],
    badge: "Flash Sale",
    rating: 4.5,
    reviews: 48,
    stock: 3,
    specs: "Core i5 / 8GB / 256GB SSD / 13.3\"",
    condition: "UK-Used · Grade A",
    description: "Intel MacBook Pro with Touch Bar. Still excellent for video, music and development workflows.",
    fullSpecs: {
      "Processor": "Intel Core i5 (8th gen)",
      "RAM": "8GB",
      "Storage": "256GB SSD",
      "Display": "13.3\" Retina",
      "Ports": "4× Thunderbolt 3",
      "OS": "macOS Sonoma",
      "Condition": "Grade A"
    }
  },

  /* ===================== ACCESSORIES ===================== */
  {
    id: "ac-001",
    name: "Oraimo Power Bank 20000mAh",
    brand: "Oraimo",
    category: "accessories",
    price: 220,
    oldPrice: 280,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=900&q=80"
    ],
    badge: "Best Seller",
    rating: 4.4,
    reviews: 421,
    stock: 48,
    specs: "20000mAh | Dual USB | Fast Charge",
    condition: "Brand New",
    description: "Trusted Oraimo power bank. Charge a phone several times over. Dual USB ports and LED indicator.",
    fullSpecs: {
      "Capacity": "20000mAh",
      "Output": "Dual USB, up to 18W",
      "Input": "Micro-USB / USB-C",
      "Features": "LED indicator, overcharge protection",
      "Warranty": "12 months"
    }
  },
  {
    id: "ac-002",
    name: "Wireless Earbuds TWS",
    brand: "Generic",
    category: "accessories",
    price: 95,
    oldPrice: 150,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80"
    ],
    badge: "Flash Sale",
    rating: 3.9,
    reviews: 267,
    stock: 60,
    specs: "Bluetooth 5.3 | Touch Control | 24H Battery",
    condition: "Brand New",
    description: "Affordable true wireless earbuds with touch controls and long total playtime with the charging case.",
    fullSpecs: {
      "Bluetooth": "5.3",
      "Battery": "Up to 24H with case",
      "Controls": "Touch",
      "Charging": "USB-C case",
      "Colour": "Black / White"
    }
  },
  {
    id: "ac-003",
    name: "Laptop Cooling Pad",
    brand: "Generic",
    category: "accessories",
    price: 120,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=900&q=80"
    ],
    badge: null,
    rating: 4.1,
    reviews: 83,
    stock: 25,
    specs: "USB Powered | 5 Fans | LED",
    condition: "Brand New",
    description: "Keep your laptop cooler during long sessions. Five quiet fans, adjustable height, USB powered.",
    fullSpecs: {
      "Fans": "5× quiet fans",
      "Power": "USB",
      "Size": "Up to 17\" laptops",
      "Features": "LED lights, height adjust"
    }
  },
  {
    id: "ac-004",
    name: "USB-C Fast Charger 65W",
    brand: "Generic",
    category: "accessories",
    price: 85,
    oldPrice: 110,
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=900&q=80"
    ],
    badge: "Save 23%",
    rating: 4.3,
    reviews: 194,
    stock: 37,
    specs: "65W GaN | USB-C PD | Compact",
    condition: "Brand New",
    description: "Compact GaN charger for phones, tablets and many laptops. USB-C PD 65W output.",
    fullSpecs: {
      "Output": "65W USB-C PD",
      "Tech": "GaN",
      "Compatible": "Phones, tablets, many laptops",
      "Cable": "Not included"
    }
  },
  {
    id: "ac-005",
    name: "Phone Case + Screen Protector Pack",
    brand: "Generic",
    category: "accessories",
    price: 45,
    oldPrice: 70,
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=80"
    ],
    badge: "Bundle",
    rating: 4.0,
    reviews: 512,
    stock: 90,
    specs: "Shockproof Case + Tempered Glass",
    condition: "Brand New",
    description: "Protective case and tempered glass screen protector. Specify your phone model when ordering.",
    fullSpecs: {
      "Includes": "Case + tempered glass",
      "Protection": "Shockproof edges",
      "Note": "Tell us your phone model"
    }
  },
  {
    id: "ac-006",
    name: "Bluetooth Keyboard for Tablet/Phone",
    brand: "Generic",
    category: "accessories",
    price: 160,
    oldPrice: 200,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80"
    ],
    badge: null,
    rating: 4.2,
    reviews: 76,
    stock: 18,
    specs: "Wireless | Rechargeable | Slim",
    condition: "Brand New",
    description: "Slim Bluetooth keyboard for tablets and phones. Rechargeable battery, multi-device pairing.",
    fullSpecs: {
      "Connection": "Bluetooth",
      "Battery": "Rechargeable",
      "Layout": "Full QWERTY",
      "Compatibility": "iOS, Android, Windows"
    }
  },
  {
    id: "ac-007",
    name: "HDMI to VGA Adapter",
    brand: "Generic",
    category: "accessories",
    price: 55,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&q=80"
    ],
    badge: null,
    rating: 3.8,
    reviews: 145,
    stock: 40,
    specs: "HDMI Male to VGA Female",
    condition: "Brand New",
    description: "Connect HDMI laptops/phones to older VGA monitors and projectors. Simple plug-and-play.",
    fullSpecs: {
      "Input": "HDMI male",
      "Output": "VGA female",
      "Audio": "Separate (if needed)",
      "Use": "Projectors, old monitors"
    }
  },
  {
    id: "ac-008",
    name: "Laptop Bag 15.6\"",
    brand: "Generic",
    category: "accessories",
    price: 130,
    oldPrice: 180,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=900&q=80"
    ],
    badge: "Popular",
    rating: 4.3,
    reviews: 203,
    stock: 28,
    specs: "Waterproof | Padded | Multiple Pockets",
    condition: "Brand New",
    description: "Padded laptop bag for up to 15.6\". Water-resistant outer, multiple compartments for charger and documents.",
    fullSpecs: {
      "Size": "Fits up to 15.6\"",
      "Material": "Water-resistant",
      "Features": "Padded sleeve, multiple pockets",
      "Colour": "Black / Grey"
    }
  },
  {
    id: "ac-009",
    name: "Wireless Mouse",
    brand: "Generic",
    category: "accessories",
    price: 55,
    oldPrice: 75,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80"
    ],
    badge: null,
    rating: 4.1,
    reviews: 189,
    stock: 55,
    specs: "2.4GHz | Silent Click | USB Receiver",
    condition: "Brand New",
    description: "Quiet wireless mouse with USB nano receiver. Works with Windows, macOS and most laptops.",
    fullSpecs: {
      "Connection": "2.4GHz wireless",
      "Battery": "AA (included)",
      "DPI": "Adjustable",
      "Compatible": "Windows, macOS"
    }
  },
  {
    id: "ac-010",
    name: "USB-C Hub 7-in-1",
    brand: "Generic",
    category: "accessories",
    price: 185,
    oldPrice: 240,
    image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80"
    ],
    badge: "New Arrival",
    rating: 4.4,
    reviews: 62,
    stock: 15,
    specs: "HDMI 4K | USB 3.0 | SD | PD Charge",
    condition: "Brand New",
    description: "Expand one USB-C port into HDMI, USB-A, SD card and pass-through charging. Ideal for MacBooks and modern laptops.",
    fullSpecs: {
      "Ports": "HDMI 4K, 2× USB 3.0, SD/TF, USB-C PD",
      "Charge pass-through": "Up to 100W",
      "Compatible": "MacBook, USB-C Windows laptops"
    }
  },
  {
    id: "ac-011",
    name: "Laptop Stand Aluminium",
    brand: "Generic",
    category: "accessories",
    price: 95,
    oldPrice: 130,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&q=80"
    ],
    badge: null,
    rating: 4.5,
    reviews: 91,
    stock: 22,
    specs: "Adjustable | Foldable | Aluminium",
    condition: "Brand New",
    description: "Ergonomic aluminium laptop stand. Improves posture and airflow. Folds flat for travel.",
    fullSpecs: {
      "Material": "Aluminium",
      "Adjustable": "Yes, multiple angles",
      "Foldable": "Yes",
      "Fits": "Up to 17\" laptops"
    }
  },
  {
    id: "ac-012",
    name: "Screen Protector Tempered Glass (Universal Pack)",
    brand: "Generic",
    category: "accessories",
    price: 25,
    oldPrice: 40,
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=80"
    ],
    badge: "Flash Sale",
    rating: 3.9,
    reviews: 340,
    stock: 80,
    specs: "9H Hardness | Bubble-free | Clear",
    condition: "Brand New",
    description: "Tempered glass screen protector. Tell us your phone model and we will supply the correct size.",
    fullSpecs: {
      "Hardness": "9H",
      "Install": "Bubble-free kit included",
      "Note": "Specify phone model when ordering"
    }
  }
];

/* Load catalog: localStorage override (from admin) or defaults */
(function () {
  const KEY = "cypher_products";

  function normalizeProduct(p) {
    if (!p) return p;
    if (Array.isArray(p.images) && p.images.length) {
      if (!p.image) p.image = p.images[0];
    } else if (p.image) {
      p.images = [p.image];
    } else {
      p.images = [];
      p.image = "";
    }
    return p;
  }

  function attachHelpers(arr) {
    arr.forEach(normalizeProduct);
    arr.getById = function (id) {
      return this.find((p) => p.id === id) || null;
    };
    arr.getByCategory = function (cat) {
      return this.filter((p) => p.category === cat);
    };
    arr.getFlashSales = function () {
      return this.filter(
        (p) => p.badge === "Flash Sale" || (p.oldPrice && p.oldPrice > p.price)
      );
    };
    arr.getRelated = function (product, limit) {
      limit = limit || 4;
      return this.filter(
        (p) => p.category === product.category && p.id !== product.id
      ).slice(0, limit);
    };
    arr.formatPrice = function (n) {
      return "GHS " + Number(n).toLocaleString("en-GH");
    };
    /** Returns 1–N image URLs for a product (gallery-ready). */
    arr.getImages = function (product) {
      if (!product) return [];
      if (Array.isArray(product.images) && product.images.length) return product.images.slice();
      return product.image ? [product.image] : [];
    };
    return arr;
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length) {
          return attachHelpers(parsed);
        }
      }
    } catch (e) {}
    // deep-ish copy of defaults so admin edits don't mutate the source array in-memory incorrectly
    const copy = JSON.parse(JSON.stringify(window.CypherProductsDefaults));
    return attachHelpers(copy);
  }

  window.CypherProducts = load();

  window.CypherProductsAPI = {
    KEY: KEY,
    reload: function () {
      window.CypherProducts = load();
      return window.CypherProducts;
    },
    save: function (list) {
      localStorage.setItem(KEY, JSON.stringify(list));
      window.CypherProducts = attachHelpers(list);
      return window.CypherProducts;
    },
    reset: function () {
      localStorage.removeItem(KEY);
      window.CypherProducts = load();
      return window.CypherProducts;
    },
    defaults: function () {
      return JSON.parse(JSON.stringify(window.CypherProductsDefaults));
    },
  };
})();
