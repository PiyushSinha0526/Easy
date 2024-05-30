import {
  RiBold,
  RiItalic,
  RiStrikethrough,
  RiUnderline,
} from "@remixicon/react";
import { useCurrentEditor, BubbleMenu } from "@tiptap/react";
const BubbleMenuBar = () => {
  const { editor } = useCurrentEditor();
  if (!editor) {
    return null;
  }
  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ duration: 100 }}
      className="flex gap-2 rounded-lg bg-white p-1 text-black outline outline-2 outline-black *:cursor-pointer *:rounded-md  *:border *:border-black *:px-2 *:py-1"
    >
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
    </BubbleMenu>
  );
};

export default BubbleMenuBar;
