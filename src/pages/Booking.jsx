/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { userStore } from '../store/userStore'
import { bookingStore } from '../store/bookingStore'

import { SelectedTicket } from '../components/SelectedTicket'

import './Booking.css'

const compareArrays = (arrayOne, arrayTwo) => {
  let isSame = true

  if (arrayOne.length !== arrayTwo.length) return false
  arrayOne.map((element, index) => isSame = isSame && (element === arrayTwo[index]))

  return (isSame)
}

export const Booking = () => {
  const [ cinemaHall, setCinemahall ] = useState()
  const [ movieTitle, setMovieTitle ] = useState()
  const [ moviePoster, setMoviePoster ] = useState()
  const [ seatInfo, setSeatInfo ] = useState()
  
  const [ showtimeDate, setShowtimeDate ] = useState()
  const [ showtimeTime, setShowtimeTime ] = useState()
  const [ showtimePrice, setShowtimePrice ] = useState()

  const {
    fetchSelectedShowtime,
    selectedShowtime,
    selectedSeats,
    setSelectedSeats,
    removeSelectedSeats,
    updateSelectedSeats,
    setJustSelectedSeats,
  } = bookingStore()

  const isLoggedIn = userStore.getState().isLoggedIn

  const { showtimeID } = useParams()

  useEffect(() => {
    if (showtimeID != null) fetchSelectedShowtime(showtimeID)
  }, [showtimeID])

  useEffect(() => {
    if (selectedShowtime != null) {
      const cinemaHall = selectedShowtime.cinemaHall
      const movieTitle = selectedShowtime.movieTitle
      const moviePoster = selectedShowtime.moviePoster
      const seatInfo = selectedShowtime.seats

      let showtimeDate = selectedShowtime.date
      showtimeDate = moment().format('MMMM Do YYYY')
      const showtimeTime = selectedShowtime.startingTime
      const showtimePrice = selectedShowtime.price

      setCinemahall(cinemaHall)
      setMovieTitle(movieTitle)
      setMoviePoster(`https://image.tmdb.org/t/p/w780${moviePoster}`)
      setSeatInfo(seatInfo)
      setShowtimeDate(showtimeDate)
      setShowtimeTime(showtimeTime)
      setShowtimePrice(showtimePrice)
    }
  }, [selectedShowtime])

  useEffect(() => {
    if (seatInfo != null && seatInfo.length > 0) {
      seatInfo.forEach(row => {
        row.forEach((seat) => {
          if (seat.selected) {
            setJustSelectedSeats([seat.rowIndex, seat.seatIndex])
          }
        })
      })
    }
  }, [seatInfo])

  useEffect(() => {
    console.log('selectedSeats', selectedSeats)
  }, [selectedSeats])

  const handleSeatClick = (event, row, seatIndex) => {
    const newSelection = [row, seatIndex]

    const removeSelected = (event) => {
      event.target.classList.remove('selected')
      let filteredArray = selectedSeats.filter(item => !compareArrays(item, newSelection))
      removeSelectedSeats(filteredArray, newSelection, showtimeID)
    }

    const addSelected = (event) => {
      event.target.classList.add('selected')
      updateSelectedSeats(newSelection, showtimeID)
    }

    if (event.target.classList.contains('booked')) return null
    if (selectedSeats != null) {
      let existsAlready = false

      selectedSeats.map((seats) => {
        compareArrays(seats, newSelection) ? existsAlready = !existsAlready : false
      })

      existsAlready ? removeSelected(event) : addSelected(event)
    } else {
      setSelectedSeats([newSelection], showtimeID)
      event.target.classList.add('selected')
    }
  }

  return (
    <div className="booking-container page-section">
      <h2 className="movie-title">{movieTitle}</h2>
      <div className="showtime-info">
        <img className="movie-poster" src={moviePoster} />
        <p>{showtimeDate}</p>
        <p>{showtimeTime}:00</p>
        <p>Price: {showtimePrice} kr</p>
      </div>

      <section className="cinema-container">
        <h3>{cinemaHall}</h3>
        <div className="the-screen">Screen</div>
        <div className="seat-container">
          {seatInfo && seatInfo.map((row, index) => (
            <div className="the-rows" key={index}>
              <label>{index + 1}</label>
              {row.map(seat => (
                <div
                  className={`seat ${seat.booked ? "booked" : ""} ${seat.selected ? "selected" : ""}`}
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

      <section className="selected-ticket-container">
        {selectedSeats && (<SelectedTicket />)}
      </section>

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
    </div>
  )
}
