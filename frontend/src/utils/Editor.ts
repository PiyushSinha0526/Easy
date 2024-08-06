import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle, { TextStyleOptions } from "@tiptap/extension-text-style";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Code from "@tiptap/extension-code";
import Underline from "@tiptap/extension-underline";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Highlight from "@tiptap/extension-highlight";
import { createLowlight, common } from "lowlight";
import CharacterCount from "@tiptap/extension-character-count";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import ImageWithAlignment from "../components/Editor/image";
import CustomImage from "../components/Editor/image";

const EditorExtensions = [
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
  CharacterCount,
  TaskItem.configure({
    nested: false,
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  CustomImage,
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

export default EditorExtensions;
