import { bookingStore } from '../store/bookingStore'

import { Calendar } from '../components/Calendar'
import { MovieList } from '../components/MovieList'
import { Hero } from '../components/Hero'

export const Home = () => {

  const fetchShows = bookingStore((state) => (state.fetchAllShowTimes))
  fetchShows()

  return (
    <>
      <Hero />
      <Calendar />
      <MovieList />
    </>
  )
}
