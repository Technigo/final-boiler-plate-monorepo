import { create } from 'zustand'

const apiEnv = import.meta.env.VITE_BACKEND_API

export const bookingStore = create((set) => ({
    allShowTimes: [],
    selectedSeats: [],

    fetchAllShowTimes: async () => {
        try {
            const response = await fetch(`${apiEnv}/showtimes`, {
                method: 'GET',
            })
            const data = await response.json()
            set({ allShowTimes: data })
        }
        catch (error) {
            console.log(error)
        }
    },

    setSelectedSeats: ( newSeats ) => set(
        () => ({ 
            selectedSeats: 
                Array.isArray(newSeats) ? newSeats : [newSeats] })
    ),

    updateSelectedSeats: ( newSeats ) => set(
        state => ({ 
            selectedSeats: [...state.selectedSeats, newSeats] 
        })
    ),

    makeAReservation: async (selectedSeat, showTimeId) => {
        try {
            const response = await fetch(`${apiEnv}/showtimes/bookSeat`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    row: selectedSeat[0], 
                    seat: selectedSeat[1], 
                    showTimeId: showTimeId 
                })
            })
            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }


    // chartOfBookedSeats: allShowTimes.seats,
    // setChartOfBookedSeats: (newBooking) => set({ (state) => ({chartOfBookedSeats: [...state.chartOfBookedSeats, newBooking]}) }),


}))

export default bookingStore