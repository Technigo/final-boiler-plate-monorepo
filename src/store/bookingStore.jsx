import { create } from 'zustand'

const apiEnv = import.meta.env.VITE_BACKEND_API

export const bookingStore = create((set) => ({
    allShowTimes: [],

    fetchAllShowTimes: async () => {
        try {
            const response = await fetch(`${apiEnv}/showtimes`, {
                method: 'GET',
                // headers: {
                //     Authorization: localStorage.getItem("accessToken"),
                // }
            })
            const data = await response.json()
            set({ allShowTimes: data })
        }
        catch (error) {
            console.log(error)
        }
    },

    // chartOfBookedSeats: allShowTimes.seats,
    // setChartOfBookedSeats: (newBooking) => set({ (state) => ({chartOfBookedSeats: [...state.chartOfBookedSeats, newBooking]}) }),


}))