import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useMemo } from "react";

import {
  allDecksPerPageState,
  categoriesState,
  currentFlashCardPageNumState,
  flashcardsNumsPerPage,
  searchQueryCategory,
  searchQueryCreatedAt,
  searchQueryStatus,
} from "../../../../states/atoms/flashcardAtoms";

import { EditBtn } from "../../../../ui/buttons/EditBtn";
import { modalIDstate, modalState } from "../../../../states/atoms/commonAtoms";
import { Pagination } from "../Deck/Pagination";
import { EditCategoryInputField } from "../Category/EditCategoryInputField";
import { CreateDeckInputField } from "../Deck/CreateDeckInputField";
import { SelectCategory } from "../Category/SelectCategory";
import { useDecksWithCategory } from "../../hooks/deck/useDecksWithCategory";
import { Error } from "../../../../ui/generic/Error";
import { DeckType } from "../../../../types/flashcardTypes";
import { Card } from "../Deck/Card";
import { Spinner } from "../../../../ui/generic/Spinner";
import { useCategory } from "../../hooks/category/useCategory";
import { CustomDialog } from "../../../../ui/generic/CustomDialog";
import { Button } from "../../../../ui/shadcn/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../ui/shadcn/Slect";

export const FlashcardsBoard = () => {
  const setCategories = useSetRecoilState(categoriesState);

  // for search query
  const [queryStatus, setSearchQueryStatus] = useRecoilState(searchQueryStatus);
  const [queryCreatedAt, setSearchQueryCreatedAt] = useRecoilState(searchQueryCreatedAt);
  const queryCategory = useRecoilValue(searchQueryCategory);

  // for pagination
  const currentPage = useRecoilValue(currentFlashCardPageNumState);
  const cardsNumPerPage = useRecoilValue(flashcardsNumsPerPage);

  // for modal
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalState);
  const [modalID, setModalID] = useRecoilState(modalIDstate);

  const setCards = useSetRecoilState(allDecksPerPageState);

  // create query to fetch data each time a button is clicked (sort/page transition)

  const query = useMemo(
    () =>
      `page=${currentPage}&limit=${cardsNumPerPage}${
        queryStatus !== "" ? "&isDone=" + queryStatus : ""
      }${queryCreatedAt !== "" ? "&sort=" + queryCreatedAt : ""}`,
    [currentPage, cardsNumPerPage, queryStatus, queryCreatedAt]
  );

  const { isPending, decksWithQuery, error } = useDecksWithCategory(queryCategory, query);
  const { isPending: isCategoryPending, categories, error: categoryError } = useCategory();

  if (isPending || isCategoryPending) return <Spinner />;
  if (error || categoryError) return <Error />;

  const decksWithQueries: DeckType[] = decksWithQuery.data ? decksWithQuery?.data?.deck : [];
  setCards(decksWithQueries);
  categories && setCategories(categories);

  const handleSetQuery = (value: string, label: string) => {
    const handler = label === "status" ? setSearchQueryStatus : setSearchQueryCreatedAt;
    const sortedValue = label === "status" && value === "false" ? "" : value;
    handler(sortedValue);
  };

  return (
    <>
      <div className="w-full mx-auto min-h-full">
        <h2 className="font-jp font-thin text-xl md:text-2xl text-blue-dark text-center w-full mb-2">
          フラッシュカード
        </h2>
        <div className="flex justify-around w-fit mx-auto p-2 gap-2.5 mb-6 md:mb-10 sm:p-6 sm:gap-3  rounded ">
          <div className="flex flex-col lg:flex-row gap-2 sm:gap-3">
            <div className="flex flex-col gap-2">
              <label className="text-xs md:text-sm font-semibold">Status</label>
              <Select
                value={queryStatus}
                onValueChange={(value) => handleSetQuery(value, "status")}
              >
                <SelectTrigger className="w-[140px] sm:w-[180px]">
                  <SelectValue placeholder="status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Done</SelectItem>
                  <SelectItem value="false">Not Yet</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs md:text-sm font-semibold">Created Date</label>
              <Select
                value={queryCreatedAt}
                onValueChange={(value) => handleSetQuery(value, "createdAt")}
              >
                <SelectTrigger className="w-[140px] sm:w-[180px]">
                  <SelectValue placeholder="Created Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="-createdAt">Newer</SelectItem>
                  <SelectItem value="createdAt">Older</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col  lg:flex-row  justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex justify-start gap-2">
                <label className="text-xs md:text-sm font-semibold">Catergory</label>
                <EditBtn
                  size="text-sm sm:text-base"
                  handleEdit={() => {
                    setIsModalOpen(true);
                    setModalID("edit_category");
                  }}
                />
              </div>
              <SelectCategory key="searchBoard" type="search" />
            </div>
            <Button
              className="mt-4 sm:mt-0 lg:self-end lg:ml-3"
              onClick={() => {
                setIsModalOpen(true);
                setModalID("create_deck");
              }}
            >
              Create a New Deck
            </Button>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-10 gap-x-14 justify-items-center w-fit mx-auto">
          {decksWithQueries.length !== 0 ? (
            decksWithQueries?.map((card, i) => <Card card={card} key={i} index={i} />)
          ) : (
            <p className="pt-6 text-sm sm:text-base">Please Add Deck</p>
          )}
        </div>
        <div className="w-full flex justify-center pt-8">
          <Pagination />
        </div>
      </div>
      {isModalOpen && modalID === "edit_category" && (
        <CustomDialog id="edit_category" header="Edit Category">
          <EditCategoryInputField categories={categories} />
        </CustomDialog>
      )}

      {isModalOpen && modalID === "create_deck" && (
        <CustomDialog id="create_deck" header="Create New Deck">
          <CreateDeckInputField />
        </CustomDialog>
      )}
    </>
  );
};
