import { env } from '@/env.mjs';
import { Destination } from '@/types/destination';
import { Hotel } from '@/types/hotel';

interface StrapiUser {
  id: number;
  username: string;
  email: string;
  documentId: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Post {
  id: number;
  documentId: string;
  Title: string;
  Slug: string | null;
  Content: string;
  PublishedDate: string | null;
  Author: StrapiUser;
  destinations: Array<Destination>;
  hotels: Array<Hotel>;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  localizations: any[];
}

export interface StrapiResponse<T> {
  data: Array<T>;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    }
  }
}

export async function getPosts(): Promise<Array<Post>> {
  const response = await fetch(
    `${env.NEXT_PUBLIC_STRAPI_API_URL}/api/posts?populate=*`,
    {
      headers: {
        Authorization: `Bearer ${env.STRAPI_API_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }

  const data = await response.json() as StrapiResponse<Post>;
  return data.data;
}

export async function getDestinations() {
  const response = await fetch(
    `${env.NEXT_PUBLIC_STRAPI_API_URL}/api/dests?populate=*`,
    {
      headers: {
        Authorization: `Bearer ${env.STRAPI_API_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch destinations');
  }

  const data = await response.json();
  return data.data as Destination[];
}

export async function getHotels() {
  const response = await fetch(
    `${env.NEXT_PUBLIC_STRAPI_API_URL}/api/hotels?populate=*`,
    {
      headers: {
        Authorization: `Bearer ${env.STRAPI_API_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch hotels');
  }

  const data = await response.json();
  return data.data as Hotel[];
} 