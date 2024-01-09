import { useState } from 'react'
// import { useParams } from 'react-router-dom'
import { bookingStore } from '../store/bookingStore'
import { SelectedTicket } from './SelectedTicket'
import './BookingForm.css'

export const BookingForm = () => {
    const stateSeats = bookingStore((state) => state.selectedSeats)
    const [ formData, setFormData ] = useState({
        name: "",
        email: "",
        showTimeId: ""
    })
    // const bookingParam = useParams()
    // console.log(bookingParam.typeOfBooking)
    const selectedShowtime = bookingStore((state) => state.selectedShowtime)
    const makeABooking = bookingStore((state) => state.makeAReservation)

    const updateFormData = ( field, value ) => {
        setFormData((previous) => ({...previous, [field]: value}))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        stateSeats.map(seat => {
            console.log(formData.email, seat, selectedShowtime)
            makeABooking({email: formData.email, selectedSeat: seat, showTimeId: selectedShowtime})
        })
    }

    return(
        <>
            {stateSeats && <SelectedTicket />}

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