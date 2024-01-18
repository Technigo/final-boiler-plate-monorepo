import { useEffect, useState } from 'react'
import { movieStore } from '../store/movieStore'
import { MovieDetails } from '../components/MovieDetails'
import { useParams } from 'react-router-dom'
import bookingStore from '../store/bookingStore'

export const Movie = () => {
  const [movieData, setMovieData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams()
  const fetchMovies = movieStore((state) => state.fetchMovies)
  const movies = movieStore((state) => state.movies)

  const selectedSeats = bookingStore(state => state.selectedSeats)
  const setSelectedSeats = bookingStore(state => state.setSelectedSeats)

  useEffect(() => {
    if (selectedSeats.length > 0) setSelectedSeats()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchMovies()
        const movie = movies.find((movie) => movie._id === id)

        if (movie) {
          setMovieData(movie)
          setIsLoading(false)
          window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
          setMovieData(null)
          setIsLoading(false)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    };

    fetchData();
  }, [id, fetchMovies, movies])

  return (
    <>
      {isLoading && !movieData && <p>Loading...</p>}
      {!isLoading && movieData && <MovieDetails movie={movieData} />}

    </>
  )
}
