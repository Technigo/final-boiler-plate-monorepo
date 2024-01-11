import { LoginBtn } from "./LoginBtn";

export const Hero = () => {
  return (
    <div className="relative bg-cover bg-center h-screen flex items-center justify-center p-8">
      <div className="absolute inset-0 bg-emerald-300"></div>
      <div className="max-w-4xl mx-auto text-white text-center z-10">
        <h1 className="text-primary text-4xl sm:text-6xl font-bold mb-4 leading-tight">
          H1
        </h1>
        <h3 className="text-primary text-2xl sm:text-4xl font-bold mb-4 leading-tight">
          H3
        </h3>
        <LoginBtn />
      </div>
    </div>
  );
};
