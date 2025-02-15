import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock, Car } from "lucide-react"

interface ParkingSpotProps {
  name: string
  image: string
  distance: string
  time: string
  rating: number
  price: string
  availableSpots: number
}

export default function ParkingSpotCard({
  name,
  image,
  distance,
  time,
  rating,
  price,
  availableSpots,
}: ParkingSpotProps) {
  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden transition-shadow hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
          <img
            src={image || "/placeholder.svg"}
            alt={name}
            className="w-full h-full object-cover rounded-t-lg"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="mb-2 text-xl font-bold">{name}</CardTitle>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center text-muted-foreground">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{distance}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Clock className="w-4 h-4 mr-1" />
            <span className="text-sm">{time}</span>
          </div>
        </div>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
          ))}
          <span className="ml-1 text-sm text-muted-foreground">({rating})</span>
        </div>
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="text-lg font-semibold">
            {price}
          </Badge>
          <div className="flex items-center text-muted-foreground">
            <Car className="w-4 h-4 mr-1" />
            <span className="text-sm">{availableSpots} spots left</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <Button variant="default" className="w-[48%]">
          Book Now
        </Button>
        <Button variant="outline" className="w-[48%]">
          View on Map
        </Button>
      </CardFooter>
    </Card>
  )
}
