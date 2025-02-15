"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useAnimation, type PanInfo, AnimatePresence } from "framer-motion"
import { Search, X } from "lucide-react"
import ParkingSpotCard from "../../components/ParkingSpotCard"
import { APIProvider, AdvancedMarker, Pin, InfoWindow, Map, Marker } from '@vis.gl/react-google-maps'

export default function ParkingSpotSearch() {
  const [isOpen, setIsOpen] = useState(true)
  const [location, setLocation] = useState({
    lat: 0,
    lng: 0,
    isSet: false
  });
  const [sheetHeight, setSheetHeight] = useState(window.innerHeight * 0.6)
  const controls = useAnimation()
  const constraintsRef = useRef(null)

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            isSet: true
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLocation({
            lat: 0,
            lng: 0,
            isSet: false
          });
        }
      );
    } else {
      console.warn("Geolocation is not supported by this browser");
      setLocation({
        lat: 0,
        lng: 0,
        isSet: false
      });
    }
  };

  useEffect(() => {
    // console.log(import.meta.env.VITE_MAPS_API_KEY);
    
    getLocation();
  }, []);

  useEffect(() => {
    controls.start({ y: window.innerHeight - sheetHeight })
  }, [controls, sheetHeight])

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const currentY = info.point.y
    const newHeight = window.innerHeight - currentY
    if (newHeight >= 80 && newHeight <= window.innerHeight) {
      setSheetHeight(newHeight)
    }
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const currentY = info.point.y
    const newHeight = window.innerHeight - currentY
    const clampedHeight = Math.min(Math.max(newHeight, 80), window.innerHeight)
    setSheetHeight(clampedHeight)
  }

  const close = () => {
    controls.start({ 
      y: window.innerHeight,
      transition: { type: "tween", duration: 0.2, ease: "easeOut" }
    })
    setTimeout(() => setIsOpen(false), 200)
  }

  return (
    <div className="h- overflow-y-hidden">
            <div className="absolute left-0 right-0 bg-white  top-5 p-2 rounded-3xl z-50 flex items-center mx-6">
                <Search className="ml-4" />
                <input
                  type="text"
                  placeholder="Search places"
                  className="w-full p-2 pl-3.5 pr-4 border-none rounded-full text-sm text-gray-800 focus:outline-none placeholder-gray-500"
                  style={{ marginLeft: 'auto', marginRight: 'auto' }}  // this centers the input
                />
      </div>
       <APIProvider apiKey={import.meta.env.VITE_MAPS_API_KEY || ''}>
        <div style={{ height: "100vh", width: "100%" }}>
          <Map
            defaultZoom={14}
            defaultCenter={{
              lat: 19.0364,
              lng: 72.8595
            }}
            gestureHandling="greedy"
            disableDefaultUI={true} // Disable all default UI elements
            styles={{ // Optionally set map styles to remove satellite view
              styles: [
                {
                  featureType: "all",
                  elementType: "labels",
                  stylers: [
                    { visibility: "off" } // Hide labels if needed
                  ]
                },
                {
                  featureType: "road",
                  elementType: "geometry",
                  stylers: [
                    { visibility: "simplified" }  //Optional: Simplify road view
                  ]
                },
                {
                  featureType: "transit",
                  stylers: [
                    { visibility: "off" } // Hide transit features
                  ]
                },
                {
                  featureType: "poi",
                  stylers: [
                    { visibility: "off" } // Hide points of interest
                  ]
                },
                {
                  featureType: "administrative",
                  elementType: "geometry",
                  stylers: [
                    { visibility: "off" } // Hide administrative boundaries
                  ]
                }

              ]
            }}
          >
            <Marker position={{
              lat: 19.0364,
              lng: 72.8595
            }} />

          </Map>
        </div>
      </APIProvider>
      
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: sheetHeight === window.innerHeight ? 0.4 : 0 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black"
              onClick={() => setSheetHeight(window.innerHeight * 0.6)}
            />
            <motion.div
              drag="y"
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
              dragElastic={0}
              initial={{ y: window.innerHeight }}
              animate={{ y: window.innerHeight - sheetHeight }}
              exit={{ y: window.innerHeight }}
              transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
              className="fixed bottom-0 left-0 right-0 bg-background rounded-t-[32px] shadow-2xl"
              style={{ height: window.innerHeight }}
            >
              <div ref={constraintsRef} className="h-full">
                <div className="pt-3 pb-2 text-center">
                  <div className="mx-auto h-1.5 w-12 rounded-full bg-muted" />
                </div>
                <div className="px-6 pb-4 flex items-center justify-between border-b">
                  <h2 className="text-xl font-semibold">Available Parking</h2>
                  <button onClick={close} className="rounded-full p-2 hover:bg-muted transition-colors">
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="overflow-y-auto px-6" style={{ height: `calc(100% - 80px)`, paddingBottom: sheetHeight <= 120 ? "0px" : "2rem" }}>
                  <div className="space-y-4 py-4">
                    <ParkingSpotCard name="Downtown Parking Garage" image="/placeholder.svg?height=200&width=300" distance="0.5 miles" time="5 min" rating={4.5} price="$5/hr" availableSpots={12} />
                    <ParkingSpotCard name="Central Plaza Parking" image="/placeholder.svg?height=200&width=300" distance="0.8 miles" time="8 min" rating={4.2} price="$4/hr" availableSpots={8} />
                    <ParkingSpotCard name="Riverside Parking Lot" image="/placeholder.svg?height=200&width=300" distance="1.2 miles" time="12 min" rating={3.8} price="$3/hr" availableSpots={2000} />
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}