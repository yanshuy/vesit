import type React from "react";
import { useState, useRef } from "react";
import { analyzeParking } from "../services/parkingAnalysis";
import { Camera, MapPin, Upload, AlertCircle } from "lucide-react";

interface Analysis {
    occupancy: number;
    availableSpots: number;
    totalSpots: number;
}

const ParkingAnalysis: React.FC = () => {
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [location, setLocation] = useState<string>("");
    const [analysis, setAnalysis] = useState<Analysis | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!image || !location) {
            setError("Please provide both an image and location.");
            return;
        }

        setIsLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append("image", image);
        formData.append("location", location);

        try {
            const result = await analyzeParking(formData);
            setAnalysis(result);
        } catch (err) {
            setError(
                "An error occurred while analyzing the parking lot. Please try again.",
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl overflow-hidden rounded-xl bg-white shadow-md">
                <div className="p-8">
                    <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
                        Smart Parking Analysis
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label
                                htmlFor="image"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Parking Lot Image
                            </label>
                            <div
                                className="mt-1 flex cursor-pointer justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 transition duration-150 ease-in-out hover:border-blue-400"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <div className="space-y-1 text-center">
                                    {preview ? (
                                        <img
                                            src={preview || "/placeholder.svg"}
                                            alt="Preview"
                                            className="mx-auto h-64 w-auto rounded-md object-cover"
                                        />
                                    ) : (
                                        <Camera className="mx-auto h-12 w-12 text-gray-400" />
                                    )}
                                    <div className="flex text-sm text-gray-600">
                                        <label
                                            htmlFor="image"
                                            className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:outline-none hover:text-blue-500"
                                        >
                                            <span>Upload an image</span>
                                            <input
                                                id="image"
                                                name="image"
                                                type="file"
                                                ref={fileInputRef}
                                                className="sr-only"
                                                onChange={handleImageUpload}
                                                accept="image/*"
                                            />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        PNG, JPG, GIF up to 10MB
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="location"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Location
                            </label>
                            <div className="relative mt-1 rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <MapPin className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={location}
                                    onChange={(e) =>
                                        setLocation(e.target.value)
                                    }
                                    className="block w-full rounded-md border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    placeholder="Enter parking lot location"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <svg
                                        className="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                ) : (
                                    <Upload className="mr-2 h-5 w-5" />
                                )}
                                {isLoading
                                    ? "Analyzing..."
                                    : "Analyze Parking Lot"}
                            </button>
                        </div>
                    </form>

                    {error && (
                        <div className="mt-4 border-l-4 border-red-400 bg-red-50 p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <AlertCircle className="h-5 w-5 text-red-400" />
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-red-700">
                                        {error}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {analysis && (
                        <div className="mt-8 rounded-lg bg-blue-50 p-6">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                                Analysis Results
                            </h2>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div className="rounded-lg bg-white p-4 shadow">
                                    <h3 className="mb-2 text-lg font-medium text-gray-700">
                                        Occupancy
                                    </h3>
                                    <p className="text-3xl font-bold text-blue-600">
                                        {analysis.occupancy}%
                                    </p>
                                </div>
                                <div className="rounded-lg bg-white p-4 shadow">
                                    <h3 className="mb-2 text-lg font-medium text-gray-700">
                                        Available Spots
                                    </h3>
                                    <p className="text-3xl font-bold text-green-600">
                                        {analysis.availableSpots}
                                    </p>
                                </div>
                                <div className="rounded-lg bg-white p-4 shadow">
                                    <h3 className="mb-2 text-lg font-medium text-gray-700">
                                        Total Spots
                                    </h3>
                                    <p className="text-3xl font-bold text-gray-800">
                                        {analysis.totalSpots}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ParkingAnalysis;
