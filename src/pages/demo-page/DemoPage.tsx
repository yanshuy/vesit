import React from "react";
import ParkingSpotCard from "../../components/ParkingSpotCard";

const DemoPage = () => {
  return <div className="flex justify-center items-center h-screen">
     <ParkingSpotCard name="Downtown Parking Garage" image="/placeholder.svg?height=200&width=300" distance="0.5 miles" time="5 min" rating={4.5} price="$5/hr" availableSpots={12} />;
  </div>
};

export default DemoPage;
