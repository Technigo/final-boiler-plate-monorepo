import { useState, useEffect } from "react";

export const TripGenerator = () => {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    description: "",
    date: "",
    time: "",
    vehicle: "",
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
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.from ||
      !formData.to ||
      !formData.description ||
      !formData.date ||
      !formData.time ||
      !formData.vehicle ||
      !formData.availableSeats ||
      !formData.reg
    ) {
      alert("Please fill out all fields");
      return;
    }

    setLoading(true);

    const newTrip = {
      id: Date.now(),
      from: formData.from,
      to: formData.to,
      description: formData.description,
      date: formData.date,
      time: formData.time,
      vehicle: formData.vehicle,
      availableSeats: formData.availableSeats,
      reg: formData.reg,
    };

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setTrips([...trips, newTrip]);

    setFormData({
      from: "",
      to: "",
      description: "",
      date: "",
      time: "",
      vehicle: "",
      availableSeats: "",
      reg: "",
    });

    setLoading(false);
  };

  const clearLocalStorage = () => {
    localStorage.clear();
    setTrips([]);
  };

  return (
    <div className="mt-10 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="from"
            className="block text-sm font-medium text-gray-700">
            From:
          </label>
          <input
            type="text"
            id="from"
            name="from"
            value={formData.from}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="to"
            className="block text-sm font-medium text-gray-700">
            To:
          </label>
          <input
            type="text"
            id="to"
            name="to"
            value={formData.to}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 resize-none"
          />
        </div>

        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700">
            Date:
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="time"
            className="block text-sm font-medium text-gray-700">
            Time:
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="vehicle"
            className="block text-sm font-medium text-gray-700">
            Vehicle:
          </label>
          <select
            id="vehicle"
            name="vehicle"
            value={formData.vehicle}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
            <option value="">Select...</option>
            <option value="Audi">Audi</option>
            <option value="BMW">BMW</option>
            <option value="Chevrolet">Chevrolet</option>
            <option value="Ford">Ford</option>
            <option value="Honda">Honda</option>
            <option value="Hyundai">Hyundai</option>
            <option value="Jaguar">Jaguar</option>
            <option value="Kia">Kia</option>
            <option value="Land Rover">Land Rover</option>
            <option value="Mazda">Mazda</option>
            <option value="Mercedes-Benz">Mercedes-Benz</option>
            <option value="Nissan">Nissan</option>
            <option value="Porsche">Porsche</option>
            <option value="Subaru">Subaru</option>
            <option value="Tesla">Tesla</option>
            <option value="Toyota">Toyota</option>
            <option value="Volkswagen">Volkswagen</option>
            <option value="Volvo">Volvo</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="availableSeats"
            className="block text-sm font-medium text-gray-700">
            Available Seats:
          </label>
          <select
            id="availableSeats"
            name="availableSeats"
            value={formData.availableSeats}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
            <option value="">Select...</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="reg"
            className="block text-sm font-medium text-gray-700">
            Reg:
          </label>
          <input
            type="text"
            id="reg"
            name="reg"
            value={formData.reg}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
          disabled={loading}>
          {loading ? "Generating..." : "Generate Trip"}
        </button>
      </form>

      <button
        onClick={clearLocalStorage}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:border-red-300">
        Clear Local Storage
      </button>

      {trips.length > 0 && (
        <div className="mt-8 space-y-4">
          <h1 className="text-xl font-bold">Trips</h1>
          {trips.map((trip) => (
            <div key={trip.id} className="bg-blue-50 p-4 rounded-md">
              <h3 className="text-lg font-bold text-gray-900">
                From {trip.from} to {trip.to}
              </h3>
              <p className="text-gray-700 truncate">{trip.description}</p>
              <p className="text-gray-500 mt-1">Date: {trip.date}</p>
              <p className="text-gray-500 mt-1">Time: {trip.time}</p>
              <p className="text-gray-500 mt-1">Vehicle: {trip.vehicle}</p>
              <p className="text-gray-900 mt-1 bg-white px-1 rounded-md text-xl font-semibold border border-gray-900 inline-block w-auto">
                {trip.reg}
              </p>
              <p className="text-gray-500 mt-1">
                Available Seats: {trip.availableSeats}
              </p>
              <p className="text-gray-500 mt-1">Users booked on trip: 🟡🟣</p>
              <p className="text-gray-700 text-xs mt-3">Trip ID: {trip.id}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
