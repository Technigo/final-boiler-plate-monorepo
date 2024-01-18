import { create } from 'zustand'

const apiEnv = import.meta.env.VITE_BACKEND_API;

export const showTimesStore = create((set) => ({
  showTimes: [],
  showTimesByMovie: [],

  setShowTimes: (showTimes) => set({ showTimes }),

  fetchShowTimes: async () => {
    try {
      const response = await fetch(`${apiEnv}/showtimes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()
      if (response.ok) {
        set({ showTimes: data })
      } else {
        console.error('Failed to fetch showTimes')
      }
    } catch (error) {
      console.error(error)
    }
  },

  // fetch showtime by movie
  fetchShowtimesByMovie: async (movieId) => {
    try {
      const response = await fetch(`${apiEnv}/showtimes/movie/${movieId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()
      console.log(data)

      if (response.ok && data.length > 0) {
        set({ showTimesByMovie: data })
      } else if (data.length === 0) {
        console.error('No showtimes for this movie')
      } else {
        console.error('Failed to fetch showTimes')
      }
    } catch (error) {
      console.error(error)
    }
  },
}))
