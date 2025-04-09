import { getDestinations } from '@/lib/strapi';
import { DestinationCard } from '../components/destination/DestinationCard';

export default async function DestinationsPage() {
  const destinations = await getDestinations();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">여행지</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((destination) => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </div>
    </div>
  );
} 