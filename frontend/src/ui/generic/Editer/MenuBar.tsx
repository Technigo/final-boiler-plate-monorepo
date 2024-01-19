import "./styles.scss";
import { AiOutlineBold } from "react-icons/ai";
import { AiOutlineItalic } from "react-icons/ai";
import { AiOutlineStrikethrough } from "react-icons/ai";
import { BsCode } from "react-icons/bs";
import { PiParagraphBold } from "react-icons/pi";
import { LuHeading1 } from "react-icons/lu";
import { LuHeading2 } from "react-icons/lu";
import { LuHeading3 } from "react-icons/lu";
import { HiListBullet } from "react-icons/hi2";
import { GoListOrdered } from "react-icons/go";
import { TbBlockquote } from "react-icons/tb";
import { BiUndo } from "react-icons/bi";
import { BiRedo } from "react-icons/bi";
import { BsFileBreak } from "react-icons/bs";
import { GithubPicker } from "react-color";
import { useState } from "react";
import { AiOutlineFontColors } from "react-icons/ai";
import { MdBorderColor } from "react-icons/md";

export const MenuBar = ({ editor }) => {
  const [textColor, setTextColor] = useState("#000");
  const [isOpenColor, setIsOpenColor] = useState(false);
  if (!editor) {
    return null;
  }

  return (
    <div className="tiptap-editor">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <AiOutlineBold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <AiOutlineItalic />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        <AiOutlineStrikethrough />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "is-active" : ""}
      >
        <BsCode />
      </button>
      {/* <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>clear marks</button>
      <button onClick={() => editor.chain().focus().clearNodes().run()}>clear nodes</button> */}
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? "is-active" : ""}
      >
        <PiParagraphBold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
      >
        <LuHeading1 />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        <LuHeading2 />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
      >
        <LuHeading3 />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        <HiListBullet />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        <GoListOrdered />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
      >
        <TbBlockquote />
      </button>

      <button
        onClick={() => editor.chain().focus().setHardBreak().run()}
        className="relative group"
      >
        <span className="group-hover:inline hidden absolute -bottom-4 text-[8px] w-max bg-gray-200 px-1 py-0.5 rounded-md">
          Hard break
        </span>
        <BsFileBreak />
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <BiUndo />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <BiRedo />
      </button>
      <button onClick={() => editor.chain().focus().unsetColor().run()}>
        <MdBorderColor />
      </button>
      <button
        onClick={() => {
          setIsOpenColor((prev) => !prev);
        }}
        className={`${editor.isActive("textStyle", { color: textColor }) ? "is-active" : ""}`}
      >
        <AiOutlineFontColors />
      </button>
      {isOpenColor && (
        <div className="absolute top-8 right-6 z-[1000]">
          <GithubPicker
            triangle="top-right"
            onChangeComplete={(color) => {
              editor.chain().focus().setColor(color.hex).run();
              setTextColor(color.hex);
              setIsOpenColor(false);
            }}
            width="90px"
          />
        </div>
      )}
    </div>
  );
};
