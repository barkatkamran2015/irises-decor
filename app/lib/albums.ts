export type Album = {
  slug: string;
  title: string;
  type: string;
  packageName: "Sweet Celebration" | "Wedding Bloom" | "Signature Gala";
  priceNote: string;
  image: string;
  gallery: string[];
  details: string;
  description: string;
  palette: string[];
  guestRange: string;
  mood: string;
  includes: string[];
};

export const albums: Album[] = [
  {
    slug: "garden-wedding",
    title: "Garden Wedding",
    type: "Wedding",
    packageName: "Wedding Bloom",
    priceNote: "Best for ceremony and reception",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85"
    ],
    details: "Fresh flowers, aisle styling, sweetheart table, guest tables",
    description:
      "A soft floral wedding style with a romantic ceremony point, layered reception tables, candles, and garden-inspired details.",
    palette: ["Ivory", "Blush", "Leaf green", "Gold"],
    guestRange: "80-220 guests",
    mood: "Romantic and fresh",
    includes: [
      "Ceremony arch or floral focal point",
      "Aisle flowers and welcome table styling",
      "Sweetheart table and guest table centerpieces",
      "Candle, linen, and floral finishing"
    ]
  },
  {
    slug: "blush-birthday",
    title: "Blush Birthday",
    type: "Birthday",
    packageName: "Sweet Celebration",
    priceNote: "Best for birthdays and home parties",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1602631985686-1bb0e6a8696e?auto=format&fit=crop&w=1200&q=85"
    ],
    details: "Balloon wall, cake table, photo corner, custom colors",
    description:
      "A bright birthday setup with a decorated cake table, layered balloon styling, floral accents, and a photo-ready focal wall.",
    palette: ["Blush", "Coral", "White", "Chrome"],
    guestRange: "20-100 guests",
    mood: "Playful and polished",
    includes: [
      "Custom backdrop",
      "Cake and dessert table styling",
      "Balloon garland or flower wall detail",
      "Name, age, or message display"
    ]
  },
  {
    slug: "evening-reception",
    title: "Evening Reception",
    type: "Wedding",
    packageName: "Signature Gala",
    priceNote: "Best for large rooms and full styling",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=85"
    ],
    details: "Reception tables, candles, florals, entrance moment",
    description:
      "A complete reception look with dramatic room entry, warm table lighting, elevated florals, and polished guest seating.",
    palette: ["Emerald", "White", "Amber", "Black"],
    guestRange: "120-450 guests",
    mood: "Elegant and dramatic",
    includes: [
      "Entrance display and seating chart styling",
      "Guest table centerpieces and candles",
      "Head table or stage decor",
      "Room layout decor direction"
    ]
  },
  {
    slug: "sweet-shower",
    title: "Sweet Shower",
    type: "Baby shower",
    packageName: "Sweet Celebration",
    priceNote: "Best for showers and family brunches",
    image:
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=1200&q=85"
    ],
    details: "Soft flowers, dessert display, welcome table, backdrop",
    description:
      "A gentle shower design for baby showers, bridal showers, and daytime celebrations with soft color and pretty table moments.",
    palette: ["Sky", "White", "Pink", "Fresh green"],
    guestRange: "25-120 guests",
    mood: "Sweet and airy",
    includes: [
      "Welcome sign and guest table",
      "Dessert table and themed backdrop",
      "Floral and balloon accents",
      "Photo corner"
    ]
  },
  {
    slug: "romantic-proposal",
    title: "Romantic Proposal",
    type: "Engagement",
    packageName: "Sweet Celebration",
    priceNote: "Best for private celebrations",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1200&q=85"
    ],
    details: "Dinner setup, candles, floral arch, private styling",
    description:
      "An intimate romantic setting with candles, flowers, dinner styling, and a clean photo moment for proposals and engagements.",
    palette: ["Red", "White", "Candlelight", "Green"],
    guestRange: "2-40 guests",
    mood: "Intimate and romantic",
    includes: [
      "Private table styling",
      "Candles and floral accents",
      "Proposal backdrop or arch",
      "Optional family reveal area"
    ]
  },
  {
    slug: "graduation-dinner",
    title: "Graduation Dinner",
    type: "Happy party",
    packageName: "Wedding Bloom",
    priceNote: "Best for milestone dinners",
    image:
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1200&q=85"
    ],
    details: "Family tables, stage detail, balloons, memory display",
    description:
      "A polished family celebration with a milestone display, dinner tables, accent florals, and a confident photo backdrop.",
    palette: ["Teal", "White", "Gold", "Coral"],
    guestRange: "40-180 guests",
    mood: "Joyful and modern",
    includes: [
      "Memory or achievement display",
      "Dinner table styling",
      "Balloon and floral accents",
      "Photo backdrop"
    ]
  }
];

export function getAlbum(slug: string) {
  return albums.find((album) => album.slug === slug);
}
