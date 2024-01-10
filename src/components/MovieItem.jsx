import { movieStore } from '../store/movieStore'

export const MovieItem = ({ name, photo, releaseDate }) => {
  const setMovies = movieStore((state) => state.setMovies)

  const handleAddToFavorite = () => {
    setMovies((prevMovies) => [...prevMovies, { name, photo, releaseDate }])
  };
  console.log(releaseDate)

  const imageBaseUrl = "https://image.tmdb.org/t/p/"
  const imageSize = "w780"
  const imageUrl = `${imageBaseUrl}${imageSize}${photo}`

  return (
    <div className="the-movie-item">
      <div className="movie-image">
        <img src={imageUrl} alt={name} />
        <div className="image-overlay">
          <h2>{name}</h2>
          <p>Release Date: {releaseDate}</p>
          <button onClick={handleAddToFavorite}>Read more</button>
        </div>
      </div>
    </div>
  )
}
