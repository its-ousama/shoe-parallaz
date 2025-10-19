import type { Shoe } from '../types';
import airjordan from '../assets/air-jordan-1.png';
import superstar from '../assets/superstar.png';
import airmax97 from '../assets/airmax-97.png';
import forum from '../assets/forums-low.png';
import blazer from '../assets/blazers.png';

export const shoes: Shoe[] = [
  {
    id: 1,
    name: "Air Jordan 1",
    brand: "Nike",
    image: airjordan,
    description: "The sneaker that started it all. Michael Jordan's signature shoe revolutionized basketball footwear and street culture.",
    year: "1985",
    colorScheme: {
      bg: "from-red-600 via-black to-gray-900",
      accent: "text-red-500",
      card: "bg-black/40"
    },
    features: ["Iconic Design", "Premium Leather", "Air Cushioning"]
  },
  {
    id: 2,
    name: "Superstar",
    brand: "Adidas",
    image: superstar,
    description: "From basketball courts to hip-hop stages, the shell-toe classic that defined generations of style.",
    year: "1969",
    colorScheme: {
      bg: "from-green-600 via-gray-900 to-black",
      accent: "text-green-400",
      card: "bg-gray-900/40"
    },
    features: ["Shell Toe", "Trefoil Logo", "Street Legend"]
  },
  {
    id: 3,
    name: "Air Max 97",
    brand: "Nike",
    image: airmax97,
    description: "Inspired by Japanese bullet trains, these waves of innovation brought full-length Air cushioning to the streets.",
    year: "1997",
    colorScheme: {
      bg: "from-blue-600 via-gray-800 to-slate-900",
      accent: "text-blue-400",
      card: "bg-slate-900/40"
    },
    features: ["Full-Length Air", "Reflective Waves", "Futuristic Design"]
  },
  {
    id: 4,
    name: "Forum",
    brand: "Adidas",
    image: forum,
    description: "High-top excellence from the hardwood. The X-strap design became an icon of 80s basketball culture.",
    year: "1984",
    colorScheme: {
      bg: "from-yellow-600 via-orange-700 to-gray-900",
      accent: "text-yellow-400",
      card: "bg-orange-900/40"
    },
    features: ["High-Top Design", "Ankle X-Strap", "Retro Classic"]
  },
  {
    id: 5,
    name: "Blazer Mid '77",
    brand: "Nike",
    image: blazer,
    description: "Vintage basketball aesthetics meet modern street style. The exposed foam tongue and retro swoosh create timeless appeal.",
    year: "1977",
    colorScheme: {
      bg: "from-purple-600 via-indigo-800 to-gray-900",
      accent: "text-purple-400",
      card: "bg-indigo-900/40"
    },
    features: ["Vintage Style", "Exposed Foam", "Classic Swoosh"]
  },
];