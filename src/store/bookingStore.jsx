import { create } from 'zustand'

const apiEnv = import.meta.env.VITE_BACKEND_API

export const bookingStore = create((set) => ({
    allShowTimes: [],
    selectedSeats: [],
    selectedShowtime: "",

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

    setSelectedShowtime: ( input ) => set( () => ({ selectedShowtime: input })),

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

    makeAReservation: async (selectedSeat, showTimeId, email) => {
        try {
            const response = await fetch(`${apiEnv}/bookings`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    email: email,
                    seat: selectedSeat,
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