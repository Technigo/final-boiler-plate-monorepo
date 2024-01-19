import { Link } from "react-router-dom";
import { Button } from "../../shadcn/Button";

export const LinkButton = ({
  text,
  color,
  type,
  path,
}: {
  text: string;
  color?: string;
  type: string;
  path: string;
}) => {
  const style = `bg-${color}-default font-display text-white sm:text-2xl md:text-3xl rounded-full px-2 sm:px-4 md:px-5 py-1 transition font-semibold shadow-md  hover:translate-y-1`;

  if (type === "link")
    return (
      <Button asChild className={style}>
        <Link to={path}>{text}</Link>
      </Button>
    );
  return (
    <Button asChild className={style}>
      <a href={path}>{text}</a>
    </Button>
  );
};
