import { useState } from "react";
import { Link } from "react-router-dom";
import { LocationInput } from "./LocationInput";
import { makes, models } from "./CarData";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { userStore } from "../stores/userStore";

export const TripGenerator = () => {
  const { loggedInUserId, username: tripUsername } = userStore();

  const [formData, setFormData] = useState({
    from: "",
    to: "",
    message: "",
    date: "",
    make: "",
    model: "",
    availableSeats: "",
    reg: "",
    music: "",
    user: loggedInUserId,
    username: tripUsername,
  });

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiEnv = import.meta.env.VITE_BACKEND_API;

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "from" || name === "to") {
      formattedValue = value.slice(0, 22);
    } else if (name === "reg") {
      formattedValue = value
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, "")
        .slice(0, 6);
    } else if (name === "date") {
      const today = new Date();
      const selectedDate = new Date(value);

      if (selectedDate <= today) {
        alert("Please select a date that is tomorrow or later.");
        return;
      }

      formattedValue = value;
    } else if (name === "model") {
      const makeValue = formData.make;
      formattedValue = models[makeValue] ? value : "";
    } else if (name === "availableSeats") {
      const intValue = parseInt(value, 10);
      formattedValue = isNaN(intValue) ? 1 : Math.max(1, Math.min(8, intValue));
    }

    setFormData((prevData) => ({ ...prevData, [name]: formattedValue }));

    if (e.target.type === "submit") {
      setFormData((prevData) => ({
        ...prevData,
      }));
    }
  };

  // const handleTimeChange = (e) => {
  //   const { name, value } = e.target;
  //   let formattedValue = value;

  //   const selectedTime = new Date(`2000-01-01T${formattedValue}`);
  //   const roundedMinutes = Math.round(selectedTime.getMinutes() / 15) * 15;
  //   selectedTime.setMinutes(roundedMinutes);

  //   const formattedTime = selectedTime.toLocaleTimeString([], {
  //     hour: "2-digit",
  //     minute: "2-digit",
  //   });

  //   setFormData((prevData) => ({ ...prevData, [name]: formattedTime }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newTrip = {
      from: formData.from,
      to: formData.to,
      message: formData.message,
      date: formData.date.toISOString().split("T")[0],
      make: formData.make,
      model: formData.model,
      availableSeats: formData.availableSeats,
      reg: formData.reg,
      music: formData.music,
      user: loggedInUserId,
      username: tripUsername,
    };

    try {
      console.log(newTrip);
      console.log(`${apiEnv}/addtrip`);
      const response = await fetch(`${apiEnv}/addtrip`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTrip),
      });

      await response.json();
      alert("Trip posted successfully");

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setTrips((prevTrips) => [...prevTrips, newTrip]);

      setFormData((prevData) => ({
        ...prevData,
        from: "",
        to: "",
        message: "",
        date: "",
        make: "",
        model: "",
        availableSeats: "",
        reg: "",
        music: "",
      }));
    } catch (error) {
      console.error("Error creating trip:", error);
      alert(`Failed to create trip. Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // const timeOptions = Array.from({ length: 24 * 4 }, (_, index) => {
  //   const hours = Math.floor(index / 4);
  //   const minutes = (index % 4) * 15;
  //   const formattedTime = `${String(hours).padStart(2, "0")}:${String(
  //     minutes
  //   ).padStart(2, "0")}`;
  //   return (
  //     <option key={formattedTime} value={formattedTime}>
  //       {formattedTime}
  //     </option>
  //   );
  // });

  const formDataIsIncomplete = () => {
    const { from, to, date, make, model, reg, availableSeats, message, music } =
      formData;

    return (
      !from ||
      !to ||
      !date ||
      !make ||
      !model ||
      !reg ||
      !availableSeats ||
      !message ||
      !music
    );
  };

  return (
    <>
      <div className="sm:mt-8 mt-2 max-w-2xl mx-auto p-2">
        <h1 className="text-lg font-md">Create trip</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-2 p-2">
          <LocationInput
            label="From"
            name="from"
            value={formData.from}
            onChange={handleChange}
            setFormData={setFormData}
          />
          <LocationInput
            label="To"
            name="to"
            value={formData.to}
            onChange={handleChange}
            setFormData={setFormData}
          />
          <div className="flex space-x-4 mb-4">
            <div className="w-1/2">
              <label
                htmlFor="date"
                className="block text-sm font-md text-gray-700">
                Date
              </label>
              <DatePicker
                selected={formData.date}
                onChange={(date) =>
                  setFormData((prevData) => ({ ...prevData, date }))
                }
                placeholderText="MM/DD/YYYY"
                wrapperClassName="w-full"
                className="input-field border p-2 rounded-md w-full h-10"
                minDate={new Date()}
              />
            </div>

            <div className="w-1/2">
              <label
                htmlFor="reg"
                className="block text-sm font-md text-gray-700">
                Reg. no
              </label>
              <input
                type="text"
                id="reg"
                name="reg"
                value={formData.reg}
                onChange={handleChange}
                className="input-field border p-2 rounded-md w-full"
                maxLength={6}
                pattern="[a-zA-Z]{3}\d{2}[a-zA-Z\d]{1}"
                title="Please follow the patterns ABC123/ABC12X"
                placeholder="ex. ABC123"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="w-1/2">
              <label
                htmlFor="make"
                className="block text-sm font-md text-gray-700">
                Make
              </label>
              <select
                id="make"
                name="make"
                value={formData.make}
                onChange={(e) =>
                  handleChange({
                    target: { name: e.target.name, value: e.target.value },
                  })
                }
                className="input-field border p-2 rounded-md w-full h-10">
                <option value="" disabled>
                  Make
                </option>
                {makes.map((make) => (
                  <option key={make} value={make}>
                    {make}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-1/2">
              <label
                htmlFor="model"
                className="block text-sm font-md text-gray-700">
                Model
              </label>
              <select
                id="model"
                name="model"
                value={formData.model}
                onChange={handleChange}
                className="input-field border p-2 rounded-md w-full h-10">
                <option value="" disabled>
                  Model
                </option>
                {formData.make &&
                  models[formData.make].map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="w-1/4">
              <label
                htmlFor="availableSeats"
                className="block text-sm font-md text-gray-700">
                Avail. Seats
              </label>
              <input
                type="number"
                id="availableSeats"
                name="availableSeats"
                value={formData.availableSeats}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  handleChange({
                    target: {
                      name: e.target.name,
                      value: value > 0 ? value : 1,
                    },
                  });
                }}
                className="input-field border p-2 rounded-md w-full h-10"
                min={1}
                max={8}
                maxLength={1}
                pattern="[1-8]"
                placeholder="Max 8"
              />
            </div>
            <div className="w-3/4">
              <label
                htmlFor="music"
                className="block text-sm font-md text-gray-700">
                Music
              </label>
              <select
                id="music"
                name="music"
                value={formData.music}
                onChange={handleChange}
                className="input-field border p-2 rounded-md w-full h-10">
                <option value="" disabled>
                  Music
                </option>
                <option value="Pop Extravaganza">Pop Extravaganza</option>
                <option value="Rock 'n' Roll">Rock &apos;n&apos; Roll</option>
                <option value="Hip-Hop Grooves">Hip-Hop Grooves</option>
                <option value="Jazzy Jams">Jazzy Jams</option>
                <option value="Bluesy Beats">Bluesy Beats</option>
                <option value="Classical Elegance">Classical Elegance</option>
                <option value="Electronic Waves">Electronic Waves</option>
                <option value="Rhythmic & Blues">Rhythmic & Blues</option>
                <option value="Country Roads">Country Roads</option>
                <option value="Indie Vibes">Indie Vibes</option>
                <option value="Folky Feels">Folky Feels</option>
                <option value="Reggae Rhythms">Reggae Rhythms</option>
                <option value="Latin Heat">Latin Heat</option>
                <option value="Metal Mayhem">Metal Mayhem</option>
                <option value="Alternative Adventures">
                  Alternative Adventures
                </option>
                <option value="No music">No music</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-sm font-md text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="input-field h-24 border p-2 rounded-md w-full"
              maxLength={400}
              placeholder="Write a message. Max 400 characters."
            />
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className={`submit-button ${
                loading
                  ? "bg-primary-100"
                  : formDataIsIncomplete()
                  ? "bg-primary-100"
                  : "bg-secondary-500 hover:bg-secondary-700"
              } text-white p-4 py-2 rounded-full focus:outline-none focus:ring focus:border-blue-300`}
              disabled={loading || formDataIsIncomplete()}>
              {loading ? "Generating..." : "Create Trip"}
            </button>
          </div>
        </form>

        {trips.length > 0 && (
          <div className="mt-8 space-y-4">
            {trips.reverse().map((trip) => (
              <div
                key={trip.id}
                className="grid grid-cols-12 gap-2 p-4 rounded-lg relative">
                <div className="col-span-12 text-md border rounded-lg p-4 sm:text-xl">
                  You have created a trip from {trip.from} to {trip.to} on{" "}
                  {trip.date}. Your vehicle of choice is a {trip.make}{" "}
                  {trip.model} with reg. no {trip.reg}. You have{" "}
                  {trip.availableSeats} free seat(s) and {trip.music} best
                  describes what music will be played. Your message is:{" "}
                  {trip.message}
                </div>

                <div className="col-span-12 flex items-center justify-center">
                  <Link
                    to="/trips"
                    className="text-blue-500 hover:text-blue-700 focus:outline-none focus:ring focus:border-blue-300">
                    See list of trips
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
