export const Hero = () => {
  return (
    <div className="relative bg-cover bg-center h-screen flex items-center justify-center p-8">
      <div className="absolute inset-0 bg-emerald-300"></div>
      <div className="max-w-4xl mx-auto text-white text-center z-10">
        <h1 className="text-primary text-4xl sm:text-6xl font-bold mb-4 leading-relaxed">
          Be the driver of positive change. Discover an efficient way to travel,
          connect, and save.{" "}
        </h1>
        <p>
          <button
            type="button"
            className="submit-button bg-rose-500 text-white px-4 py-2 rounded-full hover:bg-rose-700 focus:outline-none focus:ring focus:border-blue-300 text-xl">
            Join us
          </button>
        </p>
      </div>
    </div>
  );
};
