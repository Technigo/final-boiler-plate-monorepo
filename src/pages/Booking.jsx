import { useState, useEffect } from 'react'
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

	const thisShowTime = data[1]
	const movieTitle = thisShowTime.movieTitle
	const seatInfo = thisShowTime.seats

	const handleSeatClick = (event, row, seat) => {
		const newSelection = [row, seat]

		const removeSelected = (event) => {
			console.log('REMOVE')
			event.target.classList.remove('selected')
			let filteredArray = selectedSeats.filter(item => !compareArrays(item, newSelection))
			setSelectedSeats(filteredArray)
			console.log('filtered', filteredArray)
		}

		const addSelected = (event) => {
			console.log('ADD')
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

	useEffect(() => {
		console.log(selectedSeats)
	},[selectedSeats])
	
	return (
		<>
			<h2>BOOKING</h2>
			<h3>{movieTitle}</h3>
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
		</>
	)
}
