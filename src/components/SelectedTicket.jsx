import { bookingStore } from '../store/bookingStore'
import './SelectedTicket.css'

export const SelectedTicket = () => {

    const theSeats = bookingStore.getState().selectedSeats

    const sortedArray = (array) => {
        let sorted = [...array]
        sorted.sort((a, b) => b[0] - a[0]).reverse()
        return sorted
    }

    const presentArray = sortedArray(theSeats)

    return(
        <div className="ticket-container">
            {presentArray.length > 0 && presentArray.map((item, index) => (
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