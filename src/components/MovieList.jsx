import { useEffect } from "react"
import { movieStore } from '../store/movieStore'
import { MovieItem } from "./MovieItem"
import { Link } from "react-router-dom"

import moment from 'moment'

import './MovieList.css'

export const MovieList = () => {
  const fetchMovies = movieStore((state) => state.fetchMovies)
  const movies = movieStore((state) => state.movies)

  useEffect(() => {
    console.log('Fetching movies...')
    fetchMovies()
  }, [fetchMovies])

  return (
    <div className="the-movie-list">
      {movies && movies.slice(0, 20).map((movie) => (
        <Link
          to={`/movie/${movie._id}`}
          key={movie._id}>
          <MovieItem
            name={movie.title}
            photo={`https://image.tmdb.org/t/p/w500${movie.posterUrl}`}
            releaseDate={formatReleaseDate(movie.releaseDate)}
          />
        </Link>
      ))}
    </div>
  )
}

const formatReleaseDate = (fullDate) => {
  return moment(fullDate).format("MMM Do YY")
}
