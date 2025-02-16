import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Navigation2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PARKING_SPOTS } from "../search-parking-spot/ParkingSpotSearch";

export default function EventPage() {
  const navigate = useNavigate();

  // Mock event data
  const event = {
    id: 1,
    name: "Music Concert at Phoenix Marketcity",
    date: "2024-02-20",
    time: "7:00 PM",
    location: "Phoenix Marketcity, Mumbai, Maharashtra 400063",
    coordinates: { lat: 19.0867, lng: 72.8892 }, // Phoenix Marketcity coordinates
    description: "Join us for an evening of live music featuring local artists.",
    ticketPrice: "₹500",
    expectedAttendance: "2000+"
  };

  // Calculate distances based on event location
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Get nearby parking spots and calculate actual distances
  const nearbyParkingSpots = PARKING_SPOTS
    .map(spot => ({
      ...spot,
      distance: calculateDistance(
        event.coordinates.lat,
        event.coordinates.lng,
        spot.coordinates.lat,
        spot.coordinates.lng
      ).toFixed(1),
      price: `₹${Math.floor(parseFloat(spot.distance) * 50)}/hour`
    }))
    .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
    .slice(0, 3);

  const handleNavigate = (parking: typeof nearbyParkingSpots[0]) => {
    navigate('/searchparkingspot', {
      state: {
        searchQuery: parking.name,
        coordinates: parking.coordinates,
        fromEvent: true
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-10 px-5">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{event.name}</h1>
          <p className="text-gray-600">{event.description}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Event Details Card */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Event Details</h3>
              <p className="text-gray-500">Important information about the event</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-violet-500" />
                <div>
                  <p className="font-medium">Date & Time</p>
                  <p className="text-gray-600">{event.date} at {event.time}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-violet-500" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-gray-600">{event.location}</p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Ticket Price</span>
                  <span className="font-medium">{event.ticketPrice}</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-600">Expected Attendance</span>
                  <span className="font-medium">{event.expectedAttendance}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Parking Suggestions Card */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Parking Suggestions</h3>
              <p className="text-gray-500">Pre-book your parking spot</p>
            </div>

            <div className="space-y-4">
              {nearbyParkingSpots.map((parking) => (
                <div
                  key={parking.id}
                  className="flex items-center justify-between p-4 rounded-lg border hover:border-violet-200 transition-colors"
                >
                  <div>
                    <h4 className="font-semibold text-gray-900">{parking.name}</h4>
                    <p className="text-sm text-gray-500">
                      {parking.distance}km away • {parking.price}
                    </p>
                    <div className="mt-1 flex items-center">
                      <div className={`w-2 h-2 rounded-full ${
                        parking.availableSpots > 10 ? 'bg-green-500' : 'bg-orange-500'
                      } mr-2`} />
                      <span className="text-sm font-medium">
                        {parking.availableSpots} spots available
                      </span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleNavigate(parking)}
                    className="hover:bg-violet-50 hover:text-violet-600 hover:border-violet-200"
                  >
                    <Navigation2 className="h-4 w-4 mr-2" />
                    Navigate
                  </Button>
                </div>
              ))}
            </div>

            <p className="mt-6 text-center text-sm text-gray-500">
              Prices may vary based on duration and demand
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}