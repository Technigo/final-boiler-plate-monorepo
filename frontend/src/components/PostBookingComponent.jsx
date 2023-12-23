import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BtnComponent } from "./BtnComonent";
import { SubHeadingComponent } from "./SubHeadingComponent";
import { ParagraphComponent } from "./ParagraphComponent";
import { SpinningLogo } from "./SpinningLogo";

// Functional Component: PostBookingComponent
export const PostBookingComponent = () => {

    // State Hooks
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const [isGroupBooking, setIsGroupBooking] = useState(false);
    const [groupID, setGroupID] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    // State Hook for success message visibility
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const [forms, setForms] = useState(Array.from({ length: numberOfPeople }, () => ({

        // Initial form state for each person
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
        createdAt: Date.now(),
        groupID: "",
    })));

    // Function to log new messages
    const newMessage = (message) => {
        console.log("New message:", message);
    };

    // Function to generate a unique group ID
    const generateUniqueGroupID = () => {
        return `group_${Date.now()}`;
    };

    // Event handler for changing the number of people
    const handleChangeNumberOfPeople = (e) => {
        const number = parseInt(e.target.value, 10);
        setNumberOfPeople(number);

        // Dynamically create forms based on the new number of people
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
            createdAt: Date.now(),
            groupID: isGroupBooking ? generateUniqueGroupID() : "",
        })));
    };

    // Event handler for changing the group booking checkbox
    const handleGroupBookingCheckboxChange = () => {
        // Toggle the group booking state
        setIsGroupBooking(!isGroupBooking);
        // Set or clear the groupID based on the group booking state
        setGroupID(isGroupBooking ? "" : generateUniqueGroupID());
    };

    const handleBookAgain = () => {
        window.location.reload();
    }

    // Async function to handle form submission
    const handleSubmit = async () => {
        // Clear previous error messages
        setErrorMessage("");

        // Loop through each form
        for (const form of forms) {
            if (form.newPost.length > 140) {
                alert("Your message is too long, use a maximum of 140 characters!");
                return;
            }

            // Validate the date - you may want to add additional date validation logic
            if (!form.date) {
                // Validate message length
                alert("Please select a date for the booking.");
                return;
            }

            // Add more validation logic if needed
            try {

                // Send a POST request to the server
                const response = await fetch(`${import.meta.env.VITE_API_URL}/booking`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        // Form data
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
                        createdAt: Date.now(),
                        groupID: isGroupBooking ? groupID : null,
                    }),
                });
                // Check if the request was successful
                if (!response.ok) {
                    throw new Error(`Network response was not ok. Status: ${response.status}`);
                }

                const data = await response.json();
                newMessage(data);


            } catch (error) {
                console.error("Error:", error);
            }
        }
        // After processing the forms, reset the form state
        setForms((prevForms) =>
            prevForms.map((form) => ({
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
                createdAt: Date.now(),
                groupID: isGroupBooking ? generateUniqueGroupID() : "",
            }))
        );
        // Show success message
        setShowSuccessMessage(true);
    };
    // JSX (React elements) representing the component structure
    return (
        <div>
            {/* Conditional rendering based on the success message visibility */}
            {showSuccessMessage ? (

                <div className="flex text-center flex-col items-center h-screen mt-9">
                    <SpinningLogo />
                    <ParagraphComponent className="mt-9" text="Thank you for your booking request!" />

                    <ParagraphComponent className="" text="Tuanis Surfschool will get back to you as soon as possible. Don't forget to check your email!" />

                    <ParagraphComponent className="" text="If you have any questions in the meantime don't hesitate to get in touch with us at tuanissurfschool@gmail.com or +506 6140-7609." />

                    <BtnComponent className="mt-6" label="Send another request" onClick={handleBookAgain} />
                </div>
            ) : (
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
                                {/* ... (your form elements for each person) */}
                                {/* Form Name */}
                                <label className="mr-2">Name</label>
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
                                    className="mb-2 p-2 w-full border rounded"
                                />
                                {/* Form Age */}
                                <label className="mr-2">Age</label>
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
                                {/* Input Phone number */}
                                <label className="mr-2">Phone number</label>
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
                                <label className="mr-2">Email</label>
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

                                {/* Form weight */}
                                <label className="mr-2">Weight in KG</label>
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
                                <label className="mr-2">Height in CM</label>
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
                                <label className="mr-2">Would you like any documentation?</label>
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
                                <label className="mr-2">Which surfing level are you on?</label>
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

                                {/* Input textare */}
                                <SubHeadingComponent className="mb-2 text-xl font-bold bg-gray-200" text={`Anything else for Person ${index + 1}?`} />

                                <textarea
                                    className="mb-2 p-2 w-full border rounded"
                                    rows="3"
                                    cols="50"
                                    placeholder={`Person ${index + 1} is really allergic to tomatoes!`}
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


                            </div>

                        ))}


                        {/* Checkbox for confirming group booking */}
                        {numberOfPeople > 1 && (
                            <div className="mb-2">
                                <label className="mr-2">I confirm that this is a booking request for multiple people</label>
                                <input
                                    type="checkbox"
                                    checked={isGroupBooking}
                                    onChange={handleGroupBookingCheckboxChange}
                                />
                            </div>
                        )}

                        <div className="flex items-center justify-center p-4">
                            <BtnComponent label="Send request" onClick={handleSubmit} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}