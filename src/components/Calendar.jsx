import { useState } from 'react'
import { Repertoire } from '../components/Repertoire'

import './Calendar.css'



export const Calendar = () => {

  const [isOpen, setIsOpen] = useState(false)

  const handleDayClick = () => {
    setIsOpen((isOpen) => !isOpen) // Toggle isOpen between true and false
  }


  return (
    <>
      <div className=" the-row-calendar">
        <div
          className='the-day'
          onClick={handleDayClick}>
          <p>Jan 05</p>
          <h2>Fri</h2>
        </div>

        <div
          className='the-day'
          onClick={handleDayClick}>
          <p>Jan 06</p>
          <h2>Sat</h2>
        </div>

        <div
          className='the-day'
          onClick={handleDayClick}>
          <p>Jan 07</p>
          <h2>Sun</h2>
        </div>

        <div
          className='the-day'
          onClick={handleDayClick}>
          <p>Jan 08</p>
          <h2>Mon</h2>
        </div>

        <div
          className='the-day'
          onClick={handleDayClick}>
          <p>Jan 09</p>
          <h2>Tus</h2>
        </div>

        <div
          className='the-day'
          onClick={handleDayClick}>
          <p>Jan 10</p>
          <h2>Wen</h2>
        </div>

        <div
          className='the-day'
          onClick={handleDayClick}>
          <p>Jan 11</p>
          <h2>Thu</h2>
        </div>
      </div>

      {isOpen ? <Repertoire /> : null} {/* Render Repertoire component when isOpen is true */}
    </>
  )
}
