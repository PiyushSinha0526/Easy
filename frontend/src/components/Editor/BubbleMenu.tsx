import { useState } from "react";
import { BubbleMenu, Editor } from "@tiptap/react";
import {
  RiBold,
  RiItalic,
  RiPenNibFill,
  RiStrikethrough,
  RiUnderline,
} from "@remixicon/react";

const BubbleMenuBar = ({ editor }: any) => {
  const [bgColor, setBgColor] = useState("#FAF594");
  const [dropdown, setDropdown] = useState(false);
  if (!editor) {
    return null;
  }
  const handleDefaultClick = () => {
    const defaultColor = "#FAF594";
    editor.chain().focus().toggleHighlight({ color: defaultColor }).run();
    setBgColor(defaultColor);
    setDropdown(false);
  };
  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ duration: 100 }}
      className="flex cursor-pointer gap-1 rounded-lg border border-black bg-white p-1 px-2 py-1 text-black outline outline-2 outline-black *:rounded-md *:border *:border-black *:px-1"
    >
      <>
        <div onClick={() => setDropdown(!dropdown)} className="relative">
          <RiPenNibFill
            color={editor.getAttributes("highlight").color || bgColor}
            size={16}
            className="h-full w-full"
          />
          {dropdown && (
            <div
              className="absolute -top-[3.25rem] left-2 z-20 flex items-center justify-center gap-2 rounded-md border border-black bg-white p-2 py-1 shadow-md shadow-black "
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="color"
                id="color"
                className="bg-black p-0 px-[0.1rem] "
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
              />
              <button
                className="rounded-md border border-black bg-white px-2 py-[0.1rem] font-medium text-black"
                onClick={() => {
                  editor
                    .chain()
                    .focus()
                    .toggleHighlight({ color: `${bgColor}` })
                    .run();
                  setDropdown(false);
                }}
              >
                Apply
              </button>
              <button
                className="rounded-md border border-black bg-white px-2 py-[0.1rem] font-medium text-black"
                onClick={handleDefaultClick}
              >
                Default
              </button>
            </div>
          )}
        </div>
        <input
          type="color"
          className="bg-white"
          onInput={(event) =>
            editor
              .chain()
              .focus()
              .setColor((event.target as HTMLInputElement).value)
              .run()
          }
          value={editor.getAttributes("textStyle").color || "#000000"}
          data-testid="setColor"
        />
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "bg-black text-white" : ""}
        >
          <RiBold size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "bg-black text-white" : ""}
        >
          <RiItalic size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "bg-black text-white" : ""}
        >
          <RiStrikethrough size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "bg-black text-white" : ""}
        >
          <RiUnderline size={16} />
        </button>
      </>
    </BubbleMenu>
  );
};

export default BubbleMenuBar;
