"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import CircularTimeSlider from "../components/CircularTimeSlider"

export interface Vehicle {
  id: string
  type: "car" | "bike" | "cycle"
  model: string
  registrationNumber: string
}

export interface VehicleResponse {
  vehicles: Vehicle[]
  error?: string
}


const RATE_PER_HOUR = 5 // $5 per hour
const FALLBACK_VEHICLES: Vehicle[] = [
  { id: "1", type: "car", model: "Default Car", registrationNumber: "XX-XX-XXXX" },
  { id: "2", type: "bike", model: "Default Bike", registrationNumber: "YY-YY-YYYY" },
  { id: "3", type: "cycle", model: "Default Cycle", registrationNumber: "ZZ-ZZ-ZZZZ" },
]

export default function SelectTimeSlot() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(FALLBACK_VEHICLES)
  const [selectedVehicle, setSelectedVehicle] = useState<string>("")
  const [startTime, setStartTime] = useState<Date>(new Date())
  const [duration, setDuration] = useState<number>(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch("/api/vehicles")
        const data: VehicleResponse = await response.json()

        if (data.error) {
          throw new Error(data.error)
        }

        setVehicles(data.vehicles)
      } catch (err) {
        setError("Failed to load vehicles. Using default options.")
        console.error("Error fetching vehicles:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchVehicles()
  }, [])

  const handleTimeChange = (time: Date) => {
    setStartTime(time)
  }

  const formattedStartTime = format(startTime, "hh:mm a")
  const totalAmount = duration * RATE_PER_HOUR

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="text-center flex-1">
            <h1 className="text-xl font-semibold">Illinois Center</h1>
            <p className="text-sm text-gray-500">111 E Wacker Dr, Chicago</p>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>

        {/* Vehicle Selection */}
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4">Choose Vehicle Type</h2>
          <div className="flex gap-4">
            {vehicles.map((vehicle) => (
              <button
                key={vehicle.id}
                onClick={() => setSelectedVehicle(vehicle.id)}
                className={`flex-1 py-3 px-4 rounded-full text-sm font-medium transition-colors
                  ${
                    selectedVehicle === vehicle.id
                      ? "bg-yellow-300 text-gray-900"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
              >
                {vehicle.type === "car" ? "Four Wheeler" : vehicle.type === "bike" ? "Two Wheeler" : "Cycle"}
              </button>
            ))}
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        {/* Time Selection */}
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4">Choose Time For Parking</h2>
          <input
            type="time"
            value={format(startTime, "HH:mm")}
            onChange={(e) => {
              const [hours, minutes] = e.target.value.split(":")
              const newDate = new Date()
              newDate.setHours(Number.parseInt(hours))
              newDate.setMinutes(Number.parseInt(minutes))
              handleTimeChange(newDate)
            }}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Duration Selection */}
        <div>
          <h2 className="text-lg font-medium mb-4">Duration For Parking</h2>
          <div className="flex justify-end gap-2 mb-4">
            <button className="px-4 py-2 rounded-full bg-yellow-300 text-sm font-medium">12h</button>
            <button className="px-4 py-2 rounded-full bg-gray-100 text-sm font-medium">24h</button>
          </div>

          <CircularTimeSlider
            value={duration}
            onChange={setDuration}
            min={1}
            max={7}
            startTime={formattedStartTime}
            totalAmount={totalAmount}
          />
        </div>

        {/* Next Button */}
        <button
          className="w-full mt-8 bg-purple-600 text-white py-4 rounded-full font-medium hover:bg-purple-700 transition-colors"
          disabled={!selectedVehicle}
        >
          Next
        </button>
      </div>
    </div>
  )
}

