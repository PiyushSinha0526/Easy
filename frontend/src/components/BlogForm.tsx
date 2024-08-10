import { useRef, useState } from "react";
import useAuthStore from "../store/AuthStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sanitize from "../utils/Sanitize";
import Editor from "./Editor";

interface BlogFormProps {
  // id?: string;
  initialTitle?: string;
  initialContent?: string;
  configUrl: string;
  method: "post" | "patch";
}

function BlogForm({
  initialTitle = "",
  initialContent = "",
  configUrl,
  method,
}: BlogFormProps) {
  const [title, setTitle] = useState<string>(initialTitle);
  const editorRef = useRef<any>(null);
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    let content = Sanitize(editorRef.current.getHTML());
    const timeToRead = Math.ceil(
      editorRef.current.storage.characterCount.words() / 210,
    );

    // console.log(timeToRead);
    // console.log(content.replace(/\s+/g, "") === "<p></p>");

    if (token != null) {
      const response = await axios({
        method: method,
        url: configUrl,
        data: {
          title,
          content: content,
          readTime: timeToRead.toString(),
        },
        headers: {
          Authorization: token,
        },
      });
      navigate(`/blog/${response.data.data.id}`);
    }
  };

  return (
    <div className="mx-auto mt-3 max-w-screen-md px-4">
      <label
        htmlFor="title"
        className="mb-1 block text-lg font-medium text-gray-900"
      >
        Title
      </label>
      <input
        type="text"
        id="title"
        aria-describedby="title-explanation"
        className="mb-3 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-black focus:ring-black "
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label
        htmlFor="message"
        className="mb-2 block text-lg font-medium text-gray-900 "
      >
        Content
      </label>
      <Editor editorRef={editorRef} content={initialContent} />
      <button
        onClick={() => handleSubmit()}
        type="button"
        className="my-2 me-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300"
      >
        {method == "post" ? "Create" : "Update"}
      </button>
    </div>
  );
}

export default BlogForm;
