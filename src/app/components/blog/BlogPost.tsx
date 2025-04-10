'use client';

import Link from 'next/link';
import type { Post } from '@/lib/strapi';
import { compile, evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { HotelCard } from '../hotel/HotelCard';

interface BlogPostProps {
  post: Post;
}

export function BlogPost({ post }: BlogPostProps) {
  const [content, setContent] = useState<React.ReactNode>(null);

  useEffect(() => {
    const testMDX = `
# 제목입니다

이것은 테스트 문단입니다.

<HotelCard hotel={post.hotels[0]} />

마지막 문단입니다.
`;

    async function convertMDX() {
      try {
        const compiled = await compile(testMDX, {
          outputFormat: 'function-body',
          development: true,
        });
        console.log(compiled);
        
        // const { default: Content } = await evaluate(compiled, {
        //   ...runtime,
        //   jsx: runtime.jsx,
        //   jsxs: runtime.jsxs,
        //   Fragment: runtime.Fragment
        // });

        // setContent(<Content components={{ HotelCard }} />);
      } catch (error) {
        console.error('MDX 변환 에러:', error);
        setContent(<div className="text-red-500">컨텐츠를 불러오는데 실패했습니다.</div>);
      }
    }

    convertMDX();
  }, [post]);

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
        {content}
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