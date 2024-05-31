import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import BlogMain from "../components/BlogMain";

function Blog() {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || "" });
  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (!blog) {
    return <h1>Blog not found</h1>;
  }
  return <BlogMain blog={blog} />;
}

export default Blog;
