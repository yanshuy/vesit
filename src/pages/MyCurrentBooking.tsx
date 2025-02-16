"use client"

import { useEffect, useState } from "react"
import { MapPin, QrCode } from "lucide-react"
import { format } from "date-fns"
import { CircularTimerProgress } from "../components/CircularTimerProgress"
import { CountdownTimer } from "../components/CountdownTimer"
import { QRCodeModal } from "../components/QRCodeModal"
import { Button } from "@/components/ui/button"
import { BASE_URL } from "../App"
import { log } from "console"

export interface User {
    id: number
    username: string
    email: string
    phone_number: string
    vehicle_plate: string
    vehicle_model: string
    profile_picture: string
    is_parking_owner: boolean
    company_name: string
    contact_number: string
  }
  
  export interface ParkingBooking {
    id: number
    parking_space: number
    start_time: string
    end_time: string
    booked_by: User
    booking_code: string
    qr_code_url: string
    status: "BOOKED" | "COMPLETED" | "CANCELLED"
    actual_check_in: string
    actual_check_out: string
    final_charge: string
  }
    

export default function MyCurrentBooking() {
  const [booking, setBooking] = useState<ParkingBooking | null>(null)
  const [isQRModalOpen, setIsQRModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/bookings/booking-slots/user-bookings`, {
            method: 'GET',
            headers: {
              'ngrok-skip-browser-warning': '444',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }})
        const data = await response.json()
        // Get the most recent active booking
        const activeBooking = data.find((b: ParkingBooking) => b.status === "BOOKED")
        setBooking(activeBooking || null)
        console.log(activeBooking)
      } catch (error) {
        console.error("Error fetching booking:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBooking()
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!booking) {
    return <div className="flex items-center justify-center min-h-screen">No active parking session</div>
  }

  const handleExtendParking = () => {
    // Implement extend parking logic
  }

  const handleEndParking = async () => {
    // Implement end parking logic
  }

  return (
    <main className="flex flex-col items-center min-h-screen p-4 bg-background">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-2xl font-semibold text-center">Parking Session</h1>

        <div className="flex flex-col items-center space-y-4">
          <CircularTimerProgress startTime={booking.start_time} endTime={booking.end_time} />

          <CountdownTimer endTime={booking.end_time} startTime={booking.start_time} />
          <p className="text-sm text-muted-foreground">Remaining Parking Time</p>
        </div>

        <div className="space-y-4 p-4 rounded-lg border bg-card">
          <div className="space-y-2">
            <p className="text-sm font-medium">Slot {booking.parking_space}</p>
            <p className="text-sm text-muted-foreground">Arrival: {format(new Date(booking.start_time), "h:mm a")}</p>
          </div>

          <div className="grid gap-4">
            <Button variant="outline" className="w-full" onClick={() => setIsQRModalOpen(true)}>
              <QrCode className="w-4 h-4 mr-2" />
              View QR Code
            </Button>

            <Button variant="outline" className="w-full">
              <MapPin className="w-4 h-4 mr-2" />
              Find My Vehicle
            </Button>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="default"
                className="w-full bg-violet-500 hover:bg-violet-600"
                onClick={handleExtendParking}
              >
                Extend Time
              </Button>
              <Button variant="destructive" className="w-full" onClick={handleEndParking}>
                End Parking
              </Button>
            </div>
          </div>
        </div>
      </div>

      <QRCodeModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        qrCodeUrl={booking.qr_code_url}
        bookingCode={booking.booking_code}
      />
    </main>
  )
}

