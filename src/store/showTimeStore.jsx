import { create } from 'zustand'

const apiEnv = import.meta.env.VITE_BACKEND_API;
// console.log(apiEnv)

export const showTimesStore = create((set) => ({
  showTimes: [],
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
  fetchShowtimeByMovie: async (movieId) => {
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
        set({ showTimes: data })
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



// import { create } from 'zustand'
// import showTimesData from '../showTime.json'

// export const showTimeStore = create((set) => ({
//   showTimes: showTimesData, // Directly assign data from the JSON file to the state
//   setShowTimes: (showTime) => set({ showTime }),
//   fetchShowTimes: async () => {
//     try {
//       const data = showTimesData
//       set({ showTimes: data })
//     } catch (error) {
//       console.error('Error fetching showTime:', error)
//     }
//   }
// }))

