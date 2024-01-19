import { useEffect } from 'react'
import { Link } from 'react-router-dom'
// import { movieStore } from '../store/movieStore'
import { showTimesStore } from '../store/showTimeStore'
import moment from 'moment'
import './Repertoire.css'

export const Repertoire = ({ date }) => {
  const {
    fetchShowTimes,
    showTimes
  } = showTimesStore()

  const compareDate = (date1, date2) => {
    let updatedDate1 = moment(date1).format('MMM DD')
    if (updatedDate1 === date2) return true
    else return false
  }

  useEffect(() => {
    console.log('Fetching show time.')
    fetchShowTimes()
  }, [])

  return (
    <div className='the-repertoire'>
      <h4>Repertoire</h4>
      <div className='the-list'>
        <ul>
          <div className='the-title'>
          {showTimes && showTimes.map((showtime) => (
            compareDate(showtime.date, date.month) && (
              <div key={showtime._id}>
                <li>
                  {showtime.movieTitle}: 
                  <span>
                    <Link to={`/booking/${showtime._id}`}>
                      {showtime.startingTime}:00
                    </Link>
                  </span>
                </li>
              </div>)
          ))}
          </div>
        </ul>
      </div>
    </div>
  )
}

