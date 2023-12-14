import React, { useState } from "react";
import { BtnComponent } from "./BtnComonent";
import { ParagraphComponent } from "./ParagraphComponent";
import { SubHeadingComponent } from "./SubHeadingComponent";

export const PostBookingComponent = () => {
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const [errorMessage, setErrorMessage] = useState(""); // shows errors that might happen
    const [forms, setForms] = useState([

        {
            name: "",
            age: "",
            weight: "",
            height: "",
            video: false,
            film: false,
            droneVideos: false,
            newPost: "",
            errorMessage: "",
        },
    ]);

    const newMessage = (message) => {
        // Handle the new message here
        console.log("New message:", message);
    };

    const handleSubmit = async () => {
        console.log("Submit button clicked");
        // Clear any previous error messages
        setErrorMessage("");

        // Iterate over each form
        for (const form of forms) {
            // Check if the message is too short
            if (form.newPost.length < 5) {
                setErrorMessage("Your message is too short, use a minimum of 5 characters!");
                return; // Exit the function to prevent further execution
            } else if (form.newPost.length > 140) {
                setErrorMessage("Your message is too long, use a maximum of 140 characters!");
                return; // Exit the function to prevent further execution
            }

            try {
                // If the message is correct, then send it
                const response = await fetch("https://mono-repo-yz5y.onrender.com/booking", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        message: form.newPost,
                        name: form.name,
                        age: form.age,
                        weight: form.weight,
                        height: form.height,
                        video: form.video,
                        film: form.film,
                        droneVideos: form.droneVideos,
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

        // Clear the input fields
        setForms((prevForms) =>
            prevForms.map((form) => ({
                ...form,
                newPost: "",
                name: "",
                age: "",
                weight: "",
                height: "",
                video: false,
                film: false,
                droneVideos: false,
            }))
        );
    };
    const validateForm = (form) => {
        // Validate each field
        // Example: Check if name is not empty
        if (!form.name.trim()) {
            setForms((prevForms) =>
                prevForms.map((f) =>
                    f === form
                        ? { ...f, errorMessage: "Name cannot be empty" }
                        : { ...f, errorMessage: "" }
                )
            );
            return false;
        }

        // Add more validation logic for other fields here 

        return true;
    };

    const handleChangeNumberOfPeople = (e) => {
        const number = parseInt(e.target.value, 10);
        setNumberOfPeople(number);

        // Adjust the forms array based on the selected number
        setForms((prevForms) => {
            const newForms = [];
            for (let i = 0; i < number; i++) {
                newForms.push({
                    name: "",
                    age: "",
                    weight: "",
                    height: "",
                    video: false,
                    film: false,
                    droneVideos: false,
                    newPost: "",
                    errorMessage: "",
                });
            }
            return newForms;
        });
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
                {forms.map((form, index) => (
                    <div key={index}>
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
                            className="mb-2 p-2 w-full border rounded"
                        />
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
                            className="mb-2 p-2 w-full border rounded"
                        />
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
                            className="mb-2 p-2 w-full border rounded"
                        />
                        <div className="mb-2">
                            <label className="mr-2">Video</label>
                            <input
                                type="checkbox"
                                checked={form.video}
                                onChange={() =>
                                    setForms((prevForms) =>
                                        prevForms.map((f, i) =>
                                            i === index ? { ...f, video: !f.video } : f
                                        )
                                    )
                                }
                            />
                        </div>
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
                                }
                            />
                        </div>
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
                                }
                            />
                        </div>

                        <SubHeadingComponent className="mb-2 text-xl font-bold" text={`Anything else for Person ${index + 1}?`} />

                        <textarea
                            className="mb-2 p-2 w-full border rounded"
                            rows="5"
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
                    </div>
                ))}


                <div className="flex items-center justify-center p-4">
                    <BtnComponent label="Send request" onClick={handleSubmit} />
                </div>
            </div>
        </div>
    );
};
