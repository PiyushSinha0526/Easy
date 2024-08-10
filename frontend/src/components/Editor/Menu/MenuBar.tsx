import { useState } from "react";
import {
  RiAlignCenter,
  RiAlignJustify,
  RiAlignLeft,
  RiAlignRight,
  RiArrowGoBackLine,
  RiArrowGoForwardLine,
  RiCodeBlock,
  RiFileCodeLine,
  RiImageFill,
  RiListOrdered,
  RiListUnordered,
  RiParagraph,
  RiQuoteText,
  RiRulerLine,
  RiTaskLine,
} from "@remixicon/react";
const MenuBar = ({ editor }: any) => {
  const [dropdown, setDropdown] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  if (!editor) {
    return null;
  }
  const handleTextAlignToggle = (textAlign: string) => {
    if (editor.isActive({ textAlign: textAlign })) {
      editor.chain().focus().unsetTextAlign().run();
    } else {
      editor.chain().focus().setTextAlign(textAlign).run();
    }
  };

  const handleApplyClick = () => {
    editor
    .chain()
    .focus()
    .insertContent({
      type: 'image',
      attrs: {
        src: imageUrl,
        align: 'right',
      },
    })
    .run();
    setDropdown(false);
  };
  
  return (
    <div className="mx-0.5 mb-2 flex flex-wrap gap-2 rounded-lg p-2 text-black outline  outline-gray-200 *:cursor-pointer *:rounded-md *:border *:border-black *:px-2 *:shadow-sm *:shadow-gray-950">
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
        value={editor.getAttributes("textStyle").color}
        data-testid="setColor"
      />

      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? "bg-black text-white" : ""}
      >
        <RiParagraph size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "bg-black text-white" : ""}
      >
        <RiListUnordered size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "bg-black text-white" : ""}
      >
        <RiListOrdered size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        className={editor.isActive("taskList") ? "bg-black text-white" : ""}
      >
        <RiTaskLine size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "bg-black text-white" : ""}
      >
        <RiFileCodeLine size={16} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "bg-black text-white" : ""}
      >
        <RiCodeBlock size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "bg-black text-white" : ""}
      >
        <RiQuoteText size={16} />
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <RiRulerLine size={16} />
      </button>
      <button
        onClick={() => handleTextAlignToggle("left")}
        className={
          editor.isActive({ textAlign: "left" }) ? "bg-black text-white" : ""
        }
      >
        <RiAlignLeft size={16} />
      </button>
      <button
        onClick={() => handleTextAlignToggle("center")}
        className={
          editor.isActive({ textAlign: "center" }) ? "bg-black text-white" : ""
        }
      >
        <RiAlignCenter size={16} />
      </button>
      <button
        onClick={() => handleTextAlignToggle("right")}
        className={
          editor.isActive({ textAlign: "right" }) ? "bg-black text-white" : ""
        }
      >
        <RiAlignRight size={16} />
      </button>
      <button
        onClick={() => handleTextAlignToggle("justify")}
        className={
          editor.isActive({ textAlign: "justify" }) ? "bg-black text-white" : ""
        }
      >
        <RiAlignJustify size={16} />
      </button>
      <div onClick={() => setDropdown(!dropdown)} className="relative">
        <RiImageFill />
        {dropdown && (
          <div
            className="absolute -top-[3.25rem] left-2 z-20 flex items-center justify-center gap-2 rounded-md border border-black bg-white p-2 py-1 shadow-md shadow-black "
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="text"
              className="border"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <button
              onClick={() => handleApplyClick()}
              className="rounded-md border border-black bg-white px-2 py-[0.1rem] font-medium text-black"
            >
              Apply
            </button>
          </div>
        )}
      </div>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <RiArrowGoBackLine size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <RiArrowGoForwardLine size={16} />
      </button>
      <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        clear marks
      </button>
      <button onClick={() => editor.chain().focus().clearNodes().run()}>
        clear nodes
      </button>
      <button onClick={() => editor.chain().focus().setHardBreak().run()}>
        hard break
      </button>
    </div>
  );
};
export default MenuBar;
