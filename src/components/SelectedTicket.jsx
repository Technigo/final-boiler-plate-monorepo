import { bookingStore } from '../store/bookingStore'
import { useState, useEffect } from 'react'
import './SelectedTicket.css'

export const SelectedTicket = () => {
    const [ presentArray, setPresentArray ] = useState()

    // const theSeats = bookingStore(getState().selectedSeats
    const theSeats = bookingStore(state => state.selectedSeats)

    const sortedArray = (array) => {
        let sorted = [...array]
        sorted.sort((a, b) => b[1] - a[1]).reverse()
        return sorted
    }

    useEffect(() => {
        if (theSeats != null) {
            let sorted = sortedArray(theSeats)
            setPresentArray(sorted)
        }
    }, [theSeats])
    
    // const presentArray = sortedArray(theSeats)

    return(
        <div className="ticket-container">
            {presentArray != null && presentArray.length > 0 && presentArray.map((item, index) => (
                <div className="a-ticket" key={index}>
                <div className="ticket-notch top"></div>
                    <p className="ticket-text">SEAT</p>
                    <p className="seat-number">{item[1]}</p>
                    <p className="ticket-text">Row {item[0]}</p>
                <div className="ticket-notch bottom"></div>
                </div>
            ))}
        </div>
    )
    
}