// ParkingSpotProfile.tsx
import { Star, MapPin, Clock, Shield, ArrowLeft, Calendar } from "lucide-react";
import ReviewSection from "./ReviewSection";
import { useNavigate } from "react-router-dom";

const spot = {
  id: 1,
  name: "City Center Parking",
  mainImage: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
  images: [
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
  ],
  rating: 4.7,
  reviews: 128,
  location: "123 Main St, Downtown, Metropolis",
  price: "$5/hour",
  distance: "0.5 miles",
  description:
    "Located in the heart of downtown, City Center Parking offers secure, 24/7 parking with state-of-the-art surveillance systems. Our facility features both covered and open-air parking options, EV charging stations, and easy access to major attractions.",
  features: [
    "24/7 access",
    "Security cameras",
    "EV charging",
    "Covered parking",
    "Valet service",
    "Monthly passes",
  ],
  amenities: [
    {
      icon: "cctv",
      title: "24/7 Surveillance",
      description: "Monitored by security cameras",
    },
    {
      icon: "charging",
      title: "EV Charging",
      description: "6 charging stations available",
    },
    {
      icon: "covered",
      title: "Covered Parking",
      description: "Protection from weather elements",
    },
  ],
  operatingHours: {
    weekdays: "5:00 AM - 11:00 PM",
    weekends: "24 hours",
  },
  pricing: [
    {
      duration: "1 hour",
      price: "$5.00",
    },
    {
      duration: "3 hours",
      price: "$12.00",
    },
    {
      duration: "6 hours",
      price: "$20.00",
    },
    {
      duration: "24 hours",
      price: "$35.00",
    },
  ],
  reviewsList: [
    {
      id: 1,
      user: "John D.",
      rating: 5,
      date: "2024-03-15",
      comment:
        "Excellent parking facility with great security measures. The location is very convenient and the prices are reasonable.",
      photos: [],
    },
    {
      id: 2,
      user: "Sarah M.",
      rating: 4,
      date: "2024-03-10",
      comment:
        "Clean and well-maintained. The EV charging stations are a big plus!",
      photos: [],
    },
    {
      id: 3,
      user: "Mike R.",
      rating: 4.5,
      date: "2024-03-05",
      comment:
        "Great location and friendly staff. The mobile app for payment is very convenient.",
      photos: [],
    },
  ],
  coordinates: {
    lat: 34.0522,
    lng: -118.2437,
  },
  contact: {
    phone: "+1 (555) 123-4567",
    email: "info@citycenterparking.com",
    website: "https://citycenterparking.com",
  },
  policies: [
    "Free cancellation up to 1 hour before reservation",
    "No overnight parking without prior arrangement",
    "Monthly passes available at discounted rates",
    "Lost ticket fee: $25",
  ],
  availability: {
    totalSpaces: 250,
    available: 47,
    updated: "10 minutes ago",
  },
  nearbyAttractions: [
    {
      name: "City Museum",
      distance: "0.2 miles",
    },
    {
      name: "Central Park",
      distance: "0.4 miles",
    },
    {
      name: "Main Street Mall",
      distance: "0.3 miles",
    },
  ],
  securityFeatures: [
    "24/7 security personnel",
    "CCTV surveillance",
    "Well-lit premises",
    "Emergency call boxes",
  ],
  additionalServices: [
    "Car wash service",
    "Tire inflation",
    "Jump start assistance",
    "Valet parking",
  ],
};

const ParkingSpotProfile = () => {

  const navigate =useNavigate()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button className="mb-6 flex items-center text-gray-600 hover:text-gray-800">
        <ArrowLeft className="w-5 h-5 mr-2" onClick={()=>navigate(-1)}/>
        Back to results
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Image Gallery */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="col-span-2 h-96 rounded-2xl overflow-hidden">
              <img
                src={spot.mainImage}
                className="w-full h-full object-cover"
                alt="Main view"
              />
            </div>
            <div className="h-48 rounded-xl overflow-hidden">
              <img
                src={spot.images[0]}
                className="w-full h-full object-cover"
                alt="Secondary view"
              />
            </div>
            <div className="h-48 rounded-xl overflow-hidden">
              <img
                src={spot.images[1]}
                className="w-full h-full object-cover"
                alt="Third view"
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {spot.name}
            </h1>
            <div className="flex items-center mb-6">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-amber-500 mr-1" />
                {/* <span className="font-medium">{spot.rating.toFixed(1)}</span> */}
                <span className="text-gray-500 ml-2">
                  ({spot.reviews} reviews)
                </span>
              </div>
              <span className="mx-4 text-gray-300">|</span>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-primary-600 mr-1" />
                <span className="text-gray-600">{spot.location}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Clock className="w-6 h-6 text-gray-700 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Opening hours</p>
                  <p className="font-medium">24/7</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Shield className="w-6 h-6 text-gray-700 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Security</p>
                  <p className="font-medium">24h surveillance</p>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-600 leading-relaxed">{spot.description}</p>
          </div>
          <div className="max-md:block hidden mb-8">
            <div className="sticky top-8 bg-white rounded-2xl shadow p-6">
              <h3 className="text-xl font-bold mb-6">Reserve your spot</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                    <Calendar className="w-5 h-5 text-gray-400 absolute right-3 top-3.5" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Start time
                    </label>
                    <input
                      type="time"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      End time
                    </label>
                    <input
                      type="time"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-4 rounded-xl font-semibold transition-colors">
                    Reserve now - {spot.price}
                  </button>
                </div>

                <p className="text-center text-sm text-gray-500 mt-4">
                  Free cancellation up to 24h before arrival
                </p>
              </div>
            </div>
          </div>
          {/* Reviews Section */}
          <ReviewSection spotId={spot.id} />
        </div>

        {/* Booking Sidebar */}
        <div className="lg:col-span-1 max-md:hidden">
          <div className="sticky top-8 bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-6">Reserve your spot</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                  <Calendar className="w-5 h-5 text-gray-400 absolute right-3 top-3.5" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Start time
                  </label>
                  <input
                    type="time"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    End time
                  </label>
                  <input
                    type="time"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-4 rounded-xl font-semibold transition-colors">
                  Reserve now - {spot.price}
                </button>
              </div>

              <p className="text-center text-sm text-gray-500 mt-4">
                Free cancellation up to 24h before arrival
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkingSpotProfile;
