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
import { useState } from "react";
const MenuBar = ({ editor }: any) => {
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
  const insertImages = (urls: any) => {
    if (urls.length > 0 && urls.length <= 3) {
      editor.commands.insertImageGroup({urls: urls});
    } else {
      console.error('You can insert up to 3 images only.');
    }
  }
  const [imageUrls, setImageUrls] = useState(['', '', '']);

  const handleChange = (index: number, event: any) => {
    const newUrls = [...imageUrls];
    newUrls[index] = event.target.value;
    setImageUrls(newUrls);
  }

  const handleInsert = () => {
    const validUrls = imageUrls.filter((url: any) => url);
    insertImages(validUrls);
  }
  return (
    <div className="mx-0.5 mb-2 flex flex-wrap gap-2 rounded-lg p-2 text-black outline  outline-gray-200 *:cursor-pointer *:rounded-md *:border *:border-black *:px-2 *:shadow-sm *:shadow-gray-950">
      <div>
      {imageUrls.map((url, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Image URL ${index + 1}`}
          value={url}
          onChange={(event: any) => handleChange(index, event)}
        />
      ))}
      <button onClick={handleInsert}>Insert Images</button>
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
      <button >
        <RiImageFill/>
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
