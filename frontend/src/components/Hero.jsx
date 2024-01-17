import { LoginBtn } from "./LoginBtn";

export const Hero = () => {
  return (
    <div className="relative bg-cover bg-center h-screen flex items-center justify-center p-8">
      <div className="absolute inset-0 bg-background"></div>
      <div className="max-w-4xl mx-auto text-white text-center z-10">
        <h1 className="text-primary text-6xl sm:text-8xl font-extrabold mb-8">
          From A to Beyond
        </h1>
        <h3 className="text-primary text-2xl sm:text-4xl font-semibold mb-8 leading-tight">
          Step into a new era of travel. Enjoy the ease of carefree rides,
          turning every journey into an opportunity for new connections and
          lasting memories. With us, it becomes more than just getting from one
          place to another
        </h3>
        <LoginBtn />
      </div>
    </div>
  );
};
