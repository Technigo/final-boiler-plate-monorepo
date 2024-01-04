import { useState, useEffect } from "react";
import { LocationInput } from "./LocationInput";
import { makes, models } from "./CarData";

export const TripGenerator = () => {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    message: "",
    date: "",
    time: "",
    make: "",
    model: "",
    availableSeats: "",
    reg: "",
  });

  const [trips, setTrips] = useState(() => {
    const storedTrips = localStorage.getItem("trips");
    return storedTrips ? JSON.parse(storedTrips) : [];
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("trips", JSON.stringify(trips));
  }, [trips]);

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
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    const selectedTime = new Date(`2000-01-01T${formattedValue}`);
    const roundedMinutes = Math.round(selectedTime.getMinutes() / 15) * 15;
    selectedTime.setMinutes(roundedMinutes);

    const formattedTime = selectedTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setFormData((prevData) => ({ ...prevData, [name]: formattedTime }));
  };

  const clearLocalStorage = () => {
    localStorage.clear();
    setTrips([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const newTrip = {
      id: Date.now(),
      from: formData.from,
      to: formData.to,
      message: formData.message,
      date: formData.date,
      time: formData.time,
      make: formData.make,
      model: formData.model,
      availableSeats: formData.availableSeats,
      reg: formData.reg,
    };

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setTrips((prevTrips) => [...prevTrips, newTrip]);

    setFormData((prevData) => ({
      ...prevData,
      from: "",
      to: "",
      message: "",
      date: "",
      time: "",
      make: "",
      model: "",
      availableSeats: "",
      reg: "",
    }));

    setLoading(false);
  };

  const timeOptions = Array.from({ length: 24 * 4 }, (_, index) => {
    const hours = Math.floor(index / 4);
    const minutes = (index % 4) * 15;
    const formattedTime = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}`;
    return (
      <option key={formattedTime} value={formattedTime}>
        {formattedTime}
      </option>
    );
  });

  return (
    <div className="mt-8 max-w-2xl mx-auto p-2">
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

        <div className="flex space-x-4">
          <div className="w-1/2">
            <label
              htmlFor="date"
              className="block text-sm font-md text-gray-700">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="input-field border p-2 rounded-md w-full h-10"
            />
          </div>

          <div className="w-1/2">
            <label
              htmlFor="time"
              className="block text-sm font-md text-gray-700">
              Time
            </label>
            <select
              id="time"
              name="time"
              value={formData.time}
              onChange={handleTimeChange}
              className="input-field border p-2 rounded-md w-full h-10">
              {timeOptions}
            </select>
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
              className="input-field border p-2 rounded-md w-full">
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
              className="input-field border p-2 rounded-md w-full">
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

        <div className="flex space-x-4 mb-4">
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
              placeholder="e.g. ABC123"
            />
          </div>

          <div className="w-1/2">
            <label
              htmlFor="availableSeats"
              className="block text-sm font-md text-gray-700">
              Available Seats
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
              className="input-field border p-2 rounded-md w-full"
              min={1}
              max={8}
              maxLength={1}
              pattern="[1-8]"
              placeholder="Max 8"
            />
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

        <button
          type="submit"
          className="submit-button bg-rose-500 text-white p-4 rounded-md hover:bg-rose-700 focus:outline-none focus:ring focus:border-blue-300"
          disabled={loading}>
          {loading ? "Generating..." : "Create Trip"}
        </button>
      </form>

      <button
        onClick={clearLocalStorage}
        className="clear-button bg-violet-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-lime-700 focus:outline-none focus:ring focus:border-red-300">
        Clear Local Storage
      </button>

      {trips.length > 0 && (
        <div className="mt-8 space-y-4">
          <h1 className="text-lg font-md">Available Trips</h1>
          {trips.reverse().map((trip) => (
            <div
              key={trip.id}
              className="grid grid-cols-12 gap-2 p-4 bg-emerald-100 rounded-lg">
              <div className="col-span-6 text-xs text-emerald-900">FROM</div>
              <div className="col-span-6 text-xs text-emerald-900">TO</div>
              <div className="col-span-6 p-4 flex items-center justify-center text-center bg-emerald-900 text-white text-md sm:text-2xl sm:p-4 font-semibold">
                {trip.from}
              </div>
              <div className="col-span-6 p-4 flex items-center justify-center text-center bg-emerald-900 text-white text-md sm:text-2xl sm:p-4 font-semibold">
                {trip.to}
              </div>
              <div className="col-span-5 text-xs mt-2 text-emerald-900">
                DATE
              </div>
              <div className="col-span-2 text-xs mt-2 text-emerald-900">
                TIME
              </div>
              <div className="col-span-5 text-xs mt-2 text-emerald-900">
                DRIVER
              </div>
              <div className="col-span-5 bg-emerald-400 p-4 flex items-center justify-center text-center text-md sm:text-xl text-emerald-900">
                {trip.date}
              </div>

              <div className="col-span-2  bg-emerald-400 p-4 flex items-center justify-center text-center text-md sm:text-xl text-emerald-900">
                {trip.time}
              </div>
              <div className="col-span-5 p-4 flex items-center justify-center text-center text-md sm:text-xl text-emerald-900">
                User01234567
              </div>
              <div className="col-span-4 text-xs mt-2 text-emerald-900">
                MAKE
              </div>
              <div className="col-span-4 text-xs mt-2 text-emerald-900">
                MODEL
              </div>
              <div className="col-span-4 text-xs mt-2 text-emerald-900">
                REG. NO
              </div>
              <div className="col-span-4 bg-emerald-200 p-4 flex items-center justify-center text-center text-sm sm:text-xl text-emerald-900 truncate">
                {trip.make}
              </div>
              <div className="col-span-4 bg-emerald-200 p-4 flex items-center justify-center text-center text-sm sm:text-xl text-emerald-900">
                {trip.model}
              </div>
              <div className="col-span-4 bg-white p-0 flex items-center justify-center text-center text-lg sm:text-2xl font-semibold rounded-md border-2 border-gray-500">
                {trip.reg}
              </div>
              <div className="col-span-12 text-xs mt-2 text-emerald-900">
                MESSAGE
              </div>
              <div className="col-span-12 p-4 flex items-left justify-left text-sm sm:text-lg text-left text-emerald-900">
                {trip.message}
              </div>
              <div className="col-span-7 text-xs mt-2 text-emerald-900">
                CO-PASSENGERS
              </div>
              <div className="col-span-5 text-xs mt-2 text-emerald-900">
                FREE SEATS
              </div>
              <div className="col-span-7 text-md sm:text-xl p-4 flex items-center justify-left text-left">
                User1, User2, User3
              </div>
              <div className="col-span-2 bg-white p-4 flex items-center justify-center text-center text-emerald-900 text-lg sm:text-xl">
                {trip.availableSeats}
              </div>
              <div className="col-span-3">
                <button
                  type="button"
                  className="submit-button bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-700 focus:outline-none focus:ring focus:border-blue-300 h-full w-full">
                  Join
                </button>
              </div>
              <div className="col-span-12 mt-2 text-xs text-right text-emerald-900">
                TRIP ID {trip.id}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
