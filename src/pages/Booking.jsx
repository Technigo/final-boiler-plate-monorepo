import { useState, useEffect } from 'react'
// import { useParams } from 'react-router-dom'
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
	const [ thisShowTime, setThisShowTime ] = useState()
	const [ cinemaHall, setCinemahall ] = useState()
	const [ movieTitle, setMovieTitle ] = useState()
	const [ seatInfo, setSeatInfo ] = useState()

	const { 
		fetchAllShowTimes, 
		allShowTimes,
		selectedSeats,
		setSelectedSeats,
		updateSelectedSeats,
		selectedShowtime,
		setSelectedShowtime
	} = bookingStore() 

	const isLoggedIn = userStore.getState().isLoggedIn

	// const showtimeParam = useParams()
	// console.log(showtimeParam)

	useEffect(() => {
		fetchAllShowTimes()
	}, [])

	useEffect(() => {
		if(allShowTimes != null && allShowTimes.length > 0) {
			const thisShowTime = allShowTimes[9]
			setThisShowTime(thisShowTime)
			setSelectedShowtime(thisShowTime)
		}
	}, [allShowTimes])

	useEffect(() => {
		if (thisShowTime != null) {
			const cinemaHall = thisShowTime.cinemaHall
			const movieTitle = thisShowTime.movieTitle
			const seatInfo = thisShowTime.seats

			setCinemahall(cinemaHall)
			setMovieTitle(movieTitle)
			setSeatInfo(seatInfo)
		}
	}, [thisShowTime])

	useEffect(() => console.log('selectedSeats', selectedSeats, 'stateSeats'), [selectedSeats])

	const handleSeatClick = (event, row, seatIndex) => {
		const newSelection = [row, seatIndex]

		const removeSelected = (event) => {
			event.target.classList.remove('selected')
			let filteredArray = selectedSeats.filter(item => !compareArrays(item, newSelection))
			// setSelectedSeats(filteredArray)
			setSelectedSeats(filteredArray)
		}

		const addSelected = (event) => {
			event.target.classList.add('selected')
			// setSelectedSeats([...selectedSeats, newSelection])
			updateSelectedSeats(newSelection)
		}

		if (event.target.classList.contains('booked')) return null
		if (selectedSeats != null) {
			let existsAlready = false

			selectedSeats.map((seats) => {
				compareArrays(seats, newSelection) ? existsAlready = !existsAlready : false
			})

			existsAlready ? removeSelected(event) : addSelected(event)
		} else {
			// setSelectedSeats([newSelection])
			setSelectedSeats([newSelection])
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
					{seatInfo && seatInfo.map((row, index) =>(
						<div className="the-rows" key={index}>
							<label>{index + 1}</label>
							{row.map(seat => (
								<div 
									className={`seat ${seat.booked ? "booked" : ""} `} 
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

			{selectedSeats && (<SelectedTicket />)}

			{isLoggedIn ? (
				<>
					<div className="button-container">
						<Link to={`/bookingForm/user`}><button>BOOK</button></Link>
					</div>
				</>
			) : (
				<>
					<div className="button-container">
						<Link to={`/bookingForm/guest`}><button>Book as a guest</button></Link>
						<Link to={`/bookingForm/register`}><button>Sign up/Log in to book</button></Link>
					</div>
				</>
			)}
		</>
	)
}
