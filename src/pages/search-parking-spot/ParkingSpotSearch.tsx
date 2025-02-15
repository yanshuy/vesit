import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { GoogleMap, useLoadScript, Autocomplete, Marker } from "@react-google-maps/api";
import { Search } from "lucide-react";
import Drawer from "../../assets/Drawer";
import ParkingSpotCard from "../../components/ParkingSpotCard";



const PARKING_SPOTS = [
  {
    name: "Downtown Parking Garage",
    image: "/placeholder.svg?height=200&width=400",
    distance: "0.2 miles",
    time: "5 min walk",
    rating: 4.5,
    price: "$8/hr",
    availableSpots: 25,
    coordinates: { lat: 40.7128, lng: -74.0060 }
  },
  {
    name: "Downtown Parking Garage",
    image: "/placeholder.svg?height=200&width=400",
    distance: "0.2 miles",
    time: "5 min walk",
    rating: 4.5,
    price: "$8/hr",
    availableSpots: 25,
    coordinates: { lat: 40.7135, lng: -74.0055 }
  },
  {
    name: "Downtown Parking Garage",
    image: "/placeholder.svg?height=200&width=400",
    distance: "0.2 miles",
    time: "5 min walk",
    rating: 4.5,
    price: "$8/hr",
    availableSpots: 25,
    coordinates: { lat: 40.7140, lng: -74.0065 }
  },
  {
    name: "Downtown Parking Garage",
    image: "/placeholder.svg?height=200&width=400",
    distance: "0.2 miles",
    time: "5 min walk",
    rating: 4.5,
    price: "$8/hr",
    availableSpots: 25,
    coordinates: { lat: 40.7122, lng: -74.0070 }
  },
  {
    name: "Downtown Parking Garage",
    image: "/placeholder.svg?height=200&width=400",
    distance: "0.2 miles",
    time: "5 min walk",
    rating: 4.5,
    price: "$8/hr",
    availableSpots: 25,
    coordinates: { lat: 40.7118, lng: -74.0062 }
  },
  {
    name: "Downtown Parking Garage",
    image: "/placeholder.svg?height=200&width=400",
    distance: "0.2 miles",
    time: "5 min walk",
    rating: 4.5,
    price: "$8/hr",
    availableSpots: 25,
    coordinates: { lat: 40.7130, lng: -74.0050 }
  },
  {
    name: "Downtown Parking Garage",
    image: "/placeholder.svg?height=200&width=400",
    distance: "0.2 miles",
    time: "5 min walk",
    rating: 4.5,
    price: "$8/hr",
    availableSpots: 25,
    coordinates: { lat: 40.7125, lng: -74.0075 }
  },
  {
    name: "Central Station Parking",
    image: "/placeholder.svg?height=200&width=400",
    distance: "0.5 miles",
    time: "10 min walk",
    rating: 4.0,
    price: "$5/hr",
    availableSpots: 42,
    coordinates: { lat: 40.7150, lng: -74.0100 }
  },
  {
    name: "Market Street Garage",
    image: "/placeholder.svg?height=200&width=400",
    distance: "0.8 miles",
    time: "15 min walk",
    rating: 4.8,
    price: "$10/hr",
    availableSpots: 15,
    coordinates: { lat: 40.7170, lng: -74.0120 }
  },
  {
    name: "Convention Center Parking",
    image: "/placeholder.svg?height=200&width=400",
    distance: "1.0 miles",
    time: "20 min walk",
    rating: 3.5,
    price: "$6/hr",
    availableSpots: 80,
    coordinates: { lat: 40.7200, lng: -74.0150 }
  },
  {
    name: "River View Parking",
    image: "/placeholder.svg?height=200&width=400",
    distance: "1.2 miles",
    time: "25 min walk",
    rating: 4.2,
    price: "$7/hr",
    availableSpots: 35,
    coordinates: { lat: 40.7230, lng: -74.0180 }
  },
]

const ParkingSpotSearch = () => {
  const mapRef = useRef(null);
  const autocompleteRef = useRef(null);
  const [center, setCenter] = useState({ lat: 18.567, lng: 72.789 });
  const [marker, setMarker] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  

  const mycenter = useMemo(() => center, [center]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          setCenter({ lat: 19.076, lng: 72.8777 }); // Mumbai fallback
        }
      );
    } else {
      setCenter({ lat: 19.076, lng: 72.8777 });
    }
  }, []);

  const mapOptions = useMemo(
    () => ({
      disableDefaultUI: true,
      gestureHandling: "greedy",
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
    }),
    []
  );

  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();

      if (place.geometry && place.geometry.location) {
        const newCenter = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setCenter(newCenter);
        mapRef.current?.panTo(newCenter); // Pan to the new location
        setMarker(newCenter); // Update marker position
      } else {
        console.error("Place details are missing location information.");
      }
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (loadError) {
    return <div>Error loading maps.</div>;
  }

  // ✅ Define `squareMarker` **after** maps are loaded
  const squareMarker = {
    url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" fill="black" stroke="black" stroke-width="2"/>
        <rect x="8" y="8" width="8" height="8" rx="1" fill="white" stroke="black" stroke-width="2"/>
      </svg>
    `),
    scaledSize: new window.google.maps.Size(30, 30),
  };

  return (
    <div className="h-screen w-full relative">
      <div className="map">
        {/* Search Bar */}
      <div className="absolute top-5 left-0 right-0 px-6 z-10">
        <div className="flex items-center justify-start bg-white rounded-full shadow-lg p-2 w-full max-w-md">
          <div className="pl-3 pr-2">
            <Search className="text-gray-500" size={20} />
          </div>
          <Autocomplete
            onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
            onPlaceChanged={onPlaceChanged}
          >
            <input
              type="text"
              placeholder="Search..."
              className="w-full py-2 pl-2 pr-4 rounded-full focus:outline-none"
            />
          </Autocomplete>
        </div>
      </div>

      {/* Google Map */}
      <div className="h-full w-full">
        <GoogleMap
          zoom={15}
          center={mycenter}
          mapContainerClassName="map-container"
          options={mapOptions}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {/* Add markers */}
          {marker && <Marker icon={squareMarker} position={marker} />}
          
        </GoogleMap>
      </div>

     {
      isOpen && ( <div className="drawer">
         <Drawer isOpen={isOpen} setIsOpen={setIsOpen} initialHeight={300} minHeight={100} maxHeight={window.innerHeight * 0.9}>
        <div className="space-y-4 px-4">
          {PARKING_SPOTS.map((spot, index) => (
            <ParkingSpotCard key={index} {...spot} />
          ))}
        </div>
      </Drawer>
      </div>)
     }

      </div>
    </div>
  );
};

export default ParkingSpotSearch;
