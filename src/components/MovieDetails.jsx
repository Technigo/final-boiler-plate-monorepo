import moment from 'moment'

import "./MovieDetails.css";

export const MovieDetails = ({ movie }) => {
  console.log(movie);
  const { title, posterUrl, description, IMDBRating, duration, genre } = movie;
  // const backgroundImage = `https://image.tmdb.org/t/p/w1280/${backdropUrl}`;
  const posterImage = `https://image.tmdb.org/t/p/w780${posterUrl}`;


  const formatReleaseDate = (fullDate) => {
    return moment(fullDate).format("MMM Do YY")
  }
  return (
    <div className="the-detail-page">
      {/* <div className="background-poster">
      <img src={backgroundImage} alt={title} />
    </div> */}

      <div className="detail-container">
        <img src={posterImage} alt={title} />
        <div className="details">
          <div className="movie-title-container">
            <h1 className='movie-title'>{title}</h1>
            <p className="rating">⭐️ {'\u00A0'} {IMDBRating.toFixed(1)} </p>
          </div>

          <div className="description-container">
            <div className="description">
              <p>{description}</p>
            </div>

            <div className="more-info">
              <p> RUNTIME: {duration} min </p>
              <p> GENRES: {genre.join(", ")}</p>
              <p> RELEASE DATE :{formatReleaseDate(movie.releaseDate)}</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}; 