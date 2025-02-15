import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, ChevronUpIcon, ChevronDown, Star, Clock, Car, ArrowRight } from 'lucide-react';
import Map from '../components/Map'; // Assuming you have this component
import { IconRight } from 'react-day-picker';

interface ParkingSpot {
  id: string;
  name: string;
  address: string;
  price: number;
  available: boolean;
  time: number;
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
                    ${isLocationExpanded ? 'rotate-180' : ''} ${window.innerWidth > 768 ? 'hidden' : ''}`}
                    />
                </div>
                <div className="flex items-start gap-2">
                    <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                    <div className="flex flex-col">
                    <p className="text-sm text-start font-medium">
                        {!isLocationExpanded && window.innerWidth < 768? 
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
                  className="md:w-1/2 w-full px-4 py-3 pl-12 rounded-lg bg-transparent border 
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
        <div className='flex justify-between items-center'>
          <div>
            <h2 className="text-xl font-semibold">Nearby Parking Spots</h2>
            <p className='text-gray-500 mb-5'>The best parking space near you</p>
          </div>
          <Link to={'/'} className='max-md:hidden'>
            <button className="bg-violet-500 text-white px-4 py-2 rounded-lg w-full flex justify-center items-center gap-3 text-center cursor-pointer">
              View More <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link to={'/parking-spots/1'}>
        <ParkingSpotCard
            spot={{
              id: '1',
              name: 'Central Parking',
              address: '123 Main St, Downtown Area, Near Shopping Mall',
              price: 50,
              available: true,
              time: 4,
              imageUrl: '/Parkingspots/1C.png',
              availableTypes: ['car', 'bike', 'cycle'],
              rating: 4.5,
              reviews: 21,
              availableSlots: 5
            }}
          />
        </Link>
        <ParkingSpotCard
            spot={{
              id: '2',
              name: 'Miraj',
              address: '567 Street, Uptown Nagar, Near Shopping Mall',
              price: 100,
              available: true,
              time: 22,
              imageUrl: '/Parkingspots/1B.png',
              availableTypes: ['car', 'bike'],
              rating: 4.5,
              reviews: 21,
              availableSlots: 28
            }}
          />
        {window.innerWidth > 1023 && (
          <ParkingSpotCard
          spot={{
            id: '2',
            name: 'Pheonix Malls',
            address: '972 Street, Lefttown hurch, Near Shopping Mall',
            price: 17000,
            available: true,
            time: 2,
            imageUrl: '/Parkingspots/1B.png',
            availableTypes: ['car', 'bike'],
            rating: 4.5,
            reviews: 21,
            availableSlots: 17
          }}
        />
        )}
        </div>
        <Link to={'/'} className='md:hidden '>
          <button className="bg-violet-500 text-white px-4 py-2 mt-4 rounded-lg w-full flex justify-center items-center gap-3 text-center cursor-pointer">
            View More <ArrowRight className="w-5 h-5" />
          </button>
        </Link>
      </div>
    </div>
  );
};

// Update the ParkingSpot interface first
interface ParkingSpot {
  id: string;
  name: string;
  address: string;
  price: number;
  available: boolean;
  time: number;
  imageUrl: string;
  availableTypes: ('car' | 'bike' | 'cycle')[];
  rating: number;
  reviews: number;
  availableSlots: number;
}

// Update the ParkingSpotCard component
const ParkingSpotCard: React.FC<{ spot: ParkingSpot }> = ({ spot }) => {
  const navigate = useNavigate();

  const truncateAddress = (address: string) => {
    return address.length > 35 ? address.substring(0, 35) + '...' : address;
  };

  return (
    <div
      onClick={() => navigate(`/parking-spots/${spot.id}`)}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow 
        duration-200 cursor-pointer overflow-hidden p-4"
    >
      <div className="flex gap-4">
        {/* Left side - Image */}
        <div className="w-1/4">
          <img
            src={spot.imageUrl}
            alt={spot.name}
            className="w-full aspect-square object-cover rounded-lg"
          />
        </div>

        {/* Right side - Details */}
        <div className="w-3/4 flex flex-col gap-1">
          {/* Vehicle Types */}
          <div className="flex gap-2">
            {spot.availableTypes.map((type) => (
              <span 
                key={type}
                className="px-2 py-0.5 bg-violet-50 text-violet-400 rounded text-xs font-medium"
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </span>
            ))}
          </div>

          {/* Name */}
          <h3 className="font-semibold text-gray-900">{spot.name}</h3>

          {/* Address */}
          <p className="text-gray-500 text-sm">{truncateAddress(spot.address)}</p>
        </div>
      </div>

      {/* Rating and Reviews */}
      <div className="flex items-center gap-2 pt-3">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(spot.rating) 
                  ? 'text-yellow-300 fill-yellow-300' 
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600">
          ({spot.reviews} reviews)
        </span>
      </div>

      {/* Bottom Row */}
      <div className="flex items-center text-gray-500 justify-between pt-3">
        <span className="">
          ₹ {spot.price}/hr
        </span>
        <span className="flex justify-center items-center gap-2">
          <Clock className='h-4 w-4'/> {spot.time} minutes
        </span>
        <span className="flex justify-center items-center gap-2">
          <Car className='h-5 w-5'/> {spot.availableSlots} available
        </span>
      </div>
    </div>
  );
};

export default Home;