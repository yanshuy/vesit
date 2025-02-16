import { useState } from "react";
import { ArrowLeft, ChevronDown, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { stripePromise } from "../lib/stripeconfig";
import { BASE_URL } from "../App";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);
        setError(null);

        try {
            const { error } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/payment-success`,
                },
            });

            if (error) {
                setError(error.message);
            }
        } catch (err) {
            setError("Payment failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                className="w-full rounded-xl border border-gray-200 p-4"
                options={{
                    style: {
                        base: {
                            fontSize: "16px",
                            color: "#424770",
                            "::placeholder": {
                                color: "#aab7c4",
                            },
                        },
                    },
                }}
            />
            {error && <div className="mt-2 text-sm text-red-500">{error}</div>}
            <button
                type="submit"
                disabled={!stripe || loading}
                className="mt-4 w-full rounded-xl bg-[#00A0FF] py-3 text-white transition-colors hover:bg-[#0090E6] disabled:bg-gray-400"
            >
                {loading ? "Processing..." : "Pay Now"}
            </button>
        </form>
    );
};

const PaymentForm = () => {
    const [selectedPayment, setSelectedPayment] = useState("card");
    const navigate = useNavigate();

    return (
        <Elements stripe={stripePromise}>
            <ArrowLeft
                className="absolute top-[1rem] left-[1rem] z-10 h-9 w-9"
                onClick={() => navigate(-1)}
            />
            <div className="flex min-h-screen items-center justify-center bg-[#EEF6FF] p-4">
                <div className="w-full max-w-md">
                    <div className="space-y-4">
                        {/* Apple Pay Button */}
                        <button className="flex w-full items-center justify-center space-x-2 rounded-xl bg-black py-3 text-white">
                            <svg
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M17.0425 7.19C17.5825 6.56 17.9625 5.69 17.8425 4.81C17.0625 4.84 16.1225 5.31 15.5625 5.94C15.0625 6.5 14.6025 7.39 14.7425 8.23C15.6025 8.29 16.4825 7.82 17.0425 7.19ZM17.8025 8.47C16.5225 8.37 15.4225 9.12 14.8025 9.12C14.1625 9.12 13.1825 8.51 12.1425 8.53C10.7825 8.56 9.5225 9.34 8.8425 10.58C7.4225 13.07 8.4625 16.77 9.8225 18.86C10.5025 19.89 11.2825 21.03 12.3225 21C13.3225 20.96 13.7025 20.37 14.9025 20.37C16.0825 20.37 16.4425 21 17.5025 20.97C18.5825 20.94 19.2625 19.92 19.9425 18.89C20.3825 18.2 20.6825 17.46 20.8425 16.67C19.2225 16.06 18.1425 14.54 18.1425 12.81C18.1425 10.83 19.4625 9.23 21.2425 8.71C20.4225 7.45 18.9625 8.56 17.8025 8.47Z" />
                            </svg>
                            <span>Pay</span>
                        </button>

                        {/* Form Fields */}
                        <div className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm text-[#0066CC]">
                                    Full name
                                </label>
                                <input
                                    type="text"
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-blue-400 focus:outline-none"
                                    placeholder="Full name"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm text-[#0066CC]">
                                    Country
                                </label>
                                <div className="relative">
                                    <select className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 focus:border-blue-400 focus:outline-none">
                                        <option>India</option>
                                        <option>Canada</option>
                                        <option>United Kingdom</option>
                                    </select>
                                    <ChevronDown className="absolute top-1/2 right-4 -translate-y-1/2 transform text-gray-400" />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm text-[#0066CC]">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-blue-400 focus:outline-none"
                                    placeholder="Street address"
                                />
                            </div>

                            {/* Payment Method Selection */}
                            <div className="flex space-x-2">
                                <button
                                    className={`flex-1 rounded-xl border p-4 ${
                                        selectedPayment === "card"
                                            ? "border-blue-400 bg-blue-50"
                                            : "border-gray-200"
                                    }`}
                                    onClick={() => setSelectedPayment("card")}
                                >
                                    <div className="flex items-center space-x-2">
                                        <svg
                                            className="h-6 w-6"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <rect
                                                x="2"
                                                y="5"
                                                width="20"
                                                height="14"
                                                rx="2"
                                            />
                                            <path d="M2 10h20" />
                                        </svg>
                                        <span>Card</span>
                                    </div>
                                </button>

                                <button
                                    className={`flex-1 rounded-xl border p-4 ${
                                        selectedPayment === "afterpay"
                                            ? "border-blue-400 bg-blue-50"
                                            : "border-gray-200"
                                    }`}
                                    onClick={() =>
                                        setSelectedPayment("afterpay")
                                    }
                                >
                                    <div className="flex items-center justify-center">
                                        <span className="text-sm">
                                            Afterpay
                                        </span>
                                    </div>
                                </button>

                                <button
                                    className={`flex-1 rounded-xl border p-4 ${
                                        selectedPayment === "klarna"
                                            ? "border-blue-400 bg-blue-50"
                                            : "border-gray-200"
                                    }`}
                                    onClick={() => setSelectedPayment("klarna")}
                                >
                                    <div className="flex items-center justify-center">
                                        <span className="text-sm">Klarna</span>
                                    </div>
                                </button>

                                <button className="rounded-xl border border-gray-200 p-4">
                                    <MoreHorizontal className="h-5 w-5 text-gray-400" />
                                </button>
                            </div>

                            {/* Card Details */}
                            {selectedPayment === "card" && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="mb-2 block text-sm text-[#0066CC]">
                                            Card number
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-blue-400 focus:outline-none"
                                                placeholder="1234 1234 1234 1234"
                                            />
                                            <div className="absolute top-1/2 right-4 flex -translate-y-1/2 transform space-x-1">
                                                <img
                                                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-zTiF2wJb0D16Hd8rEh7RXjzV1bUmAO.png"
                                                    alt="Payment methods"
                                                    className="h-4"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="mb-2 block text-sm text-[#0066CC]">
                                                Expiration date
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-blue-400 focus:outline-none"
                                                placeholder="MM / YY"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm text-[#0066CC]">
                                                Security code
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-blue-400 focus:outline-none"
                                                placeholder="CVV"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                className="w-full rounded-xl bg-[#00A0FF] py-3 text-white transition-colors hover:bg-[#0090E6]"
                                onClick={async () => {
                                    const convertToISO = (time: string) => {
                                        const today = new Date(); // Get today's date
                                        const [hours, minutes] = time
                                            .split(":")
                                            .map(Number); // Extract hours and minutes
                                        today.setHours(hours, minutes, 0, 0); // Set the time
                                        return today.toISOString(); // Convert to ISO format
                                    };

                                    // Example usage:
                                    const start_time =
                                        localStorage.getItem("st");
                                    const end_time = localStorage.getItem("et");

                                    const startISO = convertToISO(start_time!);
                                    const endISO = convertToISO(end_time!);
                                    let qr = await fetch(
                                        `${BASE_URL}/api/bookings/booking-slots/`,
                                        {
                                            method: "POST",
                                            headers: {
                                                "Content-Type":
                                                    "application/json",
                                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                                            },
                                            body: JSON.stringify({
                                                parking_space: 2,
                                                start_time: startISO,
                                                end_time: endISO,
                                            }),
                                        },
                                    );
                                    qr = await qr.json();
                                    console.log(qr);
                                    localStorage.setItem(
                                        "gen_qr",
                                        `${BASE_URL}${qr.qr_code_url}`,
                                    );
                                    navigate("/gen_qr");
                                }}
                            >
                                Submit order
                            </button>
                        </div>
                    </div>
                    {/* {selectedPayment === "card" && (
                    <div className="space-y-4">
                    <CheckoutForm />
                    </div>
                )} */}
                </div>
            </div>
        </Elements>
    );
};

export default PaymentForm;
