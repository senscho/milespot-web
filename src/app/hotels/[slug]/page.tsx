import { getHotelBySlug } from '@/lib/strapi';
import { notFound } from 'next/navigation';
import { HotelCard } from '@/app/components/hotel/HotelCard';

interface HotelPageProps {
  params: {
    slug: string;
  };
}

// export async function generateStaticParams() {
//   const hotels = await getHotels();
//   return hotels.map((hotel) => ({
//     slug: hotel.slug,
//   }));
// }

export default async function HotelPage({ params }: HotelPageProps) {
  const { slug } = params;
  const hotel = await getHotelBySlug(slug);

  if (!hotel) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* <main className="container mx-auto px-4 py-8"> */}
        <HotelCard hotel={hotel} />
      </main>
    </div>
  );
} 