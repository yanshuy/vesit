import { useState, useEffect } from "react";
import { ArrowLeft, ChevronDown, MoreHorizontal } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { stripePromise } from '../lib/stripeconfig';
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
            const { error: paymentError } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/payment-success`,
                    payment_method_data: {
                        billing_details: {
                            name: document.querySelector('input[placeholder="Full name"]').value,
                            address: {
                                country: document.querySelector('select').value,
                                line1: document.querySelector('input[placeholder="Street address"]').value,
                            },
                        },
                    },
                },
            });

            if (paymentError) {
                setError(paymentError.message);
            }
        } catch (err) {
            setError('Payment failed');
        } finally {
            setLoading(false);
        }
    };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement 
        className="w-full rounded-xl border border-gray-200 p-4"
        options={{
          layout: {
            type: 'tabs',
            defaultCollapsed: false,
          },
        }}
      />
      {error && (
        <div className="text-red-500 text-sm mt-2">{error}</div>
      )}
      <button 
        type="submit"
        disabled={!stripe || loading}
        className="w-full rounded-xl bg-[#00A0FF] py-3 text-white transition-colors hover:bg-[#0090E6] disabled:bg-gray-400 mt-4"
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};


const PaymentForm = () => {
    const [selectedPayment, setSelectedPayment] = useState("card");
    const [clientSecret, setClientSecret] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const amount = location.state?.amount || 10000; // Default to 100 INR (10000 paise)

    useEffect(() => {
        const createPaymentIntent = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/bookings/create-payment-intent/`, {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({ 
                        amount: amount,  // Amount in paise (₹100 = 10000 paise)
                        currency: 'inr' 
                    }),
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(errorText || `HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                if (data.clientSecret) {
                    setClientSecret(data.clientSecret);
                } else {
                    throw new Error('No clientSecret in response');
                }
            } catch (err) {
                console.error('Payment Intent Error:', err);
                setError(err.message || 'Failed to initialize payment');
            }
        };

        createPaymentIntent();
    }, [amount]);

    const appearance = {
        theme: 'stripe',
        variables: {
            colorPrimary: '#00A0FF',
            borderRadius: '12px',
        },
    };

    const options = {
        clientSecret,
        appearance,
    };

    return (
        <>
        {error ? (
            <div className="flex min-h-screen items-center justify-center bg-[#EEF6FF]">
                <div className="text-red-500 text-center">
                    <p>{error}</p>
                    <button 
                        onClick={() => navigate(-1)}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        ) : clientSecret ? (
            <Elements stripe={stripePromise} options={options}>
                <ArrowLeft 
                    className="absolute top-[6.8rem] left-[21.5rem] h-9 w-9 z-10 cursor-pointer" 
                    onClick={() => navigate(-1)} 
                />
                <div className="flex min-h-screen items-center justify-center bg-[#EEF6FF] p-4">
                    <div className="w-full max-w-md">
                        <div className="mb-4 text-center">
                            <h2 className="text-xl font-semibold">Total Amount: ₹{amount/100}</h2>
                        </div>
                        {/* ... rest of your existing form JSX ... */}
                    </div>
                </div>
            </Elements>
        ) : (
            <div className="flex min-h-screen items-center justify-center bg-[#EEF6FF]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
        )}
        </>
    );
};

export default PaymentForm;

