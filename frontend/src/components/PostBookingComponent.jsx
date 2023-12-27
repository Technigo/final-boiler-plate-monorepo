import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BtnComponent } from "./BtnComonent";
import { SubHeadingComponent } from "./SubHeadingComponent";
import { ParagraphComponent } from "./ParagraphComponent";
import { SpinningLogo } from "./SpinningLogo";

// Functional Component: PostBookingComponent
export const PostBookingComponent = () => {
    const [minDate, setMinDate] = useState(new Date());

    // State Hooks
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const [isGroupBooking, setIsGroupBooking] = useState(false);
    const [groupID, setGroupID] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    // At the beginning of your component
    // At the beginning of your component
    // Separate error states for each field in each form
    const [errors, setErrors] = useState(Array.from({ length: numberOfPeople }, () => ({})));

    // Separate error states for name and age
    const [nameError, setNameError] = useState("");
    const [ageError, setAgeError] = useState("");
    const [phonenumberError, setPhonenumberError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [weightError, setWeightError] = useState("");
    const [heightError, setHeightError] = useState("");
    const [dateError, setDateError] = useState("");
    const [surfLevelError, setSurfLevelError] = useState("");
    const [groupIDError, setGroupIDError] = useState("")
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
        groupIDError: "",

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
            groupID: isGroupBooking ? generateUniqueGroupID() : "",
            groupIDError: "",

        })));

        // Update the errors state
        setErrors(Array.from({ length: number }, () => ({})));
        // Update minDate to the current date whenever the number of people changes
        setMinDate(new Date());
    };

    // Event handler for changing the group booking checkbox
    const handleGroupBookingCheckboxChange = () => {
        // Toggle the group booking state
        setIsGroupBooking(!isGroupBooking);
        // Set or clear the groupID based on the group booking state
        setGroupID(isGroupBooking ? "" : generateUniqueGroupID());
        // Clear the groupIDError when the checkbox is changed
        setGroupIDError("");
    };


    const handleBookAgain = () => {
        window.location.reload();
    }


    const validateForm = () => {

        let isValid = true;
        const newErrors = Array.from({ length: numberOfPeople }, () => ({
            name: "",
            age: "",
            phonenumber: "",
            weight: "",
            height: "",
            date: "",
            surfLevel: "",
            confirmation: "",
        }));
        for (const [index, form] of forms.entries()) {
            // Validate name
            if (!form.name) {
                newErrors[index].name = "Name is required";
                isValid = false;
            }

            // Validate age
            if (!form.age) {
                newErrors[index].age = "Age is required (must be between 4 and 100";
                isValid = false;
            }
            // Validate phonenumber
            if (!form.phonenumber) {
                newErrors[index].phonenumber = "Phone number is required";
                isValid = false;
            }
            // Validate weight
            if (!form.weight) {
                newErrors[index].weight = "Weight is required";
                isValid = false;
            }
            // Validate height
            if (!form.height) {
                newErrors[index].height = "Height is required";
                isValid = false;
            }
            // Validate Date
            if (!form.date) {
                newErrors[index].date = "Date is required";
                isValid = false;
            }
            // Validate surf level
            if (!(form.beginner || form.intermediate || form.advanced)) {
                newErrors[index].surfLevel = "Surf level is required";
                isValid = false;
            }
            // Validate groupID checkbox
            if (numberOfPeople > 1 && !isGroupBooking) {
                setGroupIDError('Confirmation required');
                isValid = false;
            }


        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async () => {
        // Clear previous error messages
        // Clear previous error messages
        setNameError("");
        setAgeError("");
        setPhonenumberError("");
        setEmailError("");
        setWeightError("");
        setHeightError("");
        setDateError("");
        setSurfLevelError("");
        setGroupIDError("");

        // Iterate over each form
        for (const form of forms) {
            // Validate name
            // Validate the form
            if (!validateForm()) {
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
                        errorMessage: "",
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
        };

        // After processing the forms, reset the form state
        setForms((prevForms) =>
            prevForms.map(() => ({
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
                groupID: isGroupBooking ? generateUniqueGroupID() : "",
            }))
        );
        setNameError("");
        setAgeError("");
        setPhonenumberError("");
        setEmailError("");
        setWeightError("");
        setHeightError("");
        setSurfLevelError("");
        setGroupIDError("");
        // Show success message
        setShowSuccessMessage(true);
    };

    // JSX (React elements) representing the component structure
    return (
        <div>
            {/* Conditional rendering based on the success message visibility */}
            {showSuccessMessage ? (
                <div className="flex text-center flex-col items-center h-screen m-9">
                    <SpinningLogo />
                    <ParagraphComponent className="" text="Thank you for your booking request!" />

                    <ParagraphComponent className="" text="Tuanis Surfschool will get back to you as soon as possible. Don't forget to check your email!" />

                    <ParagraphComponent className="" text="If you have any questions in the meantime don't hesitate to get in touch with us at tuanissurfschool@gmail.com or +506 6140-7609." />

                    <BtnComponent className="" label="Send another request" onClick={handleBookAgain} />
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
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
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
                                <label className="mr-2">Name</label>
                                <input
                                    type="text"
                                    placeholder={`Name for Person ${index + 1}`}
                                    value={form.name}
                                    onChange={(e) => {
                                        setForms((prevForms) =>
                                            prevForms.map((f, i) => (i === index ? { ...f, name: e.target.value } : f))
                                        );
                                        setNameError(""); // Clear the error as you type
                                    }}
                                    onFocus={() => setNameError("")}
                                    className="mb-2 p-2 w-full border rounded"
                                />
                                {errors[index].name && <p className="text-red-600">{errors[index].name}</p>}


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
                                    min={4}  // Set the minimum age
                                    max={100} // Set the maximum age
                                    onFocus={() => setNameError("")}
                                    className="mb-2 p-2 w-full border rounded" />
                                {errors[index].age && <p className="text-red-600">{errors[index].age}</p>}

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
                                    onFocus={() => setNameError("")}
                                    className="mb-2 p-2 w-full border rounded" />
                                {errors[index].phonenumber && <p className="text-red-600">{errors[index].phonenumber}</p>}

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
                                {errors[index].email && <p className="text-red-600">{errors[index].email}</p>}

                                {/* Form weight */}
                                <label className="mr-2">Weight in KG</label>
                                <input
                                    type="number"
                                    placeholder={`Weight for Person ${index + 1}`}
                                    min={0}
                                    value={form.weight}
                                    onChange={(e) =>
                                        setForms((prevForms) =>
                                            prevForms.map((f, i) =>
                                                i === index ? { ...f, weight: e.target.value } : f
                                            )
                                        )
                                    }
                                    onFocus={() => setNameError("")}
                                    className="mb-2 p-2 w-full border rounded" />
                                {errors[index].weight && <p className="text-red-600">{errors[index].weight}</p>}

                                {/* Form height */}
                                <label className="mr-2">Height in CM</label>
                                <input
                                    type="number"
                                    placeholder={`Height for Person ${index + 1}`}
                                    min={0}
                                    value={form.height}
                                    onChange={(e) =>
                                        setForms((prevForms) =>
                                            prevForms.map((f, i) =>
                                                i === index ? { ...f, height: e.target.value } : f
                                            )
                                        )
                                    }
                                    onFocus={() => setNameError("")}
                                    className="mb-2 p-2 w-full border rounded" />
                                {errors[index].height && <p className="text-red-600">{errors[index].height}</p>}

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
                                        onFocus={() => setNameError("")}
                                        minDate={minDate}  // Set the minimum date
                                        className="border rounded p-2"
                                    />
                                    {errors[index].date && <p className="text-red-600">{errors[index].date}</p>}
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
                                        disabled={form.intermediate || form.advanced}
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
                                        onFocus={() => setNameError("")}
                                        disabled={form.beginner || form.advanced}
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
                                        onFocus={() => setNameError("")}
                                        disabled={form.beginner || form.intermediate}
                                    />

                                    {errors[index].surfLevel && <p className="text-red-600">{errors[index].surfLevel}</p>}
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
                                {groupIDError && <p className="text-red-600">{groupIDError}</p>}
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