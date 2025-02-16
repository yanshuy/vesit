"use client"

import { useEffect, useState } from "react"

interface CountdownTimerProps {
  endTime: string  // ISO string format
  startTime: string  // ISO string format
}

export function CountdownTimer({ endTime, startTime }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState("")
  const [isStarted, setIsStarted] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = Date.now()
      const start = Date.parse(startTime)
      const end = Date.parse(endTime)
      console.log(now, start, end)

      // If before start time
      if (now < start) {
        return "Not started"
      }

      // If after end time
      if (now > end) {
        return "Expired"
      }

      const difference = end - now
      
      // Calculate time units
      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      // Format time string
      if (days > 0) {
        return `${days}d ${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      }

      return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    }

    // Check if booking has started
    const checkIfStarted = () => {
      const now = Date.now()
      const start = Date.parse(startTime)
      console.log(now, start, "bad", now >= start,  Date.parse(startTime).toLocaleString)
      setIsStarted(now >= start)
    }

    // Initial calculations
    checkIfStarted()
    setTimeLeft(calculateTimeLeft())

    // Update every second
    const timer = setInterval(() => {
      checkIfStarted()
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    // Cleanup interval on unmount
    return () => clearInterval(timer)
  }, [endTime, startTime])

  return (
    <div className="text-4xl font-bold font-mono tracking-wider">
      {isStarted ? timeLeft : (
        <div className="text-2xl text-yellow-600">
          Booking starts soon
        </div>
      )}
    </div>
  )
}