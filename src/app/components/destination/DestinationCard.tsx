import Image from 'next/image';
import { Destination } from '@/types/destination';
import { env } from '@/env.mjs';

interface DestinationCardProps {
  destination: Destination;
}

export function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-64">
        <Image
          src={`${env.NEXT_PUBLIC_STRAPI_API_URL}${destination.featuredImage.formats.medium.url}`}
          alt={destination.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">{destination.name}</h2>
        <p className="text-gray-600 mb-4">{destination.country}</p>
        
        <div className="mb-4">
          <h3 className="font-semibold mb-2">최적 방문 시기</h3>
          <p>{destination.bestTimeToVisit.description.ko}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {destination.bestTimeToVisit.months.map((month) => (
              <span key={month} className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {month}월
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">인기 활동</h3>
          <div className="flex flex-wrap gap-2">
            {destination.popularActivities.map((activity, index) => (
              <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded flex items-center gap-1">
                {activity.icon && (
                  <span className="material-icons text-sm">{activity.icon}</span>
                )}
                {activity.name.ko}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 