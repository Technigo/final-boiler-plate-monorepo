import { useRecoilValue, useRecoilState } from "recoil";
import { Dispatch, SetStateAction, useState } from "react";
import { categoriesState, searchQueryCategory } from "../../../../states/atoms/flashcardAtoms";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../ui/shadcn/Slect";

export const SelectCategory = ({
  currentCategory,
  type,
  onSetCategory,
}: {
  currentCategory?: string;
  type?: "search";
  onSetCategory?: Dispatch<SetStateAction<string>>;
}) => {
  const [categoryId, setSearchQueryCategory] = useRecoilState(searchQueryCategory);
  const categories = useRecoilValue(categoriesState);
  const [currentValue, setCurrentValue] = useState(
    categories.length !== 0 && currentCategory
      ? currentCategory
      : categories?.filter((obj) => obj._id === categoryId)[0]?.id
  );

  return (
    <Select
      defaultValue={currentValue}
      onValueChange={(value) => {
        type === "search" && setSearchQueryCategory(value);
        setCurrentValue(value);
        onSetCategory && onSetCategory(value);
      }}
    >
      <SelectTrigger className="w-[160px] sm:w-[180px]">
        <SelectValue placeholder="Choose catgory" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        {categories &&
          categories?.map((cate) => (
            <SelectItem key={cate?._id} value={cate?._id}>
              {cate?.category}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};
