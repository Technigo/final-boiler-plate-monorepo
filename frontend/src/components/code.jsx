import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { BtnComponent } from "./Reusables/BtnComonent";
import { SucessMessage } from "./Bookings/sucessMessage";
import { Checkbox } from './Reusables/Checkbox';
import { FormComponent } from './Bookings/FormComponent';
import { SpinningLogo } from "./Reusables/SpinningLogo";
import { Fade } from "react-awesome-reveal";
import { ParagraphComponent } from "./Reusables/ParagraphComponent";

export const PostBookingComponent = ({ disabledDates }) => {
    // State Hooks
    const [minDate, setMinDate] = useState(new Date());
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const [isGroupBooking, setIsGroupBooking] = useState(false);
    const [groupID, setGroupID] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    // Separate error states for each field in each form
    const [errors, setErrors] = useState(Array.from({ length: numberOfPeople }, () => ({})));

    // Custom error classes for better distinction
    class NetworkError extends Error { }
    class ServerError extends Error { }

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
            email: "",
            weight: "",
            height: "",
            date: "",
            surfLevel: "",
            newPost: "",
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
                newErrors[index].age = "Age is required (must be between 4 and 100)";
                isValid = false;
            }

            // Validate phonenumber
            if (!form.phonenumber) {
                newErrors[index].phonenumber = "Phone number is required";
                isValid = false;
            } else if (!isValidPhoneNumber(form.phonenumber)) {
                newErrors[index].phonenumber = "Invalid phone number format";
                isValid = false;
            }

            // Validate email
            if (!form.email) {
                newErrors[index].email = "Email is required";
                isValid = false;
            } else if (!isValidEmail(form.email)) {
                newErrors[index].email = "Invalid email format";
                isValid = false;
            }

            // Validate weight
            if (!form.weight) {
                newErrors[index].weight = "Weight is required";
                isValid = false;
            } else if (form.weight < 0) {
                newErrors[index].weight = "Weight cannot be negative";
                isValid = false;
            }

            // Validate height
            if (!form.height) {
                newErrors[index].height = "Height is required";
                isValid = false;
            } else if (form.height < 0) {
                newErrors[index].height = "Height cannot be negative";
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
            // Validate newPost
            if (form.newPost.length > 140) {
                newErrors[index].newPost = "You message length must be 140 characters or less";
                isValid = false;
            }

            // Validate groupID checkbox
            if (numberOfPeople > 1 && !isGroupBooking) {
                newErrors[index].confirmation = "Confirmation required";
                isValid = false;
            }
        }

        setErrors(newErrors);
        return isValid;
    };

    const isValidPhoneNumber = (phonenumber) => {
        // You can implement phone number validation logic here
        // For simplicity, let's assume a valid phone number has at least 9 digits
        return /^\d{9,}$/.test(phonenumber);
    };

    const isValidEmail = (email) => {
        // You can implement a more sophisticated email validation logic here
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const simulateServerRequest = async () => {
        // Simulate a server request (replace this with your actual server request logic)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulating success for demonstration purposes
                // In a real scenario, you would replace this with your server request logic
                const success = Math.random() < 0.8; // 80% success rate
                if (success) {
                    resolve();
                } else {
                    reject(new ServerError("Unable to process the request. Please try again later!"));
                }
            }, 2000); // Simulating a 2-second server response time
        });
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        clearErrorMessages();

        if (!validateForm()) {
            setIsLoading(false);
            return;
        }

        try {
            const startTime = Date.now();

            setTimeout(async () => {
                try {
                    // Check if there is a network connection before making the request
                    if (!navigator.onLine) {
                        throw new Error("No internet connection. Please check your network.");
                    }

                    for (const form of forms) {
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
                                    errorMessage: "",
                                    createdAt: Date.now(),
                                    groupID: isGroupBooking ? groupID : null,
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

                    const endTime = Date.now();
                    const actualLoadingTime = endTime - startTime;
                    const minLoadingTime = 4000;
                    const delay = Math.max(minLoadingTime, actualLoadingTime);

                    setTimeout(() => {
                        resetFormState();
                        setShowSuccessMessage(true);
                        setIsLoading(false);
                    }, delay);
                } catch (error) {
                    console.error("Error:", error);
                    // Show a general error message to the user
                    alert("Unable to send request now. Please try again later!");
                    setIsLoading(false);
                }
            }, 4000);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const resetFormState = () => {
        setForms((prevForms) =>
            prevForms.map(() => ({
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

        clearErrorMessages();
    };

    const clearErrorMessages = () => {
        setNameError("");
        setAgeError("");
        setPhonenumberError("");
        setEmailError("");
        setWeightError("");
        setHeightError("");
        setSurfLevelError("");
        setGroupIDError("");
    };

    return (
        <div>
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

                    <div className="w-full max-w-md rounded-md border-4 border-customPink p-4 px-10 rounded">
                        <div className="mb-2">
                            <label className="mr-2">Number of People*</label>

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

                        <div className="flex items-center justify-center pt-0 p-4">
                            <BtnComponent label="Send request" onClick={() => {
                                if (validateForm()) {  // Check if there are no errors
                                    handleSubmit();
                                    window.scrollTo(0, 0);
                                }
                            }} />
                        </div>

                        <ParagraphComponent className="text-sm m-0 pl-0" text="* if more than 10 people inquire tuanissurfachool@gmail.com" />
                        <ParagraphComponent className="text-sm m-0 pl-0" text="* dates might be adjusted accoarding to weather conditions" />
                    </div>
                </div>
            )}
        </div>
    );
};
