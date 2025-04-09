import { env } from '@/env.mjs';
import { Destination } from '@/types/destination';
import { Hotel } from '@/types/hotel';

export interface BlogPost {
  id: number;
  Title: string;
  Content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
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

export type BlogPostWithId = BlogPost['attributes'] & { id: number };

export async function getBlogPosts(): Promise<BlogPostWithId[]> {
  const response = await fetch(
    `${env.NEXT_PUBLIC_STRAPI_API_URL}/api/posts?populate=*`,
    {
      headers: {
        Authorization: `Bearer ${env.STRAPI_API_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch blog posts');
  }

  const data = await response.json() as StrapiResponse<BlogPost>;
  console.log('Strapi API Response:', data);
  
  // Transform the response to match the expected format
  return data.data.map(post => ({
    id: post.id,
    ...post.attributes
  }));
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