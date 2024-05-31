import { useCurrentEditor, FloatingMenu } from "@tiptap/react";
import { Level } from "@tiptap/extension-heading";
import {
  RiH1,
  RiH2,
  RiH3,
  RiH4,
  RiH5,
  RiH6,
  RiListOrdered,
  RiListUnordered,
} from "@remixicon/react";

const FlootingMenuBar = () => {
  const { editor } = useCurrentEditor();
  const headingIcons = [RiH1, RiH2, RiH3, RiH4, RiH5, RiH6];
  if (!editor) {
    return null;
  }
  return (
    <FloatingMenu
      editor={editor}
      tippyOptions={{ duration: 100 }}
      className="flex gap-2 rounded-lg bg-white p-1 text-black outline outline-2 outline-black *:cursor-pointer *:rounded-md  *:border *:border-black *:px-2 *:py-1"
    >
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
            <Icon size={16} />
          </button>
        );
      })}
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
    </FloatingMenu>
  );
};

export default FlootingMenuBar;
