import { getHotels } from '@/lib/strapi';
import { HotelCard } from '../components/hotel/HotelCard';

export default async function HotelsPage() {
  const hotels = await getHotels();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">호텔</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
} 