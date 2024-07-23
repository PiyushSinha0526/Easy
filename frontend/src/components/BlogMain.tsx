import { EditorContent, useEditor } from "@tiptap/react";
import { Blog } from "../hooks";
import EditorExtensions from "../utils/Editor";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuthStore from "../store/AuthStore";
import { useShallow } from "zustand/react/shallow";
import formatDateTime from "../utils/DateTime";

const BlogMain = ({ blog }: { blog: Blog }) => {
  const [isEditAllowed, setIsEditAllowed] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      isAuthenticated: state.isAuthenticated,
    })),
  );
  useEffect(() => {
    if (user) setIsEditAllowed(user.id == blog.author.id);
  }, [blog]);
  const editor = useEditor({
    editable: false,
    content: blog.content,
    extensions: EditorExtensions,
    editorProps: {
      attributes: {
        class: "pt-8 prose max-w-none",
      },
    },
  });
  let date, time;

  if (blog.published) {
    ({ date, time } = formatDateTime(blog.published));
  }
  return (
    <div className="mx-auto flex max-w-3xl flex-col">
      <div className="mx-4">
        <div className="mb-8 mt-8 flex items-center justify-between">
          <div className=" flex items-center">
            <div className="relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600">
              <span className="font-medium capitalize text-gray-600 dark:text-gray-300">
                {blog?.author?.name ? blog?.author?.name[0] : "A"}
              </span>
            </div>
            <div className="ml-2 text-sm font-medium capitalize">
              <div className="text-base">
                {blog?.author.name ? blog.author.name : "Anonymous"}
              </div>
              <div className="text-sm text-[#6b6b6b]">
                <span>{"8 min read"}</span> .{" "}
                {blog.published && (
                  <>
                    <span className="ml-2">{date}</span>
                    <span className="ml-2">{time}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          {isAuthenticated && isEditAllowed && (
            <div
              className="cursor-pointer rounded-md bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 px-4 py-1 text-white"
              onClick={() => navigate("edit")}
            >
              Edit
            </div>
          )}
        </div>
        <div className="text-3xl font-bold sm:text-[42px]">{blog.title}</div>
        <div>{editor && <EditorContent editor={editor} />}</div>
      </div>
    </div>
  );
};

export default BlogMain;
