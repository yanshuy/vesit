// ParkingSpotProfile.tsx
import {
    Star,
    MapPin,
    Clock,
    Shield,
    ArrowLeft,
    ArrowRight,
} from "lucide-react";
import ReviewSection from "./ReviewSection";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import EmbeddedModelModal from "../../components/3DParkingModal";

const spot = {
    id: 1,
    name: "City Center Parking",
    mainImage: "/Parkingspots/1A.png",
    images: ["/Parkingspots/1C.png", "/Parkingspots/1B.png"],
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
    const navigate = useNavigate();
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [duration, setDuration] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);
    const [is3DModelOpen, setIs3DModelOpen] = useState(false);

    useEffect(() => {
        if (startTime && endTime) {
            const start = new Date(`2024-01-01 ${startTime}`);
            const end = new Date(`2024-01-01 ${endTime}`);
            const diffMs = end.getTime() - start.getTime();

            // Calculate hours and minutes
            const hours = Math.floor(diffMs / (1000 * 60 * 60));
            const minutes = Math.floor(
                (diffMs % (1000 * 60 * 60)) / (1000 * 60),
            );

            // Format duration string
            let durationStr = "";
            if (hours > 0) {
                durationStr += `${hours} hour${hours > 1 ? "s" : ""}`;
            }
            if (minutes > 0) {
                durationStr += `${hours > 0 ? " " : ""}${minutes} min${minutes > 1 ? "s" : ""}`;
            }
            setDuration(durationStr);

            // Calculate price (assuming ₹100 per hour base rate)
            const baseRate = 100; // ₹100 per hour
            const totalHours = diffMs / (1000 * 60 * 60);
            setTotalPrice(baseRate * totalHours);
        }
        localStorage.setItem("st", startTime);
        localStorage.setItem("et", endTime);
    }, [startTime, endTime]);

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <button className="mb-6 flex items-center text-gray-600 hover:text-gray-800">
                <ArrowLeft
                    className="mr-2 h-5 w-5"
                    onClick={() => navigate(-1)}
                />
                Back to results
            </button>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {/* Main Content */}
                <div className="md:col-span-2">
                    {/* Image Gallery */}
                    <div className="mb-8 grid grid-cols-2 gap-4">
                        <div className="col-span-2 h-96 overflow-hidden rounded-2xl">
                            <img
                                src={spot.mainImage}
                                className="h-full w-full object-cover"
                                alt="Main view"
                            />
                        </div>
                        <div className="h-48 overflow-hidden rounded-xl">
                            <img
                                src={spot.images[0]}
                                className="h-full w-full object-cover"
                                alt="Secondary view"
                            />
                        </div>
                        <div className="h-48 overflow-hidden rounded-xl">
                            <img
                                src={spot.images[1]}
                                className="h-full w-full object-cover"
                                alt="Third view"
                            />
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
                        <h1 className="mb-4 text-3xl font-bold text-gray-900">
                            {spot.name}
                        </h1>
                        <div className="mb-6 flex items-center">
                            <div className="flex items-center">
                                <Star className="mr-1 h-5 w-5 text-amber-500" />
                                {/* <span className="font-medium">{spot.rating.toFixed(1)}</span> */}
                                <span className="ml-2 text-gray-500">
                                    ({spot.reviews} reviews)
                                </span>
                            </div>
                            <span className="mx-4 text-gray-300">|</span>
                            <div className="flex items-center">
                                <MapPin className="text-primary-600 mr-1 h-5 w-5" />
                                <span className="text-gray-600">
                                    {spot.location}
                                </span>
                            </div>
                        </div>

                        <div className="mb-8 grid grid-cols-2 gap-4">
                            <div className="flex items-center rounded-lg bg-gray-50 p-3">
                                <Clock className="mr-3 h-6 w-6 text-gray-700" />
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Opening hours
                                    </p>
                                    <p className="font-medium">24/7</p>
                                </div>
                            </div>
                            <div className="flex items-center rounded-lg bg-gray-50 p-3">
                                <Shield className="mr-3 h-6 w-6 text-gray-700" />
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Security
                                    </p>
                                    <p className="font-medium">
                                        24h surveillance
                                    </p>
                                </div>
                            </div>
                        </div>

                        <h2 className="mb-4 text-xl font-semibold">
                            Description
                        </h2>
                        <p className="leading-relaxed text-gray-600">
                            {spot.description}
                        </p>

                        <button
                            onClick={() => setIs3DModelOpen(true)}
                            className="flex items-center font-medium text-violet-600 hover:text-violet-700"
                        >
                            <span className="mt-2 mr-2">View 3D Model</span>
                            <svg
                                className="mt-1 h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Mobile Booking Section */}
                    <Link to={"/parking-spots/1/selecttime"}>
                        <button className="mb-8 hidden w-full items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-white shadow-sm">
                            Next <ArrowRight className="h-5 w-5" />
                        </button>
                    </Link>
                </div>
                {/* Desktop Booking Sidebar */}
                <div className="desktop-sidebar">
                    <div className="sticky top-20 rounded-2xl bg-white p-6 shadow-lg">
                        <h3 className="mb-6 text-xl font-bold">
                            Reserve your spot
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Date
                                </label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        className="focus:ring-primary-500 w-full rounded-lg border p-3 focus:ring-2"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        Start time
                                    </label>
                                    <input
                                        type="time"
                                        value={startTime}
                                        onChange={(e) =>
                                            setStartTime(e.target.value)
                                        }
                                        className="focus:ring-primary-500 w-full rounded-lg border p-3 focus:ring-2"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium">
                                        End time
                                    </label>
                                    <input
                                        type="time"
                                        value={endTime}
                                        onChange={(e) =>
                                            setEndTime(e.target.value)
                                        }
                                        className="focus:ring-primary-500 w-full rounded-lg border p-3 focus:ring-2"
                                    />
                                </div>
                            </div>

                            <div className="mb-0 rounded-lg bg-gray-50 p-4">
                                <p className="text text-gray-600">
                                    Duration: {duration}
                                </p>
                                <p className="font-semibold">
                                    Total:{" "}
                                    {totalPrice === 0
                                        ? ""
                                        : "₹" + totalPrice.toFixed(2)}
                                </p>
                            </div>

                            <div className="pt-4">
                                <button
                                    onClick={() =>
                                        navigate("/parking-spots/1/slotmap")
                                    }
                                    className="hover:bg-primary-700 w-full rounded-xl bg-violet-600 py-4 font-semibold text-white transition-colors"
                                >
                                    Choose Slot
                                </button>
                            </div>

                            <p className="mt-4 text-center text-sm text-gray-500">
                                Free cancellation up to 24h before arrival
                            </p>
                        </div>
                    </div>
                </div>
                {/* Reviews Section */}
                <ReviewSection spotId={spot.id} />
            </div>
            <EmbeddedModelModal
                isOpen={is3DModelOpen}
                onClose={() => setIs3DModelOpen(false)}
            />
        </div>
    );
};

export default ParkingSpotProfile;
