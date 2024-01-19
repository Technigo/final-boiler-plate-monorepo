import { Link } from "react-router-dom";

export const ButtonOutline = ({
  name,
  bg,
  path = "#",
  type = "link",
  onClick,
}: {
  name: string;
  bg: string;
  path?: string;
  type?: string;
  onClick?: () => void;
}) => {
  const styleLink = "group relative block h-14 w-[180px] mx-auto shadow-lg mb-8";

  if (type === "a") {
    return (
      <a href={path} className={styleLink} onClick={onClick}>
        <ButtonInnerEl name={name} bg={bg} />
      </a>
    );
  }

  return (
    <Link to={path} className={styleLink} onClick={onClick}>
      <ButtonInnerEl name={name} bg={bg} />
    </Link>
  );
};

function ButtonInnerEl({ name, bg }: { name: string; bg: string }) {
  return (
    <>
      <span
        className={`absolute inset-0 border-[0.5px] border-dashed border-black rounded-md inline ${bg}`}
      ></span>

      <div className="relative h-full flex justify-center items-center  rounded-md transform border-[0.5px] border-black bg-amber-50 transition-transform group-hover:-translate-y-0.5  group-hover:-translate-x-0.5 sm:group-hover:-translate-x-1 sm:group-hover:-translate-y-1">
        <div className="p-1.5 transition-opacity group-hover:absolute lg:p-2 ">
          <p className="text-lg lg:text-2xl font-display  text-center">{name}</p>
        </div>
      </div>
    </>
  );
}
