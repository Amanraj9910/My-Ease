import React, { useState } from 'react';
import { Phone, Calendar, Clock, Star, Wallet } from 'lucide-react';
import type { Expert } from '../types';
import { useStore } from '../store/useStore';

export function ExpertCall() {
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const { user, updateWalletBalance } = useStore();
  const experts = useStore((state) => state.experts);

  const handleScheduleCall = async (expert: Expert) => {
    if (!user) {
      alert('Please sign in to schedule a call');
      return;
    }

    if (user.walletBalance < 100) { // Minimum balance required
      alert('Please add credits to your wallet');
      return;
    }

    setSelectedExpert(expert);
    // Show scheduling modal or redirect to scheduling page
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Talk to an Expert</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Get personalized guidance from our verified experts at ₹5 per minute.
          First consultation is free for 5 minutes!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {experts.map((expert) => (
          <div key={expert.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start gap-4">
              <img
                src={expert.image}
                alt={expert.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-lg">{expert.name}</h3>
                <p className="text-sm text-gray-600">{expert.specialization}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{expert.rating}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                <span>₹{expert.pricePerMinute}/minute</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>
                  {expert.availability ? 'Available now' : 'Next available: ' + expert.nextAvailableSlot}
                </span>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              {expert.availability ? (
                <button
                  onClick={() => handleScheduleCall(expert)}
                  className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </button>
              ) : (
                <button
                  onClick={() => handleScheduleCall(expert)}
                  className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}