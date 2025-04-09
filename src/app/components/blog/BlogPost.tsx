'use client';

import Link from 'next/link';
import { BlogPost } from '@/lib/strapi';

interface BlogPostProps {
  post: BlogPost;
}

export function BlogPostPreview({ post }: BlogPostProps) {
  return (
    <article className="py-8 border-b border-gray-200 last:border-0">
      <header className="mb-4">
        <Link href={`/blog/${post.Slug}`}>
          <h2 className="text-2xl font-bold hover:text-blue-600 transition-colors">
            {post.Title}
          </h2>
        </Link>
        <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
          <time dateTime={post.PublishedDate || ''}>
            {post.PublishedDate ? new Date(post.PublishedDate).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }) : '날짜 미정'}
          </time>
          {post.Author && (
            <>
              <span>•</span>
              <span>{post.Author.username}</span>
            </>
          )}
        </div>
      </header>

      <div className="prose prose-gray max-w-none mb-4">
        <p className="text-gray-600">
          {post.Content.split('\n')[0]}
        </p>
      </div>

      <footer className="flex flex-wrap gap-4 text-sm">
        {post.destinations.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-gray-500">여행지:</span>
            <div className="flex flex-wrap gap-2">
              {post.destinations.map((dest) => (
                <Link
                  key={dest.id}
                  href={`/destinations/${dest.slug}`}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {dest.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {post.hotels.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-gray-500">호텔:</span>
            <div className="flex flex-wrap gap-2">
              {post.hotels.map((hotel) => (
                <Link
                  key={hotel.id}
                  href={`/hotels/${hotel.id}`}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {hotel.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </footer>
    </article>
  );
} 