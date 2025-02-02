import React, { useState } from 'react';
import { Menu, Search, User, LogOut, Wallet } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Auth } from './Auth';
import { WalletModal } from './WalletModal';
import { supabase } from '../lib/supabase';

export function Header() {
  const [showAuth, setShowAuth] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const { user, setUser } = useStore();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                MyEase
              </span>
            </div>

            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search for any government service..."
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <button
                    onClick={() => setShowWallet(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                  >
                    <Wallet className="h-4 w-4" />
                    <span>₹{user.walletBalance}</span>
                  </button>
                  <div className="relative group">
                    <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                      <User className="h-5 w-5" />
                      <span>{user.name}</span>
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 hidden group-hover:block">
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <button
                  onClick={() => setShowAuth(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  <User className="h-5 w-5" />
                  Sign In
                </button>
              )}
              <button className="text-gray-600 hover:text-gray-900 md:hidden">
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {showAuth && <Auth onClose={() => setShowAuth(false)} />}
      {showWallet && <WalletModal onClose={() => setShowWallet(false)} />}
    </>
  );
}