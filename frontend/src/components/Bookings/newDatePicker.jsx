import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const NewDatePicker = () => {
    const [startDate, setStartDate] = useState(new Date());

    const handleChange = date => {
        setStartDate(date);
    };

    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 2); // Adding 2 days to current date

    return (
        <div className="App">

        </div>
    );
};

