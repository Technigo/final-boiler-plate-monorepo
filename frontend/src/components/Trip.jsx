export const Trip = () => {
  return (
    <div className="container rounded-lg p-4 bg-violet-50 mt-8 space-y-4 mx-auto">
      <h1 className="text-xs text-right">Trip 1704382296637</h1>
      <div className="mb-4 p-2 bg-blue-200">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6 text-xs">From</div>
          <div className="col-span-6 text-xs">To</div>
          <div className="col-span-6 text-lg sm:text-4xl bg-yellow-200">
            Skinnskatteberg
          </div>
          <div className="col-span-6 text-lg sm:text-4xl bg-green-200">
            Upplands Väsby
          </div>
        </div>
      </div>

      <div className="mb-4 p-2 bg-purple-200">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-5 text-xs">Date</div>
          <div className="col-span-4 text-xs">Time</div>
          <div className="col-span-3 text-xs">Avail. seats</div>
          <div className="col-span-5 text-lg sm:text-xl bg-indigo-200">
            2024-03-03
          </div>
          <div className="col-span-4 text-lg sm:text-xl  bg-pink-200">
            22:45
          </div>
          <div className="col-span-3 text-lg sm:text-xl  bg-red-200">2</div>
        </div>
      </div>

      <div className="mb-4 p-2 bg-orange-200">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4 text-xs">Make</div>
          <div className="col-span-4 text-xs">Model</div>
          <div className="col-span-4 text-xs">Reg. no</div>
          <div className="col-span-4 text-sm bg-gray-200">Mercedes-Benz</div>
          <div className="col-span-4 text-sm bg-yellow-300">
            DBS Superleggera
          </div>
          <div className="col-span-4 text-sm bg-green-300">GHT655</div>
        </div>
      </div>

      <div className="mb-4 p-2 bg-green-200">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6 text-xs">Driver</div>
          <div className="col-span-6 text-xs">Co-passengers</div>
          <div className="col-span-6 bg-amber-200 p-4">Sune1234567</div>
          <div className="col-span-6 bg-blue-300 p-4">
            gladpack, SantaKlas, BeritJ
          </div>
        </div>
      </div>

      <div className="mb-4 p-2 bg-orange-200">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 text-xs">Message</div>
          <div className="col-span-12 bg-gray-200 p-4">
            Ut illo nihil eum reiciendis quasi vel ipsam rerum. Nam dignissimos
            omnis ad omnis facere est omnis ipsa et quia unde. Ut atque expedita
            qui nobis dolores nam sint optio et ratione natus cum enim quos quo
            eius corrupti? Est dolorem harum est incidunt consequatur ab eveniet
            cupiditate et omnis doloremque et neque sint ad consequatur amet.
          </div>
        </div>
      </div>

      <div className="mb-4 p-2 bg-pink-200">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 text-xs">Chat</div>
          <div className="col-span-3 p-4">Sune1234567</div>
          <div className="col-span-9 bg-gray-200 p-4">Hello! 🚗🎉</div>
          <div className="col-span-3 p-4">BeritJ</div>
          <div className="col-span-9 bg-blue-200 p-4">
            Hi! Can I bring a jazz CD to play in the car?
          </div>
          <div className="col-span-3 p-4">Sune1234567</div>
          <div className="col-span-9 bg-gray-200 p-4">No.</div>
        </div>
      </div>

      <div className="mb-4 p-2 bg-blue-200">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 text-xs">
            <button
              type="button"
              className=" bg-rose-500 text-white px-4 py-2 rounded-full hover:bg-rose-700 focus:outline-none focus:ring focus:border-blue-300">
              Join
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
