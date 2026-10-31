export type Flavor = "vanilla" | "pistachio" | "chocolate";

export const cakeFlavors: {
  id: Flavor;
  name: string;
  note: string;
  swatch: string;
  price: string;
}[] = [
  {
    id: "vanilla",
    name: "Vanille",
    note: "Madagascan vanilla · brown butter · pear",
    swatch: "#e9d6b8",
    price: "640 DKK",
  },
  {
    id: "pistachio",
    name: "Pistache",
    note: "Sicilian pistachio · orange blossom · raspberry",
    swatch: "#c9cfa4",
    price: "720 DKK",
  },
  {
    id: "chocolate",
    name: "Chocolat",
    note: "70% cacao · sea salt · burnt honey",
    swatch: "#8b5a3c",
    price: "780 DKK",
  },
];

export type Cake = {
  id: string;
  index: string;
  name: string;
  notes: string;
  description: string;
  price: string;
  image: string;
  hoverImage: string;
  alt: string;
  layout: string;
  aspect: string;
};

export const cakes: Cake[] = [
  {
    id: "rose-de-minuit",
    index: "01",
    name: "Rose de Minuit",
    notes: "Rose · Raspberry · Lychee",
    description:
      "A pale rosewater crumb, layered with raspberry confiture and a whisper of lychee cream. Finished with macarons made the same morning.",
    price: "720 DKK",
    image: "/assets/cake-rose.jpg",
    hoverImage: "/assets/cake-rose-detail.jpg",
    alt: "Pale pink cake crowned with macarons, raspberries and piped cream",
    layout: "md:col-span-7",
    aspect: "aspect-[4/5] md:aspect-[5/6]",
  },
  {
    id: "le-jardin",
    index: "02",
    name: "Le Jardin",
    notes: "70% Chocolate · Fig · Blackberry",
    description:
      "Dark chocolate ganache, blackberry compote and fresh figs. A cake that behaves like a still life — bitter, sweet, and a little wild.",
    price: "780 DKK",
    image: "/assets/cake-berry.jpg",
    hoverImage: "/assets/cake-berry-detail.jpg",
    alt: "Dark chocolate cake adorned with figs, blackberries, raspberries and rose petals",
    layout: "md:col-span-5 md:mt-28",
    aspect: "aspect-[4/5]",
  },
  {
    id: "noir-et-fraise",
    index: "03",
    name: "Noir et Fraise",
    notes: "Dark Chocolate · Strawberry · Sea Salt",
    description:
      "Our most requested cake. Valrhona ganache, macerated strawberries and a pinch of Maldon salt. The drip is deliberate; the recipe is not.",
    price: "820 DKK",
    image: "/assets/cake-strawberry.jpg",
    hoverImage: "/assets/cake-strawberry-detail.jpg",
    alt: "Chocolate drip cake being finished with fresh strawberries and blueberries",
    layout: "md:col-span-5 md:col-start-2 md:mt-8",
    aspect: "aspect-[4/5]",
  },
  {
    id: "la-blanche",
    index: "04",
    name: "La Blanche",
    notes: "Vanilla Bean · Pear · Brown Butter",
    description:
      "A study in white. Madagascan vanilla, poached pear and brown butter buttercream, textured by hand so that no two cakes are ever the same.",
    price: "640 DKK",
    image: "/assets/cake-blanc.jpg",
    hoverImage: "/assets/cake-blanc-detail.jpg",
    alt: "Textured ivory buttercream cake with dried flowers on a glass stand",
    layout: "md:col-span-7",
    aspect: "aspect-[4/5] md:aspect-[6/5]",
  },
  {
    id: "heure-doree",
    index: "05",
    name: "L'Heure Dorée",
    notes: "Lemon · Olive Oil · Thyme",
    description:
      "Sicilian lemon, cold-pressed olive oil and a little thyme sugar. Bright, grown-up and best eaten with your fingers, standing up.",
    price: "600 DKK",
    image: "/assets/cake-lemon-table.jpg",
    hoverImage: "/assets/cake-lemon.jpg",
    alt: "Lemon cake on a table with fresh lemons, coffee and linen",
    layout: "md:col-span-6 md:col-start-4",
    aspect: "aspect-[4/5] md:aspect-[3/2]",
  },
];

export const navLinks = [
  { label: "The Collection", href: "#collection" },
  { label: "The Atelier", href: "#atelier" },
  { label: "Our Craft", href: "#craft" },
  { label: "Contact", href: "#contact" },
];

export const marqueeWords = [
  "Cultured butter",
  "Seasonal fruit",
  "Small batch",
  "Made by hand",
  "Copenhagen",
  "Always buttercream",
];

export const ingredients = [
  {
    index: "01",
    name: "Cultured butter",
    note: "Churned slowly in Jutland, 82% fat, tasted before it ever meets sugar.",
  },
  {
    index: "02",
    name: "Madagascan vanilla",
    note: "Split by hand, steeped overnight, never an extract.",
  },
  {
    index: "03",
    name: "Eggs, 40km away",
    note: "From a single farm. Deep yolks, strong shells, no shortcuts.",
  },
];
