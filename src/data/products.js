// Static marketplace product data for Phase 7.
// Later this can be sourced from vendor-uploaded craft photos (see VendorDashboard.jsx).

export const products = [
  {
    id: "p1",
    name: "Sohrai Wall Mural Print",
    category: "painting",
    artist: "Budhni Devi",
    price: 1800,
    photo: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=500&q=80",
    description: "Hand-painted Sohrai mural on canvas, using traditional earth pigments and finger-painting technique passed down through generations.",
  },
  {
    id: "p2",
    name: "Dokra Metal Horse Figurine",
    category: "metalcraft",
    artist: "Sanjay Mahato",
    price: 2400,
    photo: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=500&q=80",
    description: "Lost-wax cast bronze figurine, a Dokra metalcraft tradition over 4000 years old, unique to tribal artisans of Jharkhand.",
  },
  {
    id: "p3",
    name: "Khovar Bridal Art Panel",
    category: "painting",
    artist: "Rupa Kumari",
    price: 3200,
    photo: "https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=500&q=80",
    description: "Khovar mural traditionally painted on marriage-chamber walls, symbolizing fertility and prosperity.",
  },
  {
    id: "p4",
    name: "Bamboo Handwoven Basket",
    category: "craft",
    artist: "Manohar Oraon",
    price: 650,
    photo: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500&q=80",
    description: "Traditional bamboo basket handwoven by local artisans, used for both daily use and decor.",
  },
  {
    id: "p5",
    name: "Terracotta Tribal Mask",
    category: "craft",
    artist: "Budhni Devi",
    price: 950,
    photo: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&q=80",
    description: "Hand-molded terracotta mask depicting tribal folklore, fired in traditional kilns.",
  },
  {
    id: "p6",
    name: "Dokra Tribal Pendant Set",
    category: "metalcraft",
    artist: "Sanjay Mahato",
    price: 1200,
    photo: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80",
    description: "Handcrafted brass pendant set using the same lost-wax casting technique as larger Dokra work.",
  },
];

export const artists = {
  "Budhni Devi": {
    bio: "A third-generation Sohrai artist from Hazaribagh, Budhni has been painting since childhood, learning the craft from her mother and grandmother. Her work has been exhibited at state craft fairs.",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80",
  },
  "Sanjay Mahato": {
    bio: "Master Dokra metalworker from a family lineage of Dhokra Damar craftsmen. Specializes in lost-wax casting techniques over 4000 years old.",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
  },
  "Rupa Kumari": {
    bio: "Khovar art specialist known for intricate bridal mural work, trained under senior artists in her village near Hazaribagh.",
    photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300&q=80",
  },
  "Manohar Oraon": {
    bio: "Traditional bamboo craftsman weaving functional and decorative items using techniques passed down through his tribal community.",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80",
  },
};

export const productCategories = ["all", "painting", "metalcraft", "craft"];
