import { useState } from 'react'
import { Repertoire } from '../components/Repertoire'

import moment from 'moment';

import './Calendar.css'

export const Calendar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleDayClick = () => {
    setIsOpen((isOpen) => !isOpen) // Toggle isOpen between true and false
  };

  const generateCalendarDays = () => {
    const currentDate = moment()
    const currentDay = currentDate.day()
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const days = []

    for (let i = 0; i < 7; i++) {
      const dayDate = moment().add(i - currentDay, 'days')

      const dayString = dayDate.format('MMM DD')
      const dayOfWeekString = daysOfWeek[dayDate.day()]

      days.push(
        <div className='the-day' key={i} onClick={handleDayClick}>
          <p>{dayString}</p>
          <h2>{dayOfWeekString}</h2>
        </div>
      )
    }

    return days
  }


  return (
    <>
      <div className="the-row-calendar">{generateCalendarDays()}</div>
      {isOpen ? <Repertoire /> : null} {/* Render Repertoire component when isOpen is true */}
    </>
  )
}
