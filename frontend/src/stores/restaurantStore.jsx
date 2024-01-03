import { create } from 'zustand';

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

const apiURL = 'http://localhost:3000/api/restaurants/search';

export const useRestaurantStore = create((set) => ({
  category: [],
  selectedCategory: null,
  occasions: [],
  moods: [],
  selectedOccasion: null,
  selectedMoods: [],
  results: [],

  fetchCategory: async () => {
    try {
      const { selectedCategory } = useRestaurantStore.getState();
      console.log('Selected Category:', selectedCategory);

      const response = await fetch(`${apiURL}/category`);
      if (!response.ok) {
        throw new Error('Failed to fetch category');
      }

      const data = await response.json();


    // Normalize and set unique categories
    const uniqueCategory = Array.from(new Set(data.map((item) => capitalizeFirstLetter(item.trim()))));

    set({ category: uniqueCategory });
    return uniqueCategory;
  } catch (error) {
    console.error('Error fetching category:', error);
    throw error;
  }
},

setSelectedCategory: (category) => {
  console.log('Setting selected category:', category);
  set({ selectedCategory: category });
},
    

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
  setSelectedOccasion: (occasion) => {
    console.log('Setting selected occasion:', occasion);
    set({ selectedOccasion: occasion });
  },

   fetchMoods: async () => {
     try {
       set({ selectedMoods: [] });
       const { selectedOccasion, selectedCategory } = useRestaurantStore.getState();
       console.log('Fetching moods for occasion and category:', selectedOccasion, selectedCategory);
     const response = await fetch(
      `${apiURL}/mood?occasion=${encodeURIComponent(selectedOccasion)}&category=${encodeURIComponent(selectedCategory)}`
     );
     
     if (!response.ok) {
         throw new Error('Failed to fetch moods');
       }

       const moods = await response.json();
     // You might want to transform the moods data similarly to occasions
     // For example, if you want to capitalize the first letter:
      const capitalizedMoods = moods.map((mood) => capitalizeFirstLetter(mood.trim()));

      console.log('Fetched moods:', capitalizedMoods);

      set({ moods: capitalizedMoods });

     } catch (error) {
       console.error('Error fetching moods:', error);
     }
   },

  fetchMoodsForOccasion: async (occasion) => {
    try {
      set({ selectedMoods: [] });
      console.log('Fetching moods for occasion:', occasion);
      const response = await fetch(`http://localhost:3000/api/mood?occasion=${encodeURIComponent(occasion)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch moods for occasion');
      }

      const moods = await response.json();
      const capitalizedMoods = moods.map((mood) => capitalizeFirstLetter(mood.trim()));

      console.log('Fetched moods:', capitalizedMoods);
      
      set({ moods: capitalizedMoods });

    } catch (error) {
      console.error('Error fetching moods for occasion:', error);
    }
  },

  setSelectedMoods: (mood) => set((state) => {
    console.log('Setting selected moods:', mood);
    const isSelected = state.selectedMoods.includes(mood);
  
   // If the mood is already selected, remove it from the array
  if (isSelected) {
    return { selectedMoods: state.selectedMoods.filter(selectedMood => selectedMood !== mood) };
  }
  
  
  // If less than 3 moods are selected, add the new mood
  if (state.selectedMoods.length < 3) {
    return { selectedMoods: [...state.selectedMoods, mood] };
  }
  
    // If already 3 moods are selected and the new mood is not one of them, ignore the selection
    return { selectedMoods: state.selectedMoods };
  }),

  // Fetch results based on selected occasion and moods
  fetchResults: async () => {
    try {
    console.log('Fetching results...');
    const { selectedCategory, selectedOccasion, selectedMoods } = useRestaurantStore.getState();
    console.log('Selected Category:', selectedCategory);
    console.log('Selected Occasion:', selectedOccasion);
    console.log('Selected Moods:', selectedMoods);
    
  
    const apiURL = 'http://localhost:3000/api/restaurants/search';
    const queryParams = new URLSearchParams({
      category: selectedCategory,
      occasion: selectedOccasion,
      mood: selectedMoods.join(',')
    });
    
    const url = `${apiURL}?${queryParams}`;
    console.log('Fetching from URL:', url);

    const response = await fetch(url);
    if (!response.ok) {
      const errorMessage = `Failed to fetch search results. Status: ${response.status}, ${response.statusText}`;
      throw new Error(errorMessage);
    }

    const results = await response.json();
    useRestaurantStore.setState({ results });
  } catch (error) {
    console.error('Error fetching search results:', error);
  }
},
}));