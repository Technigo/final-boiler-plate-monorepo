import { useState, useEffect } from 'react'
// import { useParams } from 'react-router-dom'
import { bookingStore } from '../store/bookingStore'
import { SelectedTicket } from './SelectedTicket'
import './BookingForm.css'

export const BookingForm = () => {
    const [ formData, setFormData ] = useState({
        name: "",
        email: "",
        showTimeId: ""
    })
    const [ bookingReceipts, setBookingReceipts ] = useState([])
    const { 
        selectedSeats,
        selectedShowtime,
        makeAReservation
     } = bookingStore()

     useEffect(() => {
        console.log(selectedSeats)
     }, [])

     useEffect(() => {
        if (selectedShowtime != null && formData !=null) {
            updateFormData( "showTimeId", selectedShowtime._id)
        }
    }, [selectedShowtime])

    useEffect(() => {
        console.log(bookingReceipts)
    }, [bookingReceipts])

    const updateFormData = ( field, value ) => {
        setFormData((previous) => ({...previous, [field]: value}))
    }

    const bookASeat = async (email, selectedSeat, showtimeID) => {
        const bookingData = await makeAReservation({email: email, selectedSeat: selectedSeat, showTimeId: showtimeID})
        setBookingReceipts(prev => [...prev, bookingData.booking])
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        selectedSeats.map(seat => {
            bookASeat(formData.email, seat, selectedShowtime._id)
        })
    }

    return(
        <>
            {selectedSeats && <SelectedTicket />}

            <div className="form-container">
                <form className="booking-form">
                    <div className="form-element">
                        <label htmlFor="the-name">Name: </label>
                        <input 
                            type="text" 
                            placeholder="Boel Larsson"
                            id="the-name"
                            value={formData.name}
                            onChange={(event) => {updateFormData("name", event.target.value)}}
                        />
                    </div>

                    <div className="form-element">
                        <label htmlFor="the-email">Email: </label>
                        <input 
                            type="text" 
                            placeholder="your-mail@email.com"
                            id="the-email"
                            value={formData.email}
                            onChange={(event) => {updateFormData("email", event.target.value)}}
                        />
                    </div>
                    <button onClick={handleSubmit}>Book your tickets</button>
                </form>
            </div>
        </>
    )
}