import React, { useState } from 'react'
import { CreditCard, Wallet2 } from 'lucide-react'

const MyPaymentOptions = () => {
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'upi'>('card')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false)
      alert('Payment successful!')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          {/* Order Summary */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Summary</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Parking Duration</span>
                <span className="font-medium">2 hours</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Rate</span>
                <span className="font-medium">₹50/hour</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₹100</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">₹18</span>
              </div>
              <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between">
                <span className="font-medium">Total</span>
                <span className="font-bold text-violet-600">₹118</span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Select Payment Method</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setSelectedMethod('card')}
                className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-all
                  ${selectedMethod === 'card' 
                    ? 'border-violet-600 bg-violet-50' 
                    : 'border-gray-200 hover:border-violet-600'}`}
              >
                <CreditCard className={`w-6 h-6 ${
                  selectedMethod === 'card' ? 'text-violet-600' : 'text-gray-600'
                }`} />
                <span className={selectedMethod === 'card' ? 'text-violet-600' : 'text-gray-600'}>
                  Card
                </span>
              </button>
              <button
                onClick={() => setSelectedMethod('upi')}
                className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-all
                  ${selectedMethod === 'upi' 
                    ? 'border-violet-600 bg-violet-50' 
                    : 'border-gray-200 hover:border-violet-600'}`}
              >
                <Wallet2 className={`w-6 h-6 ${
                  selectedMethod === 'upi' ? 'text-violet-600' : 'text-gray-600'
                }`} />
                <span className={selectedMethod === 'upi' ? 'text-violet-600' : 'text-gray-600'}>
                  UPI
                </span>
              </button>
            </div>
          </div>

          {/* Payment Details Form */}
          <form onSubmit={handleSubmit}>
            {selectedMethod === 'card' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    defaultValue="4242 4242 4242 4242"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    maxLength={19}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      defaultValue="12/24"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      defaultValue="123"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    UPI ID
                  </label>
                  <input
                    type="text"
                    defaultValue="user@okbank"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-6 py-3 px-4 rounded-md text-white font-medium
                ${loading 
                  ? 'bg-violet-400 cursor-not-allowed' 
                  : 'bg-violet-600 hover:bg-violet-700'}`}
            >
              {loading ? 'Processing...' : `Pay ₹118`}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default MyPaymentOptions