import { useEffect, useCallback } from 'react'
import { movieStore } from '../store/movieStore'
import { showTimeStore } from '../store/showTimeStore'
import './Repertoire.css'

export const Repertoire = () => {
  const fetchMovies = movieStore((state) => state.fetchMovies)
  const movies = movieStore((state) => state.movies)

  const fetchShowTimes = showTimeStore((state) => state.fetchShowTimes)
  const showTimes = showTimeStore((state) => state.showTimes)

  const fetchData = useCallback(async () => {
    console.log('Fetching movies and showtimes...')
    await fetchMovies()
    await fetchShowTimes()
  }, [fetchMovies, fetchShowTimes])

  useEffect(() => {
    fetchData()
  }, [fetchData])


  console.log('Showtimes:', showTimes[0].startingTime)


  return (
    <div className='the-repertoire'>
      <h4>Repertoire</h4>
      <div className='the-list'>
        <div className='the-title'>
          {movies && movies.map((movie) => (
            <div key={movie._id.$oid}>
              {/* Movie Title */}
              <ul>
                <li >{movie.title} :</li>
              </ul>
            </div>
          ))}</div>
        {/* Showtimes */}
        <div className='the-showtime'>
          {showTimes && showTimes.map((showTime) => (
            <div key={showTime._id.$oid}>
              <ul>
                <li>
                  {showTime.startingTime.map((time, index) => (
                    <span key={time}>
                      {index > 0 && '\u00A0\u00A0\u00A0\u00A0'} {/*Add 4 spaces before the hour if it is not the first hour */}
                      {time}:00
                    </span>
                  ))}
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

};


// const getRandomInt = (max) => {
//   return Math.floor(Math.random() * max);
// };

// const handleDayClick = (selectedDate) => {
//   setSelectedDay(selectedDate);
// };

// // Zakładamy, że movies to obiekt, w którym kluczami są daty, a wartościami są tablice filmów dla danej daty.
// const moviesByDay = {
//   '2022-01-06': [
//     { title: 'Film A', hours: [10, 14, 18] },
//     { title: 'Film B', hours: [12, 16, 20] },
//   ],
//   '2022-01-07': [
//     { title: 'Film C', hours: [11, 15, 19] },
//     { title: 'Film D', hours: [13, 17, 21] },
//   ],
//   // Dodaj więcej dni według potrzeb
// };

// const renderMoviesForDay = () => {
//   if (!selectedDay || !moviesByDay[selectedDay]) {
//     return null;
//   }

//   return moviesByDay[selectedDay].map((movie, index) => (
//     <ul key={index}>
//       <li className="title">{movie.title} :</li>
//       <div className="time">
//         {movie.hours.map((hour, hourIndex) => (
//           <li key={hourIndex}>{hour}:00</li>
//         ))}
//       </div>
//     </ul>
//   ));
// };

// return (
//   <div className="the-repertoire">
//     <h4>Repertoire</h4>
//     <div className="list">
//       {movies.map((movie) => (
//         <ul key={movie._id.$oid} onClick={() => handleDayClick(movie.date)}>
//           <li className="title"> {movie.title} : </li>
//           <div className="time">
//             <li> {getRandomInt(24)}:00</li>
//             <li> {getRandomInt(24)}:00</li>
//             <li> {getRandomInt(24)}:00</li>
//             {/* Dodaj więcej godzin według potrzeb */}
//           </div>
//         </ul>
//       ))}
//     </div>
//     {renderMoviesForDay()}
//   </div>
// );