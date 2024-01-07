import { useState } from 'react'
import { Repertoire } from '../components/Repertoire'
import moment from 'moment';

import './Calendar.css'



export const Calendar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDay, setSelectedDay] = useState(null)


  const currentDate = moment() // The current date as a reference

  const handleDayClick = (dayDate) => {
    setIsOpen(true) // Toggle isOpen between true and false
    setSelectedDay(dayDate) // Set the currently selected day when clicked
  }

  const generateCalendarDays = () => {
    const currentDay = currentDate.day()
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const days = []

    for (let i = 0; i < 7; i++) {
      const dayDate = currentDate.clone().add(i - currentDay, 'days')
      const dayString = dayDate.format('MMM DD')
      const dayOfWeekString = daysOfWeek[dayDate.day()]

      const isSelected = selectedDay && dayDate.isSame(selectedDay, 'day')

      days.push(
        <div
          className={`the-day ${isSelected ? 'selected' : ''}`}
          key={i}
          onClick={() => handleDayClick(dayDate)}>
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
