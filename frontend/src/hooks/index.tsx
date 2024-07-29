import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import useAuthStore from "../store/AuthStore";

export interface Blog {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    id: string;
  };
  published: string;
  readTime: string;
}

const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();
  const token = useAuthStore((state) => state.token);
  useEffect(() => {
    if (token != null) {
      axios
        .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setBlog(response.data.data);
          setLoading(false);
        });
    }
  }, []);

  return { loading, blog };
};
const useBlogs = (path: string) => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    const fetchBlogs = async () => {
      const endPoint = path === "/myBlogs" ? "user-posts" : "bulk";
      if (endPoint === "user-posts" && !token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/blog/${endPoint}`,
          {
            headers: endPoint === "user-posts" ? { Authorization: token } : {},
          },
        );
        setBlogs(response.data.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [path, token]);

  return { loading, blogs };
};

export { useBlogs, useBlog };
