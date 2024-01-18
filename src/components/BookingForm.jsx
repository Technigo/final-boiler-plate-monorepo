import { useState, useEffect } from 'react'
// import { useParams } from 'react-router-dom'
import moment from 'moment'
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
    const [ showConfirmation, setShowConfirmation ] = useState(false)
    const { 
        selectedSeats,
        selectedShowtime,
        makeAReservation
     } = bookingStore()

     useEffect(() => {
        // console.log(selectedSeats)
        // console.log('showConfirmation', showConfirmation)
     }, [])

     useEffect(() => {
        if (selectedShowtime != null && formData !=null) {
            updateFormData( "showTimeId", selectedShowtime._id)
        }
    }, [selectedShowtime])

    useEffect(() => {
        // console.log(bookingReceipts)
        if (bookingReceipts != null && bookingReceipts.length > 0) setShowConfirmation(true)
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

    const calculatePrice = (ticketArray) => {
        let totalPrice = 0
        ticketArray.forEach(ticket => {
            totalPrice += ticket.price
        })
        return totalPrice
    }

    const displayDate = (date) => {
        date = moment().format('MMMM Do YYYY')
        return date
    }

    return(
        <div className="page-section the-confirmation">

            { showConfirmation && bookingReceipts.length > 0 && (
                <div className="confirmation-container">
                    <div className="confirmation-tickets">  
                        {selectedSeats && <SelectedTicket />}
                    </div>
                    <div className="confirmation-details">
                        <h2>Booking confirmed:</h2>
                        <h3>{selectedShowtime.movieTitle}</h3>
                        <p>{displayDate(selectedShowtime.date)} {selectedShowtime.startingTime}:00</p>
                        
                        <p>Email: {bookingReceipts[0].email}</p>
                        <p>Price: {calculatePrice(bookingReceipts)} kr</p>
                    </div>
                </div>
            ) }

            { !showConfirmation && 
                <div className="form-container">
                    <h3>{selectedShowtime.movieTitle}</h3>
                    { selectedSeats && <SelectedTicket />}
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
                </div>}
        </div>
    )
}