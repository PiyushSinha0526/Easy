import { useState } from "react";
import { FloatingMenu } from "@tiptap/react";
import { Level } from "@tiptap/extension-heading";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  List,
  ListChecksIcon,
  ListOrderedIcon,
} from "lucide-react";

const FlootingMenuBar = ({ editor }: any) => {
  const [dropdown, setDropdown] = useState(false);
  const headingIcons = [
    Heading1,
    Heading2,
    Heading3,
    Heading4,
    Heading5,
    Heading6,
  ];
  if (!editor) {
    return null;
  }
  return (
    <FloatingMenu
      editor={editor}
      tippyOptions={{ duration: 100 }}
      className="flex gap-1 rounded-lg bg-white p-1 text-black outline outline-2 outline-black *:cursor-pointer *:rounded-md  *:border *:border-black *:px-2"
    >
      <div onClick={() => setDropdown(!dropdown)} className="relative">
        <span className="font-semibold text-black">H</span>
        {dropdown && (
          <div className="absolute -top-20 left-10 flex flex-col gap-1 rounded-lg bg-white p-1 text-black outline outline-2 outline-black *:cursor-pointer *:rounded-md *:border *:border-black *:px-2">
            {[1, 2, 3, 4, 5, 6].map((level) => {
              const Icon = headingIcons[level - 1];
              return (
                <button
                  key={level}
                  onClick={() =>
                    editor
                      .chain()
                      .focus()
                      .toggleHeading({ level: level as Level })
                      .run()
                  }
                  className={
                    editor.isActive("heading", { level: level })
                      ? "bg-black text-white"
                      : ""
                  }
                >
                  <Icon size={16} height={27} />
                </button>
              );
            })}
          </div>
        )}
      </div>
      {!dropdown && (
        <>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={
              editor.isActive("bulletList") ? "bg-black text-white" : ""
            }
          >
            <List size={16} height={27} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={
              editor.isActive("orderedList") ? "bg-black text-white" : ""
            }
          >
            <ListOrderedIcon size={16} height={27} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            className={editor.isActive("taskList") ? "bg-black text-white" : ""}
          >
            <ListChecksIcon size={16} height={27} />
          </button>
        </>
      )}
    </FloatingMenu>
  );
};

export default FlootingMenuBar;
