"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { useNavigate } from "react-router-dom"

export default function SelectTimeSlot() {
  const navigate = useNavigate()
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [duration, setDuration] = useState("")
  const [totalPrice, setTotalPrice] = useState(0)
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'))

  useEffect(() => {
    if (startTime && endTime) {
      const start = new Date(`2024-01-01 ${startTime}`)
      const end = new Date(`2024-01-01 ${endTime}`)
      const diffMs = end.getTime() - start.getTime()
      
      // Calculate hours and minutes
      const hours = Math.floor(diffMs / (1000 * 60 * 60))
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
      
      // Format duration string
      let durationStr = ""
      if (hours > 0) {
        durationStr += `${hours} hour${hours > 1 ? 's' : ''}`
      }
      if (minutes > 0) {
        durationStr += `${hours > 0 ? ' ' : ''}${minutes} min${minutes > 1 ? 's' : ''}`
      }
      setDuration(durationStr)
      
      // Calculate price (₹100 per hour base rate)
      const baseRate = 100
      const totalHours = diffMs / (1000 * 60 * 60)
      setTotalPrice(baseRate * totalHours)
    }
  }, [startTime, endTime])

  return (
    <div className="desktop-sidebar max-md:hidden">
      <div className="sticky top-20 bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-6">Reserve your spot</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Date</label>
            <div className="relative">
              <input
                type="date"
                value={selectedDate}
                min={format(new Date(), 'yyyy-MM-dd')}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Start time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                End time
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-0">
            <p className="text text-gray-600">Duration: {duration}</p>
            <p className="font-semibold">
              Total: {totalPrice === 0 ? '' : '₹'+totalPrice.toFixed(2)}
            </p>
          </div>

          <div className="pt-4">
            <button 
              onClick={() => navigate('/parking-spots/1/slotmap')}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white py-4 rounded-xl font-semibold transition-colors"
            >
              Choose Slot
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-4">
            Free cancellation up to 24h before arrival
          </p>
        </div>
      </div>
    </div>
  )
}