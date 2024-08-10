import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useBlogs } from "../hooks";
import BlogListItem from "../components/BlogListItem";
import ListItemSkeleton from "../components/skeleton/SkeletonListItem";

const BlogsWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto max-w-screen-xl">
    <div className="flex flex-col justify-evenly gap-8">
      <main>{children}</main>
      <div></div>
    </div>
  </div>
);

const ListComponent = () => {
  const [listItemCount, setListItemCount] = useState(
    Math.floor(window.innerHeight / 262),
  );

  useEffect(() => {
    const handleResize = () => {
      setListItemCount(Math.floor(window.innerHeight / 262));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {Array(listItemCount)
        .fill(1)
        .map((_, index) => (
          <ListItemSkeleton key={index} />
        ))}
    </>
  );
};

const Blogs = () => {
  const url = useLocation();
  const { loading, blogs } = useBlogs(url.pathname);
  const [showNoBlogs, setShowNoBlogs] = useState(false);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        if (blogs.length === 0) {
          setShowNoBlogs(true);
        }
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setShowNoBlogs(false);
    }
  }, [loading, blogs]);

  if (loading) {
    return (
      <BlogsWrapper>
        <ListComponent />
      </BlogsWrapper>
    );
  }

  if (showNoBlogs) {
    return (
      <div className="mx-auto flex h-screen max-w-screen-xl flex-col items-center justify-center gap-2">
        <div className="text-3xl font-semibold">No blogs found.</div>
        <Link to={"/write"} className="underline">
          Create Blog
        </Link>
      </div>
    );
  }

  return (
    <BlogsWrapper>
      {blogs.map((blog) => (
        <BlogListItem
          key={blog.id}
          id={blog.id}
          authorName={blog.author.name || "anonymous"}
          title={blog.title}
          content={blog.content}
          published={blog.published}
        />
      ))}
    </BlogsWrapper>
  );
};

export default Blogs;
