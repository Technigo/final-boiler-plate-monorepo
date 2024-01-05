export const Trip = () => {
  return (
    <div className="container rounded-lg p-4 bg-gray-100 mt-8 space-y-4 mx-auto">

      <div className="mb-4 p-2">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6 text-xs">From</div>
          <div className="col-span-6 text-xs">To</div>
          <div className="col-span-6 text-lg sm:text-4xl">
            Skinnskatteberg
          </div>
          <div className="col-span-6 text-lg sm:text-4xl">
            Upplands Väsby
          </div>
        </div>
      </div>

      <div className="mb-4 p-2">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-5 text-xs">Date</div>
          <div className="col-span-4 text-xs">Time</div>
          <div className="col-span-3 text-xs">Avail. seats</div>
          <div className="col-span-5 text-lg sm:text-2xl">
            2024-03-03
          </div>
          <div className="col-span-4 text-lg sm:text-2xl">
            22:45
          </div>
          <div className="col-span-3 text-lg sm:text-2xl">2</div>
        </div>
      </div>

      <div className="mb-4 p-2">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4 text-xs">Make</div>
          <div className="col-span-4 text-xs">Model</div>
          <div className="col-span-4 text-xs">Reg. no</div>
          <div className="col-span-4 text-md  sm:text-xl">Mercedes-Benz</div>
          <div className="col-span-4 text-md  sm:text-xl">
            Aventador
          </div>
          <div className="col-span-4 text-md  sm:text-xl">GHT655</div>
        </div>
      </div>

      <div className="mb-4 p-2">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6 text-xs">Driver</div>
          <div className="col-span-6 text-xs">Co-passengers</div>
          <div className="col-span-6 sm:text-lg">Sune1234567</div>
          <div className="col-span-6 sm:text-lg">
            gladpack, SantaKlas, BeritJ
          </div>
        </div>
      </div>

      <div className="mb-4 p-2">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 text-xs">Message</div>
          <div className="col-span-12 sm:text-lg">
            Ut illo nihil eum reiciendis quasi vel ipsam rerum. Nam dignissimos
            omnis ad omnis facere est omnis ipsa et quia unde. Ut atque expedita
            qui nobis dolores.
          </div>
        </div>
      </div>

      <div className="mb-4 p-2">
  <div className="grid grid-cols-12 gap-2">
    <div className="col-span-12 text-xs">Chat</div>
    <div className="col-span-3 flex items-center justify-center text-xs sm:text-lg">
  Sune1234567
</div>
    <div className="col-span-9 sm:text-lg bg-gray-300 p-4 rounded-2xl">Hello! 🚗🎉</div>
    <div className="col-span-9 sm:text-lg bg-gray-200 p-4 rounded-2xl">Ut illo nihil eum reiciendis quasi vel ipsam rerum. Nam dignissimos
            omnis ad omnis facere est omnis ipsa et quia unde. Ut atque expedita
            qui nobis dolores.</div>
    <div className="col-span-3 flex items-center justify-center text-xs sm:text-lg">BeritJ</div>

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
</div>

        </div>
      </div>
    </div>
  );
};
