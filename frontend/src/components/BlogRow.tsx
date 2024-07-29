import { Link } from "react-router-dom";
import parse from "html-react-parser";
import formatDateTime from "../utils/DateTime";

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
  let date, time;

  if (published) {
    ({ date, time } = formatDateTime(published));
  }
  return (
    <Link
      to={`/blog/${id}`}
      className="flex cursor-pointer flex-col border-b-2 p-5"
    >
      <div className="flex items-center gap-6">
        <div className="flex items-center">
          <div className="relative inline-flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-gray-100 sm:h-8 sm:w-8 dark:bg-gray-600">
            <span className="font-medium capitalize text-gray-600 dark:text-gray-300">
              {authorName?.[0]}
            </span>
          </div>
          <span className="ml-2 text-xs font-medium capitalize sm:text-sm">
            {authorName}
          </span>
        </div>
        <div className="flex items-center text-xs sm:text-sm">
          <div className="flex items-center">
            <span className="h-1 w-1 rounded-full bg-black"></span>
          </div>
          {published && (
            <>
              <span className="ml-2">{date}</span>
              <span className="ml-2">{time}</span>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-between">
        <div>
          <div className="mt-3 flex flex-col">
            <h2 className="pb-2 text-base font-bold text-slate-800 sm:text-xl">
              {title}
            </h2>
            <p className="hidden text-wrap text-base text-slate-600 sm:block">
              {parse(content.slice(0, 100))}...
            </p>
          </div>
          <div className="flex items-center py-8 text-xs sm:text-sm">
            <ul className="flex gap-2 pr-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <li
                  key={i}
                  className="rounded-full bg-slate-300 px-2 py-1 sm:px-3 sm:py-1"
                >
                  tag{i + 1}
                </li>
              ))}
            </ul>
            <span>{"9"} min read</span>
          </div>
        </div>
        <div className="w-24 sm:w-32">
          <img src="https://picsum.photos/200" alt="thumbnail" />
        </div>
      </div>
    </Link>
  );
};

export default BlogRow;
