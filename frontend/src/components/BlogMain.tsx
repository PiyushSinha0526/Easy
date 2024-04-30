import { Blog } from "../hooks";

const BlogMain = ({ blog }: { blog: Blog }) => {
  return (
    <div className="flex flex-col mx-auto max-w-2xl">
      <div className="mx-4">
        <div className="mb-8 mt-8 text-4xl font-bold">{blog.title}</div>
        <div className="flex items-center">
          <div className="relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600">
            <span className="font-medium capitalize text-gray-600 dark:text-gray-300">
              {blog.author.name ? blog.author.name[0] : "A"}
            </span>
          </div>
          <div className="ml-2 text-sm font-medium capitalize">
            <div className="text-base">
              {blog.author.name ? blog.author.name : "Anonymous"}
            </div>
            <div className="text-sm text-[#6b6b6b]">
              <span>{"8 min read"}</span> . <span>May 2, 2022</span>
            </div>
          </div>
        </div>
        <div className="mt-8 text-wrap break-words">{blog.content}</div>
      </div>
    </div>
  );
};

export default BlogMain;
