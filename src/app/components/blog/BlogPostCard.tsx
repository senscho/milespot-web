'use client';

import Link from 'next/link';
import { BlogPost } from '@/lib/strapi';

interface BlogPostCardProps {
  post: BlogPost;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <Link 
          href={`/blog/${post.Slug}`}
          className="inline-block"
        >
          <h2 className="text-2xl font-bold mb-2 hover:text-blue-600 transition-colors">
            {post.Title}
          </h2>
        </Link>

        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <span>{new Date(post.PublishedDate).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</span>
          <span>•</span>
          <span>{post.author?.username}</span>
        </div>

        <div className="prose prose-sm max-w-none mb-4">
          {/* Show only first paragraph of content */}
          <p>{post.Content.split('\n')[0]}</p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm">
          {post.destinations?.data.length > 0 && (
            <div className="flex items-center gap-2">
              <svg 
                className="w-4 h-4 text-gray-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                />
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                />
              </svg>
              <div className="flex flex-wrap gap-2">
                {post.destinations.data.map((dest) => (
                  <Link
                    key={dest.id}
                    href={`/destinations/${dest.attributes.slug}`}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    {dest.attributes.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {post.hotels?.data.length > 0 && (
            <div className="flex items-center gap-2">
              <svg 
                className="w-4 h-4 text-gray-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" 
                />
              </svg>
              <div className="flex flex-wrap gap-2">
                {post.hotels.data.map((hotel) => (
                  <Link
                    key={hotel.id}
                    href={`/hotels/${hotel.attributes.slug}`}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    {hotel.attributes.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
