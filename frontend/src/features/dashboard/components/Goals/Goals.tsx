import ErrorBoundary from "../../../../ui/generic/ErrorBoundary";
import { Spinner } from "../../../../ui/generic/Spinner";
import { Sticker } from "./Sticker";
import { useGetStickers } from "../../hooks/useGetSrtickers";
import { useCreateSticker } from "../../hooks/useCreateSticker";
import { Error } from "../../../../ui/generic/Error";
import { ButtonOutline } from "../../../../ui/buttons/ButtonOutline";
import { Sticker as StickerType } from "@/src/types/userType";

export const Goals = () => {
  const { isPending, data, error } = useGetStickers();
  const { createSticker, errorCreating } = useCreateSticker();

  if (isPending) return <Spinner />;
  if (error || errorCreating) return <Error />;
  const stickersArray = data?.data?.stickers ?? [];

  const handleCreateSticker = () => {
    createSticker({ title: "" });
  };

  return (
    <ErrorBoundary fallback={<Error />}>
      <div className="w-full mx-2 mb-16 overflow-x-scroll lg:overflow-hidden">
        <h2 className="font-jp font-thin text-xl md:text-2xl text-blue-dark mb-2 text-center w-full">
          メモのーと
        </h2>
        <ButtonOutline
          name="Add Sticker"
          bg="bg-red-dark"
          onClick={() => {
            handleCreateSticker();
          }}
        />
        <div className="flex flex-col gap-14 md:grid-cols-2 gap-y-6 my-3 w-10/12 h-[60vh] mx-auto relative">
          {stickersArray.length > 0 ? (
            stickersArray.map((item: StickerType) => <Sticker item={item} key={item._id} />)
          ) : (
            <p className="text-center text-blue-dark font-semibold">Create your sticker 🦔</p>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};
