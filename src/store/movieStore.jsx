// import { create } from 'zustand'


// const apiEnv = import.meta.env.VITE_BACKEND_API;
// console.log(apiEnv);

// export const movieStore = create((set) => ({
//   movies: [],
//   setMovies: (movies) => set({ movies }),
//   fetchMovies: async () => {
//     try {
//       const response = await fetch(`${apiEnv}/movies`)
//       if (response.ok) {
//         const data = await response.json()
//         set({ movies: data })
//       } else {
//         console.error('Failed to fetch movies');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }

// }))

import { create } from 'zustand';
import moviesData from '../movies.json';

export const movieStore = create((set) => ({
  movies: moviesData, // Directly assign data from the JSON file to the state
  setMovies: (movies) => set({ movies }),
  fetchMovies: async () => {
    try {
      const data = moviesData;
      set({ movies: data });
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  }
}));

