import "./styles.scss";

import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { MenuBar } from "./MenuBar";
import { Dispatch, SetStateAction, useEffect } from "react";

type Props = {
  defaultValue?: string;
  onSetValue?: Dispatch<SetStateAction<string>>;
};

const Editer = ({ defaultValue, onSetValue }: Props) => {
  const editor = useEditor({
    content: defaultValue,
    extensions: [StarterKit, Color, TextStyle],

    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onSetValue(html);
    },
  });

  Color.configure({
    types: ["textStyle"],
  });

  useEffect(() => {
    if (!editor) {
      return undefined;
    }

    // Get the initial content …
    onSetValue(editor.getHTML());

    // … and get the content after every change.
    editor.on("update", () => {
      onSetValue(editor.getHTML());
    });
  }, [editor, onSetValue]);

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full relative h-full border-[0.5px] overflow-y-scroll">
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className="outline-none focus-visible:outline-none focus:border-none "
      />
    </div>
  );
};
export default Editer;
