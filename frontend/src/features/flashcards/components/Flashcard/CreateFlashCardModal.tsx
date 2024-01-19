import { useState } from "react";
import { useCreateFlashcard } from "../../hooks/flashcard/useCreateFlashcard";
import { Label } from "../../../../ui/shadcn/Label";
import { ButtonSubmit } from "../../../../ui/buttons/ButtonSubmit";
import Editer from "../../../../ui/generic/Editer/Editer";

export const CreateFlashCardModal = ({ id }: { id: string | undefined }) => {
  const [questionValue, setQuestionValue] = useState("");
  const [answerValue, setAnswerValue] = useState("");
  const { isCreating, createFlashcard } = useCreateFlashcard();

  const handleEdit = () => {
    if (id === undefined) return;
    if (questionValue === "" || answerValue == "") return alert("Please fill answer and question");
    const newData = { question: questionValue, answer: answerValue, deck: id };
    createFlashcard(newData);
    setAnswerValue("");
    setQuestionValue("");
  };

  return (
    <>
      <div className="px-2 overflow-x-scroll overflow-y-clip h-max relative scrollbar">
        <div className="flex justify-between  w-max h-[440px] py-3 gap-4">
          <div className=" w-[440px] flex flex-col gap-2">
            <Label htmlFor="question" className="text-xs sm:text-sm font-semibold">
              Question
            </Label>
            <Editer onSetValue={setQuestionValue} defaultValue={questionValue} />
          </div>
          <div className=" w-[440px] flex flex-col gap-2">
            <Label htmlFor="question" className="text-xs sm:text-sm font-semibold">
              Answer
            </Label>
            <Editer onSetValue={setAnswerValue} defaultValue={answerValue} />
          </div>
        </div>
      </div>

      <ButtonSubmit isLoading={isCreating} onClick={handleEdit} text="Add" />
    </>
  );
};
