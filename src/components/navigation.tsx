import { useState } from "react";
import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card" // Removed Shadcn Card imports
import { ChevronRight, MapPin } from "lucide-react";

export function Navigation({ destination }: { destination: string }) {
  const [isNavigating, setIsNavigating] = useState(false);

  const startNavigation = () => {
    setIsNavigating(true);
    // In a real app, this would integrate with a maps API
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      {" "}
      {/* Replaced Card with div and Tailwind classes */}
      <div className="p-6 pb-0">
        {" "}
        {/* Replaced CardHeader with div and Tailwind classes */}
        <h3 className="font-semibold text-lg">Navigation</h3>{" "}
        {/* Replaced CardTitle with h3 and Tailwind classes */}
        <p className="text-sm text-muted-foreground">
          Get directions to your parking spot
        </p>{" "}
        {/* Replaced CardDescription with p and Tailwind classes */}
      </div>
      <div className="p-6">
        {" "}
        {/* Replaced CardContent with div and Tailwind classes */}
        {!isNavigating ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-gray-500" />
              <span>{destination}</span>
            </div>
            <button // Replaced Shadcn Button with button element and Tailwind classes
              onClick={startNavigation}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Start Navigation
              <ChevronRight className="h-4 w-4 ml-2" />
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="h-40 bg-gray-200 rounded-md flex items-center justify-center">
              [Map Placeholder]
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">ETA: 10 minutes</span>
              <Button
                variant="outline"
                onClick={() => setIsNavigating(false)}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
              >
                End Navigation
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
