import { useRecoilState, useRecoilValue } from "recoil";

import {
  currentFlashCardPageNumState,
  flashcardsNumsPerPage,
  searchQuery,
  searchQueryCategory,
} from "../../../../states/atoms/flashcardAtoms";
import { useDecksDates } from "../../../../hooks/useDatesDecks";
import { useMemo } from "react";
import { Spinner } from "../../../../ui/generic/Spinner";
import { Error } from "../../../../ui/generic/Error";

export const Pagination = () => {
  const query = useRecoilValue(searchQuery);
  const categoryId = useRecoilValue(searchQueryCategory);
  const { isPending, decksDates, error } = useDecksDates(categoryId, query);

  const cardNumPerPage = useRecoilValue(flashcardsNumsPerPage);

  const cardNum: number | undefined = useMemo(() => {
    return decksDates?.data?.deck?.length;
  }, [decksDates]);

  const [currentPage, setCurrentPage] = useRecoilState(currentFlashCardPageNumState);

  if (isPending) return <Spinner />;
  if (error) return <Error />;

  if (cardNum === 0) return null;

  const handleClickRight = () => {
    currentPage < Math.ceil(cardNum / cardNumPerPage) ? setCurrentPage(currentPage + 1) : "";
  };

  const handleClickLeft = () => {
    currentPage > 1 ? setCurrentPage(currentPage - 1) : "";
  };

  return (
    <div className="inline-flex justify-center gap-1">
      <button
        type="button"
        aria-label="go to previous page"
        onClick={handleClickLeft}
        className="inline-flex h-6 w-6 sm:h-8 sm:w-8  items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <div>
        <label htmlFor="PaginationPage" className="sr-only">
          Page
        </label>
        <div
          className="h-6 w-10 sm:h-8 sm:w-12 rounded border border-gray-100 bg-white p-0 text-center text-xs font-medium text-gray-900 flex items-center justify-center"
          id="PaginationPage"
        >
          <p>{currentPage}</p>
        </div>
      </div>

      <button
        type="button"
        aria-label="go to next page"
        onClick={handleClickRight}
        className="inline-flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};
