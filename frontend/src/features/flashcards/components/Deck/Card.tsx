import { Link } from "react-router-dom";

import { CategoryLabel } from "../Category/CategoryLabel";
import { DeckType } from "../../../../types/flashcardTypes";
import { EditBtn } from "../../../../ui/buttons/EditBtn";

import { EditDeckModal } from "./EditDeckModal";
import { DeleteBtn } from "../../../../ui/buttons/DeleteBtn";
import { useDeleteDeck } from "../../hooks/deck/useDeleteDeck";
import { CheckButton } from "../../../../ui/buttons/CheckButton";
import { useEditDeck } from "../../hooks/deck/useEditDeck";
import { useChooseCategoryColor } from "../../hooks/category/useChooseCategoryColor";

import { bgColors } from "../../../../statics/colors";
import { CustomDialog } from "../../../../ui/generic/CustomDialog";
import { useRecoilState } from "recoil";
import { modalConfirmIdState, modalIDstate } from "../../../../states/atoms/commonAtoms";
import { ModalConfirm } from "../../../../ui/generic/ModalConfirm";

export const Card = ({ card, index }: { card: DeckType; index: number }) => {
  const [modalId, setModalId] = useRecoilState(modalIDstate);
  const [modalConfirmId, setModalConfirmId] = useRecoilState(modalConfirmIdState);

  //hooks for api
  const { deleteDeck, isDeleting } = useDeleteDeck();
  const { editDeck } = useEditDeck();
  const cardCategory = card?.category?.category;
  const categoryBgColor = useChooseCategoryColor(cardCategory);

  //handlers
  const handelDeleteDeck = () => {
    if (card._id === undefined) return;
    deleteDeck(card._id);
  };

  const handleChecked = () => {
    const id = card._id;
    if (id === undefined) return;
    const newData = { isChecked: !card.isChecked };
    editDeck({ id, newData });
  };

  return (
    <div className="relative">
      <div className="bg-yellow-default text-white w-5 h-10 transition ease duration-100 hover:brightness-95 absolute top-5 -right-5 z-10 flex justify-center items-center rounded-tr-md rounded-br-md">
        <EditBtn handleEdit={() => setModalId(`edit-deck-${card._id}`)} size="16px text-white" />
      </div>
      <div className="bg-red-default text-white w-5 h-10 transition ease duration-100 hover:brightness-95 absolute bottom-[70px] -right-5 z-10 flex justify-center items-center rounded-tr-md rounded-br-md">
        <DeleteBtn
          handleDelete={() => setModalConfirmId(`delete-deck-${card._id}`)}
          color="#fff"
          size="16px"
        />
      </div>
      <div
        className={`${
          card.isChecked ? "bg-blue-dark" : "bg-blue-light"
        } text-white w-5 h-10 transition ease duration-100 hover:brightness-95 absolute bottom-5 -right-5 z-10 flex justify-center items-center rounded-tr-md rounded-br-md`}
      >
        <CheckButton
          handleCheck={handleChecked}
          color="#fff"
          size="16px"
          isChecked={card.isChecked}
        />
      </div>
      <Link
        to={`/deck/${card._id}`}
        className="group relative block  h-44 w-[280px] sm:w-[310px] xl:w-[360px] shadow-lg"
      >
        <span
          className={`absolute inset-0 border-[0.5px] border-dashed border-black ${bgColors[index]} rounded`}
        ></span>

        <div className="relative h-full transform border-[0.5px] border-black bg-amber-50  rounded transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1">
          <div className="p-2 transition-opacity sm:p-6 lg:p-4 h-full flex flex-col justify-between">
            {card.category ? (
              <CategoryLabel category={card?.category?.category} bgColor={categoryBgColor?.color} />
            ) : (
              <p></p>
            )}
            <h2 className="text-xl font-medium sm:text-2xl">{card.title}</h2>
            <div className="flex justify-between">
              <small>{card?.cards?.length} cards</small>
              <small>created at: {card.createdAt.toString().split("T")[0]}</small>
            </div>
          </div>
        </div>
      </Link>
      {modalId === `edit-deck-${card._id}` && (
        <CustomDialog id={`edit-deck-${card._id}`} header="Edit Deck">
          <EditDeckModal id={card._id} title={card.title} category={card?.category?._id} />
        </CustomDialog>
      )}
      {modalConfirmId === `delete-deck-${card._id}` && (
        <ModalConfirm
          header="Delete This Deck"
          onClick={handelDeleteDeck}
          isLoading={isDeleting}
          id={`delete-deck-${card._id}`}
        />
      )}
    </div>
  );
};
