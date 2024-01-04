import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { userStore } from '../store/userStore'
import { SelectedTicket } from '../components/SelectedTicket'

import data from '../showTime.json'

import './Booking.css'

const compareArrays = (arrayOne, arrayTwo) => {
	let isSame = true

	if (arrayOne.length !== arrayTwo.length) return false
	arrayOne.map((element, index) => isSame = isSame && (element === arrayTwo[index]))

	return (isSame)
}

export const Booking = () => {
	const [ selectedSeats, setSelectedSeats ] = useState([])
	const isLoggedIn = userStore.getState().isLoggedIn

	const thisShowTime = data[1]
	const cinemaHall = thisShowTime.cinemaHall
	const movieTitle = thisShowTime.movieTitle
	const seatInfo = thisShowTime.seats

	const handleSeatClick = (event, row, seat) => {
		const newSelection = [row, seat]

		const removeSelected = (event) => {
			event.target.classList.remove('selected')
			let filteredArray = selectedSeats.filter(item => !compareArrays(item, newSelection))
			setSelectedSeats(filteredArray)
		}

		const addSelected = (event) => {
			event.target.classList.add('selected')
			setSelectedSeats((selectedSeats) => [...selectedSeats, newSelection])
		}

		if (event.target.classList.contains('booked')) return null
		if (selectedSeats !== null && selectedSeats.length > 0) {
			let existsAlready = false

			selectedSeats.map((seats) => {
				compareArrays(seats, newSelection) ? existsAlready = !existsAlready : false
			})

			existsAlready ? removeSelected(event) : addSelected(event)
		} else {
			setSelectedSeats([newSelection])
			event.target.classList.add('selected')
		}
	}

	useEffect( () => console.log(selectedSeats)
		,[selectedSeats])
	
	return (
		<>
			<h2>{movieTitle}</h2>
			<h3>{cinemaHall}</h3>
			<section className="cinema-container">
				<div className="the-screen">Screen</div>
				<div className="seat-container">
					{seatInfo.map(row => (
						<div className="the-rows" key={row.rowIndex}>
							<label>{row.rowIndex}</label>
							{row.seats.map((seat, index) => (
								<div 
									className={`seat ${seat.booked ? "booked" : ""}`} 
									key={index}
									onClick={(event) => {
											handleSeatClick(event, row.rowIndex, index)
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

			{selectedSeats && (
				<div className="ticket-container">
					{selectedSeats.map(item => <SelectedTicket key={item[1]} row={item[0]} seat={item[1]} />)}
				</div>
			)}

			{isLoggedIn ? (
				<>
					<div className="button-container">
						<Link to={`/bookingForm/user`} state={{ seats: selectedSeats }}><button>BOOK</button></Link>
					</div>
				</>
			) : (
				<>
					<div className="button-container">
						<Link to={`/bookingForm/guest`} state={{ seats: selectedSeats }}><button>Book as a guest</button></Link>
						<Link to={`/bookingForm/register`} state={{ seats: selectedSeats }}><button>Sign up/Log in to book</button></Link>
					</div>
				</>
			)}
		</>
	)
}
