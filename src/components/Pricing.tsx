import React from 'react';
import { Check } from 'lucide-react';

const plans = [
  {
    id: 'free',
    name: 'Basic',
    price: 0,
    features: [
      'Access to step-by-step guides',
      'Basic chat support',
      'Standard response time',
      'Public documents access'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 499,
    isPopular: true,
    features: [
      'All Basic features',
      'Priority expert access',
      'Faster response time',
      '10% discount on expert calls',
      'Document templates'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 999,
    features: [
      'All Premium features',
      'Dedicated expert support',
      'Instant response time',
      '20% discount on expert calls',
      'Custom document templates',
      'API access'
    ]
  }
];

export function Pricing() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose the plan that best fits your needs. All plans include access to our
          expert network at ₹5 per minute.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative bg-white rounded-xl shadow-sm border ${
              plan.isPopular ? 'border-blue-600' : 'border-gray-100'
            } p-6`}
          >
            {plan.isPopular && (
              <div className="absolute top-0 right-6 transform -translate-y-1/2">
                <div className="inline-block bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
                  Most Popular
                </div>
              </div>
            )}

            <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold">₹{plan.price}</span>
              <span className="text-gray-600">/month</span>
            </div>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-blue-600 mt-0.5" />
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-2 px-4 rounded-lg ${
                plan.isPopular
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-50 text-gray-800 hover:bg-gray-100'
              } transition-colors`}
            >
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}