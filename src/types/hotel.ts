export interface Hotel {
  id: number;
  name: string;
  chain: string;
  brand: string;
  description: string;
  pointRedemption: number;
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  featuredImage: {
    id: number;
    name: string;
    formats: {
      thumbnail: ImageFormat;
      small: ImageFormat;
      medium: ImageFormat;
      large: ImageFormat;
    };
    url: string;
  };
  gallery?: {
    id: number;
    name: string;
    formats: ImageFormat[];
    url: string;
  }[];
  destination: {
    id: number;
    name: string;
    country: string;
  };
}

interface ImageFormat {
  name: string;
  width: number;
  height: number;
  url: string;
} 