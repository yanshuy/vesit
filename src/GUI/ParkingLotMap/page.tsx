import { useRef, useState } from "react";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CarSVG = ({ isSelected, onClick, x, y, isOccupied }) => (
    <svg
        x={x}
        y={y}
        width="30"
        height="60"
        viewBox="0 0 40 80"
        fill={isSelected ? "#60a5fa" : isOccupied ? "#ef4444" : "#ffffff"}
        stroke={isSelected ? "#2563eb" : "#333"}
        strokeWidth="2"
        onClick={onClick}
        className="transition-all duration-200 hover:opacity-80"
        style={{ cursor: "pointer" }}
    >
        <rect x="5" y="10" width="30" height="60" rx="5" />
        <rect x="10" y="20" width="20" height="15" rx="2" />
        <rect x="10" y="50" width="20" height="15" rx="2" />
        <circle cx="15" cy="75" r="3" />
        <circle cx="25" cy="75" r="3" />
        <circle cx="15" cy="5" r="3" />
        <circle cx="25" cy="5" r="3" />
    </svg>
);

const ParkingLot = ({ parkingSlots, onSlotSelect }) => {
    const [scale, setScale] = useState(1.9);
    const [translate, setTranslate] = useState({ x: 0, y: 0 });
    const svgRef = useRef(null);
    const isDragging = useRef(false);
    const lastPosition = useRef({ x: 0, y: 0 });

    const handleWheel = (event) => {
        event.preventDefault();
        let newScale = scale + event.deltaY * -0.001;
        newScale = Math.min(Math.max(newScale, 0.5), 3);
        setScale(newScale);
    };

    const handleMouseDown = (event) => {
        isDragging.current = true;
        lastPosition.current = { x: event.clientX, y: event.clientY };
    };

    const handleMouseMove = (event) => {
        if (!isDragging.current) return;
        const dx = event.clientX - lastPosition.current.x;
        const dy = event.clientY - lastPosition.current.y;
        lastPosition.current = { x: event.clientX, y: event.clientY };
        setTranslate({ x: translate.x + dx, y: translate.y + dy });
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    const resetView = () => {
        setScale(1);
        setTranslate({ x: 0, y: 0 });
    };

    const zoomIn = () => {
        setScale(Math.min(scale + 0.2, 3));
    };

    const zoomOut = () => {
        setScale(Math.max(scale - 0.2, 0.5));
    };

    return (
        <div className="relative h-[80vh] w-full rounded-lg bg-gray-50 shadow-inner">
            <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                <button
                    onClick={zoomIn}
                    className="rounded-lg bg-white p-2 shadow-md transition-colors hover:bg-gray-50"
                >
                    <ZoomIn className="h-5 w-5" />
                </button>
                <button
                    onClick={zoomOut}
                    className="rounded-lg bg-white p-2 shadow-md transition-colors hover:bg-gray-50"
                >
                    <ZoomOut className="h-5 w-5" />
                </button>
                <button
                    onClick={resetView}
                    className="rounded-lg bg-white p-2 shadow-md transition-colors hover:bg-gray-50"
                >
                    <Maximize2 className="h-5 w-5" />
                </button>
            </div>

            <div
                className="h-full w-full overflow-hidden"
                onMouseMove={handleMouseMove}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={(e) => handleMouseDown(e.touches[0])}
                onTouchMove={(e) => handleMouseMove(e.touches[0])}
                onTouchEnd={handleMouseUp}
            >
                <svg
                    ref={svgRef}
                    viewBox="0 0 1000 1000"
                    width="100%"
                    height="100%"
                    style={{
                        transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
                        cursor: isDragging.current ? "grabbing" : "grab",
                        transition: "transform 0.1s ease-out",
                    }}
                >
                    {/* Parking Area Background */}
                    <rect width="1000" height="1000" fill="#e2e8f0" />

                    {/* Parking Slots */}
                    {parkingSlots.map((slot) => (
                        <g key={slot.id}>
                            <CarSVG
                                isSelected={slot.isSelected}
                                isOccupied={slot.isOccupied}
                                onClick={() =>
                                    !slot.isOccupied && onSlotSelect(slot.id)
                                }
                                x={slot.x}
                                y={slot.y}
                            />
                            <text
                                x={slot.x + 15}
                                y={slot.y + 85}
                                textAnchor="middle"
                                fill="#475569"
                                fontSize="12"
                                fontWeight="500"
                            >
                                {slot.id}
                            </text>
                        </g>
                    ))}
                </svg>
            </div>
        </div>
    );
};

// Generate parking slots in a more realistic layout
const generateParkingSlots = () => {
    const slots = [];
    const sections = ["A", "B", "C"];
    let id = 1;

    sections.forEach((section, sectionIndex) => {
        // Left side of the section
        // for (let i = 0; i < 12; i++) {
        //   if (i == 3 || i == 7) continue
        //   slots.push({
        //     id: `${section}${id}`,
        //     x: 70 + i * 60,
        //     y: 100 + sectionIndex * 200,
        //     isSelected: false,
        //     isOccupied: Math.random() > 0.7,
        //   });
        //   id++;
        // }

        // Right side of the section
        for (let i = 0; i < 14; i++) {
            if (i == 6) continue;
            slots.push({
                id: `${section}${id}`,
                x: 160 + i * 50,
                y: 250 + sectionIndex * 200,
                isSelected: false,
                isOccupied: (i % 2 == 0 && (i + 2) % 3 == 0) || i % 16 == 0,
            });
            id++;
        }
    });

    return slots;
};

const initialParkingData = generateParkingSlots();

export default function ParkingLotMap() {
    const [parkingSlots, setParkingSlots] = useState(initialParkingData);
    const selectedCount = parkingSlots.filter((slot) => slot.isSelected).length;
    const navigate = useNavigate();

    const handleSlotSelect = (id) => {
        setParkingSlots(
            parkingSlots.map((slot) =>
                slot.id === id
                    ? { ...slot, isSelected: !slot.isSelected }
                    : slot,
            ),
        );
    };

    return (
        <div className="relative mx-auto max-w-6xl space-y-6 p-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">
                    Parking Lot
                </h1>
            </div>

            <ParkingLot
                parkingSlots={parkingSlots}
                onSlotSelect={handleSlotSelect}
            />

            <div className="absolute bottom-6 translate-x-1/2 rounded-lg border bg-white p-4 shadow-sm">
                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded-full border-2 border-gray-400 bg-white"></div>
                            <span className="text-sm text-gray-600">
                                Available
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded-full bg-blue-400"></div>
                            <span className="text-sm text-gray-600">
                                Selected
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded-full bg-red-500"></div>
                            <span className="text-sm text-gray-600">
                                Occupied
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            className="rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                            disabled={selectedCount === 0}
                            onClick={() => navigate("/gui/payment")}
                        >
                            Book Selected
                        </button>
                        <button
                            className="rounded-lg bg-gray-500 px-4 py-2 text-white transition-colors hover:bg-gray-600"
                            onClick={() => setParkingSlots(initialParkingData)}
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
