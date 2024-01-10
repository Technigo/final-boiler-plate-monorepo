import "./MovieDetails.css";

export const MovieDetails = ({ movie }) => {
  console.log(movie);
  const { title, posterUrl, description, IMDBRating } = movie;
  // const backgroundImage = `https://image.tmdb.org/t/p/w1280/${backdropUrl}`;
  const posterImage = `https://image.tmdb.org/t/p/w780${posterUrl}`;

  return (
    <div className="detail-page">
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
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}; 