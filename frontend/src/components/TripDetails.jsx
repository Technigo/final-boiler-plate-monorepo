export const TripDetails = ({ selectedTrip, onClose }) => {
  return (
    <div className="container rounded-lg p-4 bg-gray-100 mt-8 space-y-4 mx-auto max-w-screen-lg">
      <div className="mb-4 p-2">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6 text-xs">From</div>
          <div className="col-span-6 text-xs">To</div>
          <div className="col-span-6 text-lg sm:text-4xl">
            {selectedTrip.from}
          </div>
          <div className="col-span-6 text-lg sm:text-4xl">
            {selectedTrip.to}
          </div>
        </div>
      </div>

      <div className="mb-4 p-2">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-5 text-xs">Date</div>
          <div className="col-span-4 text-xs">Time</div>
          <div className="col-span-3 text-xs">Avail. seats</div>
          <div className="col-span-5 text-lg sm:text-2xl">
            {selectedTrip.date}
          </div>
          <div className="col-span-4 text-lg sm:text-2xl">
            {selectedTrip.time}
          </div>
          <div className="col-span-3 text-lg sm:text-2xl">
            {selectedTrip.availableSeats}
          </div>
        </div>
      </div>

      <div className="mb-4 p-2">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4 text-xs">Make</div>
          <div className="col-span-4 text-xs">Model</div>
          <div className="col-span-4 text-xs">Reg. no</div>
          <div className="col-span-4 text-md  sm:text-xl">
            {selectedTrip.make}
          </div>
          <div className="col-span-4 text-md  sm:text-xl">
            {selectedTrip.model}
          </div>
          <div className="col-span-4 text-md  sm:text-xl">
            {selectedTrip.reg}
          </div>
        </div>
      </div>

      <div className="mb-4 p-2">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6 text-xs">Driver</div>
          <div className="col-span-6 text-xs">Co-passengers</div>
          <div className="col-span-6 sm:text-lg">?</div>
          <div className="col-span-6 sm:text-lg">?</div>
        </div>
      </div>

      <div className="mb-4 p-2">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 text-xs">Message</div>
          <div className="col-span-12 sm:text-lg">{selectedTrip.message}</div>
        </div>
      </div>

      <div className="mb-4 p-2">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 flex justify-center">
            <button
              type="button"
              className="bg-rose-500 text-white px-4 py-2 rounded-full hover:bg-rose-700 focus:outline-none focus:ring focus:border-blue-300">
              Join trip
            </button>
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 ml-4 rounded-full hover:bg-gray-700 focus:outline-none focus:ring focus:border-blue-300">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import PropTypes from "prop-types";

TripDetails.propTypes = {
  selectedTrip: PropTypes.shape({
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    availableSeats: PropTypes.number.isRequired,
    make: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    reg: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};
