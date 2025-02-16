import type React from "react"

interface LocationInputProps {
  onLocationChange: (value: string) => void
}

const LocationInput: React.FC<LocationInputProps> = ({ onLocationChange }) => {
  return (
    <div>
      <label htmlFor="location" className="block text-sm font-medium text-gray-700">
        Location
      </label>
      <input
        type="text"
        id="location"
        name="location"
        onChange={(e) => onLocationChange(e.target.value)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        placeholder="Enter parking lot location"
      />
    </div>
  )
}

export default LocationInput

