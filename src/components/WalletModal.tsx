import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useStore } from '../store/useStore';
import { Wallet, CreditCard } from 'lucide-react';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const amounts = [
  { value: 500, credits: '₹500 (100 minutes)' },
  { value: 1000, credits: '₹1,000 (200 minutes)' },
  { value: 2000, credits: '₹2,000 (400 minutes)' },
  { value: 5000, credits: '₹5,000 (1,000 minutes)' },
];

interface WalletModalProps {
  onClose: () => void;
}

export function WalletModal({ onClose }: WalletModalProps) {
  const [selectedAmount, setSelectedAmount] = useState(amounts[1].value);
  const [loading, setLoading] = useState(false);
  const { user } = useStore();

  const handlePayment = async () => {
    if (!user) return;
    setLoading(true);

    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      // Create a payment session on your backend
      const response = await fetch('/api/create-payment-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: selectedAmount,
          userId: user.id,
        }),
      });

      const session = await response.json();

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) throw error;
    } catch (err) {
      console.error('Payment error:', err);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Add Credits</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 p-4 bg-blue-50 rounded-lg">
            <Wallet className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium">Current Balance</p>
              <p className="text-2xl font-bold">₹{user?.walletBalance || 0}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          {amounts.map((amount) => (
            <label
              key={amount.value}
              className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                selectedAmount === amount.value
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="amount"
                  value={amount.value}
                  checked={selectedAmount === amount.value}
                  onChange={() => setSelectedAmount(amount.value)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="font-medium">{amount.credits}</span>
              </div>
              <span className="text-gray-600">Best Value</span>
            </label>
          ))}
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <CreditCard className="h-5 w-5" />
          {loading ? 'Processing...' : 'Add Credits'}
        </button>

        <p className="text-sm text-gray-500 text-center mt-4">
          Secure payment powered by Stripe
        </p>
      </div>
    </div>
  );
}