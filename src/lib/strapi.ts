import { env } from '@/env.mjs';

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