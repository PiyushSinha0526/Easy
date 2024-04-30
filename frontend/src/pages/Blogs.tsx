import BlogRow from "../components/BlogRow";
import { useBlogs } from "../hooks";

const Blogs = () => {
  const { loading, blogs } = useBlogs();
  if (loading) return <div>Loading...</div>;
  console.log(blogs);
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
