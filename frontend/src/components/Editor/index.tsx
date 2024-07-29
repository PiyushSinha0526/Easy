import { EditorContent, useEditor } from "@tiptap/react";
// components
import MenuBar from "./MenuBar";
import BubbleMenuBar from "./BubbleMenu";
import FlootingMenuBar from "./FlootingMenu";
import EditorExtensions from "../../utils/Editor";

export const editorProps = {
  attributes: {
    class:
      "border-2 border-gray-300 focus:border-black focus:ring-black rounded-lg p-4 min-h-[12rem] py-6 max-h-[26rem] overflow-y-auto outline-none prose max-w-none",
  },
};

interface Props {
  editorRef: any;
  content?: string;
}
export default ({ editorRef, content='' }: Props) => {
  const editor = useEditor({
    extensions: EditorExtensions,
    content: content,
    editorProps: editorProps,
  });
  if (editorRef && editor) {
    editorRef.current = editor;
  }
  return (
    <div>
      {editor && <MenuBar editor={editor} />}
      <EditorContent editor={editor} />
      {editor && <BubbleMenuBar editor={editor} />}
      {editor && <FlootingMenuBar editor={editor} />}
    </div>
  );
};
