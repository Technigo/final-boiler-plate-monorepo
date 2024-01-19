import { useState, useEffect } from "react";
import { Label } from "../Flashcard/Label";
import { EditBtn } from "../../../../ui/buttons/EditBtn";

import { EditFlashCardModal } from "../Flashcard/EditFlashCardModal";
import { DeleteBtn } from "../../../../ui/buttons/DeleteBtn";
import { useDeleteFlashcard } from "../../hooks/flashcard/useDeleteFlashcard";

import { CardType } from "../../../../types/flashcardTypes";
import { Spinner } from "../../../../ui/generic/Spinner";
import { labels, labelsColors } from "../../../../statics/colors";
import { Button } from "../../../../ui/shadcn/Button";
import { useRecoilState } from "recoil";
import { modalConfirmState, modalIDstate } from "../../../../states/atoms/commonAtoms";
import { ModalConfirm } from "../../../../ui/generic/ModalConfirm";
import { CustomDialog } from "../../../../ui/generic/CustomDialog";

export const DeckCard = ({ cards }: { cards: Array<CardType> }) => {
  //card status
  const [isChecked, setIsChecked] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCard, setCurrentCard] = useState<CardType>();
  const [isFinished, setIsFinished] = useState(false);

  //modal
  const [modalId, setModalId] = useRecoilState(modalIDstate);
  const [isOpenModalConfirm, setIsOpenModalConfirm] = useRecoilState(modalConfirmState);

  //hook
  const { deleteFlashcard, isDeleting } = useDeleteFlashcard();

  useEffect(() => {
    if (cards.length === 0 || cards === undefined) return;
    setCurrentCard(cards[currentIndex]);
  }, [cards, setCurrentCard, currentIndex]);

  if (currentCard === undefined) return <Spinner />;
  const { answer, question, status, _id } = currentCard;

  //handlers
  const handleClick = () => {
    if (cards.length === currentIndex + 1) setIsFinished(true);
    if (cards.length > currentIndex + 1) setCurrentIndex((prev) => prev + 1);
    setIsChecked(false);
  };

  const handleDelete = () => {
    deleteFlashcard(_id);
  };

  const handlePlayAgain = () => {
    setCurrentIndex(0);
    setIsFinished(false);
  };

  if (isFinished)
    return (
      <div className="flex flex-col items-center grow justify-center text-center gap-10">
        <p className="text-blue-dark font-semibold text-lg sm:text-xl">
          This deck has no more cards to review
        </p>

        <Button onClick={handlePlayAgain} className=" uppercase">
          Again
        </Button>
      </div>
    );

  return (
    <>
      <div className="w-full py-6 px-2 flex flex-col  items-center gap-10 sm:gap-16 mt-1 relative h-full grow">
        <div className="flex gap-4 items-center absolute top-0 right-0">
          <EditBtn
            handleEdit={() => setModalId(`edit-flashcard/${_id}`)}
            size="text-3xl text-gray-600"
          />
          <DeleteBtn
            handleDelete={() => setIsOpenModalConfirm(true)}
            size="text-[26px] text-gray-600"
          />
        </div>
        <div className="flex flex-col w-full gap-20 min-h-full justify-between items-center h-full grow pt-10">
          {!isChecked ? (
            <>
              <div
                className="text-lg sm:text-xl mt-6 sm:mt-0"
                dangerouslySetInnerHTML={{ __html: question }}
              />
              <Button onClick={() => setIsChecked(true)} className="ml-auto w-fit">
                Check
              </Button>
            </>
          ) : (
            <>
              <div
                className="text-lg sm:text-2xl text-center"
                dangerouslySetInnerHTML={{ __html: answer }}
              />
              <div className="flex gap-2 justify-end  w-full  flex-col">
                <p className="text-sm text-end">last status: {status}</p>
                <div className="flex flex-wrap gap-1 justify-end w-full sm:w-full sm:gap-4 ">
                  {labels.map((label, i) => (
                    <Label
                      key={label}
                      label={label}
                      bg={labelsColors[i]}
                      id={_id}
                      onNextQuestion={handleClick}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {modalId === `edit-flashcard/${_id}` && (
        <CustomDialog header="Edit Flashcard" id={`edit-flashcard/${_id}`}>
          <EditFlashCardModal answer={answer} question={question} id={_id} />
        </CustomDialog>
      )}

      {isOpenModalConfirm && (
        <ModalConfirm
          header="Delete This Flashcard"
          onClick={handleDelete}
          isLoading={isDeleting}
        />
      )}
    </>
  );
};
