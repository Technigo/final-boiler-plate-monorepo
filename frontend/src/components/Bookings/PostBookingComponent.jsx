import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import "react-datepicker/dist/react-datepicker.css";
import { SubHeadingComponent } from "../Reusables/SubHeadingComponent";
//import relevant components
import { ParagraphComponent } from "../Reusables/ParagraphComponent";
import { BtnComponent } from "../Reusables/BtnComonent";
import { SucessMessage } from "./sucessMessage";
import { Checkbox } from '../Reusables/Checkbox';
import { FormComponent } from './FormComponent';
import { SpinningLogo } from "../Reusables/SpinningLogo";

//import relevant store
import useBookingStore from "../../stores/bookingStore";

export const PostBookingComponent = () => {

    // State Hooks for managing component state
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

    const bookingStore = useBookingStore();

    // Initial form state for each person
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
        createdAt: Date.now(),
        groupID: "",
        groupIDError: "",
    })));


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

    // Function to validate form data
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
        return /^\d{9,}$/.test(phonenumber);
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Event handler for form submission
    const handleSubmit = async () => {
        setIsLoading(true);
        clearErrorMessages();

        if (!validateForm()) {
            setIsLoading(false);
            return;
        }

        // Declare startTime here to make it accessible in the setTimeout function
        const startTime = Date.now();

        try {
            // Call the submitBookings action from the store
            const responses = await bookingStore.submitBookings(forms, isGroupBooking, groupID);

            // Check if the number of responses matches the expected number of forms
            if (!responses || responses.length !== forms.length) {
                throw new Error("Some forms were not submitted properly. Please try again.");
            }

            // Reset form state and show success message
            const endTime = Date.now();
            const actualLoadingTime = endTime - startTime;
            const minLoadingTime = 4000;
            const delay = Math.max(minLoadingTime, actualLoadingTime);

            setTimeout(() => {
                resetFormState();
                // Inside the handleSubmit function
                console.log("Forms submitted successfully");
                setShowSuccessMessage(true);
                setIsLoading(false);
            }, delay);
        } catch (error) {
            console.error("Error:", error);

            let errorMessage = "Error submitting the form. Please try again.";

            if (error instanceof TypeError && error.message === "Failed to fetch") {
                errorMessage = "Network error. Please check your internet connection.";
            } else if (error instanceof SyntaxError && error.message.includes("JSON")) {
                errorMessage = "Server returned an invalid response. Please try again later.";
            }

            alert(errorMessage);
            setIsLoading(false);
        }
    };

    //reset the form after submitting
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

    //clear the error messages
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

            {/* Render loading state */}
            {isLoading ? (
                // Render loading state
                <Fade>
                    <div className="flex text-center flex-col items-center h-screen m-9">
                        <SpinningLogo />
                    </div>
                </Fade>
            ) : showSuccessMessage ? (
                // Render success message
                <Fade>
                    <SucessMessage />
                    {console.log("Success message rendered")}
                </Fade>
            ) : (
                //render form
                <div className="flex justify-center items-center h-auto m-4 text-s font-josefin-sans">

                    <div className="w-full max-w-md rounded-md border-4 border-customPink p-4 px-10 rounded">
                        <div className="mb-2">

                            <label htmlFor="numberOfPeople" className="mr-2">
                                Number of Surfers*
                            </label>

                            {/* select number of people */}
                            <select
                                id="numberOfPeople"
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

                        {/* map throght the form */}
                        {forms.map((form, index) => (
                            <FormComponent
                                key={index}
                                form={form}
                                index={index}
                                setForms={setForms}
                                minDate={minDate}
                                errors={errors[index]} />
                        ))}

                        {/* Render individual form components based on the number of people */}
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

                            <BtnComponent
                                type="submit"
                                label="Send request"
                                onClick={() => {
                                    if (validateForm()) {
                                        handleSubmit();
                                        window.scrollTo(0, 0);
                                    }
                                }}
                            />
                        </div>

                        <ParagraphComponent className="text-sm m-0 pl-0" text="* if more than 10 people inquire tuanissurfachool@gmail.com" />
                        <ParagraphComponent className="text-sm m-0 pl-0" text="* Please note that dates are subject to change based on weather conditions and availability." />
                    </div>
                </div>
            )}

        </div>
    );
};
