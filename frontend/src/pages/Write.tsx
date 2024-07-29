import BlogForm from "../components/BlogForm";
import { BACKEND_URL } from "../config";

const Write = () => {
  return <BlogForm configUrl={`${BACKEND_URL}/api/v1/blog`} method="post" />;
};

export default Write;
