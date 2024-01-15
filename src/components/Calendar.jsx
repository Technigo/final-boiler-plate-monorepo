import { useState, useEffect } from 'react'
import { Repertoire } from '../components/Repertoire'

import moment from 'moment'
import Slider from "react-slick"


import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import './Calendar.css'

export const Calendar = () => {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    // Function to generate dates 
    const generateDates = () => {
      const currentDate = moment()
      const generatedDates = []

      for (let i = 0; i < 30; i++) {
        const date = currentDate.clone().add(i, 'days')
        generatedDates.push({
          month: date.format('MMM DD'),
          dayOfWeek: date.format('ddd'),
        });
      }

      return generatedDates
    };

    // Set the generated dates in the component state
    setDates(generateDates())
  }, []);

  const handleDateClick = (date) => {
    if (selectedDate && selectedDate === date) {
      setSelectedDate(null)
    } else {
      setSelectedDate(date)
    }

  };

  // setting for slider slick-carousel

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  return (
    <div className="page-section the-calendar">
      <div className='the-row-calendar'>
        <Slider {...settings}>
          {dates.map((date, index) => (
            <div
              className={`the-day ${selectedDate === date ? 'selected' : ''}`}
              key={index}
              onClick={() => handleDateClick(date)}
            >
              <p>{date.month}</p>
              <p>{date.dayOfWeek}</p>
            </div>
          ))}
        </Slider>
      </div>

      {selectedDate && <Repertoire />}
    </div>
  )
}
