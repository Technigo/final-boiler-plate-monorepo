import { useEffect } from 'react'
import { movieStore } from '../store/movieStore'
import './Repertoire.css'

export const Repertoire = () => {

  const fetchMovies = movieStore((state) => state.fetchMovies)
  const movies = movieStore((state) => state.movies)

  useEffect(() => {
    console.log('Fetching movies...')
    fetchMovies();
  }, [fetchMovies]);

  return (
    <div className="the-repertoire">
      <h4>Repertoire</h4>

      <div className="list">
        {movies.map((movie) => (
          <ul key={movie._id.$oid}>
            <li> {movie.title} </li>
          </ul>
        ))}
      </div>

    </div>
  )
}
