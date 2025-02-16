import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import {
    GoogleMap,
    useLoadScript,
    Autocomplete,
    Marker,
} from "@react-google-maps/api";
import { ArrowLeft, Search } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Drawer from "../../assets/Drawer";
import ParkingSpotCard from "../../components/ParkingSpotCard";

export const PARKING_SPOTS = [
  {
    name: "Trios Fashion Mall Parking",
    image: "https://cdn11.bigcommerce.com/s-64cbb/product_images/uploaded_images/tgtechnicalservices-246300-parking-garage-safer-blogbanner1.jpg",
    distance: "Varies",
    time: "Varies",
    rating: 4.2,
    price: "Varies",
    availableSpots: 92,
    coordinates: { lat: 19.0544, lng: 72.8331 },
    address: "Hill Road, Bandra West, Mumbai, Maharashtra 400050"
  },
  {
    name: "Runwal Greens Parking",
    image: "https://www.adanirealty.com/-/media/project/realty/blogs/what-is-stilt-parking-meaning-rules-how-it-works.ashx",
    distance: "Varies",
    time: "Varies",
    rating: 4.5,
    price: "Varies",
    availableSpots: 1152,
    coordinates: { lat: 19.1570, lng: 72.9355 },
    address: "GMLR Road, Nahur West, Mumbai, Maharashtra 400078"
  },
  {
    name: "Indiabulls Finance Center Parking",
    image: "https://raicdn.nl/cdn-cgi/image/width=3840,quality=75,format=auto,sharpen=1/https://edge.sitecorecloud.io/raiamsterda13f7-raidigitalpdb6c-productionf3f5-ef30/media/project/rai-amsterdam-xmc/intertraffic/intertraffic/news/2022/9/parkingshape1-550-x-300-px.png",
    distance: "Varies",
    time: "Varies",
    rating: 4.3,
    price: "Varies",
    availableSpots: 890,
    coordinates: { lat: 19.0020, lng: 72.8306 },
    address: "Senapati Bapat Marg, Lower Parel, Mumbai, Maharashtra 400013"
  },
  {
    name: "Kalpataru Avana Parking",
    image: "https://www.99acres.com/microsite/articles/files/2018/07/car-parking.jpg",
    distance: "Varies",
    time: "Varies",
    rating: 4.1,
    price: "Varies",
    availableSpots: 553,
    coordinates: { lat: 18.9935, lng: 72.8415 },
    address: "Gen Nagesh Marg, Parel, Mumbai, Maharashtra 400012"
  },
  {
    name: "MCGM Parking Lot Andheri",
    image: "https://raicdn.nl/cdn-cgi/image/width=3840,quality=75,format=auto,sharpen=1/https://edge.sitecorecloud.io/raiamsterda13f7-raidigitalpdb6c-productionf3f5-ef30/media/project/rai-amsterdam-xmc/intertraffic/intertraffic/news/2022/9/parkingshape1-550-x-300-px.png",
    distance: "Varies",
    time: "Varies",
    rating: 3.9,
    price: "Varies",
    availableSpots: 144,
    coordinates: { lat: 19.1197, lng: 72.8468 },
    address: "Jay Prakash Road, Andheri West, Mumbai, Maharashtra 400058"
  },
  {
    name: "Boomerang Building Parking",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_wSea4YuTq1WQhGOLBTPRps6qIlRzw1GlSA&s",
    distance: "Varies",
    time: "Varies",
    rating: 4.0,
    price: "Varies",
    availableSpots: 161,
    coordinates: { lat: 19.1154, lng: 72.8880 },
    address: "Chandivali Farm Road, Kurla West, Mumbai, Maharashtra 400072"
  },
  {
    name: "Lodha The World Towers Parking",
    image: "https://www.glamox.com/globalassets/pbs/application-guide/industry/parking-garage-kremmergarden-parkering.jpg?w=1200&h=630&mode=crop",
    distance: "Varies",
    time: "Varies",
    rating: 4.7,
    price: "Varies",
    availableSpots: 3856,
    coordinates: { lat: 18.9949, lng: 72.8258 },
    address: "Senapati Bapat Marg, Lower Parel, Mumbai, Maharashtra 400013"
  },
  {
    name: "Runwal Cumballa Hill Parking",
    image: "https://parkingtelecom.com/en/wp-content/uploads/sites/2/2020/03/off-street-parking-management-problem-1-min-6000x3000.jpg",
    distance: "Varies",
    time: "Varies",
    rating: 4.4,
    price: "Varies",
    availableSpots: 57,
    coordinates: { lat: 18.9685, lng: 72.8055 },
    address: "Nepeansea Road, Mumbai, Maharashtra 400006"
  },
  {
    name: "MCGM Parking Lot Powai",
    image: "https://parkingtelecom.com/en/wp-content/uploads/sites/2/2020/03/off-street-parking-management-problem-1-min-6000x3000.jpg",
    distance: "Varies",
    time: "Varies",
    rating: 3.8,
    price: "Varies",
    availableSpots: 185,
    coordinates: { lat: 19.1192, lng: 72.9056 },
    address: "Saki Vihar Road, Powai, Mumbai, Maharashtra 400072"
  },
  {
    name: "The Address by Wadhwa Parking",
    image: "https://www.nobrokerhood.com/blog/wp-content/uploads/2024/08/shutterstock_2350654213-1-1568x706.jpg",
    distance: "Varies",
    time: "Varies",
    rating: 4.6,
    price: "Varies",
    availableSpots: 824,
    coordinates: { lat: 19.1350, lng: 72.9286 },
    address: "LBS Marg, Vikhroli West, Mumbai, Maharashtra 400083"
  }
];

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
};

const ParkingSpotSearch = () => {
    // Navigation and location hooks
    const location = useLocation();
    const navigate = useNavigate();

    // State management
    const [center, setCenter] = useState({ lat: 19.076, lng: 72.8777 }); // Mumbai coordinates
    const [marker, setMarker] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [nearbySpots, setNearbySpots] = useState(PARKING_SPOTS);
    const [searchLocation, setSearchLocation] = useState(null);

    // Refs
    const mapRef = useRef(null);
    const autocompleteRef = useRef(null);
    const searchInputRef = useRef(null);

    // Get search query from location state
    const initialSearch = location.state?.searchQuery || "";

    // Memoized values
    const mycenter = useMemo(() => center, [center]);
    const mapOptions = useMemo(
        () => ({
            disableDefaultUI: true,
            gestureHandling: "greedy",
            zoomControl: true,
            mapTypeControl: false,
            streetViewControl: false,
        }),
        [],
    );

    // Load Google Maps
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY || "",
        libraries: ["places"],
    });

    // Custom marker style
    const squareMarker = isLoaded
        ? {
              url:
                  "data:image/svg+xml;charset=UTF-8," +
                  encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" fill="black" stroke="black" stroke-width="2"/>
        <rect x="8" y="8" width="8" height="8" rx="1" fill="white" stroke="black" stroke-width="2"/>
      </svg>
    `),
              scaledSize: new window.google.maps.Size(30, 30),
          }
        : null;

    // Callbacks
    const onLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    const onUnmount = useCallback(() => {
        mapRef.current = null;
    }, []);

    const onPlaceChanged = useCallback(() => {
        if (autocompleteRef.current) {
            const place = autocompleteRef.current.getPlace();
            if (place.geometry) {
                const newLocation = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                };
                setCenter(newLocation);
                setMarker(newLocation);
                setSearchLocation(newLocation);

                // Calculate distances and sort parking spots
                const spotsWithDistance = PARKING_SPOTS.map((spot) => ({
                    ...spot,
                    distance: calculateDistance(
                        newLocation.lat,
                        newLocation.lng,
                        spot.coordinates.lat,
                        spot.coordinates.lng,
                    ).toFixed(1),
                }));

                // Sort by distance and update nearby spots
                const sortedSpots = spotsWithDistance.sort(
                    (a, b) => a.distance - b.distance,
                );
                setNearbySpots(sortedSpots);
                setIsDrawerOpen(true);

                if (mapRef.current) {
                    mapRef.current.panTo(newLocation);
                }
            }
        }
    }, []);

    // Effects
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
                },
            );
        }
    }, []);

  useEffect(() => {
    if (isLoaded && initialSearch && searchInputRef.current) {
      searchInputRef.current.value = initialSearch;
      const geocoder = new window.google.maps.Geocoder();
      
      geocoder.geocode({ address: initialSearch }, (results, status) => {
        if (status === "OK" && results?.[0]) {
          const location = results[0].geometry.location;
          const newLocation = {
            lat: location.lat(),
            lng: location.lng(),
          };
          
          // Update center and marker
          setCenter(newLocation);
          setMarker(newLocation);
          
          // Calculate distances and update drawer
          const spotsWithDistance = PARKING_SPOTS.map(spot => ({
            ...spot,
            distance: calculateDistance(
              newLocation.lat,
              newLocation.lng,
              spot.coordinates.lat,
              spot.coordinates.lng
            ).toFixed(1)
          }));
  
          // Sort spots by distance
          const sortedSpots = spotsWithDistance.sort((a, b) => 
            parseFloat(a.distance) - parseFloat(b.distance)
          );
          
          // Update spots and open drawer
          setNearbySpots(sortedSpots);
          setIsDrawerOpen(true);
  
          if (mapRef.current) {
            mapRef.current.panTo(newLocation);
          }
        }
      });
    }
  }, [isLoaded, initialSearch]);

  useEffect(() => {
    if (isLoaded && location.state?.fromEvent) {
      const { coordinates, searchQuery } = location.state;
      
      if (coordinates && searchQuery) {
        setCenter(coordinates);
        setMarker(coordinates);
        
        if (searchInputRef.current) {
          searchInputRef.current.value = searchQuery;
        }

        const spotsWithDistance = PARKING_SPOTS.map(spot => ({
          ...spot,
          distance: calculateDistance(
            coordinates.lat,
            coordinates.lng,
            spot.coordinates.lat,
            spot.coordinates.lng
          ).toFixed(1)
        }));

        const sortedSpots = spotsWithDistance.sort((a, b) => 
          parseFloat(a.distance) - parseFloat(b.distance)
        );
        
        setNearbySpots(sortedSpots);
        setIsDrawerOpen(true);

        if (mapRef.current) {
          mapRef.current.panTo(coordinates);
          mapRef.current.setZoom(16);
        }
      }
    }
  }, [isLoaded]);


    if (!isLoaded)
        return (
            <div className="flex h-screen items-center justify-center">
                Loading maps...
            </div>
        );
    if (loadError)
        return (
            <div className="flex h-screen items-center justify-center">
                Error loading maps
            </div>
        );

    return (
        <div className="relative h-screen w-full">
           

            <div className="map">
               <ArrowLeft
                className="relative top-9 left-4 z-10 h-12 w-12 cursor-pointer rounded-full bg-gray-50 p-2"
                onClick={() => navigate(-1)}
            />
                {/* Search Bar */}
                <div className="absolute top-8 right-0 left-16 z-10 px-6 md:left-20">
                    <div className="flex w-full max-w-md items-center justify-start rounded-full bg-white p-2 shadow-lg">
                        <div className="pr-2 pl-3">
                            <Search className="text-gray-500" size={20} />
                        </div>
                        <Autocomplete
                            onLoad={(autocomplete) =>
                                (autocompleteRef.current = autocomplete)
                            }
                            onPlaceChanged={onPlaceChanged}
                        >
                            <input
                                ref={searchInputRef}
                                type="text"
                                placeholder="Search for parking..."
                                defaultValue={initialSearch}
                                className="w-full rounded-full py-2 pr-4 pl-2 focus:outline-none"
                            />
                        </Autocomplete>
                    </div>
                </div>

                {/* Google Map */}
                <div className="-mt-12 h-full w-full">
                    <GoogleMap
                        zoom={15}
                        center={mycenter}
                        mapContainerClassName="map-container"
                        options={mapOptions}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                    >
                        {marker && (
                            <Marker icon={squareMarker} position={marker} />
                        )}
                    </GoogleMap>
                </div>

                {/* Drawer */}
                {isDrawerOpen && (
                    <div className="drawer">
                        <Drawer
                            isOpen={isDrawerOpen}
                            setIsOpen={setIsDrawerOpen}
                            initialHeight={300}
                            minHeight={100}
                            maxHeight={window.innerHeight * 0.9}
                        >
                            <div className="space-y-4 px-4 relative">
                                <div className="sticky -top-8 z-50 bg-white py-2 px-4 font-semibold">
                                    Nearby Parking Spots ({nearbySpots.length})
                                </div>
                                {nearbySpots.map((spot, index) => (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            setCenter(spot.coordinates);
                                            setMarker(spot.coordinates);
                                            mapRef.current?.panTo(
                                                spot.coordinates,
                                            );
                                        }}
                                        className="isolate cursor-pointer transition-colors hover:bg-gray-50"
                                    >
                                        <Link to={`/parking-spots/1`}>
                                            <ParkingSpotCard
                                                {...spot}
                                                distance={`${spot.distance}km away`}
                                                time={`${Math.round(spot.distance * 2)} mins`}
                                                price={`₹${Math.round(spot.distance * 10)}/hr`}
                                            />
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </Drawer>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ParkingSpotSearch;
