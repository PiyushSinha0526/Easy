import BlogRow from "../components/BlogRow";
import {useBlogs} from "../hooks";

const Blogs = () => {
  const { loading, blogs } = useBlogs();
  if (loading) return <div>Loading...</div>;
  console.log(blogs);
  return (
    <div>
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
    </div>
  );
};

export default Blogs;
