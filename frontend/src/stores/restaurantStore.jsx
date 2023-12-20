import { create } from 'zustand';

export const useRestaurantStore = create((set) => ({
  occasions: [],
  moods: [],
  selectedOccasion: '',
  selectedMoods: [],
  results: [],
  
  // Fetch occasions from the backend
  fetchOccasions: async () => {
    try {
      const response = await fetch('http://localhost:3000/api/occasion');
      const occasions = await response.json();
      set({ occasions });
    } catch (error) {
      console.error('Error fetching occasions:', error);
    }
  },
  
  // Fetch moods from the backend
  fetchMoods: async () => {
    try {
      const response = await fetch('http://localhost:3000/api/mood');
      const moods = await response.json();
      set({ moods });
    } catch (error) {
      console.error('Error fetching moods:', error);
    }
  },

  // Update the selected occasion
  setSelectedOccasion: (occasion) => set({ selectedOccasion: occasion }),

  // Update the selected moods
  setSelectedMoods: (moods) => set({ selectedMoods: moods }), // Takes an array of moods

  // Fetch results based on selected occasion and moods
  fetchResults: async () => {
    const { selectedOccasion, selectedMoods } = useRestaurantStore.getState();
    const queryParams = new URLSearchParams();

    if (selectedOccasion) {
      queryParams.append('occasion', selectedOccasion);
    }
    selectedMoods.forEach((mood) => queryParams.append('mood', mood));

    try {
      const response = await fetch(`http://localhost:3000/restaurants/search?${queryParams.toString()}`);
      const results = await response.json();
      set({ results });
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  },
}));









//Make sure your backend endpoint /api/results is capable of handling multiple mood query parameters and filtering the results accordingly. This approach allows the user to select one occasion and up to three moods, and the results will be fetched based on these selectio