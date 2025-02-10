import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Navigation2 } from "lucide-react";
import { Navigation } from "@/components/navigation";

export default function EventPage() {
  // Mock event data
  const event = {
    id: 1,
    name: "Team Meeting",
    date: "2023-05-15",
    time: "10:00 AM",
    location: "123 Business St, City, State 12345",
    parkingSuggestions: [
      {
        id: 1,
        name: "City Parking Garage",
        distance: "0.2 miles",
        price: "$10/hour",
      },
      {
        id: 2,
        name: "Street Parking",
        distance: "0.1 miles",
        price: "$2/hour",
      },
      {
        id: 3,
        name: "Private Lot",
        distance: "0.3 miles",
        price: "$15 flat rate",
      },
    ],
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">{event.name}</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Card 1 - Event Details */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          {" "}
          {/* Replaced Card with div and Tailwind classes */}
          <div className="p-6 pb-0">
            {" "}
            {/* Replaced CardHeader with div and Tailwind classes */}
            <h3 className="font-semibold text-lg">Event Details</h3>{" "}
            {/* Replaced CardTitle with h3 and Tailwind classes */}
            <p className="text-sm text-muted-foreground">
              Information about your upcoming event
            </p>{" "}
            {/* Replaced CardDescription with p and Tailwind classes */}
          </div>
          <div className="p-6">
            {" "}
            {/* Replaced CardContent with div and Tailwind classes */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-gray-500" />
                <span>
                  {event.date} at {event.time}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-gray-500" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 - Parking Suggestions */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          {" "}
          {/* Replaced Card with div and Tailwind classes */}
          <div className="p-6 pb-0">
            {" "}
            {/* Replaced CardHeader with div and Tailwind classes */}
            <h3 className="font-semibold text-lg">Parking Suggestions</h3>{" "}
            {/* Replaced CardTitle with h3 and Tailwind classes */}
            <p className="text-sm text-muted-foreground">
              Recommended parking options near your event
            </p>{" "}
            {/* Replaced CardDescription with p and Tailwind classes */}
          </div>
          <div className="p-6">
            {" "}
            {/* Replaced CardContent with div and Tailwind classes */}
            <ul className="space-y-4">
              {event.parkingSuggestions.map((parking) => (
                <li
                  key={parking.id}
                  className="flex justify-between items-center"
                >
                  <div>
                    <h4 className="font-semibold">{parking.name}</h4>
                    <p className="text-sm text-gray-500">
                      {parking.distance} - {parking.price}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    {" "}
                    {/* Kept Shadcn Button */}
                    <Navigation2 className="h-4 w-4 mr-2" />
                    Navigate
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Navigation destination={event.parkingSuggestions[0].name} />
      </div>
    </div>
  );
}
