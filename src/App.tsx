import React from 'react';
import { Trash2, PlusCircle, CreditCard, Wallet2 } from 'lucide-react';

interface SavedPaymentMethod {
  id: string;
  type: 'card' | 'upi';
  label: string;
  details: string;
  isDefault: boolean;
}

const MyPaymentOptions = () => {
  // Dummy data for saved payment methods
  const [savedMethods, setSavedMethods] = React.useState<SavedPaymentMethod[]>([
    {
      id: '1',
      type: 'card',
      label: 'Primary Card',
      details: '**** **** **** 4242',
      isDefault: true,
    },
    {
      id: '2',
      type: 'upi',
      label: 'Personal UPI',
      details: 'user@okbank',
      isDefault: false,
    },
    {
      id: '3',
      type: 'card',
      label: 'Secondary Card',
      details: '**** **** **** 5678',
      isDefault: false,
    },
  ]);

  const handleDelete = (id: string) => {
    setSavedMethods(methods => methods.filter(method => method.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setSavedMethods(methods =>
      methods.map(method => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Saved Payment Methods
          </h1>

          {/* Payment Methods List */}
          <div className="space-y-4">
            {savedMethods.map((method) => (
              <div
                key={method.id}
                className={`border rounded-lg p-4 transition-all ${
                  method.isDefault ? 'border-purple-600 bg-purple-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {method.type === 'card' ? (
                      <CreditCard className={`w-6 h-6 ${
                        method.isDefault ? 'text-purple-600' : 'text-gray-600'
                      }`} />
                    ) : (
                      <Wallet2 className={`w-6 h-6 ${
                        method.isDefault ? 'text-purple-600' : 'text-gray-600'
                      }`} />
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{method.label}</p>
                      <p className="text-sm text-gray-600">{method.details}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!method.isDefault && (
                      <>
                        <button
                          onClick={() => handleSetDefault(method.id)}
                          className="text-sm text-purple-600 hover:text-purple-700"
                        >
                          Set as default
                        </button>
                        <button
                          onClick={() => handleDelete(method.id)}
                          className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </>
                    )}
                    {method.isDefault && (
                      <span className="text-sm text-purple-600 font-medium">
                        Default
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add New Payment Method Button */}
          <button className="mt-6 w-full flex items-center justify-center gap-2 py-3 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-purple-600 hover:border-purple-600 transition-colors">
            <PlusCircle className="w-5 h-5" />
            <span>Add New Payment Method</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPaymentOptions;