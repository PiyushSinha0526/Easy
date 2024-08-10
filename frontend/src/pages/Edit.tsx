import { useParams } from "react-router-dom";
import BlogForm from "../components/BlogForm";
import { useBlog } from "../hooks";
import { BACKEND_URL } from "../config";
import FormSkeleton from "../components/skeleton/SkeletonForm";

const Edit = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || "" });

  if (loading) return <FormSkeleton />;
  return (
    <BlogForm
      initialTitle={blog?.title || ""}
      initialContent={blog?.content || ""}
      configUrl={`${BACKEND_URL}/api/v1/blog/${id}/edit`}
      method="patch"
    />
  );
};

export default Edit;
