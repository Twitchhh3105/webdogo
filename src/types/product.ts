export type Product = {
  _id: string;
  title: string;
  price: number;
  discountedPrice?: number;
  imageUrl?: string;
  categoryTitle?: string;
  reviews?: number;

  // Legacy fields
  id?: number;
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
