import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { BtnComponent } from "./BtnComonent";
import { SucessMessage } from "./sucessMessage";
import { Checkbox } from './Checkbox';
import { FormComponent } from './FormComponent';
import { SpinningLogo } from "./SpinningLogo";
import { Fade } from "react-awesome-reveal";

export const PostBookingComponent = () => {

    // State Hooks
    const [minDate, setMinDate] = useState(new Date());
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const [isGroupBooking, setIsGroupBooking] = useState(false);
    const [groupID, setGroupID] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    // Separate error states for each field in each form
    const [errors, setErrors] = useState(Array.from({ length: numberOfPeople }, () => ({})));

    // Separate error states
    const [nameError, setNameError] = useState("");
    const [ageError, setAgeError] = useState("");
    const [phonenumberError, setPhonenumberError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [weightError, setWeightError] = useState("");
    const [heightError, setHeightError] = useState("");
    const [dateError, setDateError] = useState("");
    const [surfLevelError, setSurfLevelError] = useState("");
    const [groupIDError, setGroupIDError] = useState("")

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
            // Validate email
            if (!form.email) {
                newErrors[index].email = "Email is required";
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
        // Set loading to true when submission starts
        setIsLoading(true);
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

        // Validate the forms before the timeout
        if (!validateForm()) {
            // If validation fails, set loading to false and return
            setIsLoading(false);
            return;
        }

        try {
            // Simulate a loading delay of 4 seconds using setTimeout
            setTimeout(async () => {
                // Iterate over each form
                for (const form of forms) {
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
                }

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
                // Set loading to false when submission is completed
                setIsLoading(false);
            }, 4000); // 4000 milliseconds (4 seconds) delay
        } catch (error) {
            console.error("Error:", error);
        }
    };


    // JSX (React elements) representing the component structure
    return (
        <div>
            {/* Conditional rendering based on the success message visibility and loading state */}
            {isLoading ? (
                <Fade>
                    <div className="flex text-center flex-col items-center h-screen m-9">
                        <SpinningLogo />
                    </div>
                </Fade>
            ) : showSuccessMessage ? (
                <Fade>
                    <SucessMessage />
                </Fade>
            ) : (
                <div className="flex justify-center items-center h-auto m-4 text-s font-josefin-sans">
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
                            <FormComponent
                                key={index}
                                form={form}
                                index={index}
                                setForms={setForms}
                                minDate={minDate}
                                errors={errors[index]}
                            />

                        ))}

                        {/* Checkbox for confirming group booking */}
                        {numberOfPeople > 1 && (
                            <div className="mb-2">
                                <Checkbox
                                    label="I confirm that this is a booking request for multiple people"
                                    checked={isGroupBooking}
                                    onChange={handleGroupBookingCheckboxChange}
                                />
                                {groupIDError && <p className="text-red-600">{groupIDError}</p>}
                            </div>
                        )}

                        {/* button to send request */}
                        <div className="flex items-center justify-center p-4">
                            <BtnComponent label="Send request" onClick={handleSubmit} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};