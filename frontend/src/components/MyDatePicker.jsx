import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Fade } from "react-awesome-reveal";

/**
 * Custom DatePicker component with added props for customization.
 * @param {object} props - Component props.
 * @param {Date} props.selected - Selected date value.
 * @param {function} props.onChange - Callback function for date change.
 * @param {Date} props.minDate - Minimum allowed date.
 * @param {string} props.error - Error message to display.
 * @param {string} [props.label] - Optional label for the DatePicker.
 * @param {string} [props.dateFormat='yyyy-MM-dd'] - Date format for the DatePicker.
 * @param {function} [props.onFocus] - Callback function for onFocus event.
 * @returns {JSX.Element} - Rendered component.
 */
export const MyDatePicker = ({ selected, onChange, minDate, error, label, dateFormat = 'yyyy-MM-dd', onFocus }) => {
    // Calculate the minimum allowed date (2 days from today)
    const today = new Date();
    const minAllowedDate = new Date();
    minAllowedDate.setDate(today.getDate() + 2);

    return (
        <Fade>
            <div className="mb-2">
                {label && <label className="mr-2">{label}</label>}
                <DatePicker
                    selected={selected}
                    onChange={onChange}
                    dateFormat={dateFormat}
                    onFocus={onFocus}
                    minDate={minAllowedDate}  // Set the minimum allowed date
                    className="border rounded p-2"
                />
                {error && <p className="text-red-600">{error}</p>}
            </div>
        </Fade>
    );
};
