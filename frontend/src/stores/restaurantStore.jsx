import { create } from 'zustand';

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
export const useRestaurantStore = create((set) => ({
  occasions: [],
  moods: [],
  selectedOccasion: null,
  selectedMoods: [],
  results: [],

  // This function fetches the occasions from your API and updates the state
  fetchOccasions: async () => {
    try {
      // Attempt to fetch the occasions from your API endpoint
      const response = await fetch('http://localhost:3000/api/occasion');
      if (!response.ok) {
        throw new Error('Failed to fetch occasions');
      }

      // Parse the JSON response
      const data = await response.json();

      const normalizedData = data.map((item) =>
      capitalizeFirstLetter(item.trim())
    );

    // Remove duplicates
    const uniqueData = Array.from(new Set(normalizedData));

    set({ occasions: uniqueData });

  } catch (error) {
    console.error('Error fetching occasions:', error);
  }
},

  fetchMoods: async () => {
    try {
      const response = await fetch('http://localhost:3000/api/mood');
      if (!response.ok) throw new Error('Failed to fetch moods');
      const data = await response.json();
      set({ moods: data });
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