// MyDatePicker.jsx

import { useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Fade } from 'react-awesome-reveal';
import useMyDatePickerStore from '../../stores/MyDatePickerStore';

export const MyDatePicker = ({ selected, onChange, minDate, error, label, dateFormat = 'yyyy-MM-dd', onFocus, id }) => {
    const { disabledDates, fetchHandledBookings } = useMyDatePickerStore();

    useEffect(() => {
        fetchHandledBookings();
    }, []);

    return (
        <Fade>
            <div className="mb-2">
                {label && (
                    <label htmlFor={id} className="mr-2">
                        {label}
                    </label>
                )}

                <DatePicker
                    selected={selected}
                    onChange={onChange}
                    id={id}
                    dateFormat={dateFormat}
                    onFocus={onFocus}
                    minDate={minDate}
                    filterDate={(date) => {
                        const formattedSelectedDate = selected ? new Date(selected).toISOString().split('T')[0] : null;
                        const formattedDate = new Date(date).toISOString().split('T')[0];
                        const formattedDisabledDates = disabledDates.map((disabledDate) =>
                            new Date(disabledDate).toISOString().split('T')[0]
                        );

                        return (
                            date >= new Date().setHours(0, 0, 0, 0) &&
                            (!formattedSelectedDate || formattedDate >= formattedSelectedDate) &&
                            !formattedDisabledDates.includes(formattedDate)
                        );
                    }}
                    className="border rounded p-2"
                />
                {error && <p className="text-red-600">{error}</p>}
            </div>
        </Fade>
    );
};
