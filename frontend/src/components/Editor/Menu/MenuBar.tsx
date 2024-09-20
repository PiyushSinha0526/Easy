import { useEffect, useRef, useState } from "react";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  CodeIcon,
  CodeSquareIcon,
  EraserIcon,
  ImageIcon,
  List,
  ListChecksIcon,
  ListOrderedIcon,
  MinusIcon,
  PilcrowIcon,
  Redo2,
  SquareIcon,
  TextQuoteIcon,
  Undo2,
  WrapTextIcon,
} from "lucide-react";

const MenuBar = ({ editor }: any) => {
  const [dropdown, setDropdown] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
        type: "image",
        attrs: {
          src: imageUrl,
          align: "right",
        },
      })
      .run();
    setDropdown(false);
  };

  return (
    <div className="mx-0.5 mb-2 flex flex-wrap gap-2 rounded-lg p-2 pt-0 text-black *:cursor-pointer *:rounded-md *:border *:border-black *:px-2 *:shadow-sm *:shadow-gray-950">
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
        <PilcrowIcon size={16} height={27} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "bg-black text-white" : ""}
      >
        <List size={16} height={27} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "bg-black text-white" : ""}
      >
        <ListOrderedIcon size={16} height={27} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        className={editor.isActive("taskList") ? "bg-black text-white" : ""}
      >
        <ListChecksIcon size={16} height={27} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "bg-black text-white" : ""}
      >
        <CodeIcon size={16} height={27} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "bg-black text-white" : ""}
      >
        <CodeSquareIcon size={16} height={27} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "bg-black text-white" : ""}
      >
        <TextQuoteIcon size={16} height={27} />
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <MinusIcon size={16} height={27} />
      </button>
      <button
        onClick={() => handleTextAlignToggle("left")}
        className={
          editor.isActive({ textAlign: "left" }) ? "bg-black text-white" : ""
        }
      >
        <AlignLeftIcon size={16} height={27} />
      </button>
      <button
        onClick={() => handleTextAlignToggle("center")}
        className={
          editor.isActive({ textAlign: "center" }) ? "bg-black text-white" : ""
        }
      >
        <AlignCenterIcon size={16} height={27} />
      </button>
      <button
        onClick={() => handleTextAlignToggle("right")}
        className={
          editor.isActive({ textAlign: "right" }) ? "bg-black text-white" : ""
        }
      >
        <AlignRightIcon size={16} height={27} />
      </button>
      <button
        onClick={() => handleTextAlignToggle("justify")}
        className={
          editor.isActive({ textAlign: "justify" }) ? "bg-black text-white" : ""
        }
      >
        <AlignJustifyIcon size={16} height={27} />
      </button>
      <div onClick={() => setDropdown(!dropdown)} className="relative">
        <ImageIcon size={16} height={27} />
        {dropdown && (
          <div
            ref={dropdownRef} 
            className="absolute -top-[3.25rem] left-2 z-20 flex items-center justify-center gap-2 rounded-md border border-black bg-white p-2 py-1 shadow-md shadow-black "
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="text"
              placeholder="Enter image URL"
              className="border px-2"
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
        <Undo2 size={16} height={27} />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <Redo2 size={16} height={27} />
      </button>
      <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        <EraserIcon size={16} height={27} />
      </button>
      <button onClick={() => editor.chain().focus().clearNodes().run()}>
        <SquareIcon size={16} height={27} />
      </button>
      <button onClick={() => editor.chain().focus().setHardBreak().run()}>
        <WrapTextIcon size={16} height={27} />
      </button>
    </div>
  );
};
export default MenuBar;
