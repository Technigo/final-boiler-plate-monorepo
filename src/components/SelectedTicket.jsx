import './SelectedTicket.css'

export const SelectedTicket = ({ row, seat }) => {
    return(
        <>
            <div className="a-ticket">
                <div className="ticket-notch top"></div>
                <p className="ticket-text">SEAT</p>
                <p className="seat-number">{seat}</p>
                <p className="ticket-text">Row {row}</p>
                <div className="ticket-notch bottom"></div>
            </div>
        </>
    )
    
}