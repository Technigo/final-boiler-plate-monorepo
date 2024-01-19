import { useState } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import { GithubPicker } from "react-color";
// icon
import { IoCloseOutline } from "react-icons/io5";
import { GrDrag } from "react-icons/gr";
import CheckIcon from "@mui/icons-material/Check";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { IoColorPaletteOutline } from "react-icons/io5";
import { IoIosResize } from "react-icons/io";
import { TiDelete } from "react-icons/ti";
//hooks
import { useUpdateSticker } from "../../hooks/useUpdateSticker";
import { useDeleteSticker } from "../../hooks/useDeleteSticker";

import { Label } from "../../../../ui/shadcn/Label";
import { Textarea } from "../../../../ui/shadcn/Textarea";
import { Button } from "../../../../ui/shadcn/Button";
import { Input } from "../../../../ui/shadcn/Input";

export const Sticker = ({ item }: { item?: any }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  //sticker's styling/position
  const [value, setValue] = useState<{ title: string; text: string }>({
    title: item?.title ?? "",
    text: item?.text ?? "",
  });
  const [stickerColor, setStickerColor] = useState<{ background: string; textColor: string }>({
    background: item?.colors?.background ?? "#F5B9B0",
    textColor: item?.colors?.textColor ?? "#fff",
  });
  const [stickerSize, setStickerDetail] = useState<{ width: number; height: number }>({
    width: Number(item?.size?.width) ?? 180,
    height: Number(item?.size?.height) ?? 260,
  });
  const [stickerPosition, setStickerPosition] = useState<{ x: number; y: number }>({
    x: item?.position?.x ?? 0,
    y: item?.position?.y ?? 0,
  });

  //hooks to call api
  const { isEditing: isStickerEditing, editSticker } = useUpdateSticker();
  const { isDeleting, deleteSticker } = useDeleteSticker();

  //hanlders
  const handleUpdateSticker = () => {
    const newSticker = { ...value, colors: { ...stickerColor }, size: { ...stickerSize } };
    editSticker({ id: item._id, newData: newSticker });
  };

  const onResizeAbsolute = (e: any, { size }) => {
    setStickerDetail((prev) => ({ ...prev, width: size.width, height: size.height }));
  };

  const handleDrag = (e: any, data: any) => {
    setStickerPosition({ x: data.x, y: data.y });
  };

  const handleDeleteSticker = () => {
    deleteSticker(item._id);
  };

  const handleUpdatePosition = () => {
    editSticker({ id: item._id, newData: { position: stickerPosition } });
  };

  return (
    <Draggable
      handle="strong"
      bounds="parent"
      defaultPosition={stickerPosition}
      position={null}
      onDrag={handleDrag}
      onStop={handleUpdatePosition}
    >
      <div
        className={`rounded-lg p-1 absolute break-words`}
        style={{
          background: stickerColor.background,
          width: stickerSize.width,
          height: stickerSize.height,
          color: stickerColor.textColor,
        }}
      >
        <strong className="cursor-grabbing absolute top-1 left-1 z-10 w-2">
          <GrDrag />
        </strong>
        {isEditing ? (
          <div className={`flex flex-col gap-2 relative group`}>
            <ResizableBox
              width={stickerSize.width}
              height={stickerSize.height}
              onResize={onResizeAbsolute}
              minConstraints={[140, 140]}
              maxConstraints={[400, 300]}
              handle={
                <span className="w-7 h-7 absolute bottom-0 -right-1.5 cursor-se-resize rounded-full flex items-center justify-center bg-red-dark/50 hover:bg-red-dark transition-all ">
                  <IoIosResize className="rotate-90" />
                </span>
              }
            >
              <div className="h-3 mb-0.5">
                <Button
                  variant="secondary"
                  className="p-1.5 w-10 h-10 absolute -top-4 -right-4  rounded-full transition-all duration-300 bg-red-dark/50 hover:bg-red-dark"
                  onClick={() => {
                    setIsEditing((prev) => !prev);
                    handleUpdateSticker();
                  }}
                  disabled={isStickerEditing}
                >
                  <CheckIcon
                    sx={{
                      width: "22px",
                      color: "#fff",
                    }}
                  />
                </Button>
                <button
                  onClick={() => setIsColorPickerOpen((prev) => !prev)}
                  className="absolute top-0 left-7"
                >
                  <IoColorPaletteOutline />
                </button>
                {isColorPickerOpen && (
                  <div className="absolute top-10 bg-amber-50 z-[100] p-2 rounded-lg shadow-xl">
                    <button onClick={() => setIsColorPickerOpen(false)}>
                      <IoCloseOutline className="text-gray-300 text-sm absolute top-2 right-2 cursor-pointer hover:brightness-50 " />
                    </button>
                    <span className="text-[9px] text-gray-700 uppercase m-0 font-semibold">
                      Color
                    </span>
                    <GithubPicker
                      color={stickerColor.background}
                      triangle="hide"
                      width="170px"
                      onChangeComplete={(color) =>
                        setStickerColor((prev) => ({ ...prev, background: color.hex }))
                      }
                    />
                    <div className="flex items-end gap-2 mt-2">
                      <span className="text-[9px] text-gray-700 uppercase  font-semibold">
                        Text Color
                      </span>
                      <span className="flex flex-col gap-0.5">
                        <input
                          defaultChecked
                          type="radio"
                          value="#fff"
                          id="white"
                          name="textColor"
                          className="bg-amber-100"
                          onChange={(e) =>
                            setStickerColor((prev) => ({ ...prev, textColor: e.target.value }))
                          }
                        />
                        <label htmlFor="white" className="text-[8px] text-gray-700  uppercase">
                          white
                        </label>
                      </span>
                      <span className="flex flex-col gap-0.5">
                        <input
                          type="radio"
                          value="#333"
                          id="black"
                          name="textColor"
                          className="bg-black"
                          onChange={(e) =>
                            setStickerColor((prev) => ({ ...prev, textColor: e.target.value }))
                          }
                        />
                        <label htmlFor="black" className="text-[8px] text-gray-700 uppercase">
                          black
                        </label>
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div className="w-full h-full min-h-full min-w-full flex flex-col gap-2 items-center mt-1">
                <Input
                  defaultValue={value.title}
                  placeholder="type..."
                  onChange={(e) => setValue((prev) => ({ ...prev, title: e.target.value }))}
                  className="text-sm sm:text-base font-semibold bg-transparent p-0 focus-visible:outline-none focus-visible:ring-0 border-0 border-b rounded-none w-10/12 text-center placeholder:text-white"
                />

                <Textarea
                  className="placeholder:text-white"
                  placeholder="type..."
                  defaultValue={value.text}
                  onChange={(e) => setValue((prev) => ({ ...prev, text: e.target.value }))}
                />
              </div>
            </ResizableBox>
          </div>
        ) : (
          <div
            className={`flex flex-col items-center break-words gap-2 relative  p-2 rounded group h-full w-full`}
          >
            <button
              className="absolute -top-4 -right-4  p-1.5 bg-blue-dark/50 w-10 h-10 items-center justify-center rounded-full flex transition-all group-hover:opacity-100 opacity-0 duration-300 hover:bg-blue-dark"
              onClick={() => setIsEditing((prev) => !prev)}
            >
              <ModeEditOutlineIcon
                sx={{
                  width: "18px",
                  color: "#fff",
                }}
              />
            </button>

            <button
              onClick={handleDeleteSticker}
              disabled={isDeleting}
              className="absolute -top-0.5 left-5 opacity-0 group-hover:opacity-100 ransition-all duration-300 "
            >
              <TiDelete className="text-white text-2xl" />
            </button>
            <Label className="text-xs sm:text-sm font-semibold">{value.title}</Label>
            <div className={`my-2 break-words w-full`}>{value.text}</div>
          </div>
        )}
      </div>
    </Draggable>
  );
};
