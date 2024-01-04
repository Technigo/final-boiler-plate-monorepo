import React from 'react';
import { FormField } from './FormField';
import { Checkbox } from './Checkbox';
import { MyDatePicker } from './MyDatePicker';
import { ParagraphComponent } from './ParagraphComponent';

export const FormComponent = ({ form, index, setForms, minDate, errors }) => {
    return (
        <div key={index}>
            {/* Form Name */}
            <FormField
                label="Name"
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
                error={errors.name} />

            {/* Form Age */}
            <FormField
                label="Age"
                type="number"
                placeholder={`Age for Person ${index + 1}`}
                value={form.age}
                onChange={(e) =>
                    setForms((prevForms) =>
                        prevForms.map((f, i) => (i === index ? { ...f, age: e.target.value } : f))
                    )
                }
                min={4} // Set the minimum age
                max={100} // Set the maximum age
                onFocus={() => setAgeError('')}
                error={errors.age} />

            {/* Input Phone number */}
            <FormField
                label="Phone number"
                type="number"
                placeholder={`Phone number for Person ${index + 1}`}
                value={form.phonenumber}
                onChange={(e) =>
                    setForms((prevForms) =>
                        prevForms.map((f, i) => (i === index ? { ...f, phonenumber: e.target.value } : f))
                    )
                }
                onFocus={() => setPhonenumberError('')}
                error={errors.phonenumber} />

            {/* Input email */}
            <FormField
                label="Email"
                type="text"
                placeholder={`Email for Person ${index + 1}`}
                value={form.email}
                onChange={(e) =>
                    setForms((prevForms) =>
                        prevForms.map((f, i) => (i === index ? { ...f, email: e.target.value } : f))
                    )
                }
                onFocus={() => setEmailError('')}
                error={errors.email} />

            {/* Form weight */}
            <FormField
                label="Weight"
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
                error={errors.weight} />

            {/* Form height */}
            <FormField
                label="Height"
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

            {/* Checkbox Film */}
            <label className="mr-2">Would you like any documentation?</label>
            <div className="mb-2">
                <Checkbox
                    label="Film"
                    checked={form.film}
                    onChange={() =>
                        setForms((prevForms) =>
                            prevForms.map((f, i) => (i === index ? { ...f, film: !f.film } : f))
                        )} />
            </div>

            {/* Checkbox Dronevideos */}
            <div className="mb-2">
                <Checkbox
                    label="Drone Videos"
                    checked={form.droneVideos}
                    onChange={() =>
                        setForms((prevForms) =>
                            prevForms.map((f, i) => (i === index ? { ...f, droneVideos: !f.droneVideos } : f))
                        )} />
            </div>

            {/* Checkbox Photos */}
            <div className="mb-2">
                <Checkbox
                    label="Photo"
                    checked={form.photo}
                    onChange={() =>
                        setForms((prevForms) =>
                            prevForms.map((f, i) => (i === index ? { ...f, photo: !f.photo } : f))
                        )} />
            </div>

            {/* Form Date */}
            <MyDatePicker
                label="Requested date?"
                selected={form.date}
                onChange={(date) =>
                    setForms((prevForms) =>
                        prevForms.map((f, i) => (i === index ? { ...f, date: date || null } : f))
                    )}
                minDate={minDate}
                error={errors.date}
            />

            {/* Checkbox Surf Level 1 */}
            <ParagraphComponent className="mb-2 pl-0 text-s bg-gray-200" text={`Have you surfed before? `} />
            <Checkbox
                label="I'm a beginner"
                checked={form.beginner}
                onChange={() =>
                    setForms((prevForms) =>
                        prevForms.map((f, i) => (i === index ? { ...f, beginner: !f.beginner } : f))
                    )}
                disabled={form.intermediate || form.advanced}
                error={errors.surfLevel}
            />

            {/* Checkbox Surf Level 2 */}
            <Checkbox
                label="I'm intermediate"
                checked={form.intermediate}
                onChange={() =>
                    setForms((prevForms) =>
                        prevForms.map((f, i) => (i === index ? { ...f, intermediate: !f.intermediate } : f))
                    )}
                disabled={form.beginner || form.advanced}
                error={errors.surfLevel}
            />

            {/* Checkbox Surf Level 3 */}
            <Checkbox
                label="I'm advanced"
                checked={form.advanced}
                onChange={() =>
                    setForms((prevForms) =>
                        prevForms.map((f, i) => (i === index ? { ...f, advanced: !f.advanced } : f))
                    )}
                disabled={form.beginner || form.intermediate}
                error={errors.surfLevel}
            />

            {/* Display the error message for Surf Levels */}
            <ParagraphComponent className="text-red-500">{errors.surfLevel}</ParagraphComponent>

            {/* Input textare */}
            <ParagraphComponent className="mb-2 text-s pl-0 bg-gray-200" text={`Anything else for Person ${index + 1}?`} />

            <textarea
                className="mb-2 p-2 w-full border rounded"
                rows="3"
                cols="50"
                placeholder={`Person ${index + 1} is really allergic to tomatoes!`}
                value={form.newPost}
                onChange={(e) =>
                    setForms((prevForms) =>
                        prevForms.map((f, i) => (i === index ? { ...f, newPost: e.target.value } : f))
                    )} />

            <ParagraphComponent className="mb-2 text-red-500">
                {form.errorMessage}
            </ParagraphComponent>

            <ParagraphComponent
                className={`mb-2 text-sm ${form.newPost.length > 140 ? 'text-red-500' : 'text-gray-500'
                    }`}>
                {form.newPost.length}/140
            </ParagraphComponent>
        </div>
    );
};



