export type Product = {
  title: string;
  reviews: number;
  price: number;
  discountedPrice: number;
  id: number;
  imgs?: {
    thumbnails: string[];
    previews: string[];
  };
  description?: string;
  material?: string;
  dimensions?: string;
  warranty?: string;
  brand?: string;
  weight?: string;
  color?: string;
};
