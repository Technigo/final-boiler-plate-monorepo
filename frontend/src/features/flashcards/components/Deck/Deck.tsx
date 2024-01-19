import { useState } from "react";
import { useRecoilState } from "recoil";
import { useParams } from "react-router-dom";

import { DeckCard } from "./DeckCard";
import { useDeck } from "../../hooks/deck/useDeck";
import { Error } from "../../../../ui/generic/Error";
import { AddBtn } from "../../../../ui/buttons/AddBtn";
import { CreateFlashCardModal } from "../Flashcard/CreateFlashCardModal";
import { Spinner } from "../../../../ui/generic/Spinner";
import { useChooseCategoryColor } from "../../hooks/category/useChooseCategoryColor";
import { Button } from "../../../../ui/shadcn/Button";
import { modalIDstate } from "../../../../states/atoms/commonAtoms";
import { CustomDialog } from "../../../../ui/generic/CustomDialog";

export const Deck = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [modalId, setModalId] = useRecoilState(modalIDstate);

  const { id } = useParams();
  const { isLoading, deck, error } = useDeck(id);

  const categoryBgColor = useChooseCategoryColor(deck?.data?.deck?.category?.category);

  if (isLoading) return <Spinner />;
  if (error) return <Error />;
  const currentDeck = deck.data.deck;

  return (
    <>
      <div className="pt-3 px-4 flex flex-col justify-between w-full min-h-[300px] md:min-w-[700px] md:min-h-[450px] max-w-[600px]">
        {!isStarted ? (
          <div className="flex h-full items-center flex-col grow justify-center gap-10">
            <h3 className="text-2xl text-center">{currentDeck.title}</h3>

            <Button onClick={() => setIsStarted(true)} className="w-fit mx-auto" size="lg">
              Start
            </Button>
          </div>
        ) : deck.data.deck.cards.length !== 0 ? (
          <DeckCard cards={currentDeck.cards} />
        ) : (
          <div className="w-full h-full flex items-center justify-center grow">
            <div className=" text-base fond-bold ">
              <p>Please add flashcard</p>
            </div>
          </div>
        )}
      </div>

      {/* Flashcard editing bar */}
      <div className="w-full max-w-[600px] mx-auto flex items-center justify-between px-6">
        <div className="grid gap-4">
          {currentDeck?.category?.category && (
            <p
              className={`bg-${
                categoryBgColor?.color ? categoryBgColor.color : "red-light"
              } py-1 px-2 rounded w-fit`}
            >
              {currentDeck?.category?.category}
            </p>
          )}
          <p className="text-xs">Last reviewed: {currentDeck.last_reviewed_date?.split("T")[0]}</p>
        </div>
        <div className="grid justify-items-center gap-2">
          <div className="bg-blue-dark text-white w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition ease duration-100 hover:brightness-95">
            <AddBtn handleEdit={() => setModalId("create-flashcard")} color="#fff" size="24px" />
          </div>
          <span className="text-[8px] sm:text-[10px]">new Flashcard</span>
        </div>
      </div>
      {modalId === "create-flashcard" && (
        <CustomDialog id="create-flashcard" header="Create Flashcard">
          <CreateFlashCardModal id={id} />
        </CustomDialog>
      )}
    </>
  );
};
