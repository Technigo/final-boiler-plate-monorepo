// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

// const useExploreRecipesStore = create(persist(
//     (set) => ({
//         cocktails: [],
//         displayedCocktails: [],
//         totalCocktails: 0,
//         itemsToDisplay: 6,
//         searchTerm: '',
//         selectedFilter: '',

//         fetchCocktails: async (searchTerm, selectedFilter) => {
//             let query = '';
//             if (searchTerm) {
//                 query += `search=${encodeURIComponent(searchTerm)}`;
//             }
//             if (selectedFilter) {
//                 const [category, value] = selectedFilter.split(':');
//                 query += (query ? '&' : '') + `${category.toLowerCase()}=${encodeURIComponent(value)}`;
//             }
//             const response = await fetch(`https://cbc-uvko.onrender.com/cocktails${query ? '?' + query : ''}`);
//             const data = await response.json();
//             set({
//                 cocktails: data,
//                 displayedCocktails: data.slice(0, 6),
//                 totalCocktails: data.length
//             });
//         },

//         loadMoreCocktails: () => set((state) => {
//             const newItemsToDisplay = state.itemsToDisplay + 6;
//             return {
//                 itemsToDisplay: newItemsToDisplay,
//                 displayedCocktails: state.cocktails.slice(0, newItemsToDisplay)
//             };
//         }),

//         setSearchTerm: (term) => set({ searchTerm: term }),
//         setSelectedFilter: (filter) => set({ selectedFilter: filter }),
//         setItemsToDisplay: (items) => set({ itemsToDisplay: items }),
//     }),
//     {
//         name: 'cocktails-storage', // Unique key for localStorage
//     }
// ));


