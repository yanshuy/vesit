import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ChevronUpIcon, ChevronDown } from 'lucide-react';
import Map from '../components/Map'; // Assuming you have this component

interface ParkingSpot {
  id: string;
  name: string;
  address: string;
  price: number;
  available: boolean;
  distance: string;
  imageUrl: string;
}

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState<string>('');
  const [isLocationExpanded, setIsLocationExpanded] = useState(false);
  const navigate = useNavigate();

  // Get user's location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
                {
                  headers: {
                    'User-Agent': 'ParkEase App (your@email.com)' // Replace with your contact
                  }
                }
              );
            const data = await response.json();
            setUserLocation(data.display_name);
            console.log(data);
            
          } catch (error) {
            setUserLocation('')
            console.error('Error fetching location:', error);
          }
        },
        (error) => {
          setUserLocation('')
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
  };

  const truncateLocation = (location: string) => {
    const words = location.split(' ');
    if (words.length <= 2) return location;
    return words.slice(0, 2).join(' ') + '...';
  };

  const handleLocationClick = () => {
    setIsLocationExpanded(!isLocationExpanded);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-[50vh] overflow-hidden">
        <Map onlyMap={true}/>
        <div className="absolute inset-0 z-[10] bg-blue-950/50 flex flex-col justify-between h-full p-6">
          <div className="text-white mb-8 flex flex-col justify-between h-full">
            <div className="relative">
                <button 
                onClick={handleLocationClick}
                className="flex flex-col gap-2 hover:bg-white/10 rounded-lg p-3 transition-all duration-200 w-full"
                >
                <div className="flex items-center justify-between gap-2">
                    <span className="text-sm text-gray-100">Your location</span>
                    <ChevronDown 
                    className={`w-4 h-4 transition-transform duration-200
                    ${isLocationExpanded ? 'rotate-180' : ''}`}
                    />
                </div>
                <div className="flex items-start gap-2">
                    <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                    <div className="flex flex-col">
                    <p className="text-sm text-start font-medium">
                        {!isLocationExpanded ? 
                        (userLocation ? truncateLocation(userLocation) : 'Loading location...') : 
                        userLocation
                        }
                    </p>
                    </div>
                </div>
                </button>
            </div>

            <div className='flex flex-col'>
              <h1 className="text-4xl font-semibold mb-4">
                Let's find the best Parking Space
              </h1>
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for parking spots..."
                  className="w-full px-4 py-3 pl-12 rounded-lg bg-transparent border 
                    text-white placeholder-white focus:outline-none"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white" />
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Parking Spots Section */}
      <div className="px-4 py-6">
        <h2 className="text-xl font-semibold mb-4">Nearby Parking Spots</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ParkingSpotCard
            spot={{
              id: '1',
              name: 'Central Parking',
              address: '123 Main St',
              price: 5,
              available: true,
              distance: '0.5 km',
              imageUrl: '/parking1.jpg'
            }}
          />
          {/* Add more parking spot cards here */}
        </div>
      </div>
    </div>
  );
};

const ParkingSpotCard: React.FC<{ spot: ParkingSpot }> = ({ spot }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/parking-spots/${spot.id}`)}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow 
        duration-200 cursor-pointer overflow-hidden"
    >
      <div className="relative h-48">
        <img
          src={spot.imageUrl}
          alt={spot.name}
          className="w-full h-full object-cover"
        />
        {spot.available && (
          <span className="absolute top-2 right-2 px-2 py-1 bg-green-500 
            text-white text-xs font-medium rounded">
            Available
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{spot.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{spot.address}</p>
        <div className="flex justify-between items-center">
          <span className="text-purple-600 font-bold">${spot.price}/hr</span>
          <span className="text-sm text-gray-500">{spot.distance}</span>
        </div>
      </div>
    </div>
  );
};

export default Home;