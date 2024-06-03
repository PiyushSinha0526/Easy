import {
  RiArrowGoBackLine,
  RiArrowGoForwardLine,
  RiCodeBlock,
  RiFileCodeLine,
  RiListOrdered,
  RiListUnordered,
  RiParagraph,
  RiQuoteText,
  RiRulerLine,
  RiTaskLine,
} from "@remixicon/react";
const MenuBar = ({ editor }: any) => {
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
