import React from 'react';
import { ArrowRight, FileSearch, Phone, Shield } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-white pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8">
          Simplify Your
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {" "}Government Tasks
          </span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-10">
          Navigate bureaucracy with ease. Get step-by-step guidance and expert help
          for all your administrative tasks.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button className="inline-flex items-center px-6 py-3 rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-colors">
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          <button className="inline-flex items-center px-6 py-3 rounded-full text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors">
            Talk to Expert
            <Phone className="ml-2 h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="p-6 rounded-xl bg-white shadow-sm border border-gray-100">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4 mx-auto">
              <FileSearch className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Step-by-Step Guide</h3>
            <p className="text-gray-600">Clear instructions for every procedure</p>
          </div>

          <div className="p-6 rounded-xl bg-white shadow-sm border border-gray-100">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4 mx-auto">
              <Phone className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Expert Support</h3>
            <p className="text-gray-600">Get help from verified professionals</p>
          </div>

          <div className="p-6 rounded-xl bg-white shadow-sm border border-gray-100">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4 mx-auto">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Secure & Reliable</h3>
            <p className="text-gray-600">Your data is always protected</p>
          </div>
        </div>
      </div>
    </div>
  );
}