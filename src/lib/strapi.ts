import { env } from '@/env.mjs';
import { Destination } from '@/types/destination';

export interface BlogPost {
  id: number;
  Title: string;
  Content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
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

  const data = await response.json();
  console.log('Strapi API Response:', data);
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