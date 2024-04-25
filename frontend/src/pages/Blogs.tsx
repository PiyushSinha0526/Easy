import BlogRow from "../components/BlogRow";
import {useBlogs} from "../hooks";
const mockData = {
  authorName: "Lorem",
  title:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, sint.",
  content:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus consectetur obcaecati vero iure at doloremque fuga! Eius provident praesentium excepturi voluptas accusantium quae sed, debitis, animi at, repellat alias hic asperiores maxime!",
  published: "10-10-10",
};
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
