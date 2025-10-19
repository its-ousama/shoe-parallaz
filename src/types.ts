export interface Shoe {
  id: number;
  name: string;
  brand: string;
  image?: string;
  description: string;
  year: string;
  colorScheme: {
    bg: string;
    accent: string;
    card: string;
  };
  features: string[];
}