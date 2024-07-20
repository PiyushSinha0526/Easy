import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import authStorage from "../utils/localStorage";

export interface Blog {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    id: string;
  };
}

const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();
  useEffect(() => {
    if (authStorage != "{}") {
      axios
        .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
          headers: {
            Authorization: authStorage.state.token,
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
  useEffect(() => {
    if (authStorage != "{}") {
      const endPoint = path == "/myBlogs" ? "user-posts" : "bulk";
      axios
        .get(`${BACKEND_URL}/api/v1/blog/${endPoint}`, {
          headers: {
            Authorization: authStorage.state.token,
          },
        })
        .then((response) => {
          setBlogs(response.data.data);
          setLoading(false);
        });
    }
  }, [path]);

  return { loading, blogs };
};

export { useBlogs, useBlog };
