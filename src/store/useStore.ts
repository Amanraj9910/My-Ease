import { create } from 'zustand';
import type { User, Step, Expert, ChatMessage } from '../types';
import { sampleSteps, sampleExperts } from '../data/sampleData';

interface Store {
  user: User | null;
  steps: Step[];
  experts: Expert[];
  chatMessages: ChatMessage[];
  setUser: (user: User | null) => void;
  addBookmark: (stepId: string) => void;
  removeBookmark: (stepId: string) => void;
  addChatMessage: (message: ChatMessage) => void;
  updateWalletBalance: (amount: number) => void;
}

export const useStore = create<Store>((set) => ({
  user: null,
  steps: sampleSteps,
  experts: sampleExperts,
  chatMessages: [],
  
  setUser: (user) => set({ user }),
  
  addBookmark: (stepId) => 
    set((state) => ({
      user: state.user 
        ? { 
            ...state.user, 
            bookmarks: [...state.user.bookmarks, stepId]
          }
        : null
    })),
    
  removeBookmark: (stepId) =>
    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            bookmarks: state.user.bookmarks.filter(id => id !== stepId)
          }
        : null
    })),
    
  addChatMessage: (message) =>
    set((state) => ({
      chatMessages: [...state.chatMessages, message]
    })),
    
  updateWalletBalance: (amount) =>
    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            walletBalance: state.user.walletBalance + amount
          }
        : null
    }))
}));