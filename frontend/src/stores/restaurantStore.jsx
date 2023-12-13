import { create } from 'zustand';

export const useRestaurantStore = create((set) => ({
  occasions: [],
  moods: [],
  selectedOccasion: '',
  selectedMoods: [], // This is now an array
  results: [],
  
  // Fetch occasions from the backend
  fetchOccasions: async () => {
    // Fetch logic here
  },

  // Fetch moods from the backend
  fetchMoods: async () => {
    // Fetch logic here
  },

  // Update the selected occasion
  setSelectedOccasion: (occasion) => set({ selectedOccasion: occasion }),

  // Update the selected moods
  setSelectedMoods: (moods) => set({ selectedMoods: moods }), // Now takes an array of moods

  // Fetch results based on selected occasion and moods
  fetchResults: async () => {
    const { selectedOccasion, selectedMoods } = useStore.getState();
    const queryParams = new URLSearchParams({ occasion: selectedOccasion });
    selectedMoods.forEach((mood) => queryParams.append('mood', mood));

    try {
      const response = await fetch(`/api/results?${queryParams.toString()}`);
      const fullResults = await response.json();
      const results = fullResults.map(({ 
        restaurantName, 
        address, 
        zipcode, 
        city, 
        country, 
        borough, 
        cuisine, 
        occasion, 
        mood, 
        url 
      }) => ({
        restaurantName, 
        address, 
        zipcode, 
        city, 
        country, 
        borough, 
        cuisine, 
        occasion, 
        mood, 
        url
      }));
      set({ results });
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  },
}));

//Make sure your backend endpoint /api/results is capable of handling multiple mood query parameters and filtering the results accordingly. This approach allows the user to select one occasion and up to three moods, and the results will be fetched based on these selectio