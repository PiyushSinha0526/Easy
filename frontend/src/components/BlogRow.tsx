import { Link } from "react-router-dom";

interface BlogRowProps {
  id: string
  authorName: string;
  title: string;
  content: string;
  published: string;
}
const BlogRow = ({ id, authorName, title, content, published }: BlogRowProps) => {
  return (
    <Link to={`/blog/${id}`} className="cursor-pointer">
      <div className="flex items-center gap-2">
        <div className="relative inline-flex h-4 w-4 items-center justify-center overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600">
          <span className="font-medium text-gray-600 dark:text-gray-300">
            {authorName?.slice(0, 1)}
          </span>
        </div>
        <span className="font-medium">{authorName}</span>
        <div className=" flex">
          <div className="flex items-center">
            <span className="h-1 w-1 rounded-full bg-black"></span>
          </div>
          {published}
        </div>
      </div>
      <div className="flex flex-col">
        <h2 className="text-slate-800">{title}</h2>
        <p className="text-slate-600">{content} ...</p>
      </div>
      <div>
        <ul>
          <li>tag1</li>
        </ul>
        <span>Time</span>
      </div>
    </Link>
  );
};

export default BlogRow;
