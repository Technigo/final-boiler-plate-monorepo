import { showTimesStore } from '../store/showTimeStore'
import { Link } from 'react-router-dom'
import moment from 'moment'

import "./MovieDetails.css";
import { useEffect, useState } from 'react';

export const MovieDetails = ({ movie }) => {

  const fetchShowtimeByMovie = showTimesStore((state) => state.fetchShowtimeByMovie)

  const [showtimes, setShowtimes] = useState([]);
  const { title, posterUrl, description, IMDBRating, duration, genre } = movie;
  // const backgroundImage = `https://image.tmdb.org/t/p/w1280/${backdropUrl}`;
  const posterImage = `https://image.tmdb.org/t/p/w780${posterUrl}`;

  useEffect(() => {
    const fetchShowtime = async () => {
      try {
        if (movie && movie._id) {
          console.log('Fetching showtimes for movie:', movie.title);
          // Fetch showtimes for the movie
          await fetchShowtimeByMovie(movie._id);
          // Access the updated showtimes from the store
          const updatedShowtimes = showTimesStore.getState().showTimes;
          console.log('Fetched showtimes:', updatedShowtimes);
          setShowtimes(updatedShowtimes);
        }
      } catch (error) {
        console.error('Error fetching showtimes:', error);
      }
    };

    console.log('Component rendered with movie:', movie);
    fetchShowtime();

    // Include movie in the dependency array
  }, [fetchShowtimeByMovie, movie]);
  const formatReleaseDate = (fullDate) => {
    return moment(fullDate).format("MMM Do YY")
  }

  return (
    <div className="page-section the-detail-page">
      <div className="detail-container">
        <img className='movie-poster' src={posterImage} alt={title} />

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
          <div className="the-showtimes">
            <h2>Showtimes:</h2>
            {showtimes && showtimes.map((showTime) => (
              <div className='showtime-container' key={showTime._id}>
                <p><Link to={`/booking`}>{showTime.startingTime}:00</Link></p>

              </div>
            ))}

          </div>


        </div>
      </div>
    </div>
  )
}