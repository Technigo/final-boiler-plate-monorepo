import { useEffect } from 'react'
import { bookingStore } from '../store/bookingStore'

import { Calendar } from '../components/Calendar'
import { MovieList } from '../components/MovieList'
import { Hero } from '../components/Hero'

import '../components/Hero.css'

export const Home = () => {

  const fetchShows = bookingStore((state) => (state.fetchAllShowTimes))
  const allShowTimes = bookingStore((state) => (state.allShowTimes))
  const setSelectedSeats = bookingStore((state) => (state.setSelectedSeats))
  const selectedSeats = bookingStore((state) => state.selectedSeats)

  useEffect(() => {
    if (allShowTimes.length > 0) fetchShows()
    if (selectedSeats.length > 0) setSelectedSeats()
  }, [])

  return (
    <div className="the-home-page">
      <Hero />
      <Calendar />
      <MovieList />
    </div>
  )
}
