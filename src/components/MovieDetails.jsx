import "./MovieDetails.css";

export const MovieDetails = ({ movie }) => {
  console.log(movie);
  const { title, posterUrl, description, IMDBRating, duration, genre, releaseDate } = movie;
  // const backgroundImage = `https://image.tmdb.org/t/p/w1280/${backdropUrl}`;
  const posterImage = `https://image.tmdb.org/t/p/w780${posterUrl}`;

  return (
    <div className="the-detail-page">
      {/* <div className="background-poster">
        <img src={backgroundImage} alt={title} />
      </div> */}
      <div className="summary">
        <img src={posterImage} alt={title} />
        <div className="details">
          <h1>
            <span className="movie-title">{title}</span>
            <span className="rating">⭐️ {'\u00A0'} {IMDBRating.toFixed(1)} </span>
          </h1>
          <div className="description">

            <p>{description}</p>
            <p> Runtime: {duration}</p>
            <p>{genre}</p>
            <p>{releaseDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}; 