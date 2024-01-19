/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from 'react'
import { showTimesStore } from '../store/showTimeStore'
import { Link } from 'react-router-dom'
import moment from 'moment'

import "./MovieDetails.css";

export const MovieDetails = ({ movie }) => {
  const { 
    showTimesByMovie,
    fetchShowtimesByMovie
   } = showTimesStore()

  const { title, posterUrl, description, IMDBRating, duration, genre } = movie;
  // const backgroundImage = `https://image.tmdb.org/t/p/w1280/${backdropUrl}`;
  const posterImage = `https://image.tmdb.org/t/p/w780${posterUrl}`;

  const fetchShowtime = async () => {
    try {
      if (movie && movie._id) {
        console.log('Fetching showtimes for movie:', movie.title);

        // Fetch showtimes for the movie
        await fetchShowtimesByMovie(movie._id);
      }
    } catch (error) {
      console.error('Error fetching showtimes:', error);
    }
  };

  useEffect(() => {
    fetchShowtime();
    console.log('Component rendered with movie:', movie);
  }, [])

  const formatDate = (fullDate) => {
    return moment(fullDate).format("MMM Do YY")
  }

  return (
    <div className="page-section the-detail-page">
      <div className="the-movie-poster">
        <img className='poster-details' src={posterImage} alt={title} />
      </div>
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
          <p> RELEASE DATE :{formatDate(movie.releaseDate)}</p>
        </div>
      </div>
      <div className="the-showtimes">
        <h2>Showtimes:</h2>
        <div className='showtime-container'>
          {showTimesByMovie && showTimesByMovie.map((showTime) => (
            <div key={showTime._id}>
              <Link to={`/booking/${showTime._id}`}><p>{showTime.startingTime}:00</p></Link>
            </div>
          ))}</div>
      </div>
    </div>
  )
}