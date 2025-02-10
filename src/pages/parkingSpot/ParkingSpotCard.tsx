// ParkingSpotCard.tsx
import { useState } from "react";
import {
  Star,
  MapPin,
  ChevronDown,
  Clock,
  Wallet,
  Car,
  ChevronUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ParkingSpotCard = ({ spot }) => {
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
      onClick={() => navigate("/parking-spots/1")}
    >
      <div className="relative h-48">
        <img
          src={spot.image}
          alt={spot.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 p-4">
          <h3 className="text-xl font-bold text-white">{spot.name}</h3>
          <p className="text-sm text-white/90 flex items-center mt-1">
            <MapPin className="w-4 h-4 mr-1" />
            {spot.address}
          </p>
        </div>
        <div className="absolute top-2 right-2 bg-white/90 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
          <Star className="w-4 h-4 text-amber-500 mr-1" />
          {/* {spot.averageRating.toFixed(1)} */}
        </div>
      </div>

      <div className="p-4 bg-gradient-to-br from-white to-gray-50">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary-600">{spot.price}</p>
            <p className="text-xs text-gray-500">per hour</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-gray-800">{spot.distance}</p>
            <p className="text-xs text-gray-500">from center</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-gray-800">
              {spot.totalReviews}
            </p>
            <p className="text-xs text-gray-500">reviews</p>
          </div>
        </div>

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full flex items-center justify-between px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
        >
          <span className="font-medium">
            {showDetails ? "Hide details" : "Show details"}
          </span>
          {showDetails ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <ChevronUp className="w-5 h-5" />
          )}
        </button>

        {showDetails && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center mb-3">
              <Clock className="w-5 h-5 text-gray-600 mr-2" />
              <span className="text-sm">24/7 availability</span>
            </div>
            <div className="flex items-center mb-3">
              <Car className="w-5 h-5 text-gray-600 mr-2" />
              <span className="text-sm">Covered parking</span>
            </div>
            <div className="flex items-center">
              <Wallet className="w-5 h-5 text-gray-600 mr-2" />
              <span className="text-sm">Secure payments</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParkingSpotCard;
