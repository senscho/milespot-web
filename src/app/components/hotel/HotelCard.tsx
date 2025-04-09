'use client';

import Image from 'next/image';
import { Hotel } from '@/types/hotel';
import { env } from '@/env.mjs';
import { useEffect, useRef, useState } from 'react';

interface HotelCardProps {
  hotel: Hotel;
}

export function HotelCard({ hotel }: HotelCardProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const checkScrollable = () => {
    if (contentRef.current) {
      const { scrollHeight, clientHeight } = contentRef.current;
      setIsScrollable(scrollHeight > clientHeight + 10); // Add small threshold
    }
  };

  const handleScroll = () => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      // Add small threshold to prevent floating point issues
      setIsScrolled(scrollTop + clientHeight + 10 >= scrollHeight);
    }
  };

  useEffect(() => {
    // Initial check
    checkScrollable();
    handleScroll();

    // Add event listeners
    window.addEventListener('resize', checkScrollable);
    const currentRef = contentRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
    }

    // Recheck after images and content are loaded
    const timer = setTimeout(() => {
      checkScrollable();
      handleScroll();
    }, 100);

    return () => {
      window.removeEventListener('resize', checkScrollable);
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll);
      }
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[600px] flex flex-col">
      <div className="relative h-64 flex-shrink-0">
        <Image
          src={`${env.NEXT_PUBLIC_STRAPI_API_URL}${hotel.featuredImage.formats.medium.url}`}
          alt={hotel.name}
          fill
          className="object-cover"
          onLoad={checkScrollable}
        />
      </div>
      <div className="p-6 flex-1 overflow-hidden flex flex-col">
        <div className="flex-shrink-0">
          <h2 className="text-2xl font-bold mb-2">{hotel.name}</h2>
          <p className="text-gray-600 mb-4">{hotel.destination.name}, {hotel.destination.country}</p>
        </div>

        <div className="relative flex-1">
          <div 
            ref={contentRef} 
            className="overflow-y-auto absolute inset-0"
            onScroll={handleScroll}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold mb-2">체인 & 브랜드</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded">
                    {hotel.chain}
                  </span>
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded">
                    {hotel.brand}
                  </span>
                </div>
              </div>
              {hotel.pointRedemption && (
                <div>
                  <h3 className="font-semibold mb-2">포인트 숙박</h3>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {hotel.pointRedemption.toLocaleString()} pts
                  </span>
                </div>
              )}
            </div>
            
            <div className="mb-16">
              <h3 className="font-semibold mb-2">호텔 정보</h3>
              <p className="text-sm text-gray-600">{hotel.description}</p>
            </div>
          </div>
          {isScrollable && !isScrolled && (
            <div className="absolute -bottom-6 left-0 right-0 h-24 pointer-events-none bg-gradient-to-t from-white via-white to-transparent flex items-end justify-center pb-2">
              <svg 
                className="w-8 h-8 text-gray-400 animate-bounce" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 9l-7 7-7-7" 
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 