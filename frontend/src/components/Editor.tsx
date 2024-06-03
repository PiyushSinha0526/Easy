import "./styles.css";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle, { TextStyleOptions } from "@tiptap/extension-text-style";
import { EditorProvider } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight, common } from "lowlight";
import Code from "@tiptap/extension-code";
import Underline from "@tiptap/extension-underline";

import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import MenuBar from "./Editor/MenuBar";
import BubbleMenuBar from "./Editor/BubbleMenu";
import FlootingMenuBar from "./Editor/FlootingMenu";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Highlight from "@tiptap/extension-highlight";

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] } as Partial<TextStyleOptions>),
  BulletList,
  OrderedList,
  ListItem,
  Document,
  Paragraph,
  Text,
  Underline,
  Code,
  TaskList,
  TaskItem.configure({
    nested: false,
  }),
  CodeBlockLowlight.configure({
    lowlight: createLowlight(common),
    defaultLanguage: "javascript",
  }),
  Highlight.configure({ multicolor: true }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
];

const editorProps = {
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

export default () => {
  return (
    <div>
      <EditorProvider
        slotBefore={<MenuBar />}
        editorProps={editorProps}
        extensions={extensions}
        content={content}
      >
        <BubbleMenuBar />
        <FlootingMenuBar />
      </EditorProvider>
    </div>
  );
};
