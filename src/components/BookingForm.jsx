import { useLocation } from "react-router-dom"

export const BookingForm = () => {
    
    const location = useLocation()
    const { selectedSeats } = location.state

    console.log(selectedSeats, 'selected seats')
    
    return(
        <>
            <form>
                PLEASE BOOK:
                <input type="text" />
            </form>
        </>
    )
}