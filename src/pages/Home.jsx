import { useEffect } from 'react'
import { bookingStore } from '../store/bookingStore'

import { Calendar } from '../components/Calendar'
import { MovieList } from '../components/MovieList'
import { Hero } from '../components/Hero'

import '../components/Hero.css'

export const Home = () => {

  const {
    fetchAllShowTimes,
    allShowTimes,
    setSelectedSeats,
    selectedSeats
  } = bookingStore()

  useEffect(() => {
    if (allShowTimes) {
      fetchAllShowTimes()
    }
    if (selectedSeats.length > 0) setSelectedSeats()
  }, [])

  // console.log(allShowTimes)
  // const showTimes = allShowTimes
  // const showDate = new Date('17 january 2024')
  // console.log(showDate)

  return (
    <div className="the-home-page">
      <Hero />
      <Calendar />
      <MovieList />
    </div>
  )
}
