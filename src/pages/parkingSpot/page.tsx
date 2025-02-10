import type React from "react";
import ParkingSpotCard from "./ParkingSpotCard";

// Mock data for parking spots
const parkingSpots = [
  {
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
  },
];

const ParkingSpotList: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-secondary-800 mb-8">
        Popular Parking Spots
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {parkingSpots.map((spot) => (
          <ParkingSpotCard key={spot.id} spot={spot} />
        ))}
      </div>
    </div>
  );
};

export default ParkingSpotList;
