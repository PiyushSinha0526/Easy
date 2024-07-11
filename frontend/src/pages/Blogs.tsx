import { Link, useLocation } from "react-router-dom";
import BlogRow from "../components/BlogRow";
import { useBlogs } from "../hooks";

const Blogs = () => {
  const url = useLocation();
  const { loading, blogs } = useBlogs(url.pathname);
  if (loading) return <div>Loading...</div>;
  if (blogs.length === 0)
    return (
      <div className="mx-auto flex h-screen max-w-screen-xl flex-col items-center justify-center gap-2">
        <div className="text-3xl font-semibold">No blogs found.</div>
        <Link to={"/publish"} className="underline">
          Create Blog
        </Link>
      </div>
    );

  return (
    <div className="mx-auto max-w-screen-xl">
      <div className="flex flex-col justify-evenly gap-8">
        <main>
          {blogs.map((blog) => (
            <BlogRow
              key={blog.id}
              id={blog.id}
              authorName={blog.author.name || "anonymus"}
              title={blog.title}
              content={blog.content}
              published={"2nd feb 2024"}
            />
          ))}
        </main>
        <div></div>
      </div>
    </div>
  );
};

export default Blogs;
