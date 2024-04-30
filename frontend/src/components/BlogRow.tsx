import { Link } from "react-router-dom";

interface BlogRowProps {
  id: string;
  authorName: string;
  title: string;
  content: string;
  published: string;
}
const BlogRow = ({
  id,
  authorName,
  title,
  content,
  published,
}: BlogRowProps) => {
  return (
    <Link to={`/blog/${id}`} className="flex cursor-pointer flex-col p-5 border-b-2">
      <div className="flex items-center gap-6">
        <div className="flex items-center">
          <div className="relative inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600">
            <span className="font-medium capitalize text-gray-600 dark:text-gray-300">
              {authorName?.[0]}
            </span>
          </div>
          <span className="ml-2 text-sm font-medium capitalize">
            {authorName}
          </span>
        </div>
        <div className="flex items-center text-sm">
          <div className="flex items-center">
            <span className="h-1 w-1 rounded-full bg-black"></span>
          </div>
          <span className="ml-2">{published}</span>
        </div>
      </div>
      <div className="flex justify-between">
        <div>
          <div className="mt-3 flex flex-col">
            <h2 className="pb-2 text-xl font-bold text-slate-800">{title}</h2>
            <p className="text-wrap text-base text-slate-600">
              {content.slice(0, 100)}...
            </p>
          </div>
          <div className="flex items-center py-8 text-sm">
            <ul className="flex gap-2 pr-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <li key={i} className="rounded-full bg-slate-300 px-3 py-1">
                  tag{i + 1}
                </li>
              ))}
            </ul>
            <span>{"9"} min read</span>
          </div>
        </div>
        <div className="w-32 bg-blue-100">
          <img src="https://picsum.photos/200" alt="" />
        </div>
      </div>
    </Link>
  );
};

export default BlogRow;
