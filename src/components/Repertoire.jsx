import { useEffect } from 'react'
import { Link } from 'react-router-dom'
// import { movieStore } from '../store/movieStore'
import { showTimesStore } from '../store/showTimeStore'

import './Repertoire.css'

export const Repertoire = () => {
  // const fetchMovies = movieStore((state) => state.fetchMovies)
  // const movies = movieStore((state) => state.movies)

  const fetchShowTimes = showTimesStore((state) => state.fetchShowTimes)
  const showTimes = showTimesStore((state) => state.showTimes)



  useEffect(() => {
    console.log('Fetching show time.')
    fetchShowTimes()
  }, [fetchShowTimes])


  console.log('Showtimes:', showTimes)


  return (
    <div className='the-repertoire'>
      <h4>Repertoire</h4>
      <div className='the-list'>
        <div className='the-title'>
          {showTimes && showTimes.map((title) => (
            <div key={title._id}>
              {/* title Title */}
              <ul>
                <li >{title.movieTitle} :</li>
              </ul>
            </div>
          ))}</div>
        {/* Showtimes */}
        <div className='the-showtime'>
          {showTimes && showTimes.map((showTime) => (
            <div key={showTime._id}>
              <ul>
                <li>
                  <Link to={`/booking`}>{showTime.startingTime} : 00</Link>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

