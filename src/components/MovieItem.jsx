import { movieStore } from '../store/movieStore'

import './MovieList.css'

export const MovieItem = ({ name, photo, releaseDate }) => {
  const setMovies = movieStore((state) => state.setMovies)

  const handleReadMore = () => {
    setMovies((prevMovies) => [...prevMovies, { name, photo, releaseDate }])
  };


  const imageBaseUrl = "https://image.tmdb.org/t/p/"
  const imageSize = "w780"
  const imageUrl = `${imageBaseUrl}${imageSize}${photo}`

  return (
    <div className="the-movie-item">
      <div className="movie-image">
        <img src={imageUrl} alt={name} />
        <div className="image-overlay">
          <h2>{name}</h2>
          <button onClick={handleReadMore}>Read more</button>
        </div>
      </div>
    </div>
  )
}
