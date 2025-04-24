import { create } from 'zustand';

interface LocationState {
  location: string;
  setLocation: (location: string) => void;
  clearLocation: () => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  location: '',
  setLocation: (location) => set({ location }),
  clearLocation: () => set({ location: '' })
}));