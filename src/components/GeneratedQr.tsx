import { useEffect, useState } from "react";

const QRCodePage = () => {
    const [qrCodeData, setQrCodeData] = useState<string>("");
    const [qrCodeImage, setQrCodeImage] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    console.log(qrCodeData, "ASda");

    // Retrieve data from localStorage and generate QR code
    useEffect(() => {
        // Retrieve data from localStorage
        const storedData = localStorage.getItem("gen_qr");

        if (!storedData) {
            setError("No data found in localStorage. Please save data first.");
            return;
        }

        // Set the data for display
        setQrCodeData(storedData);
        setQrCodeImage(storedData);

        // Generate QR code
    }, []);

    // Function to download the QR code as an image
    const downloadQRCode = () => {
        if (!qrCodeImage) return;

        const link = document.createElement("a");
        link.href = qrCodeImage;
        link.download = "parking_qr_code.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
                <h1 className="mb-4 text-2xl font-bold text-gray-800">
                    Your Parking QR Code
                </h1>

                {error ? (
                    <div className="rounded-lg bg-red-50 p-4 text-red-500">
                        {error}
                    </div>
                ) : (
                    <>
                        {/* Display QR Code */}
                        {qrCodeImage && (
                            <div className="mb-6">
                                <img
                                    src={qrCodeImage}
                                    alt="Generated QR Code"
                                    className="mx-auto h-64 w-64"
                                />
                            </div>
                        )}

                        {/* Display Data */}
                        <div className="mb-6 rounded-lg bg-gray-100 p-4">
                            <p className="text-sm break-words text-gray-600">
                                {qrCodeData}
                            </p>
                        </div>

                        {/* Download Button */}
                        <button
                            onClick={downloadQRCode}
                            className="bg-primary-600 hover:bg-primary-700 w-full rounded-lg py-3 font-semibold text-white transition-colors"
                        >
                            Download QR Code
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default QRCodePage;
