import { create } from 'zustand';
import showTimesData from '../showTime.json';

export const showTimeStore = create((set) => ({
  showTimes: showTimesData, // Directly assign data from the JSON file to the state
  setShowTimes: (showTime) => set({ showTime }),
  fetchShowTimes: async () => {
    try {
      const data = showTimesData;
      set({ showTimes: data });
    } catch (error) {
      console.error('Error fetching showTime:', error);
    }
  }
}));

