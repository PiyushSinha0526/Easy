import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import BlogContent from "../components/BlogContent";
import BlogContentSkeleton from "../components/skeleton/SkeletonBlogContent";

function Blog() {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || "" });
  if (loading) return <BlogContentSkeleton />;
  if (!blog) {
    return <h1>Blog not found.</h1>;
  }
  return <BlogContent blog={blog} />;
}

export default Blog;
