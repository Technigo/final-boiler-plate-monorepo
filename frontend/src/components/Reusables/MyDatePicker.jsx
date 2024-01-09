// MyDatePicker.jsx

import { useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Fade } from 'react-awesome-reveal';
import useMyDatePickerStore from '../../stores/MyDatePickerStore';

// MyDatePicker component
export const MyDatePicker = ({ selected, onChange, minDate, error, label, dateFormat = 'yyyy-MM-dd', onFocus }) => {
    // Get state and function from the store
    const { disabledDates, fetchHandledBookings } = useMyDatePickerStore();

    // useEffect to fetch handled bookings when the component mounts
    useEffect(() => {
        fetchHandledBookings();
    }, []);

    // Logging for debugging
    console.log('Selected Date:', selected);
    console.log('Min Date:', minDate);
    console.log('Dates to Disable:', disabledDates);

    return (
        <Fade>
            <div className="mb-2">
                {/* Display label if provided */}
                {label && <label className="mr-2">{label}</label>}

                {/* Date picker component */}
                <DatePicker
                    selected={selected}
                    onChange={onChange}
                    dateFormat={dateFormat}
                    onFocus={onFocus}
                    minDate={minDate}
                    // Custom filter function to disable specific dates
                    filterDate={(date) => {
                        const formattedSelectedDate = selected ? new Date(selected).toISOString().split('T')[0] : null;
                        const formattedDate = new Date(date).toISOString().split('T')[0];
                        const formattedDisabledDates = disabledDates.map((disabledDate) => new Date(disabledDate).toISOString().split('T')[0]);

                        return (
                            // Date should be greater than or equal to today
                            date >= new Date().setHours(0, 0, 0, 0) &&
                            // If a selected date exists, date should be greater than or equal to the selected date
                            (!formattedSelectedDate || formattedDate >= formattedSelectedDate) &&
                            // Date should not be in the disabled dates array
                            !formattedDisabledDates.includes(formattedDate)
                        );
                    }}
                    className="border rounded p-2"
                />
                {/* Display error message if provided */}
                {error && <p className="text-red-600">{error}</p>}
            </div>
        </Fade>
    );
};
