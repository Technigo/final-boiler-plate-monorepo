import { MyDatePicker } from '../Reusables/MyDatePicker';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
//import relevant components
import { FormField } from '../Reusables/FormField';
import { Checkbox } from '../Reusables/Checkbox';
import { RadioButton } from '../Reusables/RadioButton';
import { ParagraphComponent } from '../Reusables/ParagraphComponent';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useDateDisableStore from '../../stores/dateDisableStore';

export const FormComponent = ({ bookingId, form, index, setForms, errors, }) => {
    // Generate unique IDs for each form element
    const nameId = uuidv4();
    const ageId = uuidv4();
    const phoneNumberId = uuidv4();
    const emailId = uuidv4();
    const weightId = uuidv4();
    const heightId = uuidv4();
    const filmId = uuidv4();
    const droneVideosId = uuidv4();
    const photoId = uuidv4();
    const dateId = uuidv4();
    const beginnerId = uuidv4();
    const intermediateId = uuidv4();
    const advancedId = uuidv4();
    const textareaId = uuidv4();

    // Calculate the total character count for newPost field
    const newPostCharacterCount = form.newPost.length;

    const [minDate] = useState(new Date());
    minDate.setDate(minDate.getDate() + 2); // Adding 2 days to current date

    const handleDateChange = (date) => {
        setForms((prevForms) =>
            prevForms.map((f, i) => (i === index ? { ...f, date: date || null } : f))
        );
    };

    const handleDisableDateClick = () => {
        if (form.date) {
            // Access the store and call the handleDisableDate function
            useDateDisableStore.getState().handleDisableDate(bookingId, form.date);
        } else {
            console.error('Please select a date to disable.');
        }
    };

    return (
        <div key={index}>

            {/* Form Name */}
            <FormField
                label="Name"
                id={nameId}
                type="text"
                placeholder={`Name for Person ${index + 1}`}
                value={form.name}
                onChange={(e) =>
                    setForms((prevForms) =>
                        prevForms.map((f, i) => (i === index ? { ...f, name: e.target.value } : f))
                    )
                }
                min={1}
                onFocus={() => setNameError('')}
                error={errors.name}
            />

            {/* Form Age */}
            <FormField
                label="Age"
                id={ageId}
                type="number"
                placeholder={`Age for Person ${index + 1}`}
                value={form.age}
                onChange={(e) =>
                    setForms((prevForms) =>
                        prevForms.map((f, i) => (i === index ? { ...f, age: e.target.value } : f))
                    )
                }
                min={4}
                max={100}
                onFocus={() => setAgeError('')}
                error={errors.age}
            />

            {/* Input Phone number */}
            <FormField
                label="Phone number"
                id={phoneNumberId}
                type="number"
                placeholder={`Phone number for Person ${index + 1}`}
                value={form.phonenumber}
                onChange={(e) =>
                    setForms((prevForms) =>
                        prevForms.map((f, i) => (i === index ? { ...f, phonenumber: e.target.value } : f))
                    )
                }
                onFocus={() => setPhonenumberError('')}
                error={errors.phonenumber}
            />

            {/* Input email */}
            <FormField
                label="Email"
                id={emailId}
                type="email"
                placeholder={`Email for Person ${index + 1}`}
                value={form.email}
                onChange={(e) =>
                    setForms((prevForms) =>
                        prevForms.map((f, i) => (i === index ? { ...f, email: e.target.value } : f))
                    )
                }
                onFocus={() => setEmailError('')}
                error={errors.email}
            />

            {/* Form weight */}
            <FormField
                label="Weight (KG)"
                id={weightId}
                type="number"
                placeholder={`Weight for Person ${index + 1}`}
                min={1}
                value={form.weight}
                onChange={(e) =>
                    setForms((prevForms) =>
                        prevForms.map((f, i) => (i === index ? { ...f, weight: e.target.value } : f))
                    )
                }
                onFocus={() => setWeightError('')}
                error={errors.weight}
            />

            {/* Form height */}
            <FormField
                label="Height (CM)"
                id={heightId}
                type="number"
                placeholder={`Height for Person ${index + 1}`}
                min={1}
                value={form.height}
                onChange={(e) =>
                    setForms((prevForms) =>
                        prevForms.map((f, i) => (i === index ? { ...f, height: e.target.value } : f))
                    )
                }
                onFocus={() => setHeightError('')}
                error={errors.height}
            />

            {/* Documentation checkboxes */}
            <div className="mb-2">
                <label className="mr-2">
                    Would you like any documentation?
                </label>

                {/* Checkbox Film */}
                <Checkbox
                    label="Film"
                    id={filmId}
                    checked={form.film}
                    onChange={() =>
                        setForms((prevForms) =>
                            prevForms.map((f, i) => (i === index ? { ...f, film: !f.film } : f))
                        )
                    }
                />
            </div>

            <div className="mb-2">
                {/* Checkbox Drone Videos */}
                <Checkbox
                    label="Drone Videos"
                    id={droneVideosId}
                    checked={form.droneVideos}
                    onChange={() =>
                        setForms((prevForms) =>
                            prevForms.map((f, i) => (i === index ? { ...f, droneVideos: !f.droneVideos } : f))
                        )
                    }
                />
            </div>

            <div className="mb-2">
                {/* Checkbox Photo */}
                <Checkbox
                    label="Photo"
                    id={photoId}
                    checked={form.photo}
                    onChange={() =>
                        setForms((prevForms) =>
                            prevForms.map((f, i) => (i === index ? { ...f, photo: !f.photo } : f))
                        )
                    }
                />
            </div>

            {/* Form Date */}
            <label htmlFor="current-date"> Current Date</label>
            <DatePicker
                id={dateId}
                selected={form.date}
                onChange={(date) =>
                    setForms((prevForms) =>
                        prevForms.map((f, i) => (i === index ? { ...f, date: date || null } : f))
                    )
                }

                minDate={minDate}
            />
            <button onClick={handleDisableDateClick}>Disable Date</button>
            {/*
            <MyDatePicker
                label="Requested date?*"
                id={dateId}
                selected={form.date}
                onChange={(date) =>
                    setForms((prevForms) =>
                        prevForms.map((f, i) => (i === index ? { ...f, date: date || null } : f))
                    )
                }

                error={errors.date}

            />*/}

            {/* Checkbox Surf Level beginner */}
            <div className="mb-2">
                <label >
                    <h2 className="mb-2 pl-0" text={`Have you surfed before? `} />
                </label>
                <RadioButton
                    id={beginnerId}
                    label="I'm a beginner"
                    checked={form.beginner}
                    onChange={() =>
                        setForms((prevForms) =>
                            prevForms.map((f, i) => (i === index ? { ...f, beginner: !f.beginner } : f))
                        )
                    }
                    disabled={form.intermediate || form.advanced}
                />
            </div>

            {/* Checkbox Surf Level intermediate */}
            <div className="mb-2">
                <RadioButton
                    id={intermediateId}
                    label="I'm intermediate"
                    checked={form.intermediate}
                    onChange={() =>
                        setForms((prevForms) =>
                            prevForms.map((f, i) => (i === index ? { ...f, intermediate: !f.intermediate } : f))
                        )
                    }
                    disabled={form.beginner || form.advanced}
                />
            </div>

            {/* Checkbox Surf Level advanced */}
            <div className="mb-2">
                <RadioButton
                    id={advancedId}
                    label="I'm advanced"
                    checked={form.advanced}
                    onChange={() =>
                        setForms((prevForms) =>
                            prevForms.map((f, i) => (i === index ? { ...f, advanced: !f.advanced } : f))
                        )
                    }
                    disabled={form.beginner || form.intermediate}

                />
                <p className="text-red-500 ml-2">{errors.surfLevel}</p>
            </div>

            {/* Display the error message for Surf Levels */}
            <ParagraphComponent className="text-red-500">{errors.surfLevel}</ParagraphComponent>

            {/* Input textarea */}
            <h2 className="mb-2 pl-0" text={`Anything else for Person ${index + 1}?`} />

            <textarea
                id={textareaId}
                className="mb-0 p-2 w-full border rounded"
                rows="3"
                cols="50"
                placeholder={`Person ${index + 1} is really allergic to tomatoes!`}
                value={form.newPost}
                onChange={(e) => {
                    const newValue = e.target.value;
                    setForms((prevForms) =>
                        prevForms.map((f, i) => (i === index ? { ...f, newPost: newValue } : f))
                    );
                }}
            />

            {/* Display the error message for newPost */}
            <p className="mb-2 text-red-500">{errors.newPost}</p>

            {/* Display the combined character count */}
            <p className={`mb-2 text-sm ${newPostCharacterCount > 140 ? 'text-red-500' : 'text-black'}`}>
                {newPostCharacterCount}/140
            </p>
        </div>

    );
};