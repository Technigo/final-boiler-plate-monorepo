export const Logo = ({ size = "md" }: { size?: "lg" | "md" }) => {
  return (
    <h2
      className={`font-display ${
        size === "md" ? "text-5xl xl:text-6xl" : "text-6xl xl:text-8xl"
      } text-center font-bold`}
    >
      GENGO
    </h2>
  );
};
