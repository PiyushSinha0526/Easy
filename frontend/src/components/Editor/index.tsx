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

const content = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`;

export default ({ editorRef }: any) => {
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
