import { useCurrentEditor } from "@tiptap/react";
import {
  RiArrowGoBackLine,
  RiArrowGoForwardLine,
  RiBold,
  RiCodeBlock,
  RiFileCodeLine,
  RiItalic,
  RiListOrdered,
  RiListUnordered,
  RiParagraph,
  RiQuoteText,
  RiRulerLine,
  RiStrikethrough,
  RiTaskLine,
  RiUnderline,
} from "@remixicon/react";
const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="mb-1 flex flex-wrap gap-2 p-2 text-black outline outline-gray-200 *:cursor-pointer *:rounded-md  *:border *:border-black *:px-2">
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
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? " bg-black text-white" : ""}
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
        className={editor.isActive("strike") ? "bg-black text-white" : ""}
      >
        <RiUnderline size={16} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "bg-black text-white" : ""}
      >
        <RiFileCodeLine size={16} />
      </button>
      <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        clear marks
      </button>
      <button onClick={() => editor.chain().focus().clearNodes().run()}>
        clear nodes
      </button>
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
      <button onClick={() => editor.chain().focus().setHardBreak().run()}>
        hard break
      </button>
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
      {/* <button
          onClick={() => editor.chain().focus().setColor("#958DF1").run()}
          className={
            editor.isActive("textStyle", { color: "#958DF1" }) ? "text-white bg-black" : ""
          }
        >
          purple
        </button> */}
    </div>
  );
};
export default MenuBar;
