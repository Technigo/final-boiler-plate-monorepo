import { useEffect } from 'react'
import { bookingStore } from '../store/bookingStore'

import { Calendar } from '../components/Calendar'
import { MovieList } from '../components/MovieList'
import { Hero } from '../components/Hero'

import '../components/Hero.css'

export const Home = () => {

  const fetchShows = bookingStore((state) => (state.fetchAllShowTimes))
  
  useEffect(() => {
    fetchShows()    
  },[])

  return (
    <div className="the-home-page">
      <Hero />
      <Calendar />
      <MovieList />
    </div>
  )
}
