import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import { BASE_URL } from "../App";
import { ArrowBigRight, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { useNavigate } from "react-router-dom";

const CameraView: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const videoRef = React.useRef<HTMLVideoElement>(null);

    React.useEffect(() => {
        const getCameraStream = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: "environment" },
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play();
                }
            } catch (err: any) {
                setError(
                    "Camera access required for scanning. Please enable camera permissions.",
                );
            }
        };

        getCameraStream();
    }, []);

    return (
        <div className="mt-0 flex flex-col items-center justify-center">
            {error && (
                <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-center text-red-500">
                    {error}
                </div>
            )}
            <div className="relative aspect-square w-full max-w-md">
                <video
                    ref={videoRef}
                    className="h-full w-full rounded-xl object-cover shadow-2xl"
                    autoPlay
                    muted
                    playsInline
                />
                {/* Scanner frame overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative h-64 w-64 rounded-xl border-4 border-blue-400">
                        <div className="absolute -inset-2 rounded-xl border-2 border-white/30"></div>
                        {/* Animated scanning line */}
                        <div className="animate-scan absolute top-0 left-0 h-1 w-full bg-blue-400"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const QRScanner: React.FC = () => {
    const [scanResult, setScanResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [bookingStatus, setBookingStatus] = useState<any>(null);
    const { toast } = useToast();
    const navigate = useNavigate();

    // Returns Authorization header with Bearer token from localStorage.
    const getAuthHeaders = (): HeadersInit => {
        const token = localStorage.getItem("token");
        return token ? { Authorization: `Bearer ${token}` } : {};
    };

    // Handles the scan result by verifying the booking code and then calling the check-in/out endpoint.
    const handleScan = async (data: string | null) => {
        if (data && !loading) {
            setLoading(true);
            setScanResult(data);
            setError(null);

            try {
                // Verify the booking. Note: No hardcoded ID in the URL.
                const verifyResponse = await fetch(
                    `${BASE_URL}/api/bookings/booking-slots/verify_booking/?code=${data}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "ngrok-skip-browser-warning": "69420",
                            ...getAuthHeaders(),
                        },
                    },
                );

                if (!verifyResponse.ok) {
                    const verifyData = await verifyResponse.json();
                    throw new Error(
                        verifyData.error || "Invalid or expired QR code",
                    );
                }

                const verifyData = await verifyResponse.json();
                const endpoint =
                    verifyData.status === "BOOKED" ? "check_in" : "check_out";

                const response = await fetch(
                    `${BASE_URL}/api/bookings/booking-slots/${verifyData.id}/${endpoint}/`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "ngrok-skip-browser-warning": "69420",
                            ...getAuthHeaders(),
                        },
                    },
                );

                if (!response.ok) {
                    const responseData = await response.json();
                    throw new Error(
                        responseData.error || "Failed to process check-in/out",
                    );
                }

                alert("Success: " + verifyData.parking_space);
                console.log("Success: " + verifyData.parking_space);

                const responseData = await response.json();
                setBookingStatus({
                    action: endpoint,
                    ...responseData,
                });
            } catch (err: any) {
                setError(err.message);
                setTimeout(() => setError(null), 3000);
            } finally {
                navigate("/gui");
                window.location.reload();
            }
        }
    };

    const handleError = (err: any) => {
        setError("Camera error: " + err.message);
    };

    return (
        <div className="flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
            <div className="mt-[17vh] w-full max-w-lg space-y-6 rounded-2xl bg-white p-6 shadow-2xl">
                <header className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold text-gray-900">
                        QR Code Scanner
                    </h1>
                    <p className="text-gray-500">
                        Align your parking QR code within the frame
                    </p>
                </header>

                <div className="relative overflow-hidden rounded-2xl">
                    {/* Camera preview */}
                    <CameraView />
                    {/* QR Reader overlaid to capture QR codes */}
                    <QrReader
                        onResult={handleScan}
                        onError={handleError}
                        constraints={{ facingMode: "environment" }}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                </div>

                {loading && (
                    <div className="flex flex-col items-center justify-center space-y-3 rounded-xl bg-blue-50 p-4">
                        <ArrowBigRight className="h-8 w-8 animate-spin text-blue-600" />
                        <p className="font-medium text-blue-600">
                            Processing your request...
                        </p>
                    </div>
                )}

                {error && (
                    <div className="animate-shake flex items-center gap-3 rounded-xl bg-red-50 p-4">
                        <XCircle className="h-6 w-6 text-red-600" />
                        <p className="font-medium text-red-600">{error}</p>
                    </div>
                )}

                {bookingStatus && (
                    <div className="animate-pop-in space-y-4 rounded-xl bg-green-50 p-6">
                        <div className="flex items-center gap-3">
                            <CheckCircle className="h-8 w-8 text-green-600" />
                            <h3 className="text-xl font-bold text-green-600">
                                {bookingStatus.action === "check-in"
                                    ? "Checked In!"
                                    : "Checked Out!"}
                            </h3>
                        </div>

                        <div className="space-y-2 text-gray-700">
                            {bookingStatus.action === "check-in" ? (
                                <>
                                    <p>
                                        Check-in time:{" "}
                                        {new Date(
                                            bookingStatus.check_in_time,
                                        ).toLocaleString()}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Your parking session has started
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p>
                                        Check-out time:{" "}
                                        {new Date(
                                            bookingStatus.check_out_time,
                                        ).toLocaleString()}
                                    </p>
                                    <p className="text-lg font-semibold text-gray-900">
                                        Total: ${bookingStatus.total_charge}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Thank you for using our service
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {scanResult && (
                    <div className="mt-4 text-center">
                        <p className="text-lg font-semibold">
                            Scanned QR Code:
                        </p>
                        <p className="rounded bg-gray-200 p-2 break-words">
                            {scanResult}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QRScanner;
