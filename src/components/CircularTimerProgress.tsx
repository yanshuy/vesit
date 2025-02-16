"use client"

import { useEffect, useState } from "react"
import { Car } from "lucide-react"

interface CircularProgressProps {
  startTime: string
  endTime: string
}

export function CircularTimerProgress({ startTime, endTime }: CircularProgressProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const start = new Date(startTime).getTime()
    const end = new Date(endTime).getTime()
    const total = end - start

    const updateProgress = () => {
      const now = Date.now()
      const elapsed = now - start
      const newProgress = Math.min(100, (elapsed / total) * 100)
      setProgress(newProgress)
    }

    updateProgress()
    const interval = setInterval(updateProgress, 1000)
    return () => clearInterval(interval)
  }, [startTime, endTime])

  return (
    <div className="relative w-48 h-48">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          className="text-muted-foreground/20"
          strokeWidth="8"
          stroke="currentColor"
          fill="transparent"
          r="70"
          cx="96"
          cy="96"
        />
        <circle
          className="text-violet-500"
          strokeWidth="8"
          strokeDasharray={440}
          strokeDashoffset={440 - (440 * progress) / 100}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="70"
          cx="96"
          cy="96"
        />
      </svg>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Car className="w-12 h-12 text-black" />
      </div>
    </div>
  )
}

