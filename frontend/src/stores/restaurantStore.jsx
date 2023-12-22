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

  fetchOccasions: async () => {
    try {
      const response = await fetch('http://localhost:3000/api/occasion');
      if (!response.ok) {
        throw new Error('Failed to fetch occasions');
      }

      let data = await response.json();

      // Normalize the data by capitalizing the first letter and making the rest lowercase
      data = data.map((item) => capitalizeFirstLetter(item.trim()));

      // Filter out the misspelled 'relatonship' occasion
      data = data.filter((item) => item.toLowerCase() !== 'celebrate a relatonship anniversary');

      // Remove duplicates
      const uniqueData = Array.from(new Set(data));

      set({ occasions: uniqueData });

    } catch (error) {
      console.error('Error fetching occasions:', error);
    }
  },

  // Update the selected occasion
  setSelectedOccasion: (occasion) => set({ selectedOccasion: occasion }),

  fetchMoods: async () => {
    try {
      const response = await fetch('http://localhost:3000/api/mood');
      if (!response.ok) {
        throw new Error('Failed to fetch moods');
      }

      const moods = await response.json();
      // You might want to transform the moods data similarly to occasions
      // For example, if you want to capitalize the first letter:
      const capitalizedMoods = moods.map((mood) => capitalizeFirstLetter(mood.trim()));

      set({ moods: capitalizedMoods });

    } catch (error) {
      console.error('Error fetching moods:', error);
    }
  },

  setSelectedMoods: (newMood) => set((state) => {
    const isSelected = state.selectedMoods.includes(newMood);
  
    // If the mood is already selected, remove it from the array
    if (isSelected) {
      return { selectedMoods: state.selectedMoods.filter(mood => mood !== newMood) };
    }
  
    // If less than 3 moods are selected, add the new mood
    if (state.selectedMoods.length < 3) {
      return { selectedMoods: [...state.selectedMoods, newMood] };
    }
  
    // If already 3 moods are selected and the new mood is not one of them, ignore the selection
    return {};
  }),

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
      if (!response.ok) throw new Error('Failed to fetch search results');

      const results = await response.json();
      set({ results });
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  },
}));









//Make sure your backend endpoint /api/results is capable of handling multiple mood query parameters and filtering the results accordingly. This approach allows the user to select one occasion and up to three moods, and the results will be fetched based on these selectio