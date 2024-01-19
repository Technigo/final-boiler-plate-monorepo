import "./styles.scss";

import { BubbleMenu, EditorContent, FloatingMenu, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Dispatch, SetStateAction } from "react";
import { MenuBar } from "./MenuBar";

type Props = {
  defaultValue?: string;
  onSetValue?: Dispatch<SetStateAction<string>>;
  onSetValueSet?: React.Dispatch<
    React.SetStateAction<{
      title: string;
      text: string;
    }>
  >;
};

export default function SimpleTiptap({ defaultValue = "", onSetValue, onSetValueSet }: Props) {
  const editor = useEditor({
    extensions: [StarterKit],
    onUpdate: ({ editor }) => {
      const value = editor.getHTML();
      onSetValue ? onSetValue(value) : onSetValueSet((prev) => ({ ...prev, text: value }));
    },
    editorProps: {
      attributes: {
        class: "w-[350px] md:w-[400px] my-2 focus:outline-none h-[100px] md:h-[150px]",
      },
    },
    content: defaultValue,
  });

  console.log(defaultValue);

  return (
    <div className=" overflow-y-scroll relative border">
      {/* <MenuBar editor={editor} /> */}
      {editor && (
        <BubbleMenu className="bubble-menu" tippyOptions={{ duration: 100 }} editor={editor}>
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            Bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
          >
            Italic
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "is-active" : ""}
          >
            Strike
          </button>
        </BubbleMenu>
      )}

      {editor && (
        <FloatingMenu className="floating-menu" tippyOptions={{ duration: 100 }} editor={editor}>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
          >
            H1
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
          >
            H2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is-active" : ""}
          >
            Bullet List
          </button>
        </FloatingMenu>
      )}

      <EditorContent editor={editor} />
    </div>
  );
}
