import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { userStore } from '../store/userStore'
import { bookingStore } from '../store/bookingStore'
import { SelectedTicket } from '../components/SelectedTicket'

import './Booking.css'

const compareArrays = (arrayOne, arrayTwo) => {
	let isSame = true

	console.log('array one and two', arrayOne, arrayTwo)

	if (arrayOne.length !== arrayTwo.length) return false
	arrayOne.map((element, index) => isSame = isSame && (element === arrayTwo[index]))

	return (isSame)
}

export const Booking = () => {
	const fetchShows = bookingStore((state) => (state.fetchAllShowTimes))
	fetchShows()

	const stateSeats = bookingStore((state) => state.selectedSeats)
	const isLoggedIn = userStore.getState().isLoggedIn

	const setStateSeats = bookingStore((state) => state.setSelectedSeats)
	const updateStateSeats = bookingStore((state) => (state.updateSelectedSeats))

	const allShowTimes = bookingStore.getState().allShowTimes
	console.log(allShowTimes)

	// const [ selectedSeats, setSelectedSeats ] = useState(stateSeats)
	// console.log(chosenSeats)
	
	const thisShowTime = allShowTimes[1]
	console.log(thisShowTime)
	const cinemaHall = thisShowTime.cinemaHall
	const movieTitle = thisShowTime.movieTitle
	const seatInfo = thisShowTime.seats

	useEffect(() => console.log('selectedSeats', stateSeats, 'stateSeats'), [stateSeats])

	const handleSeatClick = (event, row, seatIndex) => {
		const newSelection = [row, seatIndex]

		const removeSelected = (event) => {
			event.target.classList.remove('selected')
			let filteredArray = stateSeats.filter(item => !compareArrays(item, newSelection))
			// setSelectedSeats(filteredArray)
			setStateSeats(filteredArray)
		}

		const addSelected = (event) => {
			event.target.classList.add('selected')
			// setSelectedSeats([...selectedSeats, newSelection])
			updateStateSeats(newSelection)
		}

		if (event.target.classList.contains('booked')) return null
		if (stateSeats !== null && stateSeats.length > 0) {
			let existsAlready = false

			stateSeats.map((seats) => {
				compareArrays(seats, newSelection) ? existsAlready = !existsAlready : false
			})

			existsAlready ? removeSelected(event) : addSelected(event)
		} else {
			// setSelectedSeats([newSelection])
			setStateSeats([newSelection])
			event.target.classList.add('selected')
		}
	}
	
	return (
		<>
			<h2>{movieTitle}</h2>
			<h3>{cinemaHall}</h3>
			<section className="cinema-container">
				<div className="the-screen">Screen</div>
				<div className="seat-container">
					{seatInfo.map((row, index) =>(
						<div className="the-rows" key={index}>
							<label>{index + 1}</label>
							{row.map(seat => (
								<div 
									className={`seat ${seat.booked ? "booked" : ""}`} 
									key={seat.seatIndex} 
									onClick={event => {
											handleSeatClick(event, seat.rowIndex, seat.seatIndex)
										}}>

								</div>
							))}

						</div>
					))}
				</div>
				<ul className="seat-legend">
					<li>
						<div className="seat"></div>
						<span>Available</span>
					</li>
					<li>
						<div className="selected seat"></div>
						<span>Selected</span>
					</li>
					<li>
						<div className="booked seat"></div>
						<span>Occupied</span>
					</li>
				</ul>
			</section>

			{stateSeats && (
				<div className="ticket-container">
					{stateSeats.map(item => <SelectedTicket key={item[1]} row={item[0]} seat={item[1]} />)}
				</div>
			)}

			{isLoggedIn ? (
				<>
					<div className="button-container">
						<Link to={`/bookingForm/user`} state={{ seats: stateSeats }}><button>BOOK</button></Link>
					</div>
				</>
			) : (
				<>
					<div className="button-container">
						<Link to={`/bookingForm/guest`} state={{ seats: stateSeats }}><button>Book as a guest</button></Link>
						<Link to={`/bookingForm/register`} state={{ seats: stateSeats }}><button>Sign up/Log in to book</button></Link>
					</div>
				</>
			)}
		</>
	)
}
