import data from '../showTime.json'

import './Booking.css'

export const Booking = () => {
	// console.log(data)
	const thisShowTime = data[1]
	const seatInfo = thisShowTime.seats
	
	
	return (
		<>
			<h2>BOOKING</h2>
			<section className="cinema-container">
				<div className="the-screen">Screen</div>
				<div className="seat-container">
					{seatInfo.map(row => (
						<div className="the-rows" key={row.rowIndex}>
							<label>{row.rowIndex}</label>
							{row.seats.map(seat => (
								seat.booked ? <div className="seat booked" key={seat.bookingID}></div> : <div className="seat" key={seat.bookingID}></div>
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
