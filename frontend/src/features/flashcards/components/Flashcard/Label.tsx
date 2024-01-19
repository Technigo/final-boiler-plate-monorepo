import { updateFlashCard } from "../../../../services/apiFlashcard";
import { Button } from "../../../../ui/shadcn/Button";

export const Label = ({
  label,
  bg,
  id,
  onNextQuestion,
}: {
  label: string;
  bg: string;
  id: string | undefined;
  onNextQuestion: () => void;
}) => {
  const handleClick = async (e: React.SyntheticEvent) => {
    const target = e.target as HTMLButtonElement;
    await updateFlashCard(id, { status: target.value });
    onNextQuestion();
  };
  return (
    <Button
      value={label}
      onClick={handleClick}
      className={`${bg}  text-white hover:brightness-75 text-[10px] sm:text-base px-2.5 sm:px-3.5 sm:py-2 py-0 hover:${bg} uppercase`}
    >
      {label}
    </Button>
  );
};
