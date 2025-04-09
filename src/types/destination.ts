export interface Destination {
  id: number;
  locale: string;
  name: string;
  slug: string;
  region: string;
  country: string;
  description: string;
  bestTimeToVisit: {
    months: number[];
    description: {
      ko: string;
      en: string;
    };
  };
  popularActivities: Array<{
    name: {
      ko: string;
      en: string;
    };
    icon: string;
  }>;
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
}

interface ImageFormat {
  name: string;
  width: number;
  height: number;
  url: string;
} 