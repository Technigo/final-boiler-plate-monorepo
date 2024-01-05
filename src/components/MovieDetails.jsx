import "./MovieDetails.css";

export const MovieDetails = ({ movie }) => {
  console.log(movie);
  const { title, posterUrl, backdropUrl, overview } = movie;
  const backgroundImage = `https://image.tmdb.org/t/p/w1280/${backdropUrl}`;
  const posterImage = `https://image.tmdb.org/t/p/w780${posterUrl}`;

  return (
    <div className="detail-page">
      <div className="background-poster">
        <img src={backgroundImage} alt={overview} />
      </div>
      <div className="summary">
        <img src={posterImage} alt={title} />
        <div className="details">
          <h1>
            <span className="movie-title">{title}</span>
            {/* <span className="rating">{vote_average.toFixed(1)}</span> */}
          </h1>
          <p>{overview}</p>
        </div>
      </div>
    </div>
  );
};