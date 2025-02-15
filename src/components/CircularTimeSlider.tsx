"use client"

import { useEffect, useRef, useState } from "react"

interface CircularSliderProps {
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  startTime: string
  totalAmount: number
}

export default function CircularTimeSlider({ value, onChange, min, max, startTime, totalAmount }: CircularSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [rotation, setRotation] = useState(((value - min) / (max - min)) * 360)

  const calculateEndTime = (hours: number) => {
    const [time, period] = startTime.split(" ")
    const [hour, minute] = time.split(":")
    const date = new Date()
    date.setHours(Number.parseInt(hour) + (period === "PM" ? 12 : 0))
    date.setMinutes(Number.parseInt(minute))
    date.setHours(date.getHours() + hours)

    const endHour = date.getHours() % 12 || 12
    const endPeriod = date.getHours() >= 12 ? "PM" : "AM"
    return `${endHour}:${String(date.getMinutes()).padStart(2, "0")} ${endPeriod}`
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragEnd = () => setIsDragging(false)

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging || !sliderRef.current) return

    const rect = sliderRef.current.getBoundingClientRect()
    const center = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    }

    const angle = Math.atan2(clientY - center.y, clientX - center.x) * (180 / Math.PI) + 90
    let newRotation = angle < 0 ? angle + 360 : angle
    const normalizedValue = Math.round((newRotation / 360) * (max - min) + min)

    if (normalizedValue >= min && normalizedValue <= max) {
      setRotation(newRotation)
      onChange(normalizedValue)
    }
  }

  const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY)
  const handleTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX, e.touches[0].clientY)

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleDragEnd)
      window.addEventListener("touchmove", handleTouchMove)
      window.addEventListener("touchend", handleDragEnd)
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleDragEnd)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleDragEnd)
    }
  }, [isDragging])

  return (
    <div className="relative w-80 h-80 mx-auto">
      {/* Background Circle */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-50 to-white shadow-lg" />
      
      {/* Main Slider */}
      <div
        ref={sliderRef}
        className="absolute inset-2 rounded-full border-8 border-purple-100/50 cursor-pointer 
          transition-all duration-300 hover:border-purple-200/70 bg-white/90 backdrop-blur-sm"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Hour markers */}
        {Array.from({ length: max - min + 1 }).map((_, i) => {
          const angle = (i / (max - min)) * 360
          const isCurrentHour = i === value - min
          return (
            <div 
              key={i} 
              className="absolute left-1/2 top-0" 
              style={{ 
                transform: `rotate(${angle}deg)`,
                transformOrigin: 'center 144px'
              }}
            >
              <div className={`relative flex flex-col items-center transition-all duration-300
                ${isCurrentHour ? "scale-110" : ""}`}>
                <div className={`w-1.5 h-5 rounded-full ${
                  isCurrentHour ? "bg-purple-600" : "bg-purple-200"
                } transition-all duration-300`} />
                <span className={`text-xs font-medium mt-1 ${
                  isCurrentHour ? "text-purple-600" : "text-purple-400"
                }`} style={{ transform: `rotate(-${angle}deg)` }}>
                  {i + min}h
                </span>
              </div>
            </div>
          )
        })}

        {/* Handle */}
        <div
          className="absolute w-10 h-10 bg-purple-600 rounded-full shadow-lg cursor-pointer 
            transition-all duration-150 hover:scale-110 active:scale-95 flex items-center justify-center"
          style={{
            left: "50%",
            top: "0",
            transform: `rotate(${rotation}deg) translateY(-5.5rem) translateX(-50%)`,
            transformOrigin: "center bottom",
          }}
        >
          <div className="text-white font-bold text-lg">{value}</div>
        </div>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl w-48">
            <div className="text-lg font-semibold text-gray-900 mb-3">
              {startTime} - {calculateEndTime(value)}
            </div>
            <div className="text-4xl font-bold text-purple-600 mb-2">
              ${totalAmount}
            </div>
            <div className="text-sm text-gray-600">
              Duration: <span className="font-medium">{value} hours</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}