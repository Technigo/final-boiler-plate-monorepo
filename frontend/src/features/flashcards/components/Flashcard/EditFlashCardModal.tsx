import { useState } from "react";
import { useEditFlashcard } from "../../hooks/flashcard/useEditFlashcard";

import { Label } from "../../../../ui/shadcn/Label";
import { ButtonSubmit } from "../../../../ui/buttons/ButtonSubmit";
import Editer from "../../../../ui/generic/Editer/Editer";

type Props = {
  question: string;
  answer: string;
  id: string | undefined;
};
export const EditFlashCardModal = ({ question, answer, id }: Props) => {
  const [questionValue, setQuestionValue] = useState(question);
  const [answerValue, setAnswerValue] = useState(answer);
  const { isEditing, editFlashcard } = useEditFlashcard();

  const handleEdit = () => {
    if (id === undefined) return;
    if (questionValue === "" || answerValue == "") return alert("Please fill answer and question");
    const newData = { question: questionValue, answer: answerValue };
    editFlashcard({ id, newData });
  };

  return (
    <>
      <div className="px-2 overflow-x-scroll overflow-y-clip h-max relative scrollbar">
        <div className="flex justify-between  w-max h-[440px] py-3 gap-4">
          <div className="flex flex-col gap-2  w-[440px]">
            <Label htmlFor="question" className="text-xs sm:text-sm font-semibold">
              Question
            </Label>
            <Editer onSetValue={setQuestionValue} defaultValue={questionValue} />
          </div>
          <div className="flex flex-col gap-2  w-[440px]">
            <Label htmlFor="answer" className="text-xs sm:text-sm  font-semibold">
              Answer
            </Label>
            <Editer onSetValue={setAnswerValue} defaultValue={answerValue} />
          </div>
        </div>
      </div>
      <ButtonSubmit isLoading={isEditing} text="Edit" onClick={handleEdit} />
    </>
  );
};
