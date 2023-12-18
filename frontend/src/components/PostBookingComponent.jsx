import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BtnComponent } from "./BtnComonent";
import { ParagraphComponent } from "./ParagraphComponent";
import { SubHeadingComponent } from "./SubHeadingComponent";

export const PostBookingComponent = () => {
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const [errorMessage, setErrorMessage] = useState("");
    const [forms, setForms] = useState(Array.from({ length: numberOfPeople }, () => ({
        name: "",
        age: "",
        weight: "",
        height: "",
        film: false,
        droneVideos: false,
        photo: false,
        email: "",
        phonenumber: "",
        newPost: "",
        date: null,
        beginner: false,
        intermediate: false,
        advanced: false,
        errorMessage: "",
    })));

    const newMessage = (message) => {
        console.log("New message:", message);
    };

    const handleSubmit = async () => {
        setErrorMessage("");
        for (const form of forms) {
            if (form.newPost.length > 140) {
                setErrorMessage("Your message is too long, use a maximum of 140 characters!");
                return;
            }

            // Validate the date - you may want to add additional date validation logic
            if (!form.date) {
                setErrorMessage("Please select a date for the booking.");
                return;
            }

            // Add more validation logic if needed

            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/booking`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: form.name,
                        age: form.age,
                        weight: form.weight,
                        height: form.height,
                        film: form.film,
                        droneVideos: form.droneVideos,
                        photo: form.photo,
                        email: form.email,
                        phonenumber: form.phonenumber,
                        message: form.newPost,
                        date: form.date.toISOString(),
                        beginner: form.beginner,
                        intermediate: form.intermediate,
                        advanced: form.advanced,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`Network response was not ok. Status: ${response.status}`);
                }

                const data = await response.json();
                newMessage(data);
            } catch (error) {
                console.error("Error:", error);
            }
        }

        setForms((prevForms) =>
            prevForms.map((form) => ({
                ...form,
                name: "",
                age: "",
                weight: "",
                height: "",
                film: false,
                droneVideos: false,
                photo: false,
                email: "",
                phonenumber: "",
                newPost: "",
                date: null,
                beginner: false,
                intermediate: false,
                advanced: false,
            }))
        );
    };

    const handleChangeNumberOfPeople = (e) => {
        const number = parseInt(e.target.value, 10);
        setNumberOfPeople(number);
        setForms(Array.from({ length: number }, () => ({
            name: "",
            age: "",
            weight: "",
            height: "",
            film: false,
            droneVideos: false,
            photo: false,
            email: "",
            phonenumber: "",
            newPost: "",
            date: null,
            beginner: false,
            intermediate: false,
            advanced: false,
            errorMessage: "",
        })));
    };
    return (
        <div className="flex justify-center items-center h-auto m-10">
            <div className="w-full max-w-md p-4 bg-gray-200 rounded">
                <div className="mb-2">
                    <label className="mr-2">Number of People</label>
                    <select
                        value={numberOfPeople}
                        onChange={handleChangeNumberOfPeople}
                        className="border rounded"
                    >
                        {[1, 2, 3].map((num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Form for each person */}

                {forms.map((form, index) => (
                    <div key={index}>

                        {/* Form Name */}
                        <input
                            type="text"
                            placeholder={`Name for Person ${index + 1}`}
                            value={form.name}
                            onChange={(e) =>
                                setForms((prevForms) =>
                                    prevForms.map((f, i) =>
                                        i === index ? { ...f, name: e.target.value } : f
                                    )
                                )
                            }
                            className="mb-2 p-2 w-full border rounded" />

                        {/* Form Age */}
                        <input
                            type="number"
                            placeholder={`Age for Person ${index + 1}`}
                            value={form.age}
                            onChange={(e) =>
                                setForms((prevForms) =>
                                    prevForms.map((f, i) =>
                                        i === index ? { ...f, age: e.target.value } : f
                                    )
                                )
                            }
                            className="mb-2 p-2 w-full border rounded" />

                        {/* Form weight */}
                        <input
                            type="number"
                            placeholder={`Weight for Person ${index + 1}`}
                            value={form.weight}
                            onChange={(e) =>
                                setForms((prevForms) =>
                                    prevForms.map((f, i) =>
                                        i === index ? { ...f, weight: e.target.value } : f
                                    )
                                )
                            }
                            className="mb-2 p-2 w-full border rounded" />

                        {/* Form height */}
                        <input
                            type="number"
                            placeholder={`Height for Person ${index + 1}`}
                            value={form.height}
                            onChange={(e) =>
                                setForms((prevForms) =>
                                    prevForms.map((f, i) =>
                                        i === index ? { ...f, height: e.target.value } : f
                                    )
                                )
                            }
                            className="mb-2 p-2 w-full border rounded" />

                        {/* Checkbox Film */}
                        <div className="mb-2">
                            <label className="mr-2">Film</label>
                            <input
                                type="checkbox"
                                checked={form.film}
                                onChange={() =>
                                    setForms((prevForms) =>
                                        prevForms.map((f, i) =>
                                            i === index ? { ...f, film: !f.film } : f
                                        )
                                    )
                                } />
                        </div>

                        {/* Checkbox Dronevideos */}
                        <div className="mb-2">
                            <label className="mr-2">Drone Videos</label>
                            <input
                                type="checkbox"
                                checked={form.droneVideos}
                                onChange={() =>
                                    setForms((prevForms) =>
                                        prevForms.map((f, i) =>
                                            i === index ? { ...f, droneVideos: !f.droneVideos } : f
                                        )
                                    )
                                } />
                        </div>

                        {/* Checkbox Photos */}
                        <div className="mb-2">
                            <label className="mr-2">Photo</label>
                            <input
                                type="checkbox"
                                checked={form.photo}
                                onChange={() =>
                                    setForms((prevForms) =>
                                        prevForms.map((f, i) =>
                                            i === index ? { ...f, photo: !f.photo } : f
                                        )
                                    )
                                } />
                        </div>

                        {/* Input Phone number */}
                        <input
                            type="number"
                            placeholder={`Phone number for Person ${index + 1}`}
                            value={form.phonenumber}
                            onChange={(e) =>
                                setForms((prevForms) =>
                                    prevForms.map((f, i) =>
                                        i === index ? { ...f, phonenumber: e.target.value } : f
                                    )
                                )
                            }
                            className="mb-2 p-2 w-full border rounded" />

                        {/* Input email */}
                        <input
                            type="text"
                            placeholder={`Email for Person ${index + 1}`}
                            value={form.email}
                            onChange={(e) =>
                                setForms((prevForms) =>
                                    prevForms.map((f, i) =>
                                        i === index ? { ...f, email: e.target.value } : f
                                    )
                                )
                            }
                            className="mb-2 p-2 w-full border rounded" />

                        {/* Input textare */}
                        <SubHeadingComponent className="mb-2 text-xl font-bold" text={`Anything else for Person ${index + 1}?`} />

                        <textarea
                            className="mb-2 p-2 w-full border rounded"
                            rows="3"
                            cols="50"
                            placeholder={`Anything else for Person ${index + 1}?`}
                            value={form.newPost}
                            onChange={(e) =>
                                setForms((prevForms) =>
                                    prevForms.map((f, i) =>
                                        i === index ? { ...f, newPost: e.target.value } : f
                                    )
                                )
                            }
                        />
                        <p className="mb-2 text-red-500">{form.errorMessage}</p>
                        <p
                            className={`mb-2 text-sm ${form.newPost.length > 140 ? "text-red-500" : "text-gray-500"
                                }`}
                        >
                            {form.newPost.length}/140
                        </p>

                        {/* Form Date */}
                        <div className="mb-2">
                            <label className="mr-2">Select Date</label>
                            <DatePicker
                                selected={form.date}
                                onChange={(date) =>
                                    setForms((prevForms) =>
                                        prevForms.map((f, i) => (i === index ? { ...f, date: date || null } : f))
                                    )
                                }
                                dateFormat="yyyy-MM-dd"
                                className="border rounded p-2"
                            />
                        </div>
                        {/* Checkbox Surf Level 1 */}
                        <div className="mb-2">
                            <label className="mr-2">Beginner</label>
                            <input
                                type="checkbox"
                                checked={form.beginner}
                                onChange={() =>
                                    setForms((prevForms) =>
                                        prevForms.map((f, i) =>
                                            i === index ? { ...f, beginner: !f.beginner } : f
                                        )
                                    )
                                }
                            />
                        </div>

                        {/* Checkbox Surf Level 2 */}
                        <div className="mb-2">
                            <label className="mr-2">Intermediate</label>
                            <input
                                type="checkbox"
                                checked={form.intermediate}
                                onChange={() =>
                                    setForms((prevForms) =>
                                        prevForms.map((f, i) =>
                                            i === index ? { ...f, intermediate: !f.intermediate } : f
                                        )
                                    )
                                }
                            />
                        </div>

                        {/* Checkbox Surf Level 3 */}
                        <div className="mb-2">
                            <label className="mr-2">Advanced</label>
                            <input
                                type="checkbox"
                                checked={form.advanced}
                                onChange={() =>
                                    setForms((prevForms) =>
                                        prevForms.map((f, i) =>
                                            i === index ? { ...f, advanced: !f.advanced } : f
                                        )
                                    )
                                }
                            />
                        </div>
                    </div>
                ))}

                <div className="flex items-center justify-center p-4">
                    <BtnComponent label="Send request" onClick={handleSubmit} />
                </div>
            </div>
        </div>
    );
};
