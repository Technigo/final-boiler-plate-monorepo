import { useLocation } from "react-router-dom"

export const BookingForm = () => {
    
    const location = useLocation()
    const { seats } = location.state

    console.log(seats, 'selected seats')

    return(
        <>
            <form>
                PLEASE BOOK:
                <input type="text" />
            </form>
        </>
    )
}