import axios from "axios";
import { BACKEND_URL } from "../config";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "../components/Editor";
import Sanitize from "../utils/Sanitize";

const Publish = () => {
  const editorRef = useRef<any>(null);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async () => {
    let content = Sanitize(editorRef.current.getHTML());
    console.log(content);
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/blog`,
      {
        title,
        content: content,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      },
    );
    console.log(response);
    navigate(`/blog/${response.data.data.id}`);
  };
  return (
    <div className="mx-auto mt-3 max-w-screen-md px-4">
      <label
        htmlFor="title"
        className="mb-1 block text-sm font-medium text-gray-900"
      >
        Title
      </label>
      <input
        type="text"
        id="title"
        aria-describedby="title-explanation"
        className="mb-3 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-black focus:ring-black "
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <label
        htmlFor="message"
        className="mb-2 block text-sm font-medium text-gray-900 "
      >
        Content
      </label>

      <Editor editorRef={editorRef} />
      <button
        onClick={() => handleSubmit()}
        type="button"
        className="mb-2 me-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300"
      >
        Publish
      </button>
    </div>
  );
};

export default Publish;
